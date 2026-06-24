import type { Plugin } from 'vite';
import { createCanvas, loadImage, GlobalFonts } from '@napi-rs/canvas';
import { join } from 'path';
import url from 'url';

// Register Bricolage Grotesque font weights
GlobalFonts.registerFromPath(join(__dirname, '../fonts/BricolageGrotesque-Regular.ttf'), 'Bricolage Grotesque');
GlobalFonts.registerFromPath(join(__dirname, '../fonts/BricolageGrotesque-Light.ttf'), 'Bricolage Grotesque');


export function vitePluginOg(): Plugin {
  return {
    name: 'vite-plugin-og',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const parsedUrl = url.parse(req.url || '', true);
        if (parsedUrl.pathname === '/og' || parsedUrl.pathname === '/api/og') {
          const title = (parsedUrl.query.title as string) || 'unbrn/ui';
          const description = (parsedUrl.query.description as string) || '';

          try {
            // Load background image
            const bgPath = join(__dirname, '../../public/og_banner.jpg');
            const bgImage = await loadImage(bgPath);

            // Create canvas 1200x440
            const canvas = createCanvas(1200, 440);
            const ctx = canvas.getContext('2d');

            // Draw background image stretched/fit
            ctx.drawImage(bgImage, 0, 0, 1200, 440);

            // Set up Text styles
            ctx.fillStyle = '#FFFFFF';

            // Draw title text (Regular weight, 400)
            ctx.font = '400 45px "Bricolage Grotesque"';
            // Align title vertically
            ctx.fillText(title, 100, 210);

            // Draw description text (Light weight, 300, wrap text dynamically)
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.font = '300 30px "Bricolage Grotesque"';

            const words = description.split(' ');
            let line = '';
            let y = 260;
            const maxWidth = 1000;
            const lineHeight = 46;

            for (let n = 0; n < words.length; n++) {
              const testLine = line + words[n] + ' ';
              const metrics = ctx.measureText(testLine);
              const testWidth = metrics.width;
              if (testWidth > maxWidth && n > 0) {
                ctx.fillText(line, 100, y);
                line = words[n] + ' ';
                y += lineHeight;
              } else {
                line = testLine;
              }
            }
            ctx.fillText(line, 100, y);

            // Output PNG buffer
            const buffer = await canvas.encode('png');
            res.setHeader('Content-Type', 'image/png');
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
            res.end(buffer);
            return;
          } catch (err) {
            console.error('Error generating OG image:', err);
            res.statusCode = 500;
            res.end('Error generating OG image');
            return;
          }
        }
        next();
      });
    }
  };
}

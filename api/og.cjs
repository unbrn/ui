const { createCanvas, loadImage, GlobalFonts } = require('@napi-rs/canvas');
const { join } = require('path');
const url = require('url');

// Register Bricolage Grotesque font weights
GlobalFonts.registerFromPath(join(__dirname, 'BricolageGrotesque-Regular.ttf'), 'Bricolage Grotesque');
GlobalFonts.registerFromPath(join(__dirname, 'BricolageGrotesque-Light.ttf'), 'Bricolage Grotesque');

module.exports = async (req, res) => {
  const parsedUrl = url.parse(req.url || '', true);
  const title = parsedUrl.query.title || 'unbrn/ui';
  const description = parsedUrl.query.description || '';

  try {
    // Load background image (traced asset)
    const bgPath = join(__dirname, 'og_banner.jpg');
    const bgImage = await loadImage(bgPath);

    // Create canvas 1200x440
    const canvas = createCanvas(1200, 440);
    const ctx = canvas.getContext('2d');

    // Draw background image stretched/fit
    ctx.drawImage(bgImage, 0, 0, 1200, 440);

    // Set up Text styles
    ctx.fillStyle = '#FFFFFF';

    // Draw title text (Regular weight, 400)
    ctx.font = '400 64px "Bricolage Grotesque"';
    // Align title vertically
    ctx.fillText(title, 100, 190);

    // Draw description text (Light weight, 300, wrap text dynamically)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '300 32px "Bricolage Grotesque"';

    const words = description.split(' ');
    let line = '';
    let y = 270;
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
    res.status(200).send(buffer);
  } catch (err) {
    console.error('Error generating OG image:', err);
    res.status(500).send('Error generating OG image');
  }
};

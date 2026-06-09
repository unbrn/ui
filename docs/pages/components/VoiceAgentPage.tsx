import React, { useState, useEffect, useRef } from 'react';
import { VoiceAgent } from '../../../package/components/VoiceAgent/VoiceAgent';
import { Showcase } from '../../components/layout/Showcase';
import { CodeBlock } from '../../../package/components/CodeBlock/CodeBlock';
import { Props } from '../../components/layout/Props';
import { ComponentHeader } from '../../components/layout/ComponentHeader';
import { Button } from '../../../package/components/Button/Button';
import { Alert } from '../../../package/components/Alert/Alert';
import { Mic } from 'lucide-react';

export const VoiceAgentPage: React.FC = () => {
  const [sessionActive, setSessionActive] = useState(false);
  const [sessionStatus, setSessionStatus] = useState<'idle' | 'connecting' | 'listening' | 'speaking' | 'paused'>('idle');
  const [, setSessionStep] = useState<number>(0);
  const [isSessionMuted, setIsSessionMuted] = useState(false);
  const [sessionAnalyser, setSessionAnalyser] = useState<AnalyserNode | null>(null);
  const [subtitles, setSubtitles] = useState('');

  const sessionAudioCtxRef = useRef<AudioContext | null>(null);
  const sessionAnalyserRef = useRef<AnalyserNode | null>(null);
  const sessionAudioElRef = useRef<HTMLAudioElement | null>(null);
  const sessionMicStreamRef = useRef<MediaStream | null>(null);
  const sessionMicSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const initSessionAudio = () => {
    if (!sessionAudioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      sessionAudioCtxRef.current = new AudioContextClass();

      const analyser = sessionAudioCtxRef.current.createAnalyser();
      analyser.fftSize = 256;
      sessionAnalyserRef.current = analyser;
      setSessionAnalyser(analyser);
    }
    if (sessionAudioCtxRef.current.state === 'suspended') {
      sessionAudioCtxRef.current.resume();
    }
  };

  const stopSessionMic = () => {
    if (sessionMicStreamRef.current) {
      sessionMicStreamRef.current.getTracks().forEach(track => track.stop());
      sessionMicStreamRef.current = null;
    }
    if (sessionMicSourceRef.current) {
      sessionMicSourceRef.current.disconnect();
      sessionMicSourceRef.current = null;
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  };

  const playSessionAudio = (url: string, onEnded: () => void) => {
    try {
      initSessionAudio();
      stopSessionMic();

      if (sessionAudioElRef.current) {
        sessionAudioElRef.current.pause();
      }

      const audio = new Audio(url);
      audio.crossOrigin = 'anonymous';
      audio.muted = isSessionMuted;
      sessionAudioElRef.current = audio;

      if (sessionAudioCtxRef.current && sessionAnalyserRef.current) {
        const source = sessionAudioCtxRef.current.createMediaElementSource(audio);
        source.connect(sessionAnalyserRef.current);
        sessionAnalyserRef.current.connect(sessionAudioCtxRef.current.destination);
      }

      audio.addEventListener('ended', onEnded);
      setSessionStatus('speaking');
      audio.play().catch(err => {
        console.warn('Audio play failed, auto-advancing:', err);
        setTimeout(onEnded, 3000);
      });
    } catch (err) {
      console.error('Audio setup failed, auto-advancing:', err);
      setTimeout(onEnded, 3000);
    }
  };

  const startSessionMicListening = (onSpeechFinished: () => void) => {
    try {
      initSessionAudio();
      stopSessionMic();

      navigator.mediaDevices.getUserMedia({ audio: true, video: false })
        .then(stream => {
          sessionMicStreamRef.current = stream;
          setSessionStatus('listening');
          setSubtitles('Listening for your response...');

          if (sessionAudioCtxRef.current && sessionAnalyserRef.current) {
            const source = sessionAudioCtxRef.current.createMediaStreamSource(stream);
            sessionMicSourceRef.current = source;
            source.connect(sessionAnalyserRef.current);
          }

          let silenceStart = Date.now();
          let hasSpoken = false;
          const speechThreshold = 18;
          const silenceDelay = 1500;
          const timeoutStart = Date.now();
          const maxSilenceTimeout = 6000;

          const checkVolume = () => {
            if (!sessionAnalyserRef.current) return;

            const bufferLength = sessionAnalyserRef.current.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            sessionAnalyserRef.current.getByteFrequencyData(dataArray);

            let sum = 0;
            for (let i = 0; i < bufferLength; i++) {
              sum += dataArray[i];
            }
            const average = sum / bufferLength;

            if (average > speechThreshold) {
              hasSpoken = true;
              silenceStart = Date.now();
            }

            const now = Date.now();
            if (hasSpoken) {
              if (now - silenceStart > silenceDelay) {
                stopSessionMic();
                onSpeechFinished();
                return;
              }
            } else {
              if (now - timeoutStart > maxSilenceTimeout) {
                stopSessionMic();
                onSpeechFinished();
                return;
              }
            }

            animationFrameRef.current = requestAnimationFrame(checkVolume);
          };

          animationFrameRef.current = requestAnimationFrame(checkVolume);
        })
        .catch(err => {
          console.warn('Mic access denied or failed, auto-advancing:', err);
          setSessionStatus('listening');
          setSubtitles('Listening for your response...');
          setTimeout(() => {
            stopSessionMic();
            onSpeechFinished();
          }, 5000);
        });
    } catch (err) {
      console.warn('Mic setup failed, auto-advancing with fallback:', err);
      setSessionStatus('listening');
      setSubtitles('Listening for your response (simulated)...');
      setTimeout(() => {
        stopSessionMic();
        onSpeechFinished();
      }, 5000);
    }
  };

  useEffect(() => {
    if (sessionAudioElRef.current) {
      sessionAudioElRef.current.muted = isSessionMuted;
    }
  }, [isSessionMuted]);

  const runSessionStep = (step: number) => {
    setSessionStep(step);

    if (step === 1) {
      setSubtitles('Hello! I am your Unburn AI voice assistant. How can I help you today?');
      playSessionAudio('/voice-intro.wav', () => {
        runSessionStep(2);
      });
    } else if (step === 2) {
      startSessionMicListening(() => {
        setSessionStatus('connecting');
        setSubtitles('Agent is thinking...');
        setTimeout(() => runSessionStep(3), 1200);
      });
    } else if (step === 3) {
      setSubtitles("That's a great question! I am currently running in a local simulated mode, but you can easily connect me to OpenAI Realtime, Vapi, or Retell AI for production voice interactions.");
      playSessionAudio('/voice-response-1.wav', () => {
        runSessionStep(4);
      });
    } else if (step === 4) {
      startSessionMicListening(() => {
        setSessionStatus('connecting');
        setSubtitles('Agent is thinking...');
        setTimeout(() => runSessionStep(5), 1200);
      });
    } else if (step === 5) {
      setSubtitles("Exactly. I'm rendering a dynamic LED dot grid that responds directly to real-time audio frequencies. What else would you like to know about me?");
      playSessionAudio('/voice-response-2.wav', () => {
        runSessionStep(6);
      });
    } else if (step === 6) {
      startSessionMicListening(() => {
        setSessionStatus('connecting');
        setSubtitles('Agent is thinking...');
        setTimeout(() => runSessionStep(7), 1200);
      });
    } else if (step === 7) {
      setSubtitles("Thank you for testing the Unburn Voice Agent live simulator. I'll close the session now. Have an amazing day!");
      playSessionAudio('/voice-response-3.wav', () => {
        endSession();
      });
    }
  };

  const startSession = () => {
    setSessionActive(true);
    setIsSessionMuted(false);
    runSessionStep(1);
  };

  const endSession = () => {
    if (sessionAudioElRef.current) {
      sessionAudioElRef.current.pause();
      sessionAudioElRef.current = null;
    }
    stopSessionMic();
    setSessionActive(false);
    setSessionStatus('idle');
    setSessionStep(0);
    setSubtitles('');
  };

  useEffect(() => {
    return () => {
      if (sessionAudioElRef.current) {
        sessionAudioElRef.current.pause();
        sessionAudioElRef.current = null;
      }
      stopSessionMic();
      if (sessionAudioCtxRef.current) {
        sessionAudioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <>
      <ComponentHeader title="Voice Agent" />

      <div style={{ marginBottom: '2rem' }}>
        <Alert
          alertVariant="duo"
          alertIcon={<Mic size={16} />}
          alertTitle="Try Live AI Voice Simulator"
          alertDescription="Experience a live simulated voice call with our Voice Agent. Test real-time microphone voice detection and simulated conversational flow."
          alertActions={
            <Button buttonOnClick={startSession} buttonChildren="Start Live Test" />
          }
        />
      </div>

      <Showcase
        title="Preview"
        code={`import { VoiceAgent } from '@unburn/ui/VoiceAgent';

export default function Example() {
  return (
    <VoiceAgent
      voiceAgentStatus="speaking"
      voiceAgentVariant="grid"
    />
  );
}`}
      >
        <VoiceAgent
          voiceAgentStatus="speaking"
          voiceAgentVariant="grid"
        />
      </Showcase>

      {sessionActive && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'var(--bg-main)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-main)'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', width: '100%', maxWidth: '400px', padding: '2rem' }}>
            <VoiceAgent
              voiceAgentStatus={sessionStatus}
              voiceAgentVariant="grid"
              voiceAgentIsMuted={isSessionMuted}
              voiceAgentAudioAnalyser={sessionAnalyser || undefined}
              voiceAgentShowControls={true}
              voiceAgentOnMuteToggle={() => setIsSessionMuted(prev => !prev)}
              voiceAgentOnDisconnect={endSession}
            />

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', textAlign: 'center' }}>
              <span style={{
                fontSize: '0.875rem',
                fontWeight: 500,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}>
                {sessionStatus === 'speaking' ? 'Agent Speaking' : sessionStatus === 'listening' ? 'Listening to You' : 'Connecting...'}
              </span>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', maxWidth: '320px', lineHeight: '1.4' }}>
                {subtitles}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="section-usage">
        <h3 className="section-subtitle">Usage</h3>
        <CodeBlock
          codeBlockLanguage="tsx"
          codeBlockCode={`import { VoiceAgent } from '@unburn/ui/VoiceAgent';

export default function Example() {
  return (
    <VoiceAgent
      voiceAgentStatus="speaking"
      voiceAgentOnMuteToggle={() => console.log('Muted')}
      voiceAgentOnDisconnect={() => console.log('Hangup')}
    />
  );
}`}
        />
      </div>

      <div className="section-examples">
        <h3 className="section-subtitle">Examples</h3>

        <Showcase
          title="Agent Statuses"
          description="The voice agent supports 5 statuses: idle, connecting, listening, speaking, and paused."
          code={`import { VoiceAgent } from '@unburn/ui/VoiceAgent';

export default function Example() {
  return (
    <div className="flex gap-6 flex-wrap">
      <VoiceAgent voiceAgentStatus="idle" voiceAgentShowControls={false} />
      <VoiceAgent voiceAgentStatus="connecting" voiceAgentShowControls={false} />
      <VoiceAgent voiceAgentStatus="listening" voiceAgentShowControls={false} />
      <VoiceAgent voiceAgentStatus="speaking" voiceAgentShowControls={false} />
      <VoiceAgent voiceAgentStatus="paused" voiceAgentShowControls={false} />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>idle</span>
              <VoiceAgent voiceAgentStatus="idle" voiceAgentShowControls={false} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>connecting</span>
              <VoiceAgent voiceAgentStatus="connecting" voiceAgentShowControls={false} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>listening</span>
              <VoiceAgent voiceAgentStatus="listening" voiceAgentShowControls={false} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>speaking</span>
              <VoiceAgent voiceAgentStatus="speaking" voiceAgentShowControls={false} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>paused</span>
              <VoiceAgent voiceAgentStatus="paused" voiceAgentShowControls={false} />
            </div>
          </div>
        </Showcase>

        <Showcase
          title="Speaking Patterns"
          description="Choose from three distinct visualization algorithms: blob, wave, and ripple."
          code={`import { VoiceAgent } from '@unburn/ui/VoiceAgent';

export default function Example() {
  return (
    <div className="flex gap-6 flex-wrap">
      <VoiceAgent voiceAgentStatus="speaking" voiceAgentPattern="blob" voiceAgentShowControls={false} />
      <VoiceAgent voiceAgentStatus="speaking" voiceAgentPattern="wave" voiceAgentShowControls={false} />
      <VoiceAgent voiceAgentStatus="speaking" voiceAgentPattern="ripple" voiceAgentShowControls={false} />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>blob</span>
              <VoiceAgent voiceAgentStatus="speaking" voiceAgentPattern="blob" voiceAgentShowControls={false} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>wave</span>
              <VoiceAgent voiceAgentStatus="speaking" voiceAgentPattern="wave" voiceAgentShowControls={false} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ripple</span>
              <VoiceAgent voiceAgentStatus="speaking" voiceAgentPattern="ripple" voiceAgentShowControls={false} />
            </div>
          </div>
        </Showcase>

        <Showcase
          title="Colors"
          description="Custom color accents support any valid CSS color property (Hex, RGB, HSL, presets)."
          code={`import { VoiceAgent } from '@unburn/ui/VoiceAgent';

export default function Example() {
  return (
    <div className="flex gap-6 flex-wrap">
      <VoiceAgent voiceAgentStatus="speaking" voiceAgentAccentColor="#38bdf8" voiceAgentShowControls={false} />
      <VoiceAgent voiceAgentStatus="speaking" voiceAgentAccentColor="#c084fc" voiceAgentShowControls={false} />
      <VoiceAgent voiceAgentStatus="speaking" voiceAgentAccentColor="#34d399" voiceAgentShowControls={false} />
      <VoiceAgent voiceAgentStatus="speaking" voiceAgentAccentColor="#f43f5e" voiceAgentShowControls={false} />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
            <VoiceAgent voiceAgentStatus="speaking" voiceAgentAccentColor="#38bdf8" voiceAgentShowControls={false} />
            <VoiceAgent voiceAgentStatus="speaking" voiceAgentAccentColor="#c084fc" voiceAgentShowControls={false} />
            <VoiceAgent voiceAgentStatus="speaking" voiceAgentAccentColor="#34d399" voiceAgentShowControls={false} />
            <VoiceAgent voiceAgentStatus="speaking" voiceAgentAccentColor="#f43f5e" voiceAgentShowControls={false} />
          </div>
        </Showcase>

        <Showcase
          title="Grid Sizes & LED Density"
          description="Configure the LED matrix dimensions, dot size diameter, and grid gaps."
          code={`import { VoiceAgent } from '@unburn/ui/VoiceAgent';

export default function Example() {
  return (
    <div className="flex gap-6 flex-wrap">
      <VoiceAgent
        voiceAgentStatus="speaking"
        voiceAgentGridSize={{ rows: 5, cols: 5 }}
        voiceAgentDotSize={6}
        voiceAgentGridGap={4}
        voiceAgentShowControls={false}
      />
      <VoiceAgent
        voiceAgentStatus="speaking"
        voiceAgentGridSize={{ rows: 9, cols: 9 }}
        voiceAgentDotSize={12}
        voiceAgentGridGap={8}
        voiceAgentShowControls={false}
      />
    </div>
  );
}`}
        >
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', width: '100%', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>5x5 Grid (Micro)</span>
              <VoiceAgent
                voiceAgentStatus="speaking"
                voiceAgentGridSize={{ rows: 5, cols: 5 }}
                voiceAgentDotSize={6}
                voiceAgentGridGap={4}
                voiceAgentShowControls={false}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>9x9 Grid (Large LED)</span>
              <VoiceAgent
                voiceAgentStatus="speaking"
                voiceAgentGridSize={{ rows: 9, cols: 9 }}
                voiceAgentDotSize={12}
                voiceAgentGridGap={8}
                voiceAgentShowControls={false}
              />
            </div>
          </div>
        </Showcase>
      </div>

      <Props
        props={[
          { name: 'voiceAgentStatus', type: "'idle' | 'connecting' | 'listening' | 'speaking' | 'paused'", defaultValue: "'idle'", description: 'State of the voice agent. Controls the visual pattern simulation.' },
          { name: 'voiceAgentVariant', type: "'grid'", defaultValue: "'grid'", description: 'Sets the layout variant. Only circle grid variant is supported currently.' },
          { name: 'voiceAgentAccentColor', type: 'string', defaultValue: 'undefined', description: 'Sets the theme color. Supports any custom CSS color string (hex, rgb, hsl, named color, etc.). Defaults to white in dark mode and black in light mode.' },
          { name: 'voiceAgentGridSize', type: '{ rows: number; cols: number }', defaultValue: '{ rows: 9, cols: 9 }', description: 'Sets the width and height count of LED nodes.' },
          { name: 'voiceAgentDotSize', type: 'number', defaultValue: '8', description: 'Sets the individual node (LED) diameter in pixels.' },
          { name: 'voiceAgentGridGap', type: 'number', defaultValue: '6', description: 'Sets the spacing gap between visualizer nodes.' },
          { name: 'voiceAgentPattern', type: "'wave' | 'blob' | 'ripple'", description: 'Override the visual algorithm (wave, circular blob, or ripple).' },
          { name: 'voiceAgentIsMuted', type: 'boolean', defaultValue: 'false', description: 'Visual state change reflecting muted mic controls.' },
          { name: 'voiceAgentOnMuteToggle', type: '() => void', description: 'Event handler triggered by the microphone capsule toggle click.' },
          { name: 'voiceAgentOnDisconnect', type: '() => void', description: 'Event handler triggered by the hang-up button.' },
          { name: 'voiceAgentOnOptionClick', type: '() => void', description: 'Event handler triggered by the settings (...) button.' },
          { name: 'voiceAgentShowControls', type: 'boolean', defaultValue: 'true', description: 'Toggle control panel visibility below the grid.' },
          { name: 'voiceAgentClassName', type: 'string', description: 'Custom CSS class for the root container.' },
          { name: 'voiceAgentStyle', type: 'React.CSSProperties', description: 'Custom inline CSS styles for the root container.' },
        ]}
      />
    </>
  );
};

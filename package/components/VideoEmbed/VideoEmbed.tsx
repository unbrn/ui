"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';
import { cn } from '../../lib/utils';
import './VideoEmbed.css';
import { getAccentVariables } from '../../lib/colors';

export interface VideoEmbedProps {
  src: string;
  poster?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  ratio?: '16:9' | '4:3' | '1:1' | 'custom';
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  playIcon?: React.ReactNode;
}

export const VideoEmbed: React.FC<VideoEmbedProps> = ({
  src,
  poster,
  autoplay = false,
  loop = false,
  muted = false,
  controls = true,
  ratio = '16:9',
  color,
  className,
  style,
  playIcon,
}) => {
  // States
  const [isLoaded, setIsLoaded] = useState(autoplay && !poster);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(muted ? 0 : 0.8);
  const [isMuted, setIsMuted] = useState(muted);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const accentStyle = getAccentVariables(color);

  const isPlayerMounted = isLoaded || !poster;

  // Auto-play trigger once activated by gesture
  useEffect(() => {
    if (isLoaded && videoRef.current) {
      setIsBuffering(true);
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log('Autoplay blocked or interrupted:', err));
    }
  }, [isLoaded]);

  // Sync fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Idle controls hide controller
  useEffect(() => {
    if (!isPlaying) {
      const id = setTimeout(() => setShowControls(true), 0);
      return () => clearTimeout(id);
    }

    let timeoutId: ReturnType<typeof setTimeout>;
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setShowControls(false);
      }, 2500);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', () => setShowControls(false));
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
      clearTimeout(timeoutId);
    };
  }, [isPlaying]);

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLoaded(true);
  };

  // Custom Controls Handlers
  const togglePlay = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.error(err));
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      if (duration === 0 && videoRef.current.duration) {
        setDuration(videoRef.current.duration);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setIsBuffering(false);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekValue = parseFloat(e.target.value);
    setCurrentTime(seekValue);
    if (videoRef.current) {
      videoRef.current.currentTime = seekValue;
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newMuted = !isMuted;
    setIsMuted(newMuted);

    if (!videoRef.current) return;
    videoRef.current.muted = newMuted;
    if (newMuted) {
      setVolume(0);
    } else {
      setVolume(0.8);
      videoRef.current.volume = 0.8;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    setIsMuted(vol === 0);

    if (!videoRef.current) return;
    videoRef.current.volume = vol;
    videoRef.current.muted = vol === 0;
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch(err => console.error('Error enabling fullscreen:', err));
    } else {
      document.exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch(err => console.error('Error exiting fullscreen:', err));
    }
  };

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return '0:00';
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "unburn-video-embed-container",
        ratio !== 'custom' && `unburn-video-embed-ratio-${ratio.replace(':', '-')}`,
        isFullscreen && "unburn-video-embed-fullscreen",
        className
      )}
      style={{ ...style, ...accentStyle }}
      onClick={isPlayerMounted ? togglePlay : undefined}
    >
      {/* Dynamic Buffering & Loading Spinner Overlay */}
      <div 
        className={cn(
          "unburn-video-loading-overlay",
          isBuffering && "unburn-video-loading-overlay-active"
        )}
      >
        <div className="unburn-video-spinner" />
      </div>

      {!isLoaded && (
        <div className="unburn-video-embed-overlay" onClick={handlePlayClick}>
          {poster && (
            <img
              src={poster}
              alt="Video Thumbnail"
              className="unburn-video-embed-poster"
              loading="lazy"
            />
          )}
          <button className="unburn-video-play-btn-glass" aria-label="Play video">
            <div className="unburn-video-play-btn-glass-inner">
              {playIcon || <Play size={20} fill="currentColor" />}
            </div>
            <span className="unburn-video-play-btn-ripple"></span>
          </button>
        </div>
      )}

      {/* Frame Mounting */}
      {(isLoaded || !poster) && (
        <>
          <video
            ref={videoRef}
            src={src}
            className="unburn-video-embed-frame"
            autoPlay={isLoaded || autoplay}
            loop={loop}
            muted={isMuted}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onDurationChange={handleLoadedMetadata}
            onWaiting={() => setIsBuffering(true)}
            onPlaying={() => setIsBuffering(false)}
            onSeeking={() => setIsBuffering(true)}
            onSeeked={() => setIsBuffering(false)}
            onCanPlay={() => setIsBuffering(false)}
            onLoadStart={() => setIsBuffering(true)}
          />
          
          {/* Sculpted Glassmorphic Capsule Custom Video Controls Panel */}
          {controls && isLoaded && (
            <div 
              className={cn(
                "unburn-video-controls", 
                !showControls && "unburn-video-controls-hidden"
              )}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Play Pause Button */}
              <button 
                className="unburn-video-control-btn" 
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
              </button>
              
              {/* Elapsed Time readout */}
              <span className="unburn-video-time-display">
                {formatTime(currentTime)}
              </span>

              {/* Wide Floating Seekbar */}
              <div className="unburn-video-seekbar-wrapper">
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeek}
                  className="unburn-video-seekbar"
                  style={{ '--seek-progress': `${duration ? (currentTime / duration) * 100 : 0}%` } as React.CSSProperties}
                  aria-label="Seek video timeline"
                />
              </div>

              {/* Total Duration readout */}
              <span className="unburn-video-time-display">
                {formatTime(duration)}
              </span>

              {/* Volume Controller */}
              <div className="unburn-video-volume-group">
                <button 
                  className="unburn-video-control-btn" 
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                >
                  {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="unburn-video-volume-slider"
                  style={{ '--volume-progress': `${volume * 100}%` } as React.CSSProperties}
                  aria-label="Adjust volume"
                />
              </div>

              {/* Fullscreen Trigger */}
              <button 
                className="unburn-video-control-btn" 
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

VideoEmbed.displayName = 'VideoEmbed';

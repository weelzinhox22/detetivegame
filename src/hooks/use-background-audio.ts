import { useState, useEffect, useRef } from 'react';

export function useBackgroundAudio(src: string) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    try {
      // Create the audio element
      const audio = new Audio();
      
      // Set up event listeners
      audio.addEventListener('canplaythrough', () => {
        setAudioLoaded(true);
      });
      
      audio.addEventListener('error', () => {
        setAudioLoaded(false);
      });
      
      // Set properties
      audio.src = src;
      audio.loop = true;
      audio.volume = volume;
      
      // Save to ref
      audioRef.current = audio;
      
      // Cleanup
      return () => {
        audio.pause();
        audioRef.current = null;
      };
    } catch (error) {
      console.warn('Error initializing audio:', error);
      return () => {};
    }
  }, [src]);

  const toggle = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(error => {
            console.warn('Error playing audio:', error);
            setIsPlaying(false);
          });
      }
    }
  };

  const adjustVolume = (newVolume: number) => {
    if (!audioRef.current) return;
    
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    audioRef.current.volume = clampedVolume;
    setVolume(clampedVolume);
  };

  return {
    isPlaying,
    volume,
    audioLoaded,
    toggle,
    adjustVolume
  };
} 
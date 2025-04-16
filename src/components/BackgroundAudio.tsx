import { useState } from 'react';
import { Volume2, VolumeX, Volume1, AlertCircle } from 'lucide-react';
import { useBackgroundAudio } from '@/hooks/use-background-audio';

interface BackgroundAudioProps {
  audioSrc: string;
}

export default function BackgroundAudio({ audioSrc }: BackgroundAudioProps) {
  const { isPlaying, volume, toggle, adjustVolume, audioLoaded } = useBackgroundAudio(audioSrc);
  const [showVolumeControls, setShowVolumeControls] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Function to determine which icon to show based on volume and playing state
  const VolumeIcon = () => {
    if (!audioLoaded) return <AlertCircle size={20} className="text-crime-blood" />;
    if (!isPlaying) return <VolumeX size={20} />;
    if (volume === 0) return <VolumeX size={20} />;
    if (volume < 0.5) return <Volume1 size={20} />;
    return <Volume2 size={20} />;
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="flex items-center">
        {showVolumeControls && audioLoaded && (
          <div 
            className="mr-2 bg-noir-medium p-2 rounded-lg shadow-lg"
            onMouseLeave={() => setShowVolumeControls(false)}
          >
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => adjustVolume(parseFloat(e.target.value))}
              className="w-24 accent-crime-clue"
            />
          </div>
        )}
        
        {showTooltip && !audioLoaded && (
          <div className="mr-2 bg-noir-medium p-2 rounded-lg shadow-lg text-xs text-white max-w-[200px]">
            Audio não encontrado. Adicione um arquivo background-music.mp3 na pasta /public/sounds/
          </div>
        )}
        
        <button 
          onClick={audioLoaded ? toggle : () => setShowTooltip(!showTooltip)}
          onMouseEnter={() => audioLoaded ? setShowVolumeControls(true) : setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className={`rounded-full p-2 transition-colors ${
            isPlaying && audioLoaded
              ? 'bg-crime-clue text-noir-dark' 
              : !audioLoaded 
                ? 'bg-noir-medium text-crime-blood hover:bg-noir-light'
                : 'bg-noir-medium text-gray-400 hover:bg-noir-light'
          }`}
          aria-label={!audioLoaded ? "Arquivo de áudio não encontrado" : isPlaying ? "Pausar música de fundo" : "Tocar música de fundo"}
        >
          <VolumeIcon />
        </button>
      </div>
    </div>
  );
} 
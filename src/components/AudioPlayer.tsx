
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";

interface AudioPlayerProps {
  audioUrl: string;
  title: string;
  onEnded?: () => void;
}

const AudioPlayer = ({ audioUrl, title, onEnded }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    
    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
    });
    
    audio.addEventListener("timeupdate", () => {
      setCurrentTime(audio.currentTime);
    });
    
    audio.addEventListener("ended", () => {
      setIsPlaying(false);
      setCurrentTime(0);
      if (onEnded) onEnded();
    });
    
    audio.volume = volume;
    
    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, [audioUrl, onEnded]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (value: number[]) => {
    const newTime = value[0];
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-secondary rounded-lg p-4 w-full">
      <div className="mb-2">
        <h3 className="text-sm font-medium truncate">{title}</h3>
      </div>
      
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-muted-foreground">
          {formatTime(currentTime)}
        </span>
        
        <Slider
          value={[currentTime]}
          min={0}
          max={duration || 1}
          step={0.1}
          onValueChange={handleSeek}
          className="mx-4 flex-1"
        />
        
        <span className="text-xs text-muted-foreground">
          {formatTime(duration)}
        </span>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={togglePlayPause}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          
          <div className="flex items-center">
            <Volume2 className="h-4 w-4 text-muted-foreground mr-2" />
            <Slider
              value={[volume]}
              min={0}
              max={1}
              step={0.01}
              onValueChange={handleVolumeChange}
              className="w-24"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;

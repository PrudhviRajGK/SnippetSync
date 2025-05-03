
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Icons } from "./Icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LearningTopic } from "@/services/geminiApi";

interface SpotifyPlayerProps {
  currentTopic: LearningTopic | null;
  audioUrl: string | null;
  onPlayNext: () => void;
  onPlayPrevious: () => void;
}

export function SpotifyPlayer({ currentTopic, audioUrl, onPlayNext, onPlayPrevious }: SpotifyPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioUrl) return;
    
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
      onPlayNext();
    });
    
    audio.volume = volume;
    audio.play().then(() => {
      setIsPlaying(true);
    }).catch(error => {
      console.error("Error playing audio:", error);
    });
    
    return () => {
      audio.pause();
      audio.src = "";
      setIsPlaying(false);
      audioRef.current = null;
    };
  }, [audioUrl, onPlayNext]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlayPause = () => {
    if (!audioRef.current || !audioUrl) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleSeek = (value: number[]) => {
    if (!audioRef.current) return;
    
    const newTime = value[0];
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="h-20 bg-[#181818] border-t border-neutral-800 px-4 flex items-center justify-between">
      {/* Now Playing Info */}
      <div className="w-[30%] flex items-center">
        {currentTopic && (
          <>
            <div className="h-14 w-14 bg-gradient-to-br from-violet-800 to-primary rounded-md flex items-center justify-center mr-3">
              <p className="text-xl font-bold text-white opacity-70">L</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{currentTopic.title}</p>
              <p className="text-xs text-muted-foreground">Spotify for Learning</p>
            </div>
          </>
        )}
      </div>

      {/* Player Controls */}
      <div className="w-[40%] flex flex-col items-center">
        <div className="flex items-center mb-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-muted-foreground hover:text-white"
                  onClick={onPlayPrevious}
                >
                  <Icons.chevronLeft className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Previous</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  className="mx-2 h-8 w-8 rounded-full bg-white hover:scale-105 transition-transform"
                  onClick={togglePlayPause}
                  disabled={!audioUrl}
                >
                  {isPlaying ? (
                    <Icons.pause className="h-4 w-4 text-black" />
                  ) : (
                    <Icons.play className="h-4 w-4 text-black" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{isPlaying ? "Pause" : "Play"}</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-muted-foreground hover:text-white"
                  onClick={onPlayNext}
                >
                  <Icons.chevronRight className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Next</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex items-center w-full">
          <span className="text-xs text-muted-foreground mr-2 w-9 text-right">
            {formatTime(currentTime)}
          </span>
          <Slider 
            value={[currentTime]}
            min={0}
            max={duration || 1}
            step={0.1}
            onValueChange={handleSeek}
            className="flex-1"
            disabled={!audioUrl}
          />
          <span className="text-xs text-muted-foreground ml-2 w-9">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Volume Controls */}
      <div className="w-[30%] flex justify-end">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-white">
            <svg className="h-4 w-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"/>
            </svg>
          </Button>
          <Slider
            value={[volume * 100]}
            min={0}
            max={100}
            step={1}
            onValueChange={(value) => setVolume(value[0] / 100)}
            className="w-24 ml-2"
          />
        </div>
      </div>
    </div>
  );
}

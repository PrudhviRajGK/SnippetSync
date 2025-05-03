
import { LearningTopic } from "@/services/geminiApi";
import { Card } from "@/components/ui/card";
import { Icons } from "./Icons";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
} from "@/components/ui/context-menu";

interface LearningCardProps {
  topic: LearningTopic;
  isPlaying: boolean;
  isLoading: boolean;
  onPlay: () => void;
  onDownload: () => void;
  index: number;
  audioUrl?: string;
}

export function LearningCard({ 
  topic, 
  isPlaying, 
  isLoading, 
  onPlay, 
  onDownload, 
  index,
  audioUrl
}: LearningCardProps) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card className="group py-4 px-4 bg-[#181818] rounded-md hover:bg-[#282828] transition-colors cursor-pointer border-none">
          <div className="relative w-full aspect-square bg-gradient-to-br from-violet-800 to-primary/80 rounded-md mb-4">
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-4xl font-bold text-white opacity-30">{index + 1}</p>
            </div>
            {isPlaying && (
              <span className="absolute flex h-5 w-5 animate-bounce items-center justify-center inset-0 m-auto z-10">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
              </span>
            )}
            <div 
              onClick={onPlay}
              className="opacity-0 transition-opacity group-hover:opacity-100 absolute bottom-3 right-3 h-12 w-12 rounded-full bg-primary z-10 shadow-md flex items-center justify-center"
            >
              {isLoading ? (
                <div className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
              ) : isPlaying ? (
                <Icons.pause className="h-5 w-5 text-black" />
              ) : (
                <Icons.play className="h-5 w-5 text-black" />
              )}
            </div>
          </div>
          <div className="space-y-1">
            <p className="font-semibold text-white truncate" title={topic.title}>
              {topic.title}
            </p>
            <p className="font-medium text-muted-foreground text-sm line-clamp-2">
              {topic.content.split(".")[0]}...
            </p>
          </div>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={onPlay}>
          {isPlaying ? "Pause" : "Play"}
        </ContextMenuItem>
        <ContextMenuItem onClick={onDownload} disabled={!audioUrl}>
          Download audio
        </ContextMenuItem>
        <ContextMenuItem>Add to queue</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger>Share</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Copy link to lesson</ContextMenuItem>
            <ContextMenuItem>Embed lesson</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  );
}

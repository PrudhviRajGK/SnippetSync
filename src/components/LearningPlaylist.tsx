
import { useState } from "react";
import { LearningTopic } from "@/services/geminiApi";
import { LearningCard } from "./LearningCard";
import { SpotifyPlayer } from "./SpotifyPlayer";

interface LearningPlaylistProps {
  topics: LearningTopic[];
  audioUrls: Record<string, string>;
  loadingAudio: Record<string, boolean>;
  onPlayAudio: (topic: LearningTopic) => void;
}

const LearningPlaylist = ({ 
  topics, 
  audioUrls, 
  loadingAudio,
  onPlayAudio 
}: LearningPlaylistProps) => {
  const [activeTopicIndex, setActiveTopicIndex] = useState<number | null>(null);

  const handlePlay = (topic: LearningTopic, index: number) => {
    if (audioUrls[topic.title] || index === activeTopicIndex) {
      setActiveTopicIndex(index === activeTopicIndex ? null : index);
    } else {
      onPlayAudio(topic);
      setActiveTopicIndex(index);
    }
  };

  const handleDownload = (topic: LearningTopic) => {
    if (audioUrls[topic.title]) {
      const link = document.createElement('a');
      link.href = audioUrls[topic.title];
      link.download = `${topic.title.replace(/\s+/g, '_')}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handlePlayNext = () => {
    if (activeTopicIndex !== null && activeTopicIndex < topics.length - 1) {
      const nextIndex = activeTopicIndex + 1;
      setActiveTopicIndex(nextIndex);
      if (!audioUrls[topics[nextIndex].title]) {
        onPlayAudio(topics[nextIndex]);
      }
    }
  };

  const handlePlayPrevious = () => {
    if (activeTopicIndex !== null && activeTopicIndex > 0) {
      const prevIndex = activeTopicIndex - 1;
      setActiveTopicIndex(prevIndex);
      if (!audioUrls[topics[prevIndex].title]) {
        onPlayAudio(topics[prevIndex]);
      }
    }
  };

  const currentTopic = activeTopicIndex !== null ? topics[activeTopicIndex] : null;
  const currentAudioUrl = currentTopic ? audioUrls[currentTopic.title] : null;

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-1 text-white">Your Learning Playlist</h2>
        <p className="text-muted-foreground text-sm">Listen to educational audio snippets</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pb-24">
        {topics.map((topic, index) => (
          <LearningCard
            key={index}
            topic={topic}
            index={index}
            isPlaying={activeTopicIndex === index && !!audioUrls[topic.title]}
            isLoading={!!loadingAudio[topic.title]}
            onPlay={() => handlePlay(topic, index)}
            onDownload={() => handleDownload(topic)}
            audioUrl={audioUrls[topic.title]}
          />
        ))}
      </div>

      {activeTopicIndex !== null && (
        <div className="fixed bottom-0 left-0 right-0 z-10">
          <SpotifyPlayer
            currentTopic={currentTopic}
            audioUrl={currentAudioUrl}
            onPlayNext={handlePlayNext}
            onPlayPrevious={handlePlayPrevious}
          />
        </div>
      )}
    </div>
  );
};

export default LearningPlaylist;

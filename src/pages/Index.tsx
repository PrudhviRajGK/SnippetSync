
import { useState } from "react";
import Header from "@/components/Header";
import PromptInput from "@/components/PromptInput";
import LearningPlaylist from "@/components/LearningPlaylist";
import SuggestedTopics from "@/components/SuggestedTopics";
import EmptyStateSpotify from "@/components/EmptyStateSpotify";
import { Sidebar } from "@/components/Sidebar";
import { generateContent, LearningTopic } from "@/services/geminiApi";
import { generateSpeech } from "@/services/elevenLabsApi";
import { toast } from "sonner";

const Index = () => {
  const [topics, setTopics] = useState<LearningTopic[]>([]);
  const [loading, setLoading] = useState(false);
  const [audioUrls, setAudioUrls] = useState<Record<string, string>>({});
  const [loadingAudio, setLoadingAudio] = useState<Record<string, boolean>>({});

  const handlePromptSubmit = async (prompt: string) => {
    setLoading(true);
    
    try {
      const generatedTopics = await generateContent(prompt);
      setTopics(generatedTopics);
      toast.success("Learning playlist generated successfully!");
    } catch (error) {
      console.error("Error generating topics:", error);
      toast.error("Failed to generate topics. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePlayAudio = async (topic: LearningTopic) => {
    // If we already have the audio, no need to generate it again
    if (audioUrls[topic.title]) return;
    
    setLoadingAudio(prev => ({ ...prev, [topic.title]: true }));
    
    try {
      const audioUrl = await generateSpeech(topic.content);
      setAudioUrls(prev => ({ ...prev, [topic.title]: audioUrl }));
    } catch (error) {
      console.error("Error generating audio:", error);
      toast.error("Failed to generate audio. Please try again.");
    } finally {
      setLoadingAudio(prev => ({ ...prev, [topic.title]: false }));
    }
  };

  const handleSuggestedTopicSelect = (topic: string) => {
    handlePromptSubmit(`Generate a 5-minute educational snippet about: ${topic}`);
  };

  return (
    <div className="flex min-h-screen bg-[#121212] text-white">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <PromptInput onSubmit={handlePromptSubmit} loading={loading} />
            </div>
            
            {topics.length > 0 ? (
              <div className="space-y-10 fade-in">
                <LearningPlaylist 
                  topics={topics} 
                  audioUrls={audioUrls}
                  loadingAudio={loadingAudio}
                  onPlayAudio={handlePlayAudio}
                />
                
                <SuggestedTopics onSelectTopic={handleSuggestedTopicSelect} />
              </div>
            ) : (
              <EmptyStateSpotify />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;

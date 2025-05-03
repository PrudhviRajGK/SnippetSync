
import { Sparkles, Lightbulb } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
          <div className="relative bg-secondary rounded-full p-6">
            <Sparkles className="h-12 w-12 text-primary" />
          </div>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-3">Welcome to Spotify for Learning</h2>
      <p className="text-muted-foreground max-w-lg mb-6">
        Generate personalized 5-minute educational audio snippets based on your interests or time constraints.
      </p>
      
      <div className="bg-secondary/50 rounded-lg p-6 max-w-lg">
        <div className="flex items-center mb-4">
          <Lightbulb className="h-5 w-5 text-primary mr-2" />
          <h3 className="text-lg font-medium">How to get started</h3>
        </div>
        
        <ul className="text-sm text-left space-y-3">
          <li className="flex gap-2">
            <span className="text-primary">1.</span>
            <span>Enter topics you want to learn about or a time constraint (e.g., "I have 20 minutes")</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">2.</span>
            <span>Our AI will generate short, engaging educational content</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">3.</span>
            <span>Listen to your personalized audio learning playlist</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">4.</span>
            <span>Download audio files to listen offline</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EmptyState;

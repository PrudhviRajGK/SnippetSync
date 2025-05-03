
import { Button } from "@/components/ui/button";

const EmptyStateSpotify = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
      <div className="h-24 w-24 bg-gradient-to-br from-violet-800 to-primary/80 rounded-full flex items-center justify-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white opacity-80">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">Start Your Learning Journey</h2>
      <p className="text-muted-foreground max-w-lg mb-8">
        Enter a topic, question, or time constraint in the input above to generate personalized educational audio snippets.
      </p>
      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full px-8">
        Try an Example
      </Button>
    </div>
  );
};

export default EmptyStateSpotify;

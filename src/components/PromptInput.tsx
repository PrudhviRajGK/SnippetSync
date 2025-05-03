
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  loading: boolean;
}

const PromptInput = ({ onSubmit, loading }: PromptInputProps) => {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      toast.error("Please enter a topic or question.");
      return;
    }
    onSubmit(prompt);
  };

  const handleExampleClick = (example: string) => {
    setPrompt(example);
    onSubmit(example);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="What do you want to learn about today?"
          className="w-full bg-neutral-800 text-white border border-neutral-700 rounded-full py-4 px-6 pr-32 focus:outline-none focus:ring-2 focus:ring-primary"
          disabled={loading}
        />
        <Button
          type="submit"
          className="absolute right-2 top-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full"
          disabled={loading}
        >
          {loading ? (
            <div className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" /> Generate
            </>
          )}
        </Button>
      </form>
      
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="text-sm text-muted-foreground">Try:</span>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => handleExampleClick("Tell me about quantum computing in 5 minutes")}
          className="text-xs bg-neutral-800 hover:bg-neutral-700 border-neutral-700 text-neutral-300"
        >
          Quantum computing
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => handleExampleClick("I have 15 minutes. Create a playlist about space exploration history")}
          className="text-xs bg-neutral-800 hover:bg-neutral-700 border-neutral-700 text-neutral-300"
        >
          Space exploration
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => handleExampleClick("Generate 3 lessons about world history")}
          className="text-xs bg-neutral-800 hover:bg-neutral-700 border-neutral-700 text-neutral-300"
        >
          World history
        </Button>
      </div>
    </div>
  );
};

export default PromptInput;

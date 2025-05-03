
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const suggestedTopics = [
  "The History of Artificial Intelligence",
  "How Black Holes Work",
  "The Evolution of Human Language",
  "Quantum Computing Basics",
  "The Renaissance Period in Art",
  "Understanding Blockchain Technology",
  "Climate Change and Its Effects",
  "The Human Genome Project",
  "Ancient Egyptian Civilization",
  "The Psychology of Decision Making",
  "Space Exploration Milestones",
];

interface SuggestedTopicsProps {
  onSelectTopic: (topic: string) => void;
}

const SuggestedTopics = ({ onSelectTopic }: SuggestedTopicsProps) => {
  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold mb-6 text-white">Discover More</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suggestedTopics.slice(0, 6).map((topic, index) => (
          <Card 
            key={index} 
            className="bg-[#181818] hover:bg-[#282828] transition-colors cursor-pointer border-none"
            onClick={() => onSelectTopic(topic)}
          >
            <CardHeader>
              <CardTitle className="text-base font-medium text-white">
                {topic}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Button 
                variant="outline" 
                className="border-neutral-700 text-sm font-medium text-white hover:bg-primary hover:text-primary-foreground"
              >
                Generate
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SuggestedTopics;

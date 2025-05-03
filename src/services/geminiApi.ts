
import { toast } from 'sonner';

const API_KEY = 'AIzaSyDp4LnBQXjpjzuiOs8TDC6q9VzR66oLI8E';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent';

export interface LearningTopic {
  title: string;
  content: string;
  duration?: string;
}

export async function generateContent(prompt: string): Promise<LearningTopic[]> {
  try {
    const systemPrompt = `
    You are an expert educational content creator who specializes in creating concise, engaging 5-minute audio lessons.
    
    For each topic provided, create:
    1. A clear, engaging title
    2. A well-structured script of approximately 600-700 words that would take about 5 minutes to narrate
    3. The content should be educational, engaging, and conversational in tone
    4. Include an intro, 3-4 key points with examples, and a quick summary
    
    Format each topic as a JSON object with fields:
    - title: A catchy, descriptive title for the topic
    - content: The full narration script (600-700 words)
    
    Return your response as a valid JSON array containing these topic objects.
    `;

    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: systemPrompt },
              { text: prompt }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API Error:", errorData);
      throw new Error(`Gemini API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const generatedText = data.candidates[0]?.content?.parts[0]?.text || '';
    
    // Extract JSON from the response - find everything between brackets [] including the brackets
    const jsonMatch = generatedText.match(/\[[\s\S]*\]/);
    
    if (!jsonMatch) {
      console.error("Could not extract JSON from response:", generatedText);
      throw new Error("Failed to parse generated content");
    }
    
    const cleanedJson = jsonMatch[0].replace(/```json|```/g, '').trim();
    const topics: LearningTopic[] = JSON.parse(cleanedJson);
    
    return topics;
  } catch (error) {
    console.error("Error generating content:", error);
    toast.error("Failed to generate content. Please try again.");
    return [];
  }
}

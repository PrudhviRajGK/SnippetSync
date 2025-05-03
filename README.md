# 🎧 Listen-Learn-Evolve

A web-based AI product that generates personalized 5-minute educational audio snippets based on user prompts, interests, or time constraints.

![Spotify for Learning](https://via.placeholder.com/800x400)

## 📌 Overview

Spotify for Learning is an innovative educational platform that combines the personalized experience of Spotify with the educational value of Khan Academy and the intelligence of ChatGPT. The platform generates custom, bite-sized audio learning modules based on user interests or available time, making learning accessible and convenient in our busy lives.

## 🎯 Core Features

### 1. Personalized Learning Generator
- Input a list of topics or general theme (e.g., "I have 20 mins, teach me something")
- AI-generated concise explanations (~600-700 words)
- On-screen structured script display with title and key points
- 5-minute audio snippets converted using ElevenLabs

### 2. Playlist Creation & Playback
- Interactive playlist UI with standard controls (play, pause, skip)
- Named topics with "Now Playing" visualization
- Download options for full playlists or individual MP3s

### 3. Curiosity-Driven Suggestions
- AI-powered topic recommendations based on:
  - Previous user prompts
  - Trending topics
  - Learning patterns
- One-click add to queue functionality

### 4. Intuitive User Interface
- One-step input interface for complex requests
- Beautiful, clean playlist display
- Mobile-friendly responsive design

### 5. Advanced Features (Optional)
- User archives for snippet history
- Search functionality for revisiting content
- Spotify private feed integration
- Downloadable playlists

## 🔧 Tech Stack

### Frontend
- React with TypeScript for type-safe components
- Tailwind CSS for styling
- Vite as the build tool and development server
- Bun as the package manager

### APIs
- Text Generation: Google Gemini API
  - API Key: AIzaSyDp4LnBQXjpjzuiOs8TDC6q9VzR66oLI8E
- Text-to-Speech: ElevenLabs API
  - API Key: sk_913e12139dd032b0613c84a9d2cafa1fca46f67f32fa2438

## 🚀 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/listen-learn-evolve.git
cd listen-learn-evolve-main
```

2. Install dependencies:
```bash
# Using npm
npm install

# Or using Bun
bun install
```

3. Set up environment variables:
```bash
# Create a .env file in the project root
VITE_GEMINI_API_KEY=AIzaSyDp4LnBQXjpjzuiOs8TDC6q9VzR66oLI8E
VITE_ELEVENLABS_API_KEY=sk_913e12139dd032b0613c84a9d2cafa1fca46f67f32fa2438
```

4. Start the development server:
```bash
# Using npm
npm run dev

# Or using Bun
bun run dev
```

5. Build for production:
```bash
# Using npm
npm run build

# Or using Bun
bun run build
```

## 📁 Project Structure

Based on your current project structure:

```
SnippetSync/
│
├── src/                      # Source files
│   ├── services/             # API services
│   │   ├── elevenLabsApi.ts  # ElevenLabs API integration
│   │   └── geminiApi.ts      # Gemini API integration
│   ├── App.tsx               # Main React component
│   ├── App.css               # Component styling
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles
│
├── .gitignore                # Git ignore file
├── bun.lockb                 # Bun lock file
├── components.json           # Components configuration
├── eslint.config.js          # ESLint configuration
├── index.html                # HTML entry point
├── package-lock.json         # NPM lock file
├── package.json              # Package dependencies
├── postcss.config.js         # PostCSS configuration
├── README.md                 # Project documentation
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.app.json         # TypeScript configuration for app
├── tsconfig.json             # Main TypeScript configuration
├── tsconfig.node.json        # TypeScript node configuration
└── vite.config.ts            # Vite configuration
```

The project uses a modern frontend stack with:
- TypeScript for type safety
- React for UI components
- Tailwind CSS for styling
- Vite as the build tool
- API services for ElevenLabs and Gemini

## 🔌 API Service Implementation

### Gemini API Integration

The `geminiApi.ts` service should handle text generation with a structure like this:

```typescript
// src/services/geminiApi.ts
export interface GenerationOptions {
  prompt: string;
  timeConstraint?: number;
  topicCount?: number;
}

export interface GeneratedContent {
  title: string;
  transcript: string;
  keyPoints: string[];
  duration: number;
}

export async function generateLearningContent(options: GenerationOptions): Promise<GeneratedContent[]> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  // Format the prompt based on user input
  const formattedPrompt = formatLearningPrompt(options.prompt, options.timeConstraint);
  
  // Call Gemini API
  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: formattedPrompt }] }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
        }
      })
    });
    
    // Process and parse response
    return processGeminiResponse(await response.json());
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error('Failed to generate learning content');
  }
}
```

### ElevenLabs API Integration

The `elevenLabsApi.ts` service should handle text-to-speech conversion:

```typescript
// src/services/elevenLabsApi.ts
export interface TextToSpeechOptions {
  text: string;
  voiceId?: string;
}

export async function generateSpeech(options: TextToSpeechOptions): Promise<string> {
  const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;
  const voiceId = options.voiceId || 'pNInz6obpgDQGcFmaJgB'; // Default voice ID
  
  try {
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': apiKey
      },
      body: JSON.stringify({
        text: options.text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5
        }
      })
    });
    
    // Convert response to blob and create URL
    const audioBlob = await response.blob();
    return URL.createObjectURL(audioBlob);
  } catch (error) {
    console.error('Error calling ElevenLabs API:', error);
    throw new Error('Failed to generate speech');
  }
}
```

## 💡 Implementation Guide

### Phase 1: Core API Integration

1. Complete the `geminiApi.ts` service for text generation:
   - Implement prompt engineering for educational content
   - Handle topic parsing and structuring
   - Manage API rate limits and error handling

2. Enhance the `elevenLabsApi.ts` service for TTS:
   - Implement voice selection functionality
   - Handle audio streaming and caching
   - Optimize for performance and quality

### Phase 2: Frontend Components

1. Develop input component for user prompts:
   - Create an intuitive prompt interface
   - Add topic/time constraint options
   - Implement loading states

2. Design and implement playlist UI:
   - Create card components for audio snippets
   - Build audio player with playback controls
   - Design responsive layout for all devices

3. Implement state management:
   - Set up global state for user preferences
   - Manage playlist and playback state
   - Cache generated content locally

### Phase 3: Advanced Features

1. Add user experience enhancements:
   - Implement history and favorites functionality
   - Create recommendation engine
   - Add download and sharing capabilities

2. Optimize performance:
   - Implement progressive loading
   - Add audio caching
   - Optimize API calls

## 🎨 UI Design Guidelines

### Color Palette
- Primary: #1DB954 (Spotify Green)
- Secondary: #191414 (Dark Background)
- Text: #FFFFFF (White)
- Accents: #1ED760 (Bright Green)

### Typography
- Headings: Circular, Helvetica Neue, Arial
- Body: Circular, Helvetica Neue, Arial
- Weights: Regular (400), Medium (500), Bold (700)

### Component Style
- Card-based layout for playlist items
- Rounded corners (8px radius)
- Subtle shadows for depth
- Minimalist icons and controls

## 📈 Future Enhancements

- Spotify integration for direct playlist export
- Voice customization options
- Collaborative learning playlists
- Subscription model for premium features
- Mobile app versions

## 📄 License

MIT

---

Made with ❤️ for lifelong learners


import { toast } from 'sonner';

const API_KEY = 'sk_91b5d5431825a1d48250fb27438bf6db8851e8f150f7d029';
const API_URL = 'https://api.elevenlabs.io/v1';

// Voice IDs - using a popular voice from ElevenLabs
const VOICE_IDS = {
  female: 'EXAVITQu4vr4xnSDxMaL',  // Sarah
  male: 'onwK4e9ZLuTAKqWW03F9'     // Daniel
};

export async function generateSpeech(text: string, voiceId = VOICE_IDS.male): Promise<string> {
  try {
    const response = await fetch(`${API_URL}/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'xi-api-key': API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        }
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("ElevenLabs API Error:", error);
      throw new Error(`ElevenLabs API error: ${error || 'Unknown error'}`);
    }

    const audioBlob = await response.blob();
    return URL.createObjectURL(audioBlob);
  } catch (error) {
    console.error("Error generating speech:", error);
    toast.error("Failed to generate audio. Please try again.");
    return '';
  }
}

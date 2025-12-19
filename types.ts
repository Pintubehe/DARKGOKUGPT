
export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
  grounding?: GroundingMetadata;
  timestamp: Date | string; // Allow string for JSON serialization
  attachment?: {
    mimeType: string;
    data: string; // Base64
    type: 'image' | 'file';
  };
}

export interface GroundingMetadata {
  searchEntryPoint?: {
    renderedContent: string;
  };
  groundingChunks?: GroundingChunk[];
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
  maps?: {
    uri: string;
    title: string;
    placeId?: string;
    source?: string; // For map review snippets etc.
  };
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  lastModified: number;
}

export type AppMode = 'CHAT' | 'VOICE';

// --- NEW ADMIN TYPES ---

export interface LicenseKey {
  key: string;
  durationLabel: string;
  expiresAt: number | 'LIFETIME';
  isUsed: boolean;
  generatedAt: number;
}

export interface SurveillanceLog {
  id: string;
  ip: string;
  action: string;
  details: string; // Cookies, User Agent, etc.
  timestamp: number;
}

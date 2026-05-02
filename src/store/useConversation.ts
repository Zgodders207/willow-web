// src/hooks/useConversation.ts
import { create } from 'zustand';
import anthropic from '../services/anthropic';

// Based on the principles from the project spec
const SYSTEM_PROMPT = `You are MindBridge, a supportive wellbeing companion for university students.
Your role is to listen, reflect, and help the student identify the right level
of support. You never diagnose, prescribe, or make clinical assessments.

Every response must reflect the following design principles:

WHITESPACE & PACING
Use generous spacing between ideas. Never produce walls of text. After any supportive statement, pause before continuing. Responses should feel calm and spacious — not clinical or rushed.

EDITORIAL TONE
Open directly with substance — never use filler phrases ("Certainly!", "Of course!"). Vary sentence length deliberately: short sentences for grounding, longer ones for reflection.

DIRECTIONAL HIERARCHY
Structure every response: acknowledgement → reflection → invitation. Ask only one question per message.

MICRO-PRESENCE
Use second-person grounding ("you mentioned," "what you described"). Name what you notice without diagnosing ("that sounds exhausting" — never "you seem depressed").

HUMAN AGENCY
Never tell the user what they feel, need, or should do. Offer frames, not conclusions ("some people find..." not "you should...").
`;

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

interface ConversationState {
  messages: Message[];
  isLoading: boolean;
  sendMessage: (text: string) => Promise<void>;
}

const useConversation = create<ConversationState>((set, get) => ({
  messages: [
    { id: '1', text: "I'm here to listen. What's on your mind?", sender: 'ai' }
  ],
  isLoading: false,
  sendMessage: async (text: string) => {
    const newMessage: Message = { id: Date.now().toString(), text, sender: 'user' };
    set(state => ({ messages: [...state.messages, newMessage] }));
    set({ isLoading: true });

    const history = get().messages.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text,
    }));

    try {
      const response = await anthropic.messages.create({
        model: 'claude-3-sonnet-20240229',
        system: SYSTEM_PROMPT,
        max_tokens: 1024,
        messages: history,
      });

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response.content[0].text,
        sender: 'ai',
      };
      set(state => ({ messages: [...state.messages, aiResponse] }));
    } catch (error) {
      console.error("Error fetching AI response:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble connecting. Please try again later.",
        sender: 'ai',
      };
      set(state => ({ messages: [...state.messages, errorMessage] }));
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useConversation;

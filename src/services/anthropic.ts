// src/services/anthropic.ts
import { Anthropic } from '@anthropic-ai/sdk';

const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;

if (!apiKey) {
  throw new Error("VITE_ANTHROPIC_API_KEY is not set in the environment.");
}

const anthropic = new Anthropic({
  apiKey,
});

export default anthropic;

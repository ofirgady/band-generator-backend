import OpenAI from "openai";
import dotenv from 'dotenv';
import { loggerService } from '../services/logger.service.js';

dotenv.config();

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

loggerService.info('OpenAI configured with API key');



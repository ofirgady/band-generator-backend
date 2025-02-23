import {openai} from '../config/openaiConfig.js';
import { loggerService } from '../services/logger.service.js';

export const generateMeta = async (req, res) => {
    try {
        const {title} = req.body;
        const description = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                {
                    role: "user",
                    content: `Generate meta description for YouTube video titled "${title}"`,
                },
            ],
            max_tokens: 100,
        });
        loggerService.info('Meta description generated', description);
        res.status(200).json({
            description: description.choices[0].message
        });
    } catch (error) {
        loggerService.error('Error generating meta description', error);
        res.status(500).json({ error: 'Failed to generate meta description' });
    }
};

export const generateImage = async (req, res) => {
    try {
        const image = await openai.images.generate({
            model: "dall-e-3",
            prompt: req.body.prompt,
            size: "1024x1024",
            quality: "standard",
            n: 1
        });
        loggerService.info('Image generated', image);
        res.status(200).json({
            url: image.data[0].url
        });
    } catch (error) {
        loggerService.error('Error generating image', error);
        res.status(500).json({ error: 'Failed to generate image' });
    }
};



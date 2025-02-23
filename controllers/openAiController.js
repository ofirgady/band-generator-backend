import { openai } from '../config/openaiConfig.js';
import { loggerService } from '../services/logger.service.js';
import fs from 'fs';
import path from 'path';
import { openAiService } from '../services/openAi.service.js';

const dataFilePath = path.resolve('data/data.json');

const saveData = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

const loadData = () => {
    if (fs.existsSync(dataFilePath)) {
        const rawData = fs.readFileSync(dataFilePath);
        return JSON.parse(rawData);
    }
    return { metaDescriptions: [], images: [] };
};

export const generateMeta = async (req, res) => {
    try {
        const { title } = req.body;
        const { description, _id, created_at } = await openAiService.createMetaDescription(title);

        res.status(200).json({
            description,
            _id,
            created_at
        });

    } catch (error) {
        res.status(500).json({ error: 'Failed to generate meta description' });
    }
};

export const generateImage = async (req, res) => {
    try {
        const { prompt } = req.body;
        const { imageUrl, _id, created_at } = await openAiService.createImage(prompt);

        res.status(200).json({
            url: imageUrl,
            _id,
            created_at
        });

    } catch (error) {
        res.status(500).json({ error: 'Failed to generate image' });
    }
};



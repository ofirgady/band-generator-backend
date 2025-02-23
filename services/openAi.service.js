import { openai } from '../config/openaiConfig.js';
import { loggerService } from './logger.service.js';
import { utilService } from './util.service.js';

const dataFilePath = './data/data.json';

export const openAiService = {
    createMetaDescription,
    createImage,
    getData,
    saveData
};

async function createMetaDescription(title) {
    try {
        const { choices } = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: `Generate meta description for YouTube video titled "${title}"` },
            ],
            max_tokens: 100,
        });

        const metaDescription = choices[0].message;
        const data = utilService.readJsonFile(dataFilePath);

        const newMetaDescription = {
            _id: utilService.makeId(),
            title,
            description: metaDescription,
            created_at: new Date().toISOString()
        };

        data.metaDescriptions.push(newMetaDescription);
        await utilService.writeJsonFile(dataFilePath, data);

        loggerService.info('Meta description generated', newMetaDescription);

        return newMetaDescription;

    } catch (error) {
        loggerService.error('Error generating meta description', error);
        throw new Error('Failed to generate meta description');
    }
}

async function createImage(prompt) {
    try {
        const { data: [{ url: imageUrl }] } = await openai.images.generate({
            model: "dall-e-3",
            prompt,
            size: "1024x1024",
            quality: "standard",
            n: 1
        });

        const data = utilService.readJsonFile(dataFilePath);

        const newImage = {
            _id: utilService.makeId(),
            prompt,
            imageUrl,
            created_at: new Date().toISOString()
        };

        data.images.push(newImage);
        await utilService.writeJsonFile(dataFilePath, data);

        loggerService.info('Image generated', newImage);
        
        return newImage;

    } catch (error) {
        loggerService.error('Error generating image', error);
        throw new Error('Failed to generate image');
    }
}

function getData() {
    return utilService.readJsonFile(dataFilePath);
}

function saveData(data) {
    return utilService.writeJsonFile(dataFilePath, data);
}

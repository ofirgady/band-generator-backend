import { openai } from '../config/openaiConfig.js'
import { loggerService } from './logger.service.js'
import { utilService } from './util.service.js'

const dataFilePath = './data/data.json'

export const openAiService = {
	createMetaDescription,
	createImage,
	getData,
	saveData,
}

// Create meta description
async function createMetaDescription(name, description, year) {
	try {
		const bandName = description.split(',')[0]
		const { choices } = await openai.chat.completions.create({
			model: 'gpt-4o-mini',
			messages: [
				{ role: 'system', content: `You are a helpful assistant for the user ${name}.` },
				{
					role: 'user',
					content: `Produce two paragraphs of text describing what happened during the year ${year} for the band ${bandName}. Incorporate the user's explanation of why they like this band: \n ${description}`,
				},
			],
			max_tokens: 200,
		})

		const metaDescription = choices[0].message.content
		const data = utilService.readJsonFile(dataFilePath)

		const newMetaDescription = {
			_id: utilService.makeId(),
			name,
			text: metaDescription,
			year,
			created_at: new Date().toISOString(),
		}

		data.metaDescriptions.push(newMetaDescription)
		await utilService.writeJsonFile(dataFilePath, data)

		loggerService.info('Meta description generated', newMetaDescription)
		return newMetaDescription
	} catch (error) {
		loggerService.error('Error generating meta description', error)
		throw new Error('Failed to generate meta description')
	}
}

// Create image
async function createImage(name, description, year) {
	try {
		const bandName = description.split(',')[0]
		const prompt = `Create a stylized fan-art illustration reminiscent of the band ${bandName}, performing live on stage in the year ${year}. Emphasize an energetic punk/rock atmosphere with era-appropriate clothing and instruments. Make it clear they are a legendary band in their prime.`
		const {
			data: [{ url: imageUrl }],
		} = await openai.images.generate({
			model: 'dall-e-3',
			prompt,
			size: '1024x1024',
			quality: 'standard',
			n: 1,
		})

		const data = utilService.readJsonFile(dataFilePath)

		const newImage = {
			_id: utilService.makeId(),
			prompt,
			imageUrl,
			year,
			created_at: new Date().toISOString(),
		}

		data.images.push(newImage)
		await utilService.writeJsonFile(dataFilePath, data)

		loggerService.info('Image generated', newImage)
		return newImage
	} catch (error) {
		loggerService.error('Error generating image', error)
		throw new Error('Failed to generate image')
	}
}

// Get data from JSON file
function getData() {
	return utilService.readJsonFile(dataFilePath)
}

// Save data to JSON file
function saveData(data) {
	return utilService.writeJsonFile(dataFilePath, data)
}

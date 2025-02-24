import { openAiService } from '../services/openAi.service.js'

// Generate meta description
export const generateMeta = async (req, res) => {
	try {
		const { name, description, year } = req.body
		const { _id, text, created_at } = await openAiService.createMetaDescription(
			name,
			description,
			year
		)

		res.status(200).json({
			_id,
			text,
			created_at,
		})
	} catch (error) {
		res.status(500).json({ error: `Failed to generate meta description: ${error.message}` })
	}
}

// Generate image
export const generateImage = async (req, res) => {
	try {
		const { name, description, year } = req.body
		const { _id, imageUrl, created_at } = await openAiService.createImage(name, description, year)

		res.status(200).json({
			_id,
			imageUrl,
			created_at,
		})
	} catch (error) {
		res.status(500).json({ error: `Failed to generate image: ${error.message}` })
	}
}

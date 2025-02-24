import fs from 'fs'
import http from 'http'
import https from 'https'

export const utilService = {
	readJsonFile,
	download,
	httpGet,
	makeId,
	writeJsonFile,
}

// Read JSON file
function readJsonFile(path) {
	const str = fs.readFileSync(path, 'utf8')
	return JSON.parse(str)
}

// Download file from URL
function download(url, fileName) {
	return new Promise((resolve, reject) => {
		const file = fs.createWriteStream(fileName)
		https.get(url, (content) => {
			content.pipe(file)
			file.on('error', reject)
			file.on('finish', () => {
				file.close()
				resolve()
			})
		})
	})
}

// Write JSON data to file
function writeJsonFile(path, data) {
	const json = JSON.stringify(data, null, 4)
	return new Promise((resolve, reject) => {
		fs.writeFile(path, json, (err) => {
			if (err) reject(err)
			resolve()
		})
	})
}

// HTTP GET request
function httpGet(url) {
	const protocol = url.startsWith('https') ? https : http
	return new Promise((resolve, reject) => {
		const req = protocol.request(url, { method: 'GET' }, (res) => {
			let data = ''
			res.on('data', (chunk) => {
				data += chunk
			})
			res.on('end', () => {
				resolve(data)
			})
		})
		req.on('error', (err) => {
			reject(err)
		})
		req.end()
	})
}

// Generate a random ID
function makeId(length = 5) {
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	return Array.from({ length }, () =>
		possible.charAt(Math.floor(Math.random() * possible.length))
	).join('')
}

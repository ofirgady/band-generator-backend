import fs from 'fs'

export const loggerService = {
	debug(...args) {
		log('DEBUG', ...args)
	},
	info(...args) {
		log('INFO', ...args)
	},
	warn(...args) {
		log('WARN', ...args)
	},
	error(...args) {
		log('ERROR', ...args)
	},
}

const logsDir = './logs'
if (!fs.existsSync(logsDir)) {
	fs.mkdirSync(logsDir)
}

// Get current time
function getTime() {
	return new Date().toLocaleString('he')
}

// Check if argument is an error
function isError(e) {
	return e && e.stack && e.message
}

// Log message to console and file
function log(level, ...args) {
	const strs = args.map((arg) =>
		typeof arg === 'string' || isError(arg) ? arg : JSON.stringify(arg)
	)
	const line = `${getTime()} - ${level} - ${strs.join(' | ')}\n`
	console.log(line)
	fs.appendFile('./logs/backend.log', line, (err) => {
		if (err) console.log('FATAL: cannot write to log file')
	})
}

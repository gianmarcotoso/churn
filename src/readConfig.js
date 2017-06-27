const path = require('path')
const fs = require('fs')
const DEFAULT_CONFIG = 'churnfile.js'

module.exports = fileName => {
	fileName = fileName || DEFAULT_CONFIG

	const configPath = path.resolve(fileName)
	if (!fs.existsSync(configPath)) {
		throw new Error(`Specified configuration file was not found: ${configPath}`)
	}

	return require(configPath)
}

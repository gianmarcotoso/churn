const fs = require('fs')

module.exports = (folders, name) => {
	return folders.reduce((found, next) => {
		if (found !== false) {
			return found
		}

		if (!fs.existsSync(next)) {
			throw new Error(`Folder ${next} does not exist!`)
		}

		if (!fs.lstatSync(next).isDirectory()) {
			throw new Error(`${next} is not a directory!`)
		}

		const contents = fs.readdirSync(next)
		return contents.includes(name) ? next : false
	}, false)
}

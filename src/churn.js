const mkdirp = require('mkdirp')
const fs = require('fs')
const path = require('path')

const VARIABLES_FILE = '.variables'

const churn = (variables, fullPath, output) => {
	mkdirp.sync(output)

	const files = fs.readdirSync(fullPath)
	files.forEach(element => {
		if (element === VARIABLES_FILE) return

		const filePath = path.join(fullPath, element)
		if (fs.lstatSync(filePath).isDirectory()) {
			let subfolder = element
			Object.keys(variables).forEach(key => {
				subfolder = subfolder.replace(new RegExp(`%${key}%`, 'g'), variables[key])
			})

			return churn(variables, filePath, path.join(output, subfolder))
		}

		let content = fs.readFileSync(path.join(fullPath, element), { encoding: 'utf8' })
		let fileName = element.replace('.tpl', '')

		Object.keys(variables).forEach(key => {
			content = content.replace(new RegExp(`%${key}%`, 'g'), variables[key])
			fileName = fileName.replace(new RegExp(`%${key}%`, 'g'), variables[key])
		})

		fs.writeFileSync(path.join(output, fileName), content)
	})
}

module.exports = churn

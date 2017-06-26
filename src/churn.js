const fs = require('fs')
const path = require('path')

const churn = (variables, fullPath, output) => {
	fs.mkdirSync(output)

	const files = fs.readdirSync(fullPath)
	files.forEach(element => {
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

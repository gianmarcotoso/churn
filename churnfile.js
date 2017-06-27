const path = require('path')

module.exports = {
	variables: {
		TEST_VARIABLE: 'hello',
		CREATION_DATE: () => new Date(),
		HAPPY_NAME: name => `${name} :)`
	},
	templates: [path.join(__dirname, 'example_templates')],
	output: path.join(__dirname, 'out')
}

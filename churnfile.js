const path = require('path')

module.exports = {
	variables: {
		TEST_VARIABLE: 'hello'
	},
	templates: [path.join(__dirname, 'templates')],
	output: path.join(__dirname, 'out')
}

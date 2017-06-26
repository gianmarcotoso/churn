const fs = require('fs')
const path = require('path')
const pluralize = require('pluralize')
const camel = require('uppercamelcase')
const { toLower, toUpper } = require('ramda')

const churn = require('./churn')

module.exports = {
	name: 'churn',
	description: 'Generates stuff',
	usage: '[options]',
	options: [
		{
			command: '--template <template>',
			description: 'The template directory to use'
		},
		{
			command: '--output <output>',
			description: 'The output directory'
		}
	],
	func: (args, config, options) => {
		const name = args[0]
		const { template, output } = options

		const fullPath = path.join(__dirname, '..', 'templates', template)
		const variables = {
			NAME: toLower(name),
			UPPER_NAME: toUpper(name),
			NAME_PLURAL: pluralize.plural(name),
			UPPER_NAME_PLURAL: toUpper(pluralize.plural(name)),
			CAMEL_NAME: camel(name),
			CAMEL_NAME_PLURAL: camel(pluralize.plural(name))
		}

		churn(variables, fullPath, output)

		console.log('Done!')
	}
}

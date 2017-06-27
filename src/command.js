const fs = require('fs')
const path = require('path')
const pluralize = require('pluralize')
const camel = require('uppercamelcase')
const { toLower, toUpper } = require('ramda')

const churn = require('./churn')
const readConfig = require('./readConfig')
const findTemplate = require('./findTemplate')

module.exports = {
	name: 'churn',
	description: 'Generates stuff',
	usage: '[options] name',
	options: [
		{
			command: '--template <template>',
			description: 'The template directory to use. If not specified, churn will try to use the name.'
		},
		{
			command: '--output <output>',
			description: 'The output directory'
		},
		{
			command: '--config <config>',
			description: '(Optional) Explcitly specificy the configuration file to use instead of churnfile.js'
		}
	],
	func: (args, options) => {
		const name = args[0]
		const { config } = options
		const template = options.template || name

		if (!template) {
			throw new Error('No template specified!')
		}

		const churnfile = readConfig(config)
		if (!churnfile.templates) {
			throw new Error('No templates directory specified!')
		}

		const folder = findTemplate(churnfile.templates, template)
		if (!folder) {
			throw new Error(
				`Template ${template} was not found in any of the specified templates directories!`,
				churnfile
			)
		}
		const fullPath = path.join(folder, template)

		const variables = Object.assign(
			{
				NAME: toLower(name),
				UPPER_NAME: toUpper(name),
				NAME_PLURAL: pluralize.plural(name),
				UPPER_NAME_PLURAL: toUpper(pluralize.plural(name)),
				CAMEL_NAME: camel(name),
				CAMEL_NAME_PLURAL: camel(pluralize.plural(name))
			},
			churnfile.variables || {}
		)

		const output = options.output || churnfile.output
		churn(variables, fullPath, path.join(output, name))

		console.log('Done!')
	}
}

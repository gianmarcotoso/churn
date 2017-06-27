#!/usr/bin/env node

const program = require('commander')
const command = require('./command')

program.usage(command.usage).description(command.description).action(function runAction() {
	command.func(arguments, this.opts())
})
;(command.options || [])
	.forEach(opt => program.option(opt.command, opt.description, opt.parse || (value => value), opt.default))

program.parse(process.argv)

const options = program.opts()

if (!Object.keys(options).length) {
	program.help()
}

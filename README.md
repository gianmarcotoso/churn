# Churn

Generate files and folders from a template. Let it do the boring stuff for you.

## !! WARNING !!

This is barely a pre-alpha. It's literally something that I threw together in half an hour. Do feel free to contribute!

Currently unimplemented features:

- Tests
- Parallel file/folder processing (currently everything is synchronous)
- Symlink handling
- Many other things

## Why

Because I'm tired of having to copypaste trivial code

## How

First, create a file named `churnfile.js` (or you can name it something different and pass it with the `--config` 
option) like this:

```
const path = require('path')

module.exports = {
	variables: {
		TEST_VARIABLE: 'hello',
		CREATION_DATE: () => new Date(),
		NAME_VARIATION: name => `${name}-san`
	},
	templates: [path.join(__dirname, 'templates')],
	output: path.join(__dirname, 'out')
}
```

You can specify your variables and you **must** specify at least one template path within the `templates` array. The
output option allows you to specify where you want the output to be saved, but you can also set it when calling `churn` 
by using the `--output` option.

The complete command call is this:

`./src/cli.js --config <config_name> --template <template_name> --output <wherever> lowercase-name-of-the-thing`

A simple example that uses the default `churnfile.js` is the following

`./src/cli.js --template component progress-bar`

You can omit the `--template` option. In that case, `churn` will look for a template with the same name of what you are
trying to create. This is not recommended.

You can add it to you project by running `npm install churnjs` ( `churn` was already taken :( ), adding a churnfile and some templates and then alias some `npm` scripts in your `package.json`:

```
{
	//...
	scripts: {
		"make:component": "churnjs --template component --output src/components"
	},
	//...
}
```

You can then call `npm run make:component MyComponent` and be happy!

## Templates

Templates are directories with files in them. They can also have other directories with other files, as deep as your
heart desires. The content of a file will be replicated, with variables replaced. Variables can also be used in a file
or a directory's name, check out the example templates within the `example_templates` directory. 

Variables are enclosed between `%` symbols, and these are defined by default:

```
NAME: toLower(name),									// hellofriend
UPPER_NAME: toUpper(name),								// HELLOFRIEND
NAME_PLURAL: toLower(pluralize.plural(name)),			// hellofriends
UPPER_NAME_PLURAL: toUpper(pluralize.plural(name)),		// HELLOFRIENDS
CAMEL_NAME: camel(name),								// HelloFriend
CAMEL_NAME_PLURAL: camel(pluralize.plural(name))		// HelloFriends
```

where `name` is the one you pass from the command line. All the above variables can be overridden within the churnfile,
and new ones can be defined within its `variables` key. You can use either immediate values or functions to define them,
with the function variant always receiving the `name` as its first and only argument.

The `.tpl` extension is optional, it will be stripped away if present. Use it if your editor screams at you for using 
`%VARIABLES%`, knowing that you'll probably lose syntax highlighting.

## Contribute

Yes, please!

## Acknowledgements

[React Native Create Library](https://github.com/frostney/react-native-create-library) has a way of handling the command
definition that I liked, so I used that. Thank you [@frostney](https://github.com/frostney)!

## License

MIT 

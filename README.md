# Churn

Generate files and folders from a template. Let it do the boring stuff for you.

## !! WARNING !!

This is barely a pre-alpha. It's literally something that I threw together in half an hour. Do feel free to contribute!

Currently unimplemented features:

- Tests
- Parallel file/folder processing (currently everything is synchronous)
- Custom variable definition (command line? function in a custom config file? magic?)
- Custom template folder (we can't really ship templates with the repo)
- Symlink handling
- Many other things

## Why

Because I'm tired of having to copypaste trivial code

## How

`./src/cli.js --template <template_name> --output <wherever> lowercase-name-of-the-thing`

For example

`./src/cli.js --template component --output results/ProgressBar progress-bar`

## Templates

Templates are directories with files in them. They can also have other directories with other files, as deep as your
heart desires. The content of a file will be replicated, with variables replaced. Variables can also be used in a file
or a directory's name, check out the `redux` and `component` example templates. 

Variables are enclosed between `%` symbols, and you can currently use these:

```
NAME: toLower(name),
UPPER_NAME: toUpper(name),
NAME_PLURAL: pluralize.plural(name),
UPPER_NAME_PLURAL: toUpper(pluralize.plural(name)),
CAMEL_NAME: camel(name),
CAMEL_NAME_PLURAL: camel(pluralize.plural(name))
```

where `name` is the one you pass from the command line. 

The `.tpl` extension is optional, it will be stripped away if present. Use it if your editor screams at you for using 
`%VARIABLES%`, knowing that you'll probably lose syntax highlighting.

## Contribute

Yes, please!

## Acknowledgements

[React Native Create Library](https://github.com/frostney/react-native-create-library) has a way of handling the command
definition that I liked, so I used that. Thank you [@frostney](https://github.com/frostney)!

## License

MIT 
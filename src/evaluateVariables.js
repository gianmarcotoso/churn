module.exports = (name, variables) => {
	return Object.keys(variables).reduce((result, next) => {
		const variable = typeof variables[next] === 'function' ? variables[next].call(undefined, name) : variables[next]

		return Object.assign({}, result, { [next]: variable })
	}, {})
}

import http from 'axios'

import {
	POPULATE_%UPPER_NAME_PLURAL%,
	ADD_%UPPER_NAME%,
	EDIT_%UPPER_NAME%,
	REMOVE_%UPPER_NAME%,
	SELECT_%UPPER_NAME%,
	DESELECT_%UPPER_NAME%
} from './Actions'

export function populate%CAMEL_NAME_PLURAL%(items) {
	return {
		type: POPULATE_%UPPER_NAME_PLURAL%,
		items
	}
}

export function add%CAMEL_NAME%(%NAME%) {
	return {
		type: ADD_%UPPER_NAME%,
		%NAME%
	}
} 

export function edit%CAMEL_NAME%(%NAME%) {
	return {
		type: EDIT_%UPPER_NAME%,
		%NAME%
	}
}

export function remove%CAMEL_NAME%(id) {
	return {
		type: REMOVE_%UPPER_NAME%,
		id
	}
}

export function select%CAMEL_NAME%(%NAME%) {
	return {
		type: SELECT_%UPPER_NAME%,
		%NAME%
	}
}

export function deselect%CAMEL_NAME%() {
	return {
		type: DESELECT_%UPPER_NAME%
	}
} 
 

export function get%CAMEL_NAME_PLURAL%() {
	return async dispatch => {
		const response = await http.get(`${config.server}/%NAME_PLURAL%`)
		
		return dispatch(populate%CAMEL_NAME_PLURAL%(response.data))
	}
}

export function get%CAMEL_NAME%(id) {
	return async dispatch => {
		const response = await http.get(`${config.server}/%NAME_PLURAL%/${id}`)

		return dispatch(select%CAMEL_NAME%(response.data))
	}
}

export function save%CAMEL_NAME%(data) {
	return async dispatch => {
		const response = await http.post(`${config.server}/%NAME_PLURAL%${data.id && `/${data.id}` || ''}`, data)

		if (!data.id) {
			dispatch(add%CAMEL_NAME%(response.data))
		} else {
			dispatch(edit%CAMEL_NAME%(response.data))
		}

		return response.data
	}
}

export function delete%CAMEL_NAME%(id) {
	return async dispatch => {
		const response = await http.delete(`${config.server}/%NAME_PLURAL%/${id}`)

		return dispatch(remove%CAMEL_NAME%(id))
	}
}
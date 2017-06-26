import { ReduceWith } from '@app/core'
import DefaultState from './DefaultState'
import {
	POPULATE_%UPPER_NAME_PLURAL%,
	ADD_%UPPER_NAME%,
	EDIT_%UPPER_NAME%,
	REMOVE_%UPPER_NAME%,
	SELECT_%UPPER_NAME%,
	DESELECT_%UPPER_NAME%
} from './Actions'

const mutators = {
	[POPULATE_%UPPER_NAME_PLURAL%]: {
		items: action => action.items
	},
	[ADD_%UPPER_NAME%]: {
		items: (action, state) => [...state.items, action.%NAME%]
	},
	[EDIT_%UPPER_NAME%]: {
		items: (action, state) => state.items.map(item => {
			if (item.id === action.%NAME%.id) {
				return {
					...item,
					...action.%NAME%
				}
			}

			return item
		})
	},
	[REMOVE_%UPPER_NAME%]: {
		items: (action, state) => state.items.filter(item => item.id !== action.id)
	},
	[SELECT_%UPPER_NAME%]: {
		selected: action => action.%NAME%
	},
	[DESELECT_%UPPER_NAME%]: {
		selected: false
	}
}

export default ReduceWith(mutators, DefaultState)
import {
REQUEST_SHIPMENTS,
REQUEST_SHIPMENTS_FAILED,
REQUEST_SHIPMENTS_SUCCESS
} from './constants'

let defaultState = {
	shipments: [],
	loading: false,
}

export const shipments = (state = defaultState, action) => {
	switch (action.type) {

		case REQUEST_SHIPMENTS:
			return {
				...state,
				loading: true
			}

		case REQUEST_SHIPMENTS_SUCCESS:
			return {
				...state,
				shipments: action.payload,
				loading: false
			}

		case REQUEST_SHIPMENTS_FAILED:
			return {
				...state,
				loading: false

			}
		default:
			return state;
	}
}


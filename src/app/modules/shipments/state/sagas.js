import { takeEvery, all, put } from 'redux-saga/effects'
import axios from 'axios'
import {
	REQUEST_SHIPMENTS_FAILED,
	REQUEST_SHIPMENTS,
	REQUEST_SHIPMENTS_SUCCESS
} from './constants'

const baseUrl = 'https://api.deezer.com/genre'
const proxyurl = "https://cors-anywhere.herokuapp.com/";

export function* getShipments(action) {
	// let genres = []
	// yield axios.get(`${proxyurl}${baseUrl}`).then(function (response) {

	// 	genres = response.data.data
	// }
	// ).catch(function (error) {
	// 	return error
	// });
	yield put({
		type: REQUEST_SHIPMENTS_SUCCESS,
		payload: []
	})
}

export default function* rootSaga() {
	yield all([
		takeEvery(REQUEST_SHIPMENTS, getShipments),
	]);
}

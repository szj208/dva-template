import { routerRedux } from 'dva/router';
import { getListapi } from '../services/api';

export default {
	namespace: 'basicTable',
	state: {
		basicList: {}
	},
	effects: {
		*getList({ payload }, { call, put }) {
			const { result, status } = yield call(getListapi,payload);
			if(!status){
				return false
			}
			yield put({
				type: 'changeList',
				payload: result,
			});
			return result
		},
	},
	reducers: {
		changeList(state, { payload }) {
			return {
				...state,
				basicList: payload,
			};
		},
	},
};

import { routerRedux } from 'dva/router';
import { authorityapi, logoutapi } from '../services/api';

export default {
	namespace: 'authority',
	state: {
		visit:[],
		status: undefined,
		username: ''
	},
	effects: {
		*authority({ payload }, { call, put }) {
			const { user, success } = yield call(authorityapi);
			if(!success){
				yield put(routerRedux.push('/user/login'));
				return false
			}
			yield put({
				type: 'changevisitStatus',
				payload: user.permissions.visit,
			});
			yield put({
				type: 'changeUserName',
				payload: user.username,
			});
			return user
			// const response = yield call(authorityapi, payload);
			// // Login successfully
			// if (response.status === 'oksss') {
			//   yield put(routerRedux.push('/user/login'));
			// }
		},
		*logout({ payload }, { call, put }) {
			const { success } = yield call(logoutapi);
			if(success){
				yield put(routerRedux.push('/user/login'));
				return false
			}
		}
	},
	reducers: {
		changevisitStatus(state, { payload }) {
			return {
				...state,
				visit: payload,
			};
		},
		changeUserName(state, { payload }) {
			return {
				...state,
				username: payload,
			};
		},
		changetestStatus(state, { payload }) {
			return {
				...state,
				status: payload.status,
			};
		},
		changeLoginStatus(state, { payload }) {
			return {
				...state,
				status: payload.status,
			};
		},
	},
};

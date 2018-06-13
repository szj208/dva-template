import { routerRedux } from 'dva/router';
import { loginapi } from '../services/api';

export default {
  namespace: 'login',

  state: {
    status: undefined,
    test:0
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(loginapi, payload);
      // Login successfully
      if (response.status === 'ok') {
        localStorage.setItem('authority', payload.userName);
        yield put(routerRedux.push('/'));
      }
    },
    *test({ payload }, { call, put }) {
      yield put({
        type: 'changetestStatus',
        payload: 12,
      });
    },
    *logout(_, { put, select }) {
      // try {
      //   // get location pathname
      //   const urlParams = new URL(window.location.href);
      //   const pathname = yield select(state => state.routing.location.pathname);
      //   // add the parameters in the url
      //   urlParams.searchParams.set('redirect', pathname);
      //   window.history.replaceState(null, 'login', urlParams.href);
      // } finally {
      //   yield put({
      //     type: 'changeLoginStatus',
      //     payload: {
      //       status: false,
      //       currentAuthority: 'guest',
      //     },
      //   });
      //   yield put(routerRedux.push('/user/login'));
      // }
    },
  },

  reducers: {
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

export default {
    namespace: 'global',
  
    state: {
        tt:111,
        collapsed: false
    },
  
  
    effects: {
        *fetch({ payload }, { call, put }) {  // eslint-disable-line
            yield put({ type: 'save' });
        },
    },
  
    reducers: {
        changeLayoutCollapsed(state, { payload }) {
            return {
              ...state,
              collapsed: payload,
            };
        },
    },
  
  };
  
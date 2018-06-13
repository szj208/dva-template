import 'babel-polyfill';
import dva from 'dva';
// import createHistory from 'history/createBrowserHistory';
import './index.css';
import createLoading from 'dva-loading';

// 1. Initialize
const app = dva({
    // browser模式
    // history: createHistory()
});
// 2. Plugins
app.use(createLoading());
// app.use({});

// 3. Model
app.model(require('./models/global').default);
// app.model(require('./models/example').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');


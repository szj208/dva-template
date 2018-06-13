const qs = require('qs')
// import mockjs from 'mockjs';
import { format, delay } from 'roadhog-api-doc';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';
const adminUsers = {
    admin:{
        "permissions":{
            "visit":["01","02","0101","0102","010201","010202","0103","010301","010302"],
            "role":"guest"
        },
        "username":"guest",
        "id":1
    },
    guest:{
        "permissions":{
            "visit":["01","02","0101","0102","010201","0103","010301"],
            "role":"guest"
        },
        "username":"guest",
        "id":1
    },
    user:{
        "permissions":{
            "visit":["01","02","0101","0102","010202","0103","010301"],
            "role":"guest"
        },
        "username":"guest",
        "id":1
    },

}
// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
    'POST /login': (req, res) => {
        const { password, userName, type } = req.body;
        const now = new Date();
        now.setDate(now.getDate() + 1);
        res.cookie('token', JSON.stringify({ userName: userName, deadline: now.getTime()}), {
            maxAge: 900000,
            httpOnly: true,
          });
        if (password === '123456' && userName === 'admin') {
            res.send({
                status: 'ok',
                type,
                currentAuthority: 'admin',
            });
            return;
        }
        if (password === '123456' && userName === 'user') {
            res.send({
                status: 'ok',
                type,
                currentAuthority: 'user',
            });
            return;
        }
        if (password === 'guest' && userName === 'guest') {
            res.send({
                status: 'ok',
                type,
                currentAuthority: 'guest',
            });
            return;
        }
        res.send({
            status: 'error',
            data:req.body,
            currentAuthority: 'wrong',
        });
    },
    'GET /logout': (req, res) => {
        res.clearCookie('token');
        res.status(200).send({
            success:true
        });
    },
    'GET /authority': (req, res) => {
        // const { password, userName, type } = req.body;
        const cookie = req.headers.cookie || '';
        const cookies = qs.parse(cookie.replace(/\s/g, ''), { delimiter: ';' });
        const response = {};
        response.success = false;
        if (!cookies.token) {
            response.message = 'Not Login'
            res.status(200).send(response);
            return
        }
        const token = JSON.parse(cookies.token);
        if (token && !!adminUsers[token.userName]) {
            response.success = token.deadline > new Date().getTime()
        }
        if (response.success) {
            response.user = adminUsers[token.userName];
        }
        res.send(response);
    },
    
    'POST /getList': (req, res) => {
        const { page, length } = req.body;

        res.send({
            status: 1,
            result:{
                total:50,
                length:5,
                list:[{
                    key: page+'1',
                    name: 'John Brown' + page,
                    age: 32,
                    address: 'New York No. '+ ((page-1)*length+1) +' Lake Park',
                }, {
                    key: page+'2',
                    name: 'Jim Green' + page,
                    age: 42,
                    address: 'London No. '+ ((page-1)*length+2) +' Lake Park',
                }, {
                    key: page+'3',
                    name: 'Joe Black' + page,
                    age: 32,
                    address: 'Sidney No. '+ ((page-1)*length+3) +' Lake Park',
                }, {
                    key: page+'4',
                    name: 'Jim Green' + page,
                    age: 53,
                    address: 'London No. '+ ((page-1)*length+4) +' Lake Park',
                }, {
                    key: page+'5',
                    name: 'Joe Black' + page,
                    age: 33,
                    address: 'Sidney No. '+ ((page-1)*length+5) +' Lake Park',
                }]
            },
        });
        return;
    },

    // GET POST 可省略
    'GET /test': [{
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    }, {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    }, {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    }],
}

export default noProxy ? {} : delay(proxy, 1000);

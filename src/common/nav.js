import dynamic from 'dva/dynamic';

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => dynamic({
	app,
	models: () => models.map(m => import(`../models/${m}.js`)),
	component,
});

// nav data
export const getNavData = app => [
	{
		component: dynamicWrapper(app, ['authority'], () => import('../layouts/BasicLayout')),
		layout: 'BasicLayout',
		name: '首页', // for breadcrumb
		path: '/',
		children: [
			{
				name: '首页',
				icon: 'user',
				path: 'index',
				// key: 'index', 
				id:"0101",
				component: dynamicWrapper(app, [], () => import('../routes/index/IndexPage')),
			},
			{
				name: '表单',
				icon: 'form',
				path: 'form',
				layout: 'BasicLayout',
				id:"0102",
				children: [
					{
						name: '基础表单',
						icon: 'form',
						path: 'basicForm',
						id:"010201",
						component: dynamicWrapper(app, ['basicForm'], () => import('../routes/form/basicForm')),
					},
				],
			},
			{
				name: '表格',
				icon: 'ellipsis',
				path: 'table',
				layout: 'BasicLayout',
				id:"0103",
				children: [
					{
						name: '基础表格',
						icon: 'ellipsis',
						path: 'basicTable',
						id:"010301",
						component: dynamicWrapper(app, ['basicTable'], () => import('../routes/table/basicTable')),
					}, {
						name: 'demo2',
						icon: 'ellipsis',
						path: 'demo2',
						id:"010302",
						component: dynamicWrapper(app, [], () => import('../routes/demo/demo2')),
					},
				],
			},
			{
				name: 'tdemo',
				icon: 'ellipsis',
				path: 'tdemo',
				layout: 'BasicLayout',
				id:"0104",
				children: [
					{
						name: 'tdemo1',
						icon: 'ellipsis',
						path: 'tdemo1',
						id:"010401",
						component: dynamicWrapper(app, [], () => import('../routes/demo/demo1')),
					}, {
						name: 'tdemo2',
						icon: 'ellipsis',
						path: 'tdemo2',
						id:"010402",
						component: dynamicWrapper(app, [], () => import('../routes/demo/demo2')),
					},
				],
			},
		],
	},
	{
		component: dynamicWrapper(app, ['login'], () => import('../layouts/UserLayout')),
		path: '/user',
		layout: 'UserLayout',
		children: [
			{
				name: '帐户',
				icon: 'user',
				path: 'user',
				hideInMenu: true,
				children: [
					{
						name: '登录',
						path: 'login',
						component: dynamicWrapper(app, [], () => import('../routes/User/Login')),
					}
				],
			},
		],
	},
];
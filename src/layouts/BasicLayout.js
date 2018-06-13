import React, { PureComponent } from 'react';
import {renderToString} from 'react-dom/server'
import PropTypes from 'prop-types';
import { Layout, Menu, Icon, Spin } from 'antd';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { Link, Route, Switch, Redirect } from 'dva/router';
import { Header } from '../components/Layout';

// import moment from 'moment';
// import _ from 'lodash';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
// import Debounce from 'lodash-decorators/debounce';
import NotFound from '../routes/Exception/404';
import styles from './BasicLayout.less';
// import logo from '../assets/logo.svg';

const { Sider, Content } = Layout;
const { SubMenu } = Menu;

const query = {
	'screen-xs': {
		maxWidth: 575,
	},
	'screen-sm': {
		minWidth: 576,
		maxWidth: 767,
	},
	'screen-md': {
		minWidth: 768,
		maxWidth: 991,
	},
	'screen-lg': {
		minWidth: 992,
		maxWidth: 1199,
	},
	'screen-xl': {
		minWidth: 1200,
	},
};

@connect(({ authority, loading, global }) => ({
	authority,
	submitting:loading.effects['authority/authority'],
	collapsed:global.collapsed,
}))
export default class BasicLayout extends PureComponent {
	static childContextTypes = {
		location:PropTypes.object,
		breadcrumbNameMap:PropTypes.object,
	}
	constructor(props) {
		super(props);
		// 把一级 Layout 的 children 作为菜单项
		this.hasmenus = '';
		this.menus = props.navData.reduce((arr, current) => arr.concat(current.children), []);
		this.state = {
			visit:[],
			hasmenus:"",
			openKeys: this.getDefaultCollapsedSubMenus(props),
		};
		this.toggleCollapsed = this.toggleCollapsed.bind(this);
		// console.log(this);
	}
	componentWillMount() {
		
		// console.log(_.chunk(['a', 'b', 'c', 'd', 'e'], 2));
		this.props.dispatch({
			type: 'authority/authority'
		}).then((res)=>{
			if (!res)return
			const { visit } = res.permissions;
			this.setState({
				visit:visit,
			});
			this.setState({
				hasmenus: this.getNavMenuItems(this.menus),
			});
		});
		
		
	}
	getChildContext() {
		const { location, navData, getRouteData } = this.props;
		const routeData = getRouteData('BasicLayout');
		const firstMenuData = navData.reduce((arr, current) => arr.concat(current.children), []);
		const menuData = this.getMenuData(firstMenuData, '');
		const breadcrumbNameMap = {};

		routeData.concat(menuData).forEach((item) => {
			breadcrumbNameMap[item.path] = {
				name: item.name,
				component: item.component,
			};
		});
		return { location, breadcrumbNameMap };
	}
	getMenuData = (data, parentPath) => {
		let arr = [];
		data.forEach((item) => {
		  if (item.children) {
			arr.push({ path: `${parentPath}/${item.path}`, name: item.name });
			arr = arr.concat(this.getMenuData(item.children, `${parentPath}/${item.path}`));
		  }
		});
		return arr;
	  }
	getDefaultCollapsedSubMenus(props) {
		const currentMenuSelectedKeys = [...this.getCurrentMenuSelectedKeys(props)];
		currentMenuSelectedKeys.splice(-1, 1);

		if (currentMenuSelectedKeys.length === 0) {
			return ['index'];
		}
		return currentMenuSelectedKeys;
	}
	getCurrentMenuSelectedKeys(props) {
		const { location: { pathname } } = props || this.props;
		const keys = pathname.split('/').slice(1);
		if (keys.length === 1 && keys[0] === '') {
			return [this.menus[0].key];
		}
		return keys;
	}
	toggleCollapsed(){
		this.props.dispatch({
			type: 'global/changeLayoutCollapsed',
			payload:!this.props.collapsed
		})
	}
	getNavMenuItems(menusData, parentPath = '') {
		if (!menusData) {
			return [];
		}
		// console.log(this.state.visit);
		return menusData.map((item) => {
			
			if (!item.name || item.hideInMenu) {
				return null;
			}

			// 权限 根据nav中id判断
			if (!this.state.visit.some(id => id === item.id) ) {
				return null;
			}

			let itemPath;
			if (item.path.indexOf('http') === 0) {
				itemPath = item.path;
			} else {
				itemPath = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
			}
			if (item.children && item.children.some(child => child.name)) {
				return (
					<SubMenu
						title={
							item.icon ? (
								<span>
									<Icon type={item.icon} />
									<span>{item.name}</span>
								</span>
							) : item.name
						}
						key={item.key || item.path}
					>
						{this.getNavMenuItems(item.children, itemPath)}
					</SubMenu>
				);
			}
			const icon = item.icon && <Icon type={item.icon} />;
			return (
				<Menu.Item key={item.key || item.path}>
					{
						/^https?:\/\//.test(itemPath) ? (
							<a href={itemPath} target={item.target}>
								{icon}<span>{item.name}</span>
							</a>
						) : (
								<Link
									to={itemPath}
									target={item.target}
									replace={itemPath === this.props.location.pathname}
								>
									{icon}<span>{item.name}</span>
								</Link>
							)
					}
				</Menu.Item>
			);
		});
	}
	getPageTitle() {
		const { location, getRouteData } = this.props;
		const { pathname } = location;
		let title = 'Ant Design Pro';
		getRouteData('BasicLayout').forEach((item) => {
			if (item.path === pathname) {
				title = `${item.name} - Ant Design Pro`;
			}
		});
		return title;
	}
	handleOpenChange = (openKeys) => {
		const lastOpenKey = openKeys[openKeys.length - 1];
		const isMainMenu = this.menus.some(
			item => lastOpenKey && (item.key === lastOpenKey || item.path === lastOpenKey)
		);
		this.setState({
			// openKeys: [...openKeys],	// 不收起其他项
			openKeys: isMainMenu ? [lastOpenKey] : [...openKeys],
		});
	}
	
	render() {
		const { dispatch, getRouteData, authority, collapsed } = this.props;
		const rest = {
			navData:this.props.navData,
			location:this.props.location,
		}
		const headerProps = {
			toggleCollapsed:this.toggleCollapsed,
			collapsed,
			// toggleCollapsed:this.toggleCollapsed,
			// menu,
			userName:authority.username,
			// location,
			// siderFold,
			// isNavbar,
			// menuPopoverVisible,
			// navOpenKeys,
			// switchMenuPopover() {
			// 	dispatch({ type: 'app/switchMenuPopver' })
			// },
			logout() {
				dispatch({ type: 'authority/logout' })
			},
		}

		// Don't show popup menu when it is been collapsed
		const menuProps = collapsed ? {} : {
			openKeys: this.state.openKeys,
		}
		//   {
		// 	openKeys: this.state.openKeys
		// };
		const layout = (
			<Spin spinning={this.props.submitting} size="large" tip="加载中...">
				<Layout>
					<Sider
						trigger={null}
						breakpoint="md"
						collapsed={collapsed}
						width={256}
						className={styles.sider}
						collapsible
					>
						<div className={styles.logo}>
							<Link to="/">
								<h1>Ant Design Pro</h1>
							</Link>
						</div>
						<div>
							<Menu
								mode="inline"
								theme="dark"
								style={{ margin: '16px 0', width: '100%' }}
								{...menuProps}
								onOpenChange={this.handleOpenChange}
								selectedKeys={this.getCurrentMenuSelectedKeys()}
							>
								{/* {this.getNavMenuItems(this.menus)} */}
								{this.state.hasmenus}
							</Menu>
						</div>
					</Sider>
					<Layout className={(this.props.submitting?styles.hide:styles.show)}>
						<Header  {...headerProps} />
						<Content style={{ margin: '24px 24px 0', height: '100%' }}>
							<div style={{ minHeight: 'calc(100vh - 260px)' }}>
								<Switch>
									{
										getRouteData('BasicLayout').map(item =>{
											if (this.props.authority.visit.some(id => id === item.id)) {
												return <Route
													routerData={getRouteData('BasicLayout')}
													exact={item.exact}
													key={item.path}
													path={item.path}
													component={item.component}
												/>
											}
											return null
										})
									}
									<Redirect exact from="/" to="/index" />
									<Route component={NotFound} />
								</Switch>
							</div>
						</Content>
					</Layout>
				</Layout>
			</Spin>
		);

		return (
			<DocumentTitle title={this.getPageTitle()}>
				<ContainerQuery query={query}>
					{params => <div className={classNames(params)}>{layout}</div>}
				</ContainerQuery>
			</DocumentTitle>
		);
	}
}

// export default connect(state => ({
//   // currentUser: state.user.currentUser,
//   // collapsed: state.global.collapsed,
//   // fetchingNotices: state.global.fetchingNotices,
//   // notices: state.global.notices,
// }))(BasicLayout);

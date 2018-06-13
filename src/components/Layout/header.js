import React, { Component } from 'react';
import { Menu, Icon, Layout, Button } from 'antd'
import styles from './header.less'

const { SubMenu } = Menu
export default class FooterToolbar extends Component {

	render() {
		let handleClickMenu = e => e.key === 'logout' && logout()
		const { userName, logout, toggleCollapsed, collapsed } = this.props;
		return (
			<Layout.Header className={styles.header}>
				<div className={styles.extendBtn} onClick={toggleCollapsed} >
					<Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
				</div>
				<div className={styles.rightWarpper}>
					<Menu mode="horizontal" onClick={handleClickMenu}>
						<SubMenu
							style={{
							float: 'right',
							}}
							title={<span>
							<Icon type="user" />
								{userName}
							</span>}
						>
							<Menu.Item key="logout">
							退出登录
							</Menu.Item>
						</SubMenu>
					</Menu>
				</div>
			</Layout.Header>
		);
	}
}


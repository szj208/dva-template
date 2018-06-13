import React, { Component } from 'react';
// import { connect } from 'dva';
import { Breadcrumb } from "antd";
import PageHeaderLayout from "layouts/PageHeaderLayout.js";
import styles from './IndexPage.less';
// import request from '../utils/request.js';

// @connect(({  }) => ({

// }))
export default class IndexPage extends Component {
	constructor(props){
		super(props)
		console.log(this);
	}
	componentDidMount(nextProps) {

	}

	render() {
		return (
			<PageHeaderLayout  wrapperClassName="pageheader">
				<div className={styles.normal}>
					<h1 className={styles.title}>Yay! Welcome to dva!</h1>
					<div className={styles.welcome} />
					<ul className={styles.list}>
						<li>To get started, edit <code>src/index.js</code> and save to reload.</li>
						<li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a></li>
					</ul>
				</div>
			</PageHeaderLayout>
		);
	}
}

// export default connect()(IndexPage);

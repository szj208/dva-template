import React, { Component } from 'react';
import { connect } from 'dva';
// import { Link } from 'dva/router';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
// import Login from 'components/Login';
import styles from './Login.less';

// const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;
const FormItem = Form.Item;
@connect(({ login, loading }) => ({
	login,
	submitting:loading.effects['login/login'],
}))
@Form.create()
export default class LoginPage extends Component {
 	handleSubmit = (e) => {
	    e.preventDefault();
	    this.props.form.validateFields((err, values) => {
			if (!err) {
				this.props.dispatch({
			        type: 'login/login',
			        payload: {
			          	...values,
			        },
		      	});
				// console.log('Received values of form: ', values);
			}
	    });
  	}
  	componentDidMount() {
	    // console.log(this.props)
  	}
  	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div className={styles.main}>
				<Form onSubmit={this.handleSubmit} className="login-form">
					<FormItem>
						{getFieldDecorator('userName', {
							rules: [{ required: true, message: '请输入用户名!' }],
						})(
							<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
						)}
			        </FormItem>
			        <FormItem>
						{getFieldDecorator('password', {
							rules: [{ required: true, message: '请输入密码!' }],
						})(
							<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
						)}
					</FormItem>
					<FormItem>
						{getFieldDecorator('remember', {
							valuePropName: 'checked',
							initialValue: true,
						})(
							<Checkbox>记住我</Checkbox>
						)}
						<a className={styles.loginFormForgot} href="">忘记密码</a>
						<Button type="primary" htmlType="submit" loading={this.props.submitting} className={styles.loginFormButton}>登 录</Button>
						<a>马上注册!</a>
					</FormItem>
				</Form>
			</div>

		);
  	}
}

// connect(({ login, loading }) => ({
// 	login,
// 	submitting:loading.effects['login/login'],
//   }))(Form.create()(LoginPage));

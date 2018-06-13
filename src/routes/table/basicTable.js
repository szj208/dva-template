import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Icon, Divider, Card, Pagination, Spin } from 'antd';
import PageHeaderLayout from "layouts/PageHeaderLayout.js";
// import request from '../utils/request.js';

@connect(({ basicTable, loading }) => ({
    basicTable,
    submitting:loading.effects['basicTable/getList'],
}))
export default class basicTable extends Component {
	constructor(props){
		super(props)
        this.state={
            page:1,
            pagination:{
                defaultCurrent:1, 
                onChange:(page, pageSize)=>{
                    this.getList(page);
                }
            },
            columns : [{
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                render: text => <a href="javascript:;">{text}</a>,
            }, {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
            }, {
                title: 'Address',
                dataIndex: 'address',
                key: 'address',
            }, {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <a href="javascript:;">Action 一 {record.name}</a>
                        <Divider type="vertical" />
                        <a href="javascript:;" onClick={() => this.onDelete(record.key)} >Delete</a>
                        <Divider type="vertical" />
                        <a href="javascript:;" className="ant-dropdown-link">
                            More actions <Icon type="down" />
                        </a>
                    </span>
                ),
            }]
        }
	}
	componentDidMount(nextProps) {
        this.getList();
    }
    getList(page = 1,length = 5){
        this.props.dispatch({
            type: 'basicTable/getList',
            payload: {
                page:page,
                length:length
            },
        }).then((res)=>{
            const oldpagination = this.state.pagination;
            this.setState({
				pagination:{
                    ...oldpagination,
                    pageSize:res.length,
                    total:res.total
                },
                loading:false
			})
        })
    }  
    describe(){
        return (
            <div>
                xxxxxxxxxxxxxxxxxxxxxxx
            </div>
        )
    }
    onDelete = (record)=> {
        console.log(1);
    }  
	render() {
        const { basicList : { list } } = this.props.basicTable;
        const loading = {
            spinning:this.props.submitting,
            tip:"加载中..."
        }
		return (
			<PageHeaderLayout  wrapperClassName="pageheader" title="基础表格" describe={this.describe()}>
                <Card loading={this.state.loading} title="基础表格" bordered={false}>
                    {/* <Spin tip="加载中..." spinning={this.props.submitting}> */}
                        <Table columns={this.state.columns} dataSource={list} pagination={this.state.pagination} loading={loading} bordered />
                    {/* </Spin> */}
                </Card>
			</PageHeaderLayout>
		);
	}
}

// export default connect()(IndexPage);

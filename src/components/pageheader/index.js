import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'antd'
import styles from './index.less'

export default class Pageheader extends Component {
    static contextTypes = {
        location:PropTypes.object,
		breadcrumbNameMap:PropTypes.object,
    };
    constructor(props){
        super(props)
        console.log(this);
    }
    getBreadcrumbProps = () => {
        return {
          routerLocation: this.props.location || this.context.location,
          breadcrumbNameMap: this.props.breadcrumbNameMap || this.context.breadcrumbNameMap,
        };
    }
    getBreadcrumbItem(){
        const { routerLocation, breadcrumbNameMap } = this.getBreadcrumbProps();
        const arr = routerLocation.pathname.split("/");
        let locationIndex = arr.length;
        let BreadcrumbItem = [];
        arr.map(item =>{
            let arr2 = arr.slice(0,locationIndex);
            locationIndex--;
            let uri = arr2.join("/");
            let dd = breadcrumbNameMap[uri]
            if (typeof dd != "object") {
                BreadcrumbItem.push(<Breadcrumb.Item key="home"><a href="#/">home</a></Breadcrumb.Item>)
            }else{
                if (dd.component) {
                    BreadcrumbItem.push(<Breadcrumb.Item key={item}><a href={'#'+uri}>{dd.name}</a></Breadcrumb.Item>)
                }else{
                    BreadcrumbItem.push(<Breadcrumb.Item key={item}>{dd.name}</Breadcrumb.Item>)
                }
            }
        })
        return BreadcrumbItem.reverse()
    }
	render() {
        const { routerLocation, breadcrumbNameMap } = this.getBreadcrumbProps();
		return (
            <div className={styles.content}>
                <Breadcrumb>
                    {this.getBreadcrumbItem()}
                </Breadcrumb>
                <div className={styles.title}>
                    {this.props.title}
                </div>
                <div className={styles.describe}>
                    {this.props.describe}
                </div>
            </div>
		);
	}
}

// export default ({ children, wrapperClassName, top, ...restProps }) => (
//         <Breadcrumb>
//             <Breadcrumb.Item>Home</Breadcrumb.Item>
//             <Breadcrumb.Item><a href="">Application Center</a></Breadcrumb.Item>
//             <Breadcrumb.Item><a href="">Application List</a></Breadcrumb.Item>
//             <Breadcrumb.Item>An Application</Breadcrumb.Item>
//         </Breadcrumb>
//     );
  


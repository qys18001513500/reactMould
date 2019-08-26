import React from 'react';

/**
 * 全局路由守卫
 */
export default class RouterGuard extends React.Component {
    
    componentDidMount() {
        // console.log('路由跳转前的拦截', sessionStorage.getItem("isLogin"));
        // console.log('路由跳转前的拦截', this.props);
        let { history: { replace } } = this.props
        if (!sessionStorage.getItem("isLogin")) replace('/');
    }

    render() {
        const { layout, component } = this.props;
        const render = layout === "" ? React.createElement(component, this.props) : React.createElement(layout, this.props, component);
        return (
            <div className="routerGuard-wrap">{render}</div>
        );
    }
}



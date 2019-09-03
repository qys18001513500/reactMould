import React from 'react';
import './Nav.scss';

export default class Nav extends React.Component {


   
   
    goLink(path) {
        this.props.history.push(path);
    }

    render() {
        const {curNav, navList, config} = this.props;
        const width = Math.floor(100 / navList.length) - 1.5 + "%";
        const items = navList.map((item,index) => {
            return  (
                <div className={item.name === curNav ? "list-item active" : "list-item"} style={{width:width}} onClick={this.goLink.bind(this,item.path)} key={index}>{item.name}</div>
            );
        });
        return (
            <div className="nav" style={config}>{items}</div>
        );
    }
}
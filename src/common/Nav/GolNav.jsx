import React from 'react';
import './GolNav.scss';
import {navMenuConfig} from "../../config/menuConfig";


export default class GolNav extends React.Component {

   
    goLink(path) {
        this.props.history.push(path);
    }
    
    render() {
        const items = navMenuConfig.map((item,index) => {
            return (
                <div key={index} className="pic-wrap" onClick={this.goLink.bind(this,item.path)} ><img src={item.pic}/></div>
            );
        });

        const {config} = this.props;
        return (
            <div className="golNav" style={config}>{items}</div>
        );
    }
}
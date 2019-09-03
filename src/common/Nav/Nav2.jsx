import React from 'react';
import './Nav.scss';

import Wrap from '../Wrap/Wrap';

export default class Nav2 extends React.Component {

   
    goLink(path) {
        
    }

    render() {
        const {nav2List, config} = this.props;
        const height = Math.floor(100 / nav2List.length) - 1 + "%";
        const items = nav2List.map((item,index) => {
            return  (
                <div className="list-item"
                    style={{gridTemplateRows:`repeat(${nav2List.length},${height})`}}
                    onClick={this.goLink.bind(this,{item})} key={index}>
                    <div className="outer">
                        <div className={index === 0 ? "inner active" : "inner"}><span className="name">{item}</span></div>
                    </div>
                </div>
            );
        });
        return (
            <div className="nav2" style={config}>{items}</div>
        );
    }
}
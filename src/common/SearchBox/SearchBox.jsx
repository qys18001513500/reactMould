import React from 'react';
import './SearchBox.scss';


export default class SearchBox extends React.Component {

   
    
    render() {
        const {config, tip} = this.props;
        return (
            <div className="searchBox" style={config}>
                <input className="inputValue" placeholder={tip} />
                <i className="iconfont icon-icon-test"></i>
            </div>
        );
    }
}
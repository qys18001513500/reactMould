import React from 'react';
import './book2.scss';
import $ from 'jquery';
import { turn } from '../../plugins/turn.js';


export default class Book2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            curPage: 1,
        }
    }

    componentDidMount() {
        $("#flipbook").turn({
            width: 1300,
            height: 900,
            autoCenter: true,
            duration: 1000, // 设置翻页的速度,值越小翻页越快
            acceleration: true, // 硬件加速，对于触摸设备，一定要设置true
            page: 2,
            gradients:true,
        });
    }
    
   
    
    prev() {
        let {curPage} = this.state;
        if(curPage==1){
        }else{
            this.setState({ curPage: curPage - 1});
        }       
        if(curPage > 1) {
            this.setState({ curPage: curPage - 1});
            $("#flipbook").turn("previous");
        }
    }

    next() {
        let {curPage} = this.state;       
        if(curPage < this.props.pics.length/2) {
            this.setState({ curPage: curPage + 1});
            $("#flipbook").turn("next");
        }
    }

    
    render() {
        const items = this.props.pics.map((item, idx) => {
           return ( <div className="pages" key={idx}> <img src={item} style={{width:"100%",height:"100%"}}/> </div>);
        });
        return (
            <div className="book2">
                <span className="closeSty" onClick={this.props.hideJbDetail}>╳</span>
                <i className="iconfont icon-icon-test1" onClick={this.prev.bind(this)}></i>
                <div className="book-wrapper">
                    <div className="left-border"></div>
                    <div id="flipbook" >
                        <div className="hard"></div>
                        {items}
                        <div className="hard"></div>
                    </div>   
                    <div className="right-border"></div>
                </div>
                <i className="iconfont icon-icon-test2" onClick={this.next.bind(this)}></i> 
            </div>
           
        );
    }
}
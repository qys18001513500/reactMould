import React from 'react';
import './book.scss';


export default class Book extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [
                ['images/p1.jpg', 'images/p4.jpg'],
                ['images/p2.jpg', 'images/p3.jpg']
            ],
            curPage: 0, 
            isNext: false,
        }
    }

    
    componentDidMount() {
        this.loadData();
    }

    loadData() {

    }

    prevPage() {
        let right = document.querySelector('.bb-custom-side.page-layout-1.right');
        right.classList.add('flip-animation-end');
        right.style.zIndex = 3;
    }

    nextPage(e) {
        let one = document.querySelector('.bb-custom-side.page-layout-1:last-child');
        let two = document.querySelector('.bb-custom-side.page-layout-2:first-child');
        console.log(two);
        one.classList.add('flip-animation-start');
        two.classList.add('flip-animation-start');
        two.style.zIndex = 2;
    }

    closeBook() {

    }

    createItem() {
        return this.state.dataList[this.state.curPage].map((item, idx) => {
            return (
                <div className="bb-custom-side page-layout-1" key={idx}>
                    <img src={item} alt=""/>
                </div>
            );
        });
    }

    
    render() {
        let items = this.createItem();
        return (
            <div className="book">
                <div className="book-wrapper show" id="book-1">
                    <div className="bb-item2">
                        <div className="bb-custom-side page-layout-2">
                            <img src='images/p2.jpg' alt=""/>
                        </div>
                        <div className="bb-custom-side page-layout-2">
                            <img src='images/p3.jpg' alt=""/>
                        </div>
                    </div>
                    <div className="bb-item1">
                        <div className="bb-custom-side page-layout-1">
                            <img src='images/p1.jpg' alt=""/>
                        </div>
                        <div className="bb-custom-side page-layout-1">
                            <img src='images/p4.jpg' alt=""/>
                        </div>
                    </div>
                    <nav>
                        <div className="close-page" onClick={this.closeBook.bind(this)}><i className="iconfont icon-guanbi"></i></div>
                        <div className="prev-page" onClick={this.prevPage.bind(this)}><i className="iconfont icon-shangyiye"></i></div>
                        <div className="next-page" onClick={this.nextPage.bind(this)}><i className="iconfont icon-shangyiye1"></i></div>
                    </nav>
                </div>
            </div>
        );
    }
}
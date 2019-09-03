import React from 'react';
import './AlertInfoPicPrev.scss';


export default class AlertInfoPicPrev extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // picIndex: this.props.curPicIndex,
            picList: this.props.picList,
            picIndex: 0,
            // picList: ["/images/p1.jpg", "/images/p2.jpg", "/images/p3.jpg", "/images/p4.jpg", "/images/p5.jpg"],
        }
    }


    // 选择显示的图片
    choosePic(idx) {
        if(this.timer) clearInterval(this.timer);
        this.setActiceImg(idx);
        if(this.props.picList.length > 1) {
            this.setState({ picIndex: idx }, this.autoShowPic);
        }else {
            this.setState({ picIndex: idx });
        }
        
    }

    // 设置主图样式
    setMainPic() {
        let curShowPic = document.querySelector("#curShowPic");
        curShowPic.onload = () => {
            let img = new Image();
            img.src = curShowPic.getAttribute("src");
            if (img.width < img.height) {
                curShowPic.style.width = "";
                curShowPic.style.height = "100%";
            } else {
                curShowPic.style.height = "";
                curShowPic.style.width = "100%";
            }
        }
    }

    // 设置缩略图样式
    setSmPic() {
        let ul = document.querySelector(".sm-pic-list");
        let width = 100 * this.state.picList.length + 27 * (this.state.picList.length - 1)+ 'px';
        ul.style.width = width;
        let pics = document.querySelectorAll(".sm-pic-list li .img_wrap img");
        pics.forEach(pic => {
            pic.onload = () => {
                let img = new Image();
                img.src = pic.getAttribute("src");
                if (img.width < img.height) {
                    pic.style.height = "100%";
                } else {
                    pic.style.width = "100%";
                }
            }
        });
    }

    // 设置显示的图片样式
    setActiceImg(index) {
        let li = document.querySelector(".img_wrap.active");
        if (li) li.classList.remove('active');
        let lis = document.querySelectorAll(".img_wrap");
        lis[index].classList.add('active');

    }


    createLis() {
        const { picList } = this.state;
        return picList.map((item, idx) => {
            return (
                <li key={idx} className="picLi" onClick={this.choosePic.bind(this, idx)}>
                    <div className={idx === 0 ? "img_wrap active" : "img_wrap"}><img src={`${item}?x-oss-process=image/resize,h_100`} alt="" /></div>
                </li>
            )
        });
    }

    // 图片轮播
    autoShowPic() {
        this.timer = setInterval(() => {
            if(this.state.picIndex >= this.state.picList.length - 1) {
                this.choosePic(0);
            }else {
                this.choosePic(this.state.picIndex + 1);
            }
        }, 5000);
    }

    componentDidMount() {
        // 主图
        // this.setMainPic();
        // 缩略图
        this.setSmPic();
        // 图片轮播
        if(this.props.picList.length > 1) {
            this.autoShowPic();
        }
    }

    componentWillUnmount() {
        if(this.timer) clearInterval(this.timer);
    }

    render() {
        const { picList, picIndex } = this.state;
        const items = this.createLis();
        return (
            <div className="alertInfoPicPrev">
                <div className="container_wrap">
                    <div className="container">
                        <img id="curShowPic" src={`${picList[picIndex]}?x-oss-process=image/resize,h_1000`} />
                    </div>
                    <div className="sm-pic-list-wrap" >
                        <div><i className=""></i></div>
                        <ul className="sm-pic-list">
                            {items}
                        </ul>
                        <div><i className=""></i></div>
                    </div>
                </div>
            </div>
        );
    }
}
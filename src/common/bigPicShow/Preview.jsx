import React from 'react';
import './Preview.scss';


export default class Preview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // picIndex: this.props.curPicIndex,
            // picList: this.props.picList,
            picIndex: 0,
            picList: ["/images/p1.jpg", "/images/p2.jpg", "/images/p3.jpg", "/images/p4.jpg", "/images/p5.jpg"],
            showSmPic: true,
        }
    }


    showPic(flag) {
        this.props.show('', flag);
    }

    prev() {
        const { picIndex } = this.state;
        if (picIndex > 0) {
            this.setActiceImg(picIndex - 1);
            this.setState({ picIndex: picIndex - 1 });
        }
    }

    next() {
        // const {picList} = this.props;
        const { picList, picIndex } = this.state;
        if (picIndex < picList.length - 1) {
            this.setActiceImg(picIndex + 1);
            this.setState({ picIndex: picIndex + 1 });
        }
    }

    // 选择显示的图片
    choosePic(idx) {
        if(this.timer) clearInterval(this.timer);
        this.setActiceImg(idx);
        this.setState({ picIndex: idx }, this.autoShowPic);
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
        let width = 70 * this.state.picList.length + 'px';
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

    showSmPic() {
        this.setState({ showSmPic: !this.state.showSmPic });
    }

    createLis() {
        const { picList } = this.state;
        return picList.map((item, idx) => {
            return (
                <li key={idx} onClick={this.choosePic.bind(this, idx)}>
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
        this.autoShowPic();
    }

    componentWillUnmount() {
        if(this.timer) clearInterval(this.timer);
    }

    render() {
        const { picList, picIndex, showSmPic } = this.state;
        const items = this.createLis();
        return (
            <div className="preview">
                <div className="container_wrap">
                    <div className="container">
                        <div className="picBtn left" onClick={this.prev.bind(this)}><img src="/images/larrow.png?x-oss-process=image/resize,h_80" /></div>
                        <img id="curShowPic" src={`${picList[picIndex]}?x-oss-process=image/resize,h_1000`} onClick={this.showPic.bind(this, false)} />
                        <div className="picBtn right" onClick={this.next.bind(this)}><img src="/images/rarrow.png?x-oss-process=image/resize,h_80" /></div>
                    </div>
                    <div className="sm-pic-list-wrap" style={showSmPic ? { transform: "translateY(0)" } : { transform: "translateY(85px)" }} >
                        <div className="sm_pic_nav_head" onClick={this.showSmPic.bind(this)}>
                            <span className="sm_pic_nav_num">
                                <span className="sm_pic_num_cur">{picIndex + 1}</span>
                                <span className="sm_pic_num_slash">/</span>
                                <span className="sm_pic_num_total">{picList.length}</span>
                            </span>
                            <span className="sm_pic_nav_divider">|</span>
                            <span className={showSmPic ? "sm_pic_nav_switch hide" : "sm_pic_nav_switch show"}>{showSmPic ? "隐藏缩略图" : "显示缩略图"}</span>
                        </div>
                        <ul className="sm-pic-list">
                            {items}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
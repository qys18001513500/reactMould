import React from 'react';
import './bigPicShow.scss'

export default class bigPicShow extends React.Component {
 	constructor(props) {
 		super(props);
 		this.state = {
 			picIndex: 0,
 			tip: '',
 		}
 	}


 	showPic(flag) {
 		this.props.show('',flag);
 	}

 	prev() {
 		const {picIndex} = this.state;
 		if(picIndex > 0) {
 			this.setState({picIndex: picIndex - 1});
 		}else {
 			this.setState({tip: "当前图片已经是第一张了"}, this.hideTip);
 		}
 		
 	}

 	next() {
 		const {picList} = this.props;
 		const {picIndex} = this.state;
 		if(picIndex < picList.length - 1) {
 			this.setState({picIndex: picIndex + 1});
 		}else {
 			this.setState({tip: "当前图片已经是最后张了"}, this.hideTip);
 		}
 		
 	}

 	hideTip() {
 		if(this.timer) {
 			clearTimeout(this.timer);
 		}
 		if(this.state.tip != ''){
 			this.timer = setTimeout(() => {
	 			this.setState({tip: ''});
	 		}, 500);
 		}
 	}
 	

	
	render() {
		const {picList, curPicIndex} = this.props;
		const {picIndex, tip} = this.state;
		return (
			<div className="bigPicShow">
				<div className="pic-content">
					<div className="tip">{tip}</div> 
					<div className="picBtn left" onClick={this.prev.bind(this)}><img src="/images/larrow.png?x-oss-process=image/resize,h_80" /></div>	
					<img src={picList[picIndex].replace('?x-oss-process=image/resize,h_150','?x-oss-process=image/resize,w_1000')} onClick={this.showPic.bind(this,false)}/>
					<div className="picBtn right" onClick={this.next.bind(this)}><img src="/images/rarrow.png?x-oss-process=image/resize,h_80" /></div>	
				</div>
			</div>
		)
	}
}
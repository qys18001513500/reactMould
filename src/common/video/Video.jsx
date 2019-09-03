import React from 'react';
import './Video.scss';

export default class Video extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFullScreen: true,
            isPause: true,
            volume: 100,
            tempVol: 100
        };
        this.timer = null;
        this.init = this.init.bind(this);
        this.bindEvent = this.bindEvent.bind(this);
        this.controlVol = this.controlVol.bind(this);
        this.controlVideo = this.controlVideo.bind(this);
        this.readableTime = this.readableTime.bind(this);
        this.setSpeed = this.setSpeed.bind(this);
        this.setVideoState = this.setVideoState.bind(this);
        this.setVolumeState = this.setVolumeState.bind(this);
        this.isFullScreen = this.isFullScreen.bind(this);
        this.setFullScreen = this.setFullScreen.bind(this);
        this.hideFooter = this.hideFooter.bind(this);
        this.cancelBubble = this.cancelBubble.bind(this);
    }

    componentDidMount() {
        this.init();
        this.bindEvent();
    }

    /**
     * 初始化
     */
    init() {
        this.video = document.querySelector('.video-elm');
        this.closeBtn = document.querySelector('.closeBtn');
        this.container = document.querySelector('.player');
        this.divModal = document.querySelector('.video-modal');
        this.footer = document.querySelector('.video-modal-footer');
        this.curtime = document.querySelector('#curtime');
        this.total = document.querySelector('#total'); 
        this.progress_bar = document.querySelector('.progress-bar');
        this.curProgress = document.querySelector('.progress-bar-current');
        this.curProgress_slider = document.querySelector('.progress-bar-slider');
        this.volume = document.querySelector('.volume-bar');
        this.speeddoms = document.querySelectorAll("[data-speed]");
        // 初始化音量
        this.video.volume = this.state.volume / 100;
    }

    /**
     * 绑定事件
     */
    bindEvent() {
        // 初始化时长
        this.video.addEventListener('durationchange', () => {
            this.totalTime = this.video.duration;
            this.total.innerHTML = this.readableTime(this.totalTime);
            this.setCurTime();
        });
        this.video.addEventListener('timeupdate', () => {
            this.setCurTime();
        });
        this.container.addEventListener('fullscreenchange', () => {
            if (this.state.isFullScreen) {
                this.hideFooter();
            }
            else {
                this.divModal.style.cursor = "pointer";
                // this.footer.style.display = "block";
                this.footer.classList.remove('hide');
                clearTimeout(this.timer);
            }
        });
        this.divModal.addEventListener('mousemove', () => {
            if (this.state.isFullScreen) {
                this.divModal.style.cursor = "pointer";
                // this.footer.style.display = "block";
                this.footer.classList.remove('hide');
                this.hideFooter();
            }
        });
        this.divModal.addEventListener('mouseleave', () => {
            this.hideFooter();
        });
        this.divModal.addEventListener('mouseover', () => {
            clearTimeout(this.timer);
            this.divModal.style.cursor = "pointer";
            // this.footer.style.display = "block";
            this.footer.classList.remove('hide');
        });
        this.progress_bar.addEventListener('mousedown', (e) => {
            // events.button==0 默认。鼠标左键。 
            // events.button==1 鼠标中键 
            // events.button==2 鼠标右键 
            if (e.button !== 0) {
                return;
            }
            this.controlVideo(e);
            this.progress_bar.onmousemove = (e) => {
                this.controlVideo(e);
            };
            this.progress_bar.onmouseup = this.progress_bar.onmouseleave = () => {
                this.progress_bar.onmousemove = undefined;
            }
        });
        this.volume.addEventListener('mousedown', (e) => {
            // events.button==0 默认。鼠标左键。 
            // events.button==1 鼠标中键 
            // events.button==2 鼠标右键 
            if (e.button !== 0) {
                return;
            }
            this.controlVol(e);
            this.volume.onmousemove = (e) => {
                this.controlVol(e);
            };
            this.volume.onmouseup = this.volume.onmouseleave = () => {
                this.volume.onmousemove = undefined;
            }
        });
    }

    cancelBubble(e) {
        e.stopPropagation();
    }
    
    /**
     * 设置播放状态
     */
    setVideoState() {
        if(this.state.isPause) {
            this.video.play();
        }else {
            this.video.pause();
        }
        this.setState({isPause: !this.state.isPause});
    }

    

    /**
     * 设置播放倍速
     */
    setSpeed(e) {
        this.video.playbackRate = e.target.dataset.speed;
        for (const dom of this.speeddoms) {
            dom.className = "";
            e.target.className = "active";
        }
    }

    /**
     * 设置当前播放时间
     */
    setCurTime() {
        this.curtime.innerHTML = this.readableTime(this.video.currentTime);
        let percent = this.video.currentTime / this.totalTime * 100;
        this.curProgress.style.width = percent + "%";
        this.curProgress_slider.style.left = percent + "%";
        if(percent == 100) this.setState({isPause: true});
    }

    /**
     * 判断当前是否全屏
     */
    isFullScreen() {
        return  !! (
            document.fullscreen || 
            document.mozFullScreen ||                         
            document.webkitIsFullScreen ||       
            document.webkitFullScreen || 
            document.msFullScreen 
         );
      }
   
    /**
     * 全屏
     */
    setFullScreen() {
        if (this.state.isFullScreen) {
            // if(document.exitFullScreen) {
            //     document.exitFullScreen();
            // } else if(document.mozCancelFullScreen) {
            //     document.mozCancelFullScreen();
            // } else if(document.webkitExitFullscreen) {
            //     document.webkitExitFullscreen();
            // } else if(document.msExitFullscreen) {
            //     document.msExitFullscreen();
            // } 
            this.closeBtn.classList.remove('hide');
            this.container.classList.remove('isFull');
            this.setState({isFullScreen: false});
        }
        else {
            // if (this.container.requestFullscreen) {
            //     this.container.requestFullscreen();
            // } else if (this.container.mozRequestFullScreen) {
            //     this.container.mozRequestFullScreen();
            // } else if (this.container.webkitRequestFullscreen) {
            //     this.container.webkitRequestFullscreen();
            // } else if (this.container.msRequestFullscreen) {
            //     this.container.msRequestFullscreen();
            // }
            this.container.classList.add('isFull');
            this.closeBtn.classList.add('hide');
            this.setState({isFullScreen: true});
        }
        // if (this.isFullScreen()) {
        //     if(document.exitFullScreen) {
        //         document.exitFullScreen();
        //     } else if(document.mozCancelFullScreen) {
        //         document.mozCancelFullScreen();
        //     } else if(document.webkitExitFullscreen) {
        //         document.webkitExitFullscreen();
        //     } else if(document.msExitFullscreen) {
        //         document.msExitFullscreen();
        //     }
        //     this.setState({isFullScreen: false});
        // }
        // else {
        //     if (this.container.requestFullscreen) {
        //         this.container.requestFullscreen();
        //     } else if (this.container.mozRequestFullScreen) {
        //         this.container.mozRequestFullScreen();
        //     } else if (this.container.webkitRequestFullscreen) {
        //         this.container.webkitRequestFullscreen();
        //     } else if (this.container.msRequestFullscreen) {
        //         this.container.msRequestFullscreen();
        //     }
        //     this.setState({isFullScreen: true});
        // }
    }

    /**
     * 设置时长格式
     */
    readableTime(seconds) {
        let minutes = Math.floor(seconds / 60);
        let sec = Math.floor(seconds - minutes * 60);
        return `${minutes < 10 ? "0" + minutes : minutes}:${sec < 10 ? "0" + sec : sec}`;
    }
    
    /**
     *  音量控制 
     */
    controlVol(e) {
        let rect = this.volume.getBoundingClientRect();
        let offY = e.pageY - rect.top;
        let vol = ( rect.height - offY ) / rect.height;
        if(vol > 1) {
            vol = 1;
        }else if(vol < 0) {
            vol = 0;
        }
        this.video.volume = vol;
        this.setState({
            volume: vol * 100,
            tempVol: vol * 100
        });
    }

    /**
     * 时长控制
     */
    controlVideo(e) {
        let rect = this.progress_bar.getBoundingClientRect();
        let offX = e.pageX - rect.left;
        let sec = offX / rect.width * this.totalTime;
        this.video.currentTime = sec;
        this.setCurTime();
    }

    /**
     * 是否开启声音
     */
    setVolumeState() {
        const { volume, tempVol } = this.state;
        if(volume === 0) {
            if(tempVol === 0) {
                this.video.volume = 1;
                this.setState({volume: 100});
            }else {
                this.video.volume = tempVol / 100;
                this.setState({volume: tempVol});
            }
        }else {
            this.video.volume = 0;
            this.setState({volume: 0});
        }
    }

    hideFooter() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            this.divModal.style.cursor = "none";
            // this.footer.style.display = "none";
            this.footer.classList.add('hide');
        }, 2000);
    }
    

    render() {
        const { isFullScreen, isPause, volume } = this.state;
        const url =this.props.url;
        return (
            <div className="video-plugin">
                <span className="closeBtn" onClick={this.props.showVideo}>╳</span>
                <div className="player isFull">
                    <video className="video-elm" src={url}></video>
                    <div className={isPause ? "video-modal pause" : "video-modal"} onClick={this.setVideoState}>
                        <i className={isPause ? "iconfont icon-bofang" : "iconfont icon-bofang hide"}></i>
                        <aside className="video-modal-aside"></aside>
                        <footer className="video-modal-footer" onClick={this.cancelBubble.bind(this)}>
                            <div className="progress-bar">
                                <div className="progress-bar-current"></div>
                                <div className="progress-bar-slider"></div>
                            </div>
                            <div className="controls">
                                <ul className="controls-left">
                                    <li className="play-btn" onClick={this.setVideoState}>
                                        <i className={isPause ? "iconfont icon-bofang2" : "iconfont icon-zanting"}></i>
                                    </li>
                                    <li className="next-btn"><i className="iconfont icon-bofangqi-xiayiji"></i></li>
                                    <li className="time">
                                        <span id="curtime"></span>
                                        <span>/</span>
                                        <span id="total"></span>
                                    </li>
                                </ul>
                                <ul className="controls-right">
                                    <li className="volume-btn">
                                        <i className={volume === 0 ? "iconfont icon-jingyin" : "iconfont icon-yinliang2"} onClick={this.setVolumeState}></i>
                                        <div className="volume-bar-wrap">
                                            <div className="volume-bar">
                                                <div className="volume-bar-current" style={{height: volume + '%'}}></div>
                                                <div className="volume-bar-slider" style={{bottom: volume + '%'}}></div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="speed-btn">
                                        <i className="iconfont icon-icon02"></i>
                                        <ul className="speed-list" onClick={this.setSpeed}>
                                            <li data-speed="2">2倍</li>
                                            <li data-speed="1.5">1.5倍</li>
                                            <li className="active" data-speed="1">1倍</li>
                                            <li data-speed="0.5">0.5倍</li>
                                        </ul>
                                    </li>
                                    {/* <li className="zoom-btn" onClick={this.setFullScreen}>
                                        <i className={isFullScreen ? "iconfont icon-quxiaoquanping2" : "iconfont icon-quanping4"}></i>
                                    </li> */}
                                </ul>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        );
    }
}
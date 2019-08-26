import React from 'react';
import axios from 'axios';
import './login.scss';

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            isLogin: null,
            password: '',
        }
    }


    login() {       
        let  password = this.refs.password.value;
        let params = {
            password: password,
        }
        axios.post('http://multiple.chinawaytek.com/showSystemMgr/api/showSystemProjectMgr/login', params).then((res) => {
            // console.log(res.data);
            this.setState({ isLogin: res.data.isLogin });
            if (this.state.isLogin) {
                sessionStorage.setItem("isLogin", this.state.isLogin);
                let params = {
                    project_id: res.data.id, // 展示后台项目Id
                }
                axios.post('http://multiple.chinawaytek.com/showSystemMgr/api/showSystemProjectMgr/getProjectInfo', params).then((res) => {
                    console.log(res.data);
                    let projectParams = res.data.projectInfo.projectParams;
                    let jsonParam = JSON.parse(projectParams);
                    localStorage.clear();
                    localStorage.setItem("base_geo_id", jsonParam.base_geo_id); // 高德地图划分区域边界的id
                    localStorage.setItem("code", jsonParam.code); // 区域编码
                    localStorage.setItem("zoom", jsonParam.zoom);
                    localStorage.setItem("lng", jsonParam.lng);
                    localStorage.setItem("lat", jsonParam.lat);
                    localStorage.setItem("project_id", jsonParam.project_id); // 党建的project_id
                    localStorage.setItem("local_project_id", jsonParam.local_project_id); // 自己的project_id
                    localStorage.setItem("party_organization_id", jsonParam.party_organization_id);
                    localStorage.setItem("processId", jsonParam.processId);
                    localStorage.setItem("radioUrl", jsonParam.radioUrl);
                    localStorage.setItem("project_title", jsonParam.project_title);
                    localStorage.setItem("year", jsonParam.year);
                    localStorage.setItem("nav", jsonParam.nav);
                    let cycle = - (parseInt(jsonParam.cycle) - 1);
                    let end_date = new Date();
                    let endTime = end_date.getFullYear() + "-" + (end_date.getMonth() + 1) + "-" + end_date.getDate() + " 23:59:59"; // time1表示当前时间            
                    let start_date = new Date(end_date);
                    start_date.setDate(end_date.getDate() + cycle);
                    let startTime = start_date.getFullYear() + "-" + (start_date.getMonth() + 1) + "-" + start_date.getDate() + " 00:00:00";
                    localStorage.setItem("start_date", startTime);
                    localStorage.setItem("end_date", endTime);
                    if (jsonParam.code.length === 4) {
                        localStorage.setItem("level", 2);
                    } else if (jsonParam.code.length === 6) {
                        localStorage.setItem("level", 3);
                    } else if (jsonParam.code.length === 9) {
                        localStorage.setItem("level", 4);
                    } else if (jsonParam.code.length === 12) {
                        localStorage.setItem("level", 5);
                    }
                    localStorage.setItem("shuaxin", parseInt(jsonParam.shuaxin));
                    // localStorage.setItem("isdemo", jsonParam.isdemo);
                    this.props.history.push('/主页');
                });
            }
        });

    }

    render() {
        const { isLogin } = this.state;
        return (
            <div className='login'>
                <div className='wrapper'>
                    <div className='logo'></div>
                    <div className='name'>请输入密码：</div>
                    <div className="psd">
                        <div className='password'><input type="password" value={this.state.password} ref="password" onChange={(e) => this.setState({ password: e.target.value })} /></div>
                        {isLogin === false ? <div className="pad-tip">密码错误</div> : null}
                    </div>
                    <button className='btn' onClick={this.login.bind(this)}>登录</button>
                </div>
            </div>
        );
    }
}


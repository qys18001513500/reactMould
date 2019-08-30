import React from 'react';
import axios from 'axios';
import './login.scss';

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            isLogin: null,
            accout: '',
            password: '',
        }
        this.login = this.login.bind(this);
    }


    login() {       
        let  accout = this.refs.accout.value;
        let  password = this.refs.password.value;
        let params = {
            accout: accout,
            password: password,
        }
        axios.post('http://multiple.chinawaytek.com/showSystemMgr/api/showSystemProjectMgr/login', params).then((res) => {
            // console.log(res.data);
            this.setState({ isLogin: res.data.isLogin });
            if (this.state.isLogin) {
                sessionStorage.setItem("isLogin", this.state.isLogin);
                this.props.history.push('/主页');
            }
        });
    }

    render() {
        const { isLogin } = this.state;
        return (
            <div className='login'>
                <ul className="bubble-bgwall">
                    <li>JS</li>
                    <li>CSS</li>
                    <li>JAVA</li>
                    <li>C++</li>
                    <li>PHP</li>
                    <li>React</li>
                    <li>Spring</li>
                    <li>Vue</li>
                    <li>TS</li>
                    <li>Angular</li>
                </ul>
                <form className="bubble-distribution">
                    <h3>登录</h3>
                    <div className="accout">
                        <input type="text" placeholder="请输入账号(6到20位字符)" pattern="^[\dA-Za-z_]{6,20}$" required 
                               value={this.state.accout}  ref="accout" onChange={(e) => this.setState({ accout: e.target.value }) } />
                        <img src="https://b-gold-cdn.xitu.io/v3/static/img/greeting.1415c1c.png"/>
                    </div>
                    <div className="password">
                        <input type="password" placeholder="请输入密码(6到20位字符)" pattern="^[\dA-Za-z_]{6,20}$" required
                               value={this.state.password}  ref="password" onChange={(e) => this.setState({ password: e.target.value }) } />
                        <img src="https://b-gold-cdn.xitu.io/v3/static/img/blindfold.58ce423.png"/>
                    </div>
                    <img src="https://b-gold-cdn.xitu.io/v3/static/img/normal.0447fe9.png"/>
                    <button type="button" onClick={ this.login }>登录</button>
                </form>
            </div>
        );
    }
}


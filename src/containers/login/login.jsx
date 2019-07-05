/**
 * 注册登录组件
 * */

import React, {Component} from 'react'
import {Button, InputItem, List, NavBar, WhiteSpace, WingBlank} from "antd-mobile";
import Logo from "../../components/logo/logo";
import './login.less'
import {connect} from 'react-redux'
import {login} from '../../redux/actions'
import {Redirect} from "react-router-dom";

class Login extends Component {
    state = {
        username: '',
        password: '',
    }

    handleChange = (val,name) => {
        this.setState({
            [name]: val
        })
    }

    handleLogin = () => {
        this.props.login(this.state)
    }

    handleToRegister = () => {
        this.props.history.replace('/register')
    }

    render() {
        const {msg,redirectTo} = this.props.user
        if(redirectTo) {
            return <Redirect to={redirectTo}></Redirect>
        }
        return (
            <div className='login-container'>
                <NavBar>xiaoeyu 直聘</NavBar>
                <Logo/>
                <WingBlank>
                    <List>
                        {msg? <WhiteSpace/>:null}
                        {msg? <div className='error-msg'>{msg}</div>:null}
                        <WhiteSpace/>
                        <InputItem placeholder='请输入用户名' onChange={val => this.handleChange(val,'username')}>用户名：</InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder='请输入密码' type='password'  onChange={val => this.handleChange(val,'password')}>密&nbsp;&nbsp;&nbsp;码：</InputItem>
                        <WhiteSpace/>
                    </List>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.handleLogin}>登&nbsp;&nbsp;&nbsp;录</Button>
                    <WhiteSpace/>
                    <Button className='button-color' onClick={this.handleToRegister}>还没有账号</Button>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {login}
)(Login)


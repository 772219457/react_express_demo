/**
 * 注册路由组件
 * */
import React, {Component} from 'react'
import {NavBar, WingBlank, WhiteSpace, List, InputItem, Button, Radio} from 'antd-mobile'
import Logo from '../../components/logo/logo'
import './register.less'
import {connect} from 'react-redux'
import {register} from '../../redux/actions'
import '../../assets/css/index.less'
import {Redirect} from 'react-router-dom'

const ListItem = List.Item

class Register extends Component {
    state = {
        username: '',
        password: '',
        checkPassword: '',
        userType: 'lower'
    }

    handleRegister = () => {
        // console.log(this)
        this.props.register(this.state)
    }


    handleChange = (val, name) => {
        this.setState({
            [name]: val
        })
    }

    handleToLogin = () => {
        this.props.history.replace('/login')
    }

    // handleToLogin(){
    //     this.props.history.replace('/login') //props属性进行路由跳转
    // }


    render() {
        const {msg,redirectTo} = this.props.user
        if(redirectTo) {
            return <Redirect to={redirectTo}></Redirect>
        }

        return (
            <div className='register-container'>
                <NavBar>xiaoeyu 直聘</NavBar>
                <Logo/>
                <WingBlank>
                    <List>
                        {msg? <WhiteSpace/>:null}
                        {msg? <div className='error-msg'>{msg}</div>:null}
                        <WhiteSpace/>
                        <InputItem placeholder='请输入用户名'
                                   onChange={val => this.handleChange(val, 'username')}>用户名：</InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder='请输入密码' type='password'
                                   onChange={val => this.handleChange(val, 'password')}>密&nbsp;&nbsp;&nbsp;码：</InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder='请确认密码' type='password'
                                   onChange={val => this.handleChange(val, 'checkPassword')}>确认密码：</InputItem>
                        <ListItem>
                            <span>用户类型：</span>
                            &nbsp;&nbsp;&nbsp;
                            <Radio checked={this.state.userType === 'lower'}
                                   onChange={() => this.handleChange('lower', 'userType')}>萌新</Radio>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio checked={this.state.userType === 'boss'}
                                   onChange={() => this.handleChange('boss', 'userType')}>BOSS</Radio>
                        </ListItem>
                    </List>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.handleRegister}>注&nbsp;&nbsp;&nbsp;册</Button>
                    <WhiteSpace/>
                    <Button className="button-color" onClick={this.handleToLogin}>已有账号</Button>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {register}
)(Register)


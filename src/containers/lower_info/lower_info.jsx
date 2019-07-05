/**
 *
 * 萌新 详情完善页
 * */

import React, {Component} from 'react'
import {NavBar, WhiteSpace, InputItem, TextareaItem, Button} from "antd-mobile";
import HeaderSelector from '../../components/header_select/header_select'
import {Redirect} from "react-router-dom";
import {connect} from 'react-redux'
import {infoUpdate} from "../../redux/actions";

class LowerInfo extends Component {

    state = {
        headImg: '', // 头像名称
        info: '', // 个人简介
        post: '', // 求职岗位
    }

    // 更新header
    handleSetHeader = (val) => {
        this.setState({
            headImg: val
        })
    }

    handleChange = (val, name) => {
        this.setState({
            [name]: val
        })
    }

    handleSave = () => {
        this.props.infoUpdate(this.state)
    }

    render() {
        const {headImg, userType} = this.props.user
        if (headImg) {
            let path = userType === 'boss' ? '/boss' : '/lower'
            return <Redirect to={path}/>
        }
        return (
            <div>
                <NavBar>萌新信息完善</NavBar>
                <HeaderSelector handleSetHeader={this.handleSetHeader}></HeaderSelector>
                <InputItem placeholder='请输入求职岗位' onChange={val => this.handleChange(val, 'post')}>求职岗位：</InputItem>
                <TextareaItem title='个人介绍：' rows={3} onChange={val => this.handleChange(val, 'info')}/>
                <WhiteSpace/>
                <Button type='primary' onClick={this.handleSave}>保&nbsp;&nbsp;&nbsp;存</Button>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {infoUpdate}
)(LowerInfo)

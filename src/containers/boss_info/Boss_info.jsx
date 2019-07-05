/**
 *
 * boss 详情完善页
 * */

import React, {Component} from 'react'
import {NavBar, WhiteSpace, InputItem, TextareaItem, Button} from "antd-mobile";
import HeaderSelector from '../../components/header_select/header_select'
import {connect} from 'react-redux'
import {infoUpdate} from "../../redux/actions";
import {Redirect} from 'react-router-dom'

class BoosInfo extends Component {

    state = {
        headImg: '', // 头像名称
        info: '', // 职位简介
        post: '', // 职位名称
        company: '', // 公司名称
        salary: '' // 工资
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
                <NavBar>Boss信息完善</NavBar>
                <HeaderSelector handleSetHeader={this.handleSetHeader}></HeaderSelector>
                <InputItem placeholder='请输入招聘职位' onChange={val => this.handleChange(val, 'post')}>招聘职位：</InputItem>
                <InputItem placeholder='请输入公司名称' onChange={val => this.handleChange(val, 'company')}>公司名称：</InputItem>
                <InputItem placeholder='请输入职位薪资' onChange={val => this.handleChange(val, 'salary')}>职位薪资：</InputItem>
                <TextareaItem title='职位要求：' rows={3} onChange={val => this.handleChange(val, 'info')}/>
                <WhiteSpace/>
                <Button type='primary' onClick={this.handleSave}>保&nbsp;&nbsp;&nbsp;存</Button>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {infoUpdate}
)(BoosInfo)

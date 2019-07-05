/**
 * 主界面组件
 *
 * */

/**
1. 实现自动登陆:
  1. componentDidMount()
    登陆过(cookie中有userId), 但没有有登陆(redux管理的user中没有_id) 发请求获取对应的user:
  2. render()
    1). 如果cookie中没有userid, 直接重定向到login
    2). 判断redux管理的user中是否有_id, 如果没有, 暂时不做任何显示
    3). 如果有, 说明当前已经登陆, 显示对应的界面
    4). 如果请求根路径: 根据user的type和header来计算出一个重定向的路由路径, 并自动重定向
 */

import React, {Component} from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import BossInfo from '../boss_info/Boss_info'
import LowerInfo from '../lower_info/lower_info'
import Message from '../message/message'
import NotFound from '../../components/404/404'
import Boss from '../boss/boss'
import Lower from '../lower/lower'
import Personal from '../person_info/personal'
import Chat from '../chat/chat'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'   //可以操作前端的cookie对象set()/remove()
import {getRedirectTo} from "../../utils";
import {userInfo} from "../../redux/actions";
import NavBar from "antd-mobile/es/nav-bar";
import NavFooter from '../../components/nav_footer/nav_footer'


class Main extends Component {
    // 给组件对象添加属性
    navList = [ // 包含所有导航组件的相关信息数据
        {
            path: '/boss', // 路由路径
            component: Boss,
            title: '萌新列表',
            icon: 'boss',
            text: '萌新',
        },
        {
            path: '/lower', // 路由路径
            component: Lower,
            title: 'boss列表',
            icon: 'lower',
            text: 'boss',
        },
        {
            path: '/message', // 路由路径
            component: Message,
            title: '消息列表',
            icon: 'message',
            text: '消息',
        },
        {
            path: '/personal', // 路由路径
            component: Personal,
            title: '用户中心',
            icon: 'personal',
            text: '个人',
        }
    ]

    componentDidMount () {
        //登陆过(cookie中有userId), 但没有有登陆(redux管理的user中没有_id) 发请求获取对应的user
        const userId = Cookies.get('userId')
        const {_id} = this.props.user
        if(userId && !_id) {
            // 发送异步请求, 获取user
            // console.log('发送ajax请求获取user')
            this.props.userInfo()
        }
    }

    render() {
        // 读取cookie中的userId
        const userId = Cookies.get('userId')
        // 如果没有, 自动重定向到登陆界面
        if(!userId) {
            return <Redirect to='/login'/>
        }
        // 如果有,读取redux中的user状态
        const {user} = this.props
        // 如果user有没有_id, 返回null(不做任何显示)
        // debugger
        if(!user._id) {
            return null
        } else {
            // 如果有_id, 显示对应的界面
            // 如果请求根路径, 根据user的type和header来计算出一个重定向的路由路径, 并自动重定向
            let path = this.props.location.pathname
            if(path==='/') {
                // 得到一个重定向的路由路径
                path = getRedirectTo(user.userType, user.headImg)
                return <Redirect to= {path}/>
            }
        }
        const {navList} = this
        const path = this.props.location.pathname // 请求的路径
        const currentNav = navList.find(nav=> nav.path===path) // 得到当前的nav, 可能没有
        if(currentNav){
            if(user.userType === 'boss') {
                navList[1].hidden = true
            } else {
                navList[0].hidden = true
            }
        }

        return <div>
            {currentNav ? <NavBar className='sticky-header'>{currentNav.title}</NavBar> : null}
            <Switch>
                {navList.map(nav => <Route key={nav.path} path={nav.path} component={nav.component}/>)}
                <Route path='/bossInfo' component={BossInfo}/>
                <Route path='/lowerInfo' component={LowerInfo}/>
                <Route path='/chat/:userId' component={Chat}/>
                <Route component={NotFound}/>
            </Switch>
            {currentNav ? <NavFooter navList={navList} />: null}
        </div>
    }
}

export default connect(
    state => ({user: state.user}),
    {userInfo}
)(Main)

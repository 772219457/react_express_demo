/**
 *
 * 聊天页面
 * */

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavBar, List, InputItem} from 'antd-mobile'
import {sendMsg} from '../../redux/actions'

const Item = List.Item

class Chat extends Component {

    state = {
        content: ''
    }

    handleChange = (val, name) => {
        this.setState({
            [name]: val
        })
    }

    handleSendMsg = () => {
        const from = this.props.user._id
        const to = this.props.match.params.userId
        const content = this.state.content

        if(content) {
            this.props.sendMsg({from,to,content})
        }
        // 清除输入数据
        this.setState({
            content: ''
        })
    }

    render() {
        const {user} = this.props
        const {users,chatMsgs} = this.props.chatMsgs
        const targetId = this.props.match.params.userId
        if(!users[targetId]){
            return null
        }
        const chatId = [user._id,targetId].sort().join('_')
        const header = require(`../../assets/imgs/headers/${users[targetId].headImg}.png`)
        // 过滤消息
        const msgs = chatMsgs.filter(msg => msg.chat_id === chatId)
        return (
            <div id='chat-page'>
                <NavBar className='sticky-header'>{users[targetId].username}</NavBar>
                <List style={{marginTop:50}}>
                    {
                        msgs.map(msg => {
                            if(msg.from === targetId) {
                                return <Item key={msg._id} thumb={header}>{msg.content}</Item>
                            } else {
                                return <Item key={msg._id} className='chat-me' extra='我'>{msg.content}</Item>
                            }
                        })
                    }
                </List>
                <div className='am-tab-bar'>
                    <InputItem placeholder="请输入" value={this.state.content}
                               onChange={(val) => this.handleChange(val,'content')}
                               extra={<span onClick={this.handleSendMsg}>发送</span>}/>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user, chatMsgs: state.chatMsgs}),
    {sendMsg}
)(Chat)

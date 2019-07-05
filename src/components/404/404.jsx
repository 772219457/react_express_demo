/**
 *
 * 404页
 * */

import React from 'react'
import notFound from './404.png'
import {Button} from "antd-mobile";

class NotFound extends React.Component {

    render() {
        return (
            <div>
                <img src={notFound} alt='404'/>
                <Button onClick={this.props.history.replace('/')}>返回首页</Button>
            </div>
        )
    }
}


export default NotFound

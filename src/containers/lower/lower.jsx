/**
 *
 * lower用户页
 * */

import React, {Component} from 'react'
import {connect} from 'react-redux'
import UserList from '../../components/user-list/user-list'
import {getUserList} from '../../redux/actions'
import Cookies from "js-cookie";
const userId = Cookies.get('userId')

class Lower extends Component {

    componentDidMount() {
        this.props.getUserList('boss',userId)
    }


    render() {
        return (
            <div>
                <UserList userList={this.props.userList}/>
            </div>
        )
    }
}

export default connect(
    state => ({userList: state.userList}),
    {getUserList}
)(Lower)

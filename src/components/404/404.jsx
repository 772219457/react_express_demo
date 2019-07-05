/**
 *
 * 404页
 * */

import React, {Component} from 'react'
import {connect} from 'react-redux'

class NotFound extends Component {

    render() {
        return (
            <div>
                404
            </div>
        )
    }
}

export default connect(
    state => ({}),
)(NotFound)

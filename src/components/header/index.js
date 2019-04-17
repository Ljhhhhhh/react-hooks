import React, { Component } from "react";
import { Row, Col, Icon } from "antd";
import Storage from '../../utils/storage'
import ApiUser from '../../api/user'
import {withRouter } from 'react-router';
import './index.scss'

const storge = new Storage()
const apiUser = new ApiUser()

class Header extends Component {
  state = {}
  componentDidMount() {
    const {username} = storge.getStorage('userinfo')
    this.setState({
      username
    })
  }
  logout = () => {
    apiUser.logout().then(res => {
      storge.removeStorage('userinfo')
      this.props.history.push('/login')
    })
  }
  render() {
    return (
      <div className="header-wrap">
        <Row type="flex" justify="end">
          <Col>
            <div className="user-info">
              <Icon type="user" />
              <span className="user-name">欢迎，{this.state.username}</span>
              <div className="logout-wrap" onClick={this.logout}>退出登录</div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
/**
 * 使用redux的情况
 * const Login=withRouter(connect(mapStateToProps,mapDispatchToProps)(TLogin))
 */
export default withRouter(Header)
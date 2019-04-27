import React, { useEffect, useState, useCallback, useContext } from "react";
import { Row, Col, Icon } from "antd";
import {withRouter} from 'react-router'
import Storage from '../../utils/storage'
import {myContext} from '../../storeByHooks/reducer'
import * as actionTypes from '../../storeByHooks/actionTypes'
import ApiUser from '../../api/user'
import './index.scss'

const storge = new Storage()
const apiUser = new ApiUser()

const Header = props => {
  const [username, setUsername] = useState('')
  const {state, dispatch} = useContext(myContext)

  useEffect(() => {
    const userinfo = storge.getStorage('userinfo');
    setUsername(userinfo.username)
    if (!state.userinfo.id) {
      dispatch({
        type: actionTypes.USERINFO,
        userinfo
      })
    }
  }, [])

  const logout = useCallback(() => {
    apiUser.logout().then(() => {
      storge.removeStorage('userinfo')
      props.history.push('/login')
    })
  }, [])

  return (
    <div className="header-wrap">
      <Row type="flex" justify="space-between">
        <Col className="page-title">{state.page_title}</Col>
        <Col>
          <div className="user-info">
            <Icon type="user" />
            <span className="user-name">欢迎，{username}</span>
            <div className="logout-wrap" onClick={logout}>退出登录</div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

/**
 * 使用redux的情况
 * const Login=withRouter(connect(mapStateToProps,mapDispatchToProps)(TLogin))
 */
// const mapStateToProps = state => {
//   return {
//     pageTitle: state.getIn(['common', 'page_title'])
//   }
// };

// export default withRouter(connect(mapStateToProps)(Header))
export default withRouter(Header)
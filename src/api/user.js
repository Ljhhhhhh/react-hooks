import request from '../utils/request'

export default class UserApi {
  login(data) {
    const {username, password} = data
    return request({
      url: '/manage/user/login.do',
      method: 'POST',
      data: {
        username,
        password
      }
    })
  }

  logout() {
    return request({
      url: '/user/logout.do',
      method: 'POST'
    })
  }

  fetchList(pageNum) {
    return request({
      url: '/manage/user/list.do',
      method: 'POST',
      data: {
        pageNum
      }
    })
  }
}
import request from '../utils/request'

export default class HomeApi {
  home() {
    return request({
      url: '/manage/statistic/base_count.do',
      method: 'get'
    })
  }
}
import request from '../utils/request'

export default class OrderApi {
  fetchOrder(pageNum = 1) {
    return request({
      url: '/manage/order/list.do',
      method: 'get',
      params: {
        pageNum
      }
    })
  }

  searchOrder(pageNum, orderNo) {
    return request({
      url: '/manage/order/search.do',
      params: {
        orderNo,
        pageNum,
        listType: 'search'
      }
    })
  }

  orderDetail(orderNo) {
    return request({
      url: '/manage/order/detail.do',
      params: {
        orderNo
      }
    })
  }
}
import request from '../utils/request'

export default class ProductApi {
  getCateById(id) {
    return request({
      url: '/manage/category/get_category.do',
      method: 'get',
      params: {
        categoryId: id
      }
    })
  }

  editCateName(id, name) {
    return request({
      url: '/manage/category/set_category_name.do',
      params: {
        categoryId: id,
        categoryName: name
      }
    })
  }
}
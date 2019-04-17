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

  createCagegory(params) {
    return request({
      url: '/manage/category/add_category.do',
      params
    })
  }

  fetchProduct(pageNum){
    return request({
      url: '/manage/product/list.do',
      params: {
        pageNum
      }
    })
  }

  fetchProductBySearch({searchType, key, pageNum}) {
    return request({
      url: '/manage/product/search.do',
      params: {
        listType: 'search',
        [searchType]:key,
        pageNum
      }
    })
  }

  createProduct(data) {
    return request({
      url: '/manage/product/save.do',
      params: data
    })
  }

  productDetail(productId) {
    return request({
      url: '/manage/product/detail.do',
      params: {
        productId
      }
    })
  }

  setStatus(productId, status) {
    return request({
      url: '/manage/product/set_sale_status.do',
      params: {
        productId,
        status
      }
    })
  }
}
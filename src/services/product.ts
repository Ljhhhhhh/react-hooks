import request from "@/utils/request";

interface changeCategoryNameParams {
  categoryId: number
  categoryName: string
}

interface CreateCategoryParams {
  parentId: number
  categoryName: string
}

export function fetchCategory(categoryId: number  = 0) {
  return request(`/manage/category/get_category.do?categoryId=${categoryId}`)
}

export function changeCategoryName(data: changeCategoryNameParams) {
  const {categoryId, categoryName} = data
  return request('/manage/category/set_category_name.do', {
    params: {
      categoryId,
      categoryName
    }
  })
}

export function createCreategory(data: CreateCategoryParams) {
  const {parentId, categoryName} = data
  return request('/manage/category/add_category.do', {
    params: {
      parentId,
      categoryName
    }
  })
}

interface fetchProductParams {
  pageNum: number
  searchValue?: number
  searchType?: string
}

export function fetchProduct(data: fetchProductParams = {pageNum: 1}) {
  let url, params;
  console.log(data, 'request data')
  let { pageNum, searchType, searchValue } = data
  if ( searchValue ) {
    url = '/manage/product/search.do'
    params = {
      listType: 'search',
      pageNum,
      [searchType!]: searchValue
    }
  } else {
    url = '/manage/product/list.do'
    params = {pageNum}
  }
  return request({
    url,
    params
  })
}
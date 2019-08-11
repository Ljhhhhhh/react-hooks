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

export function setProductStatus(data: {productId: number, status: 1 | 2}) { // 1:上架 2:下架
  const { productId, status } = data
  return request({
    url: '/manage/product/set_sale_status.do',
    params: {
      productId,
      status
    }
  })
}

interface productProps {
  categoryId: number;
  name: string;
  subtitle: string;
  subImages: string;
  detail: string;
  price: number;
  stock: number;
  status?: number
}

export function createProduct(data: productProps) {
  return request({
    url: '/manage/product/save.do',
    params: data
  })
}
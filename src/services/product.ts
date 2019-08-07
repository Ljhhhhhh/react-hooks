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
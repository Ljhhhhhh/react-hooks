import request from "@/utils/request";

// interface listParams {
//   current: number
//   pageSize?: number
// }

export function fetchCategory(categoryId: number  = 0) {
  return request(`/manage/category/get_category.do?categoryId=${categoryId}`)
}
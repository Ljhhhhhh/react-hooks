import request from "@/utils/request";

export function fetchUser(pageNum?: number) {
  return request('/manage/user/list.do', {
    method: 'POST',
    data: {
      pageNum
    }
  })
}
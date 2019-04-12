import {message} from 'antd'

export default class Storage {
  setStorage(name, data) {
    let dataType = typeof data;
    // json对象
    if (dataType === "object") {
      window.localStorage.setItem(name, JSON.stringify(data));
    }
    // 基础类型
    else if (["number", "string", "boolean"].indexOf(dataType) >= 0) {
      window.localStorage.setItem(name, data);
    }
    // 其他不支持的类型
    else {
      message.warn('该类型不能用于本地存储')
    }
  }
  // 取出本地存储内容
  getStorage(name) {
    let data = window.localStorage.getItem(name);
    if (data) {
      return JSON.parse(data);
    } else {
      return "";
    }
  }
  // 删除本地存储
  removeStorage(name) {
    window.localStorage.removeItem(name);
  }
}

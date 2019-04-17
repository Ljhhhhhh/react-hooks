const menuList = [
  {
    title: "首页",
    key: "/home",
    icon: 'home'
  },
  {
    title: "商品管理",
    key: "/product",
    icon: 'shop',
    children: [
      {
        title: "商品管理",
        key: "/product/index",
        icon: 'shop'
      },
      {
        title: "品类管理",
        key: "/product/category/index",
        icon: 'tags'
      }
    ]
  },
  {
    title: "订单管理",
    key: "/order/list",
    icon: 'ordered-list'
  },
  {
    title: "用户管理",
    key: "/user",
    icon: 'user'
  },
  {
    title: "权限设置",
    key: "/permission",
    icon: 'safety'
  }
];
export default menuList;

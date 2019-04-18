const menuList = [
  {
    title: "首页",
    key: "/home",
    icon: 'home',
    role: [0, 1]
  },
  {
    title: "商品管理",
    key: "/product",
    icon: 'shop',
    role: [0, 1],
    children: [
      {
        title: "商品管理",
        key: "/product/index",
        icon: 'shop',
        role: [0, 1]
      },
      {
        title: "品类管理",
        key: "/product/category/index",
        icon: 'tags',
        role: [0, 1]
      }
    ]
  },
  {
    title: "订单管理",
    key: "/order/list",
    icon: 'ordered-list',
    role: [1]
  },
  {
    title: "用户管理",
    key: "/user",
    icon: 'user',
    role: [1] // role 模拟 0 非管理员， 1 管理员
  }
];
export default menuList;

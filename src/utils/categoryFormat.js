const categoryMap = [
  {
    value: 100001,
    parentValue: 0,
    title: "开发软件",
    createTime: 1490431560000
  },
  {
    value: 100002,
    parentValue: 0,
    title: "苹果充电器",
    createTime: 1490431581000
  },
  {
    value: 100003,
    parentValue: 0,
    title: "钻石项链",
    createTime: 1490431793000
  },
  {
    value: 100004,
    parentValue: 0,
    title: "平板",
    createTime: 1490431819000
  },
  { value: 100005, parentValue: 0, title: "红米note7 pro" },
  {
    value: 100032,
    parentValue: 0,
    title: "狗粮、猫粮",
    createTime: 1499048575000
  },
  {
    value: 100034,
    parentValue: 100001,
    title: "iphone8x系列",
    createTime: 1499048947000
  },
  {
    value: 100035,
    parentValue: 100001,
    title: "阿迪达斯正版",
    createTime: 1499101183000
  },
  {
    value: 100036,
    parentValue: 100001,
    title: "马刺",
    createTime: 1499101210000
  },
  {
    value: 100037,
    parentValue: 100001,
    title: "毛绒玩具",
    createTime: 1499103253000
  },
  {
    value: 100038,
    parentValue: 100001,
    title: "鼠标",
    createTime: 1499103726000
  },
  {
    value: 100042,
    parentValue: 100002,
    title: "键盘",
    createTime: 1499751513000
  },
  {
    value: 100043,
    parentValue: 100002,
    title: "平板电脑",
    createTime: 1499779286000
  },
  {
    value: 100047,
    parentValue: 100002,
    title: "6666",
    createTime: 1501120530000
  },
  {
    value: 100057,
    parentValue: 100002,
    title: "耳机",
    createTime: 1505009472000
  },
  {
    value: 100064,
    parentValue: 100002,
    title: "订单",
    createTime: 1509186273000
  },
  {
    value: 100065,
    parentValue: 100032,
    title: "电脑",
    createTime: 1509331920000
  },
  {
    value: 100067,
    parentValue: 100032,
    title: "音箱",
    createTime: 1509421197000
  },
  {
    value: 100075,
    parentValue: 100032,
    title: "显示器",
    createTime: 1510198242000
  },
  {
    value: 100086,
    parentValue: 100075,
    title: "纸张",
    createTime: 1512354316000
  }
];

// TODO:: 利用函数导出处理后的分类
const getCateList = () => {
  const originCategoryList = categoryMap;
  originCategoryList.forEach((category, index) => {
    category.key = Date.now() + "" + index;
    let parentValue = category.parentValue;
    if (parentValue !== 0) {
      originCategoryList.forEach(cate => {
        if (cate.value === parentValue) {
          let cateChild = cate.children;
          if (!cateChild) {
            cateChild = [];
          }
          cateChild.push(category);
          cate.children = cateChild;
        }
      });
    }
  });
  let categoryList = originCategoryList.filter(
    category => category.parentValue === 0
  );
  categoryList = [{
    value: 0,
    parentValue: 0,
    key: 0,
    title: "全部",
    createTime: 1490431560000,
    children: categoryList
  }] 
  // categoryList.unshift();
  return categoryList;
};

export default getCateList;
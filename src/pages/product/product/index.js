import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useCallback
} from "react";
import {
  Table,
  Form,
  Button,
  Select,
  Input,
  Row,
  Col,
  Popconfirm,
  message
} from "antd";
import { withRouter } from "react-router";
import ProuctApi from "../../../api/product";
import "./index.scss";

const FormItem = Form.Item;
const Option = Select.Option;
const productApi = new ProuctApi();

function Product(props) {
  const [pageNum, setPageNum] = useState(1);
  const [productList, setProductList] = useState([]);
  const [productTotal, setProductTotal] = useState(0);

  useEffect(() => {
    const data = formRef.current.getFieldsValue()
    if (!data.key) {
      fetchList();
    }
  }, [pageNum]);

  const fetchList = useCallback(() => {
    productApi.fetchProduct(pageNum).then(res => {
      if (res.data) {
        formatResult(res.data);
      }
    });
  });

  const formatResult = data => {
    const { list, total, pageNum } = data;
    list.forEach((item, index) => {
      item.key = index;
    });
    setDatas(pageNum, list, total);
  };

  const setDatas = (pageNum, list, total) => {
    setPageNum(pageNum);
    setProductList(list);
    setProductTotal(total);
  };

  const handleProduct = (item, detail = false) => {
    // TODO:: redux记住当前页
    let url = "/product/product";
    if (item && item.id) {
      url = url + "/" + item.id;
      if (detail) {
        url = url + "/detail";
      }
    }
    props.history.push(url);
  };

  const setStatus = product => {
    const { id, status } = product;
    let newStatus = status === 1 ? 2 : 1;
    productApi.setStatus(id, newStatus).then(res => {
      message.info(res.data);
      fetchList();
    });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "商品名称",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "价格",
      dataIndex: "price",
      key: "price"
    },
    {
      title: "状态",
      key: "status",
      render: product => {
        const onSale = +product.status === 1;
        const confirmTittle = onSale
          ? "确定要下架该商品吗？"
          : "确定要上线该商品吗？";
        return (
          <div>
            <span className="state-name">{onSale ? "在售" : "已下架"}</span>
            <Popconfirm
              placement="topLeft"
              title={confirmTittle}
              onConfirm={() => {
                setStatus(product);
              }}>
              <Button size="small" type={onSale ? "danger" : "default"}>
                {onSale ? "下架" : "上架"}
              </Button>
            </Popconfirm>
          </div>
        );
      }
    },
    {
      title: "操作",
      key: "handle",
      render: value => {
        return (
          <div className="handle-wrap">
            <Button
              type="primary"
              shape="circle"
              icon="eye"
              onClick={() => {
                handleProduct(value, true);
              }}
            />
            <Button
              shape="circle"
              icon="edit"
              onClick={() => {
                handleProduct(value);
              }}
            />
          </div>
        );
      }
    }
  ];

  const rowSelection = {
    type: "radio",
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    }
  };

  const formRef = useRef();

  return (
    <div>
      <div className="handle-wrap">
        <div className="search-form">
          <SearchForm
            setDatas={setDatas}
            fetchList={fetchList}
            formatResult={formatResult}
            pageNum={pageNum}
            ref={formRef}
          />
        </div>
        <div className="handle-add">
          <Button type="dashed" icon="plus" onClick={handleProduct}>
            添加商品
          </Button>
        </div>
      </div>

      <Table
        pagination={{
          current: pageNum,
          total: productTotal,
          onChange: page => {
            setPageNum(page);
          }
        }}
        bordered
        rowSelection={rowSelection}
        columns={columns}
        dataSource={productList}
      />
    </div>
  );
}

let SearchForm = (props, ref) => {
  const {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    resetFields
  } = props.form;

  useEffect(() => {
    const data = getFieldsValue()
    console.log(data.key);
    if (data.key) {
      handleSearch()
    }
  }, [props.pageNum])

  const resetForm = useCallback(() => {
    resetFields();
    props.setDatas(1, [], 0);
    props.fetchList();
  }, []);

  const handleSearch = useCallback(() => {
    validateFields((err, values) => {
      if (!err) {
        const data = getFieldsValue();
        Object.assign(data, {
          pageNum: props.pageNum
        });
        productApi.fetchProductBySearch(data).then(res => {
          props.formatResult(res.data);
        });
      }
    });
  });

  return (
    <Row gutter={10}>
      <Form ref={ref}>
        <Col span={4}>
          <FormItem>
            {getFieldDecorator("searchType", {
              initialValue: "productName"
            })(
              <Select>
                <Option value="productName">按商品名称</Option>
                <Option value="productId">按商品ID</Option>
              </Select>
            )}
          </FormItem>
        </Col>
        <Col span={4}>
          <FormItem>
            {getFieldDecorator("key", {
              initialValue: "",
              rules: [
                {
                  required: true,
                  message: "请输入需要搜索的值"
                }
              ]
            })(<Input placeholder="请输入需要搜索的值" />)}
          </FormItem>
        </Col>
      </Form>
      <Button
        className="search-btn"
        icon="search"
        type="primary"
        onClick={handleSearch}>
        搜索
      </Button>
      <Button className="search-btn" icon="reload" onClick={resetForm}>
        重置
      </Button>
    </Row>
  );
};

SearchForm = Form.create()(forwardRef(SearchForm));

export default withRouter(Product);
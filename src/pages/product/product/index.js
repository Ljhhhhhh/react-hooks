import React, { Component } from "react";
import { Table, Form, Button, Select, Input, Row, Col, Popconfirm, message } from "antd";
import {withRouter} from 'react-router'
import ProuctApi from "../../../api/product";
import "./index.scss";

const FormItem = Form.Item;
const Option = Select.Option;
const productApi = new ProuctApi();

 class Product extends Component {
  state = {
    pageNum: 1,
    productList: [],
    productTotal: 0
  };
  componentDidMount() {
    this.fetchList();
  }

  formatResult = data => {
    const { list, total, pageNum } = data;
    list.forEach((item, index) => {
      item.key = index;
    });
    this.setState({
      productList: list,
      productTotal: total,
      pageNum
    });
  };

  fetchList = () => {
    productApi.fetchProduct(this.state.pageNum).then(res => {
      this.formatResult(res.data);
    });
  };

  handleSearch = (page = 1) => {
    this.searchForm.props.form.validateFields((err, values) => {
      if (!err) {
        const data = this.searchForm.props.form.getFieldsValue();
        this.setState(
          {
            searchType: data.searchType,
            searchKey: data.key,
            pageNum: page
          },
          () => {
            Object.assign(data, {
              pageNum: this.state.pageNum
            });
            productApi.fetchProductBySearch(data).then(res => {
              this.formatResult(res.data);
            });
          }
        );
      }
    });
  };

  handleReset = () => {
    this.searchForm.props.form.resetFields();
    this.setState(
      {
        searchType: "",
        searchKey: "",
        pageNum: 1
      },
      () => {
        this.fetchList();
      }
    );
  };

  handleProduct = (item, detail = false) => {
    // TODO:: redux记住当前页
    let url = '/product/product'
    if (item && item.id) {
      url = url + '/' + item.id
      if (detail) {
        url = url + '/detail'
      }
    }
    this.props.history.push(url)
  }

  setStatus = (product) => {
    const {id, status} = product;
    let newStatus = status === 1 ? 2 : 1
    productApi.setStatus(id, newStatus).then(res => {
      message.info(res.data)
      this.fetchList()
    })
  }

  render() {
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
          const confirmTittle = onSale ? '确定要下架该商品吗？' : '确定要上线该商品吗？'
          return (
            <div>
              <span className="state-name">{onSale ? "在售" : "已下架"}</span>
              <Popconfirm placement="topLeft" title={confirmTittle} onConfirm={() => {this.setStatus(product)}}>
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
              <Button type="primary" shape="circle" icon="eye" onClick={() => {this.handleProduct(value, true)}} />
              <Button shape="circle" icon="edit" onClick={() => {this.handleProduct(value)}} />
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
    return (
      <div>
        <div className="handle-wrap">
          <div className="search-form">
            <SearchForm
              handleReset={this.handleReset}
              handleSearch={this.handleSearch}
              wrappedComponentRef={inst => {
                this.searchForm = inst;
              }}
            />
          </div>
          <div className="handle-add">
            <Button type="dashed" icon="plus" onClick={this.handleProduct}>添加商品</Button>
          </div>
        </div>

        <Table
          pagination={{
            current: this.state.pageNum,
            total: this.state.productTotal,
            onChange: page => {
              // setState的第二个参数可以解决异步问题
              this.setState(
                {
                  pageNum: page
                },
                () => {
                  if (this.state.searchKey) {
                    console.log(this.state.pageNum);
                    this.handleSearch(this.state.pageNum);
                  } else {
                    this.fetchList();
                  }
                }
              );
            }
          }}
          bordered
          rowSelection={rowSelection}
          columns={columns}
          dataSource={this.state.productList}
        />
      </div>
    );
  }
}

class SearchForm extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row gutter={10}>
        <Form>
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
          onClick={() => {
            this.props.handleSearch();
          }}>
          搜索
        </Button>
        <Button
          className="search-btn"
          icon="reload"
          onClick={this.props.handleReset}>
          重置
        </Button>
      </Row>
    );
  }
}

SearchForm = Form.create()(SearchForm);
export default withRouter(Product)

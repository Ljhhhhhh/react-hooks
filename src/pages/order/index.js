import React, { Component } from "react";
import { withRouter } from "react-router";
import { Table, Form, Input, Button } from "antd";
import OrderApi from "../../api/order";

const orderApi = new OrderApi();
const FormItem = Form.Item;

class Order extends Component {
  state = {
    pageNum: 1,
    list: []
  };

  componentDidMount() {
    this.getList();
  }

  getList = (refresh = false) => {
    const data = this.filterForm.props.form.getFieldsValue();
    const orderNo = data.orderNo;
    let handle = orderNo ? orderApi.searchOrder : orderApi.fetchOrder;
    this.setState(
      {
        pageNum: refresh ? 1 : this.state.pageNum
      },
      () => {
        handle(this.state.pageNum, orderNo).then(res => {
          const data = res.data || { list: [], total: 0 };
          data.list.forEach(order => {
            order.key = order.orderNo;
          });
          this.setState({
            list: data.list,
            orderTotal: data.total
          });
        });
      }
    );
  };

  goDetail = value => {
    this.props.history.push('/order/detail/' + value.orderNo)
    console.log(value);
  };

  render() {
    const columns = [
      {
        title: "订单号",
        dataIndex: "orderNo",
        key: "orderNo"
      },
      {
        title: "收件人",
        dataIndex: "receiverName",
        key: "receiverName"
      },
      {
        title: "订单状态",
        dataIndex: "statusDesc",
        key: "statusDesc"
      },
      {
        title: "订单总价",
        dataIndex: "payment",
        key: "payment"
      },
      {
        title: "创建时间",
        dataIndex: "createTime",
        key: "createTime"
      },
      {
        title: "操作",
        key: "handle",
        render: value => {
          return (
            <div className="handle-wrap">
              <Button
                type="primary"
                onClick={() => {
                  this.goDetail(value);
                }}>
                查看
              </Button>
            </div>
          );
        }
      }
    ];
    return (
      <div>
        <FilterForm
          wrappedComponentRef={inst => {
            this.filterForm = inst;
          }}
          search={this.getList}
        />
        <Table
          pagination={{
            current: this.state.pageNum,
            total: this.state.orderTotal,
            onChange: page => {
              // setState的第二个参数可以解决异步问题
              this.setState(
                {
                  pageNum: page
                },
                () => {
                  this.getList();
                }
              );
            }
          }}
          bordered
          columns={columns}
          dataSource={this.state.list}
        />
      </div>
    );
  }
}

export default withRouter(Order);

class FilterForm extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline">
        <FormItem label="订单号">
          {getFieldDecorator("orderNo")(<Input placeholder="请输入订单号" />)}
        </FormItem>
        <FormItem>
          <Button
            icon="search"
            onClick={() => {
              this.props.search(true);
            }}>
            查询
          </Button>
        </FormItem>
      </Form>
    );
  }
}

FilterForm = Form.create()(FilterForm);

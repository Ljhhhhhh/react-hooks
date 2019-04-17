import React, { Component } from 'react';
import {withRouter} from 'react-router'
import OrderApi from "../../api/order";
import {Form, Input, Table } from 'antd'
import { NavLink } from "react-router-dom";

const orderApi = new OrderApi();
const FormItem = Form.Item

class Detail extends Component {
  state = {
    detail: {
      shippingVo: {}
    },
    orderItem: []
  }
  componentDidMount() {
    const id = this.props.match.params.id
    orderApi.orderDetail(id).then(res => {
      res.data.orderItemVoList.forEach(item => {
        item.key = item.productId
      })
      this.setState({
        detail: res.data,
        orderItem: res.data.orderItemVoList
      })
    })
  }
  render() {
    const detail = this.state.detail;
    const formLayout = {
      labelAlign: 'left',
      labelCol: {
        md: 3,
        xs: 24,
      },
      wrapperCol: {
        md: 6,
        xs: 24
      }
    }
    return (
      <div>
        <Form layout="horizontal" {...formLayout} >
          <FormItem label="订单号">
            <Input readOnly value={detail.paymentTypeDesc} />
          </FormItem>
          <FormItem label="创建时间">
            <Input readOnly value={detail.createTime} />
          </FormItem>
          <FormItem label="收件人">
            <Input readOnly value={detail.shippingVo? detail.shippingVo.receiverName : ''} />
          </FormItem>
          <FormItem label="订单状态">
            <Input readOnly value={detail.statusDesc} />
          </FormItem>
          <FormItem label="支付方式">
            <Input readOnly value={detail.paymentTypeDesc} />
          </FormItem>
          <FormItem label="订单金额">
            <Input readOnly value={'￥' + detail.payment} />
          </FormItem>
        </Form>
        <OrderProductList imageHost={detail.imageHost} dataSource={this.state.orderItem} />
        <NavLink to="/order/list">返回</NavLink>
      </div>
    );
  }
}

export default withRouter(Detail);

class OrderProductList extends Component{
  render() {
    const {imageHost, dataSource} = this.props
    const columns = [
      {
        title: '商品图片',
        dataIndex: "productImage",
        key: "productImage",
        render: (value) => {
          return (
            <span>
              <img src={imageHost + value} width='100px' alt="" />
            </span>
          )
        }
      },
      {
        title: '商品信息',
        dataIndex: 'productName',
        key: 'productName'
      },
      {
        title: '单价',
        dataIndex: 'currentUnitPrice',
        key: 'currentUnitPrice',
        render: (value) => {
          return (
            <span>￥{value}</span>
          )
        }
      },
      {
        title: '数量',
        dataIndex: 'quantity',
        key: 'quantity'
      },
      {
        title: '合计',
        dataIndex: 'totalPrice',
        key: 'totalPrice',
        render: (value) => {
          return (
            <span>￥{value}</span>
          )
        }
      },
      
    ]
    return (
      <Table
        dataSource={dataSource}
        columns={columns}
      />
    )
  }
}

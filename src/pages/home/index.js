import React, { Component } from "react";
import HomeApi from "../../api/home";
import {NavLink} from 'react-router-dom'
import {Row, Col, Icon} from 'antd'
import './index.scss'

const homeApi = new HomeApi();

export default class Home extends Component {
  state = {};
  componentDidMount() {
    this.getHomeData();
  }

  getHomeData = () => {
    homeApi.home().then(res => {
      console.log(res);
      const { orderCount, productCount, userCount } = res.data;
      this.setState({
        orderCount,
        productCount,
        userCount
      });
    });
  };

  // /manage/statistic/base_count.do
  render() {
    return (
      <Row type="flex" justify="space-around" gutter={10}>
        <Col span={7}>
          <NavLink to="/product" className="count-box brown">
            <div className="count_value">{this.state.productCount}</div>
            <div className="count_key"><Icon type="shop" /><span>商品总数</span></div>
          </NavLink>
        </Col>
        <Col span={7}>
          <NavLink to="/order" className="count-box green">
            <div className="count_value">{this.state.orderCount}</div>
            <div className="count_key"><Icon type="ordered-list"/><span>订单总数</span></div>
          </NavLink>
        </Col>
        <Col span={7}>
          <NavLink to="/user" className="count-box blue">
            <div className="count_value">{this.state.userCount}</div>
            <div className="count_key"><Icon type="user"/><span>用户总数</span></div>
          </NavLink>
        </Col>
      </Row>
    );
  }
}

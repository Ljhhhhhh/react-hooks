import React, { Component } from "react";
import { Row, Col } from "antd";
import Nav from "../components/nav";
import Header from "../components/header";
import './index.scss'

export default class Layout extends Component {
  render() {
    return (
      <Row>
        <Col span={4}>
          <Nav />
        </Col>
        <Col span={20}>
          <Header/>
          <div className="layout-content">{this.props.children}</div>
        </Col>
      </Row>
    );
  }
}

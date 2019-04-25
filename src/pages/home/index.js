import React, { useState, useEffect } from "react";
import HomeApi from "../../api/home";
import { NavLink } from "react-router-dom";
import { Row, Col, Icon } from "antd";
import "./index.scss";

const homeApi = new HomeApi();

function Home() {
  const [counts, setCounts] = useState({});
  useEffect(() => {
    homeApi.home().then(res => {
      setCounts(res.data);
    });
  }, []);

  return (
    <div>
      <Row type="flex" justify="space-around" gutter={10}>
        <Col span={7}>
          <CountBlock
            link="/product"
            cls="brown"
            value={counts.productCount}
            icon="shop"
            label="商品总数"
          />
        </Col>
        <Col span={7}>
          <CountBlock
            link="/order"
            cls="green"
            value={counts.orderCount}
            icon="ordered-list"
            label="订单总数"
          />
        </Col>
        <Col span={7}>
          <CountBlock
            link="/user"
            cls="blue"
            value={counts.userCount}
            icon="user"
            label="用户总数"
          />
        </Col>
      </Row>
    </div>
  );
}

const CountBlock = props => {
  const { link, cls, value, icon, label } = props;
  return (
    <NavLink to={link} className={`count-box ${cls}`}>
      <div className="count_value">{value}</div>
      <div className="count_key">
        <Icon type={icon} />
        <span>{label}</span>
      </div>
    </NavLink>
  );
};

export default Home;

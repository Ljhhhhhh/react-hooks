import React, { Component } from "react";
import { Menu, Icon } from "antd";
import { NavLink } from "react-router-dom";
import routerConfig from "../../config/routerConfig";
import './index.scss'

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

export default class Nav extends Component {
  state = {
    menuTree: []
  };
  componentDidMount() {
    const menuTree = this.rednerMenu(routerConfig);
    this.setState({
      menuTree
    });
  }
  rednerMenu = data => {
    return data.map(route => {
      if (route.children && route.children.length) {
        return (
          <SubMenu key={route.key} title={<span><Icon type={route.icon} />{route.title}</span>}>
            {this.rednerMenu(route.children)}
          </SubMenu>
        );
      }
      return (
        <MenuItem key={route.key} title={route.title}>
          <NavLink to={route.key}><Icon type={route.icon} />{route.title}</NavLink>
        </MenuItem>
      );
    });
  };
  render() {
    return (
      <div className="nav-wrap">
        <Menu mode="inline" theme="dark">
          {this.state.menuTree}
        </Menu>
      </div>
    );
  }
}

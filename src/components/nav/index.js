import React, { Component } from "react";
import { Menu, Icon } from "antd";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import routerConfig from "../../config/routerConfig";
import { actionCreators } from "../../store/module/common";
import Storage from "../../utils/storage";
import "./index.scss";

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;
const storage = new Storage();
class Nav extends Component {
  state = {
    menuTree: [],
    currentKey: []
  };
  componentDidMount() {
    
    let currentKey = window.location.hash.replace(/#|\?.*$/g, "");
    const menuTree = this.rednerMenu(routerConfig);
    this.setState(
      {
        menuTree,
        currentKey: [currentKey]
      },
      () => {
        const { dispatch } = this.props;
        const routerAdd = function(data) {
          data.map(item => {
            if (item.children) {
              routerAdd(item.children);
            }
            routerList.push(item);
            return item;
          });
        };
        const routerList = [];
        routerAdd(routerConfig);
        if (currentKey === "/") {
          currentKey = "/home";
        }
        const currentMenu = routerList.filter(
          item => item.key === currentKey
        )[0];
        dispatch(actionCreators.setPageTitle(currentMenu.title));
      }
    );
  }
  rednerMenu = data => {
    const userinfo = storage.getStorage("userinfo");
    return data.map(route => {
      if (route.role.includes(userinfo.role)) {
        if (route.children && route.children.length) {
          return (
            <SubMenu
              key={route.key}
              title={
                <span>
                  <Icon type={route.icon} />
                  {route.title}
                </span>
              }>
              {this.rednerMenu(route.children)}
            </SubMenu>
          );
        }
        return (
          <MenuItem key={route.key} title={route.title}>
            <NavLink to={route.key}>
              <Icon type={route.icon} />
              {route.title}
            </NavLink>
          </MenuItem>
        );
      } else {
        return ''
      }
    });
  };

  handleClick = ({ key, item }) => {
    const { dispatch } = this.props;
    dispatch(actionCreators.setPageTitle(item.props.title));
    this.setState({
      currentKey: [key]
    });
  };
  render() {
    return (
      <div className="nav-wrap">
        <Menu
          mode="inline"
          theme="dark"
          onClick={this.handleClick}
          selectedKeys={this.state.currentKey}>
          {this.state.menuTree}
        </Menu>
      </div>
    );
  }
}

export default connect()(Nav);

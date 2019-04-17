import React, { Component } from "react";
import { Menu, Icon } from "antd";
import { NavLink } from "react-router-dom";
import {connect} from 'react-redux'
import routerConfig from "../../config/routerConfig";
import {actionCreators} from '../../store/module/common'
import './index.scss'

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;
class Nav extends Component {
  state = {
    menuTree: [],
    currentKey: []
  };
  componentDidMount() {
    const menuTree = this.rednerMenu(routerConfig);
    let currentKey = window.location.hash.replace(/#|\?.*$/g, '')
    console.log(currentKey)
    this.setState({
      menuTree,
      currentKey: [currentKey]
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

  handleClick = ({key, item}) => {
    const {dispatch} = this.props;
    dispatch(actionCreators.setPageTitle(item.props.title))
    this.setState({
      currentKey: [key]
    })
  }
  render() {
    return (
      <div className="nav-wrap">
        <Menu mode="inline" theme="dark" onClick={this.handleClick} selectedKeys={this.state.currentKey}>
          {this.state.menuTree}
        </Menu>
      </div>
    );
  }
}

export default connect()(Nav)
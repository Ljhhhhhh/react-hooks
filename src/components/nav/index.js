import React, { useContext, useState, useEffect } from "react";
import { Menu, Icon } from "antd";
import { NavLink } from "react-router-dom";
import routerConfig from "../../config/routerConfig";
import {myContext} from '../../storeByHooks/reducer'
import * as actionTypes from '../../storeByHooks/actionTypes'
import Storage from "../../utils/storage";
import "./index.scss";

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;
const storage = new Storage();

const Nav = props => {
  const [menuTree, setMenuTree] = useState([])
  const [currentKey, setCurrentKey] = useState([])
  const {dispatch} = useContext(myContext)

  useEffect(() => {
    setCurrentKey([window.location.hash.replace(/#|\?.*$/g, "")]);
    setMenuTree(rednerMenu(routerConfig));
  }, [])

  useEffect(() => {
    if (!currentKey.length) return
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
    if (currentKey[0] === "/") {
      // currentKey = "/home";
      setCurrentKey(["/home"])
    }
    const currentMenu = routerList.filter(
      item => item.key === currentKey[0]
    )[0];
    dispatch({
      type: actionTypes.PAGETITLE, 
      title: currentMenu.title
    });
  }, [currentKey])

  const rednerMenu = data => {
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
              {rednerMenu(route.children)}
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

  const handleClick = ({ key, item }) => {
    dispatch({
      type: actionTypes.PAGETITLE,
      title: item.props.title
    })
    // dispatch(actionCreators.setPageTitle(item.props.title));
    setCurrentKey([key])
  };

  return (
    <div className="nav-wrap">
      <Menu
        mode="inline"
        theme="dark"
        onClick={handleClick}
        selectedKeys={currentKey}>
        {menuTree}
      </Menu>
    </div>
  );

}
// class Nav extends Component {
//   state = {
//     menuTree: [],
//     currentKey: []
//   };
//   componentDidMount() {
    
//     let currentKey = window.location.hash.replace(/#|\?.*$/g, "");
//     const menuTree = this.rednerMenu(routerConfig);
//     this.setState(
//       {
//         menuTree,
//         currentKey: [currentKey]
//       },
//       () => {
//         const { dispatch } = this.props;
//         const routerAdd = function(data) {
//           data.map(item => {
//             if (item.children) {
//               routerAdd(item.children);
//             }
//             routerList.push(item);
//             return item;
//           });
//         };
//         const routerList = [];
//         routerAdd(routerConfig);
//         if (currentKey === "/") {
//           currentKey = "/home";
//         }
//         const currentMenu = routerList.filter(
//           item => item.key === currentKey
//         )[0];
//         dispatch(actionCreators.setPageTitle(currentMenu.title));
//       }
//     );
//   }
//   rednerMenu = data => {
//     const userinfo = storage.getStorage("userinfo");
//     return data.map(route => {
//       if (route.role.includes(userinfo.role)) {
//         if (route.children && route.children.length) {
//           return (
//             <SubMenu
//               key={route.key}
//               title={
//                 <span>
//                   <Icon type={route.icon} />
//                   {route.title}
//                 </span>
//               }>
//               {this.rednerMenu(route.children)}
//             </SubMenu>
//           );
//         }
//         return (
//           <MenuItem key={route.key} title={route.title}>
//             <NavLink to={route.key}>
//               <Icon type={route.icon} />
//               {route.title}
//             </NavLink>
//           </MenuItem>
//         );
//       } else {
//         return ''
//       }
//     });
//   };

//   handleClick = ({ key, item }) => {
//     const { dispatch } = this.props;
//     dispatch(actionCreators.setPageTitle(item.props.title));
//     this.setState({
//       currentKey: [key]
//     });
//   };
//   render() {
//     return (
//       <div className="nav-wrap">
//         <Menu
//           mode="inline"
//           theme="dark"
//           onClick={this.handleClick}
//           selectedKeys={this.state.currentKey}>
//           {this.state.menuTree}
//         </Menu>
//       </div>
//     );
//   }
// }

// export default connect()(Nav);
export default Nav;

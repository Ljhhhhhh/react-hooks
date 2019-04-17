import React, { Component } from "react";
import { withRouter } from "react-router";
import { Table } from "antd";
import UserApi from "../../api/user";

const userApi = new UserApi();

class Order extends Component {
  state = {
    pageNum: 1,
    list: []
  };

  componentDidMount() {
    this.getList();
  }

  getList = () => {
    userApi.fetchList(this.state.pageNum).then(res => {
      const data = res.data || { list: [], total: 0 };
      data.list.forEach(user => {
        user.key = user.id;
      });
      this.setState({
        list: data.list,
        userTotal: data.total
      });
    });
  };

  render() {
    const columns = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id"
      },
      {
        title: "用户名",
        dataIndex: "username",
        key: "username"
      },
      {
        title: "邮箱",
        dataIndex: "email",
        key: "email"
      },
      {
        title: "电话",
        dataIndex: "phone",
        key: "phone"
      },
      {
        title: "注册时间",
        dataIndex: "createTime",
        key: "createTime",
        render: (value) => {
          return new Date(value).toLocaleString('chinese', {hour12: false})
        }
      },
    ];
    return (
      <div>
        <Table
          pagination={{
            current: this.state.pageNum,
            total: this.state.userTotal,
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


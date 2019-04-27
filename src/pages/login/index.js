import React from "react";
import { Row, Col, Form, Input, Button, Checkbox, message } from "antd";
import UserApi from "../../api/user";
import Storage from "../../utils/storage";
import { withRouter } from "react-router";
import "./index.scss";

const FormItem = Form.Item;
const userApi = new UserApi();
const storage = new Storage();

const Login = props => {
  const { getFieldDecorator } = props.form;
  const handleSubmit = () => {
    props.form.validateFields((err, values) => {
      if (!err) {
        const data = props.form.getFieldsValue();
        userApi.login(data).then(res => {
          if (res.status === 0) {
            res.data.role = Math.random(0, 1) >= 0.5 ? 1 : 0
            storage.setStorage("userinfo", res.data);
            message.success("登录成功");
            props.history.replace("/");
          }
        });
      } else {
        console.log(err)
        Object.keys(err).forEach(v => {
          message.error(err[v].errors[0].message)
        })
        return false;
      }
    });
  };

  return (
      <div className="form-content">
        <h2>登录</h2>
        <Row type="flex" justify="center">
          <Col xs={20} md={12} lg={6}>
            <Form layout="vertical">
              <FormItem label="用户名">
                {getFieldDecorator("username", {
                  initialValue: "",
                  rules: [
                    {
                      required: true,
                      message: "用户名不能为空"
                    },
                    {
                      min: 5,
                      max: 10,
                      message: "长度不在范围内"
                    },
                    {
                      pattern: /^\w/g,
                      message: "必须是字母或者数字"
                    }
                  ]
                })(<Input placeholder="请输入用户名" />)}
              </FormItem>
              <FormItem label="密码">
                {getFieldDecorator("password", {
                  initialValue: "",
                  rules: [
                    {
                      required: true,
                      message: "密码不能为空"
                    }
                  ]
                })(<Input placeholder="请输入密码" type="password" />)}
              </FormItem>
              <FormItem label="记住密码">
                {getFieldDecorator("check", {
                  valuePropName: "checked",
                  initialValue: true
                })(<Checkbox>记住密码</Checkbox>)}
              </FormItem>
              <FormItem>
                <Button type="primary" onClick={handleSubmit}>登录</Button>
              </FormItem>
            </Form>
          </Col>
        </Row>
      </div>
  );
}

// class Login extends Component {
//   state = {};
  
//   handleSubmit = () => {
//     this.props.form.validateFields((err, values) => {
//       if (!err) {
//         const data = this.props.form.getFieldsValue();
//         userApi.login(data).then(res => {
//           if (res.status === 0) {
//             res.data.role = Math.random(0, 1) >= 0.5 ? 1 : 0
//             storage.setStorage("userinfo", res.data);
//             message.success("登录成功");
//             this.props.history.replace("/");
//           }
//         });
//       } else {
//         console.log(err)
//         Object.keys(err).forEach(v => {
//           message.error(err[v].errors[0].message)
//         })
//         return false;
//       }
//     });
//   };
//   render() {
//     const { getFieldDecorator } = this.props.form;
//     return (
//       <ContextProvider>
//         <div className="form-content">
//           <h2>登录</h2>
//           <Row type="flex" justify="center">
//             <Col xs={20} md={12} lg={6}>
//               <Form layout="vertical">
//                 <FormItem label="用户名">
//                   {getFieldDecorator("username", {
//                     initialValue: "",
//                     rules: [
//                       {
//                         required: true,
//                         message: "用户名不能为空"
//                       },
//                       {
//                         min: 5,
//                         max: 10,
//                         message: "长度不在范围内"
//                       },
//                       {
//                         pattern: /^\w/g,
//                         message: "必须是字母或者数字"
//                       }
//                     ]
//                   })(<Input placeholder="请输入用户名" />)}
//                 </FormItem>
//                 <FormItem label="密码">
//                   {getFieldDecorator("password", {
//                     initialValue: "",
//                     rules: [
//                       {
//                         required: true,
//                         message: "密码不能为空"
//                       }
//                     ]
//                   })(<Input placeholder="请输入密码" type="password" />)}
//                 </FormItem>
//                 <FormItem label="记住密码">
//                   {getFieldDecorator("check", {
//                     valuePropName: "checked",
//                     initialValue: true
//                   })(<Checkbox>记住密码</Checkbox>)}
//                 </FormItem>
//                 <FormItem>
//                   <Button type="primary" onClick={this.handleSubmit}>
//                     登录
//                   </Button>
//                 </FormItem>
//               </Form>
//             </Col>
//           </Row>
//         </div>
//       </ContextProvider>
//     );
//   }
// }

export default withRouter(Form.create()(Login));

import React, { Component } from "react";
import { Form, Input, Button, Checkbox } from "antd";

const FormItem = Form.Item;

class Login extends Component {
  state = {};
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form>
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
            })(<Input placeholder="请输入密码" />)}
          </FormItem>
          <FormItem label="记住密码">
            {
              getFieldDecorator('check', {
                valuePropName: 'checked',
                initialValue: true
              })(
                <Checkbox>记住密码</Checkbox>
              )
            }
          </FormItem>
          <FormItem>
            <Button type="primary">登录</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Login);

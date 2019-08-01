import { Icon } from "antd";
import { formatMessage } from "umi-plugin-react/locale"; // FormattedMessage,
import React, { Component } from "react";
import SchemaForm, { Field, FormButtonGroup, Submit, Reset } from "@uform/antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { Dispatch } from "redux";
// import Link from "umi/link";
import { connect } from "dva";
import styles from "./style.less";
import "antd/dist/antd.css";

interface StateType {
  status?: number;
  data: any;
}

interface LoginProps {
  dispatch: Dispatch<any>;
  userLogin: StateType;
  submitting: boolean;
}
interface LoginState {
  // type: string;
  autoLogin: boolean;
}
export interface FormDataType {
  userName: string;
  password: string;
}

@connect(
  ({
    user,
    loading
  }: {
    user: StateType;
    loading: {
      effects: {
        [key: string]: string;
      };
    };
  }) => ({
    user,
    submitting: loading.effects["user/login"]
  })
)
class Login extends Component<LoginProps, LoginState> {
  // loginForm: FormComponentProps['form'] | undefined | null = undefined;

  state: LoginState = {
    autoLogin: true
  };

  changeAutoLogin = (e: CheckboxChangeEvent) => {
    this.setState({
      autoLogin: e.target.checked
    });
  };

  handleSubmit = (values: FormDataType) => {
    const { dispatch } = this.props;
    dispatch({
      type: "user/login",
      payload: {
        ...values
      }
    });
  };

  render() {
    // const { userLogin, submitting } = this.props;
    // const { status } = userLogin;
    // const { autoLogin } = this.state;
    return (
      <div className={styles.main}>
        <SchemaForm layout="vertical" onSubmit={this.handleSubmit}>
          <Field
            type="string"
            required
            name="username"
            x-props={{
              placeholder: `${formatMessage({
                id: "user-login.login.userName"
              })}: admin`,
              prefix: <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
            }}
          />
          <Field
            type="password"
            name="password"
            required
            x-props={{
              // checkStrength: true,
              prefix: <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />,
              // autoComplete: "new-password",
              placeholder: `${formatMessage({
                id: "user-login.login.password"
              })}: admin`
            }}
          />
          <Field
            type="boolean"
            title={formatMessage({ id: "user-login.login.remember-me" })}
            name="autoLogin"
          />
          <FormButtonGroup>
            <Submit />
            <Reset />
          </FormButtonGroup>
        </SchemaForm>
      </div>
    );
  }
}

export default Login;

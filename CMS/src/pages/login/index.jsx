import React, { useEffect, useState } from "react";
import loginImg from '../../assets/login.png';
import './login.css';
import { Form, Input, Button, Checkbox, notification } from 'antd';
import { useNavigate } from 'react-router-dom';

import { setUserSession, getUserSession, removeUserSession, setIsAdmin, md5 } from "../../utils/utils";

import { credential } from "../../services/login";

const Login = (props) => {
  
  console.log(props);
  
  const language = props.language;

  const navigate = useNavigate();

  if (getUserSession()) {
    removeUserSession();
  }

  const onFinish = (values) => {
    console.log('Success:', values);
    credential(values.username, md5(values.password))
    .then(response => response.json())
    .then(response => {
      console.log(response)
      if (response.data && response.data[0].isAdmin  === 1) {
        setUserSession(response.meta);
        setIsAdmin(response.data[0].isAdmin);
        // setCredentialID(response.credentialID);
        navigate('/home')
      } else {
        notification["error"]({
          message: language["notification.error.message"],
          description: language["login.credential.api.success.fail"]
        });
      }
    })
    .catch(err => {
      console.log(err);
      notification["error"]({
        message: language["login.credential.api.error"],
        description: err.toString(),
      });
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="login-view">
      <div className="login-img-view"><img src={loginImg} alt="" className="login-img"></img></div>
      <div className="login-form">
        <Form
          className="login-ant-form"
          name="basic"
          layout="vertical"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 24,
          }}
          // initialValues={{
          //   remember: true,
          // }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <h3 className="loginTitle">{language["login.title"]}</h3>
          <Form.Item
            label={language["login.form.label.userName"]}
            name="username"
            rules={[
              {
                required: true,
                message: language["login.form.item.username.rule.message"],
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={language["login.form.label.Password"]}
            name="password"
            rules={[
              {
                required: true,
                message: language["login.form.item.password.rule.message"],
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          {/* <Form.Item
            name="remember"
            valuePropName="checked"
          >
            <Checkbox>{language["login.form.item.content.rememberMe"]}</Checkbox>
          </Form.Item> */}

          <Form.Item>
            <Button type="primary" htmlType="submit">{language["login.form.item.content.SIGNIN"]}</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}


export default Login
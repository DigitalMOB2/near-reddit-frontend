import React, { useCallback, useEffect, useMemo } from 'react';
import {
  Alert, Button, Checkbox, Col, Form, Input, Row,
} from 'antd';
import { useHistory } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';

import { config } from '../../../../config';
import { AuthRequest } from '../../../shared/models/auth-request';
import { useAuth } from './Auth.context';
import { AuthResponse } from '../../../shared/models/auth-response';
import { useFetch } from '../../../shared/hooks/useFetch';
import { getErrorMsgByCode } from './auth.helper';
import { getBackendEndpoint } from '../../../shared/utilities/api';
import { getJsonConvert } from '../../../shared/utilities/json-convert';

export function Login() {
  const authCtx = useAuth();
  const history = useHistory();
  const jsonConvert = useMemo(() => getJsonConvert(), []);

  const {
    loading, error, post, responseData,
  } = useFetch({
    path: getBackendEndpoint('/auth/login'),
    load: false,
  });

  const onFinish = useCallback(async (values: any) => {
    await post(new AuthRequest(values.username, values.password));
  }, []);

  useEffect(() => {
    if (!responseData) {
      return;
    }
    const authResponse = jsonConvert.deserializeObject(responseData.resource, AuthResponse);
    setTimeout(() => {
      authCtx.setAuthResponse(authResponse);
      history.push(config.routes.homepage);
    },
    1000);
  }, [responseData]);

  return (
    <>
      <Row gutter={12} justify="center">
        <Col>
          <h2 className="text-center">Sign in</h2>
          {error && (
            <Alert
              message="Error"
              description={getErrorMsgByCode(error.code)}
              type="error"
              showIcon
            />
          )}
          <Form
            className="m-t-20"
            name="basic"
            layout="vertical"
            size="large"
            initialValues={{ remember: true, username: '', password: '' }}
            onFinish={onFinish}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item className="text-center m-t-10">
              <Button type="primary" htmlType="submit" disabled={loading} icon={loading && <LoadingOutlined />}>
                Login
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}

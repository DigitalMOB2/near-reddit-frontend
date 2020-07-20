import React, {useCallback, useEffect, useMemo, useState} from 'react';
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
import { getErrorMsgByCode } from '../../../shared/utilities/auth.helper';
import { getBackendEndpoint } from '../../../shared/utilities/api';
import { getJsonConvert } from '../../../shared/utilities/json-convert';

export function Login() {
  const [verify, setVerify] = useState(false);
  const [user, setUser] = useState<any>({});
  const authCtx = useAuth();
  const history = useHistory();
  const jsonConvert = useMemo(() => getJsonConvert(), []);

  const {
    loading, error, post, responseData,
  } = useFetch({
    path: getBackendEndpoint('/auth/login'),
    load: false,
  });

  const users: any = {
    "owner": {name: "Reddit", type: "Owner"},
    "moderator": {name: "Near", type: "Moderator"},
    "user": {name: "Name", type: "User"}
  }

  const onFinish = useCallback(async (values: any) => {
    if (values.username in users) {
      setVerify(true);
      setUser(users[values.username]);
    }
  }, []);

  useEffect(() => {
    if (!verify) {
      return;
    }

    setTimeout(() => {
      authCtx.setAuthResponse({request: {status: '200', reason: 'OK'}, customer: {name: user.name, type: user.type, id: 1}});
      history.push(config.routes.homepage);
    },
    100);
  }, [verify, user]);

  return (
    <>
      <Row gutter={12} justify="center">
        <Col className={'w-25'}>
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
            initialValues={{ username: '' }}
            onFinish={onFinish}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
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

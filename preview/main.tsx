import { Card, ConfigProvider, Form, Space, Typography } from "antd";
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { NumberInput } from "../src";

const { Title, Text } = Typography;

const App: React.FC = () => {
  const [value1, setValue1] = useState<string | null>(null);
  const [value2, setValue2] = useState<string | null>("0");

  return (
    <ConfigProvider>
      <div style={{ maxWidth: 600, margin: "40px auto", padding: "0 20px" }}>
        <Title level={2}>antd-number-input Preview</Title>
        <Space orientation="vertical" size="large" style={{ width: "100%" }}>
          <Card title="基础用法(小数精度 2)">
            <Form layout="vertical">
              <Form.Item label="金额">
                <NumberInput value={value1} onChange={setValue1} precision={2} placeholder="请输入金额" />
              </Form.Item>
            </Form>
            <Text type="secondary">当前值: {JSON.stringify(value1)}</Text>
          </Card>

          <Card title="整数模式(precision=0)">
            <Form layout="vertical">
              <Form.Item label="数量">
                <NumberInput value={value2} onChange={setValue2} precision={0} emptyValue={0} />
              </Form.Item>
            </Form>
            <Text type="secondary">当前值: {JSON.stringify(value2)}</Text>
          </Card>
        </Space>
      </div>
    </ConfigProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);

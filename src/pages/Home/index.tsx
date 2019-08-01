import React, { useState, useEffect } from 'react';
import { fetchHome } from "@/services/home";
import { Statistic, Row, Col, Card } from 'antd'
import { PageHeaderWrapper } from "@ant-design/pro-layout";

interface countDataParams {
  orderCount?: number
  productCount?: number
  userCount?: number
}

const Home = () => {
  const [countData, setData] = useState<countDataParams>({});

  useEffect(() => {
    fetchHome().then(res => {
      const {data, status} = res;
      if (!status) {
        setData(data)
      }
    })
  }, [])

  return (
    <PageHeaderWrapper>
      <Row gutter={8}>
        {
          Object.keys(countData).map((key) => {
            return (
              <Col span={8} key={key}>
                <Card title={key}>
                  <Statistic value={countData[key]} />
                </Card>
              </Col>
            )
          })
        }
      </Row>
    </PageHeaderWrapper>
  )
}

export default Home;
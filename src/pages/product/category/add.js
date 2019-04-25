import React, { useState, useEffect, useCallback } from "react";
import ProductApi from '../../../api/product';
import { TreeSelect, Form, Input, Row, Col, Icon, Button, message } from "antd";
import {withRouter} from 'react-router'
import getCateList from '../../../utils/categoryFormat'

const FormItem = Form.Item;
const productApi = new ProductApi()

function CategoryAdd(props) {
  const { getFieldDecorator } = props.form;
  const [category, setCategory] = useState('')

  const selectCategory = useCallback(value => {
    setCategory(value)
  });

  const submit = () => {
    props.form.validateFields((err) => {
      const {categoryName} = props.form.getFieldsValue()
      if (!err) {
        const data = {
          parentId: category,
          categoryName: categoryName
        }
        productApi.createCagegory(data).then(res => {
          message.success(res.data)
          props.history.goBack()
        })
      }
    })
  }

  return (
    <div>
      <Row>
        <Col style={{width: 200}}>
          <Form layout="vertical">
            <FormItem>
              <CategorySelect selectCategory={selectCategory} />
            </FormItem>
            <FormItem>
              {getFieldDecorator("categoryName", {
                rules: [
                  {
                    required: true,
                    message: "类目名称不能为空"
                  },
                ]
              })(
                <Input placeholder="请输入类目名称" prefix={<Icon type="tag" />} />
              )}
            </FormItem>
          </Form>
          <Button type="primary" onClick={submit}>提交</Button>
        </Col>
      </Row>
    </div>
  );
}

function CategorySelect(props) {
  const [categoryList, setCategoryList] = useState([])

  useEffect(() => {
    setCategoryList(getCateList())
  }, [])

  return (
    <TreeSelect
      onSelect={value => {
        props.selectCategory(value);
      }}
      style={{ width: 200 }}
      treeData={categoryList}
      allowClear
      placeholder="请选择类目"
      showSearch
    />
  );
}

export default withRouter(Form.create()(CategoryAdd));

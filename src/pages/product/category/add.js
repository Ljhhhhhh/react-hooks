import React, { Component } from "react";
import ProductApi from '../../../api/product';
import { TreeSelect, Form, Input, Row, Col, Icon, Button, message } from "antd";
import {withRouter} from 'react-router'
import getCateList from '../../../utils/categoryFormat'

const FormItem = Form.Item;
const productApi = new ProductApi()

class CategoryAdd extends Component {
  state = {};

  selectCategory = value => {
    this.setState({
      category: value
    });
  };

  submit = () => {
    this.props.form.validateFields((err, values) => {
      const {categoryName} = this.props.form.getFieldsValue()
      if (!err) {
        const data = {
          parentId: this.state.category,
          categoryName: categoryName
        }
        productApi.createCagegory(data).then(res => {
          message.success(res.data)
          this.props.history.goBack()
          // this.props.history.
        })
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Row>
          <Col style={{width: 200}}>
            <Form layout="vertical">
              <FormItem>
                <CategoryTreeSelect selectCategory={this.selectCategory} />
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
            <Button type="primary" onClick={this.submit}>提交</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

class CategoryTreeSelect extends Component {
  state = {
    categoryList: []
  };

  componentDidMount() {
    this.getCateList();
  }

  getCateList = () => {
    const categoryList = getCateList()
    this.setState({
      categoryList
    });
  };

  render() {
    return (
      <TreeSelect
        onSelect={value => {
          this.props.selectCategory(value);
        }}
        style={{ width: 200 }}
        treeData={this.state.categoryList}
        allowClear
        placeholder="请选择类目"
        showSearch
      />
    );
  }
}

export default withRouter(Form.create()(CategoryAdd));

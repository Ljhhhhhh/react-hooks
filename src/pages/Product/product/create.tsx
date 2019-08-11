import React, { useState, useEffect } from 'react';
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import SchemaForm, { Field, Submit, Reset, FormButtonGroup } from "@uform/antd";
import { Row, Col } from 'antd'
import { connect } from "dva";
import { ProductProps } from './index'
import { Dispatch } from "redux";
import { CategoryState } from './model';
import {RouteComponentProps} from "react-router";
import withRouter from 'umi/withRouter'
import BraftEditor from 'braft-editor' // 使用文档： https://www.yuque.com/braft-editor/be/lzwpnr
// 引入编辑器样式
import 'braft-editor/dist/index.css'

interface CreateProductProps extends RouteComponentProps {
  dispatch: Dispatch<any>;
  product: CategoryState;
  history: any;
  loading: {
    models: {
      [key: string]: boolean;
    };
  };
}

const CreateProduct = (props: CreateProductProps) => {
  const [productDetail, setProductDetail] = useState('')
  const [productId, setProductId] = useState(null)
  const [readOnly, setReadOnly] = useState(false)

  const { dispatch } = props

  useEffect(() => {
    console.log(props, 'props');
    dispatch({
      type: 'category/getList',
    })
    const {id = null, editable = true} = props.history.location.query;
    setProductId(id)
    setReadOnly(!editable)
  }, [])

  const categoryList = [
    { label: '按商品名', value: 'productName' },
    { label: '按商品ID', value: 'productId' },
  ]

  // TODO:: 多级分类 图片上传

  // const submitContent = async () => {
  //   // 在编辑器获得焦点时按下ctrl+s会执行此方法
  //   // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
  //   const htmlContent = productDetail.toHTML()
  //   const result = await saveEditorContent(htmlContent)
  // }

  const submit = (values: any) => {
    console.log(values, 'submit', productId)
  }


  return (
    <PageHeaderWrapper>
      <Row>
        <Col lg={12} md={24}>
          <SchemaForm
            onSubmit={submit}
          >
            {/* <Field
        default="productName"
        type="string"
        enum={categoryList}
        name="searchType"
      /> */}
            <Field
              title="产品名称"
              type="string"
              name="name"
              required
            />
            <Field
              title="产品描述"
              type="string"
              name="subtitle"
              required
            />
            <Field
              title="所属分类"
              type="string"
              name="categoryId"
              enum={categoryList}
              required
            />
            <Field
              title="产品价格"
              type="string"
              name="price"
              required
            />
            <Field
              title="产品库存"
              type="string"
              name="stock"
              required
            />
            <Field
              title="产品图片"
              type="upload"
              name="stock"
              x-props={{ listType: 'card' }}
              required
            />
            <BraftEditor
              value={productDetail}
              placeholder="请填写产品详情"
              onChange={(value) => setProductDetail(value)}
            // onSave={submitContent}
              readOnly={readOnly}
            />


            <FormButtonGroup>
              <Submit />
              <Reset />
            </FormButtonGroup>
          </SchemaForm>
        </Col>
      </Row>
    </PageHeaderWrapper>
  )
}
/* 
  categoryId: number;
  name: string;
  subtitle: string;
  subImages: string;
  detail: string;
  price: number;
  stock: number;
  status?: number
*/

export default connect(
  ({
    category,
    product,
    loading
  }: {
    category: any;
    product: ProductProps;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    category, // 局部model，需要重新处理
    product,
    loading: loading.models.product
  })
)(withRouter(CreateProduct));
// export default withRouter(CreateProduct)
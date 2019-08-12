import React, { useState, useEffect } from 'react';
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import SchemaForm, { Field, Submit, Reset, FormButtonGroup } from "@uform/antd";
import { Row, Col, Cascader } from 'antd'
import { connect } from "dva";
import { ProductProps } from './index'
import { Dispatch } from "redux";
import { ProductStateProps } from './model';
import { CascaderOptionType } from 'antd/lib/cascader'
import { CategoryState } from '../model';
import { RouteComponentProps } from "react-router";
import withRouter from 'umi/withRouter'
import BraftEditor from 'braft-editor' // 使用文档： https://www.yuque.com/braft-editor/be/lzwpnr
import { fetchCategory } from '@/services/product'
import { BASE_URL } from '@/utils/request'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
import './style.less'

interface CreateProductProps extends RouteComponentProps {
  dispatch: Dispatch<any>;
  product: ProductStateProps;
  category: CategoryState;
  history: any;
  loading: {
    models: {
      [key: string]: boolean;
    };
  };
}

const CreateProduct = (props: CreateProductProps) => {
  const [productDetail, setProductDetail] = useState('')
  const [categoryList, setCategoryList] = useState<CascaderOptionType[]>([])
  const [productId, setProductId] = useState(null)
  const [readOnly, setReadOnly] = useState(false)
  const [subPics, setSubImages] = useState<string[]>([])
  const [categoryId, setCategoryId] = useState<number | null>(null)

  const { dispatch } = props

  interface uploadResultProps {
    data: {
      uri: string
      url: string
    }
    status: number
  }

  useEffect(() => {
    dispatch({
      type: 'category/getList',
    })
    const { id = null, editable = true } = props.history.location.query;
    setProductId(id)
    setReadOnly(!editable)
  }, [])

  useEffect(() => {
    const normalizeCategoryList = props.category.list.map((category: any) => {
      return {
        label: category.name,
        value: category.id,
        isLeaf: false
      }
    })
    setCategoryList(normalizeCategoryList)
  }, [props.category.list])


  // TODO:: 多级分类 图片上传

  // const submitContent = async () => {
  //   // 在编辑器获得焦点时按下ctrl+s会执行此方法
  //   // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
  //   const htmlContent = productDetail.toHTML()
  //   const result = await saveEditorContent(htmlContent)
  // }

  const submit = (values: any) => {
    const subImages = subPics.map((item: any) => {
      item.replace('\\/g', '\/')
      return item.split('/')[3]
    })
    console.log(subImages, 'subImages')
    console.log({form: values, productId, categoryId})
  }

  const categoryChange = (value: any) => {
    const selected: number = value.pop();
    setCategoryId(selected)
  }

  const loadData = async (selectedOptions: any) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    const res = await fetchCategory(targetOption.value)
    targetOption.loading = false;
    const childrenList = res.data.map((item: any) => {
      return {
        value: item.id,
        label: item.name
      }
    });
    targetOption.children = childrenList
    setCategoryList([...categoryList])
  };

  const uploadSuccess = () => {
    return {
      onChange(res: uploadResultProps[]) {
        const piclist: string[] = []
        res.map((item: any) => {
          piclist.push(item.data.url)
        })
        setSubImages(piclist)
      }
    }
  }


  return (
    <PageHeaderWrapper>
      <SchemaForm
        wrapperCol={{ span: 8 }}
        labelCol={{ span: 4 }}
        // layout="vertical"
        onSubmit={submit}
      >
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
        <Row type="flex" align="middle">
          <Col span={4} style={{ textAlign: 'right' }}>所属分类：</Col>
          <Col span={8}>
            <Cascader
              options={categoryList}
              loadData={loadData}
              onChange={categoryChange}
              placeholder="请选择所属分类"
            />
          </Col>
        </Row>
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
          x-props={{
            withCredentials: true,
            fileList: subPics,
            listType: 'picture-card',
            action: `${BASE_URL}/manage/product/upload.do`,
            name: 'upload_file',
          }}
          required
          x-effect={uploadSuccess}
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
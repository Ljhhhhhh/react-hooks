import React, { useState, useEffect } from 'react';
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import SchemaForm, { Field, Submit, Reset, FormButtonGroup } from "@uform/antd";
import { Row, Col, Cascader, message, Upload } from 'antd'
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
// import {UploadFile} from 'antd/lib/upload/interface'
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
  const [subPics, setSubImages] = useState<any[]>([])
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
    const detailRaw = productDetail as any;
    if (!categoryId) {
      message.error('请选择产品所属分类');
      return
    }
    if (typeof detailRaw.toHTML !== 'function') {
      message.error('请填写产品详情');
      return
    }
    // let splitIndex = 2;
    // const subImages = subPics.map((item: any) => {
    //   const urlReg = new RegExp(/^http(s?):\/\//)
    //   if (urlReg.test(item)) {
    //     ++splitIndex
    //   }
    //   item.replace('\\/g', '\/')
    //   return item.split('/')[splitIndex]
    // })
    const subImages = values.subImages.map((pic: { data: { uri: string, url: string } }) => pic.data.uri)
    console.log(subImages, 'subImages');
    const data = {
      ...values,
      subImages: subImages.join(','),
      categoryId,
      productId,
      detail: detailRaw.toHTML()
    }
    const payload = Object.keys(data).reduce((obj: any, current: any) => {
      const newObj = { ...obj }
      if (data[current]) {
        newObj[current] = data[current]
      }
      return newObj
    }, {})
    console.log(payload, '过滤，未过滤', data);
    // dispatch({
    //   type: 'product/create',
    //   payload: data
    // })
  }

  const categoryChange = (value: any) => {
    const [ selected ] = value;
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
        // TODO:: 为什么只会触发一次
        const piclist: string[] = []
        res.map((item: any) => {
          if (item.data && item.data.url) {
            piclist.push(item.data.url)
          }
        })
        setSubImages(piclist)
      }
    }
  }


  return (
    <PageHeaderWrapper>
      <Row gutter={44}>
        <Col span={12}>
          <SchemaForm
            // wrapperCol={{ span: 8 }}
            // labelCol={{ span: 4 }}
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
            <Field
              title="产品价格"
              type="string"
              name="price"
              required
              x-props={{
                suffix: '元'
              }}
            />
            <Field
              title="产品库存"
              type="string"
              name="stock"
              required
              x-props={{
                suffix: '件'
              }}
            />
            <Field
              title="产品图片"
              type="upload"
              name="subImages"
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
            <Row type="flex" align="middle" style={{marginBottom: 20}}>
              <Col style={{ textAlign: 'right' }}>所属分类：</Col>
              <Col>
                <Cascader
                  style={{width: 300}}
                  options={categoryList}
                  loadData={loadData}
                  onChange={categoryChange}
                  placeholder="请选择所属分类"
                />
              </Col>
            </Row>

            <FormButtonGroup>
              <Submit />
              <Reset />
            </FormButtonGroup>
          </SchemaForm>
        </Col>
        <Col span={12}>
          <p>产品详情</p>
          <BraftEditor
            value={productDetail}
            placeholder="请填写产品详情"
            onChange={(value) => setProductDetail(value)}
            // onSave={submitContent}
            readOnly={readOnly}
          />
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
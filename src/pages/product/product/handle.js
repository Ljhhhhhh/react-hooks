import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Form, Input, Upload, Row, Col, TreeSelect, Icon, message, Button } from "antd";
import { withRouter } from "react-router";
import BraftEditor from 'braft-editor'
import ProuctApi from "../../../api/product";
import getCateList from '../../../utils/categoryFormat'
import 'braft-editor/dist/index.css'
import './index.scss'

const FormItem = Form.Item;
const productApi = new ProuctApi();

const ProductAdd = props => {
  const [avatarUrl, setAvatarUrl] = useState('')
  const [avatar, setAvatar] = useState('')
  const [avatarUploading, setAvatarUploading] = useState(false)
  const [id, setId] = useState(null)
  const [detail, setDetail] = useState({})
  const [disabled, setDisabled] = useState(false)
  const [categoryList, setCategoryList] = useState([])

  useEffect(() => {
    const id = props.match.params.productId || null
    const disable = !!props.match.params.detail
    setId(id)
    setDisabled(disable)
    if (id) {
      productApi.productDetail(id).then(res => {
        setDetail(res.data)
        setAvatarUrl(res.data.imageHost + res.data.mainImage)
        setAvatar(res.data.mainImage)
        setTimeout(() => {
          props.form.setFieldsValue({
            detail: BraftEditor.createEditorState(res.data.detail)
          })
        }, 500)
      })
    }
  }, [])

  useMemo(() => {
    const categoryList = getCateList()
    setCategoryList(categoryList)
  }, []);

  const beforeUpload = useCallback((file) => {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isLt2M;
  })

  const handleChange = useCallback((info) => {
    if (info.file.status === 'uploading') {
      setAvatarUploading(true)
      return;
    }
    if (info.file.status === 'done') {
      const urlWithHost = info.file.response.data.url
      const avatar = info.file.response.data.uri
      setAvatarUrl(urlWithHost)
      setAvatar(avatar)
      setAvatarUploading(false)
    }
  })

  const submit = () => {
    props.form.validateFields((err, values) => {
      if(!err) {
        const data = props.form.getFieldsValue()
        data.detail = data.detail.toHTML()
        data.subImages = avatar;
        if (id) {
          data.id = id
        }
        productApi.createProduct(data).then(res => {
          if (res.status === 0) {
            message.success(res.data)
            props.history.push('/product/index')
          }
        })
      } else {
        console.log(err, values)
      }
    })
  }

  const goBack = () => {
    props.history.goBack()
  }

  const uploadButton = useMemo(() => (
    <div>
      <Icon type={avatarUploading ? 'loading' : 'plus'} />
      <div className="ant-upload-text">Upload</div>
    </div>
  ), [avatarUploading]);

  const { getFieldDecorator } = props.form;
  
  const formItemLayout = {
    labelCol: {
      xs: 24,
      sm: 4
    },
    wrapperCol: {
      xs: 24,
      sm: 8
    }
  };

  return (
    <Row type="flex" justify="start">
      <Col md={16} xs={24}>
        <Form layout="horizontal">
          <FormItem label="商品名称" {...formItemLayout}>
            {getFieldDecorator("name", {
              initialValue: detail.name,
              rules: [
                {
                  required: true,
                  message: "产品名称必填"
                }
              ]
            })(<Input placeholder="请输入产品名称" disabled={disabled} />)}
          </FormItem>
          <FormItem label="商品描述" {...formItemLayout}>
            {getFieldDecorator("subtitle", {
              initialValue: detail.subtitle,
              rules: [
                {
                  required: true,
                  message: "产品描述必填"
                }
              ]
            })(<Input placeholder="请输入商品描述" disabled={disabled} />)}
          </FormItem>
          <FormItem label="分类" {...formItemLayout}>
            {
              getFieldDecorator('categoryId', {
                initialValue: detail.categoryId || 0
              })(
                <TreeSelect
                  disabled={disabled}
                  style={{ width: 200 }}
                  treeData={categoryList}
                  allowClear
                  placeholder="请选择类目"
                  showSearch
                />
              )
            }
          </FormItem>
          <FormItem label="商品价格" {...formItemLayout}>
            {getFieldDecorator("price", {
              initialValue: detail.price,
              rules: [
                {
                  required: true,
                  message: "产品价格必填"
                }
              ]
            })(<Input placeholder="请输入商品价格" disabled={disabled}  addonAfter={<Icon type="pay-circle" />} />)}
          </FormItem>
          <FormItem label="商品库存" {...formItemLayout}>
            {getFieldDecorator("stock", {
              initialValue: detail.stock,
              rules: [
                {
                  required: true,
                  message: "产品库存必填"
                }
              ]
            })(<Input placeholder="请输入产品库存" disabled={disabled} addonAfter="件|包|箱" />)}
          </FormItem>
          <FormItem label="商品图片" {...formItemLayout}>
            <Upload
              name="upload_file"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="/manage/product/upload.do"
              beforeUpload={beforeUpload}
              onChange={handleChange}
              disabled={disabled}
            >
              {avatarUrl ? <img src={avatarUrl} alt="avatar" /> : uploadButton}
            </Upload>
          </FormItem>
          <FormItem label="商品详情" span={12}>
            {
              getFieldDecorator('detail',{
                initialValue: detail.detail,
                rules: [{
                  required: true,
                  validator: (_, value, callback) => {
                    if (value.isEmpty()) {
                      callback('请输入商品详情')
                    } else {
                      callback()
                    }
                  }
                }],
              })(
                <BraftEditor
                  disabled={disabled}
                  placeholder="请输入商品详情"
                />
              )
            }
          </FormItem>
          <Button type="default" onClick={goBack}>返回</Button>
          {
            disabled ? '' : (
              <Button style={{marginLeft: 10}} type="primary" onClick={submit}>提交</Button>
            )
          }
        </Form>
      </Col>
    </Row>
  );
}

export default withRouter(Form.create()(ProductAdd));

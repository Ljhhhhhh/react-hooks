import React, { Component } from "react";
import { Form, Input, Upload, Row, Col, TreeSelect, Icon, message, Button } from "antd";
import { withRouter } from "react-router";
import BraftEditor from 'braft-editor'
import ProuctApi from "../../../api/product";
import getCateList from '../../../utils/categoryFormat'
import 'braft-editor/dist/index.css'
import './index.scss'

const FormItem = Form.Item;
const productApi = new ProuctApi();

class ProductAdd extends Component {
  state = {
    avatarUrl: '',
    avatarUploading: false,
    editorState: '',
    outputHTML: '',
    id: '',
    detail: {}
  }
  componentDidMount() {
    const id = this.props.match.params.productId || null
    const disabled = !!this.props.match.params.detail
    this.setState({
      id,
      disabled
    }, () => {
      if (id) {
        productApi.productDetail(id).then(res => {
          this.setState({
            detail: res.data,
            avatarUrl: res.data.imageHost + res.data.mainImage,
            avatar: res.data.mainImage
          })
          setTimeout(() => {
            this.props.form.setFieldsValue({
              detail: BraftEditor.createEditorState(res.data.detail)
            })
          }, 500)
        })
      }
      // TODO:: 获取详情，判断是修改还是查看
    })
    this.getCateList();
  }
  getCateList = () => {
    const categoryList = getCateList()
    this.setState({
      categoryList
    });
  };

  beforeUpload = (file) => {
    // const isJPG = file.type === 'image/jpeg';
    // if (!isJPG) {
    //   message.error('You can only upload JPG file!');
    // }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isLt2M;
  }

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ avatarUploading: true });
      return;
    }
    if (info.file.status === 'done') {
      const urlWithHost = info.file.response.data.url
      const avatar = info.file.response.data.uri
      this.setState({
        avatarUrl: urlWithHost,
        avatar,
        avatarUploading: false,
      })
    }
  }

  submit = () => {
    this.props.form.validateFields((err, values) => {
      if(!err) {
        const data = this.props.form.getFieldsValue()
        data.detail = data.detail.toHTML()
        data.subImages = this.state.avatar;
        if (this.state.id) {
          data.id = this.state.id
        }
        productApi.createProduct(data).then(res => {
          if (res.status === 0) {
            message.success(res.data)
            this.props.history.push('/product/index')
          }
        })
      } else {
        console.log(err, values)
      }
    })
  }

  goBack = () => {
    this.props.history.goBack()
  }

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.avatarUploading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { getFieldDecorator } = this.props.form;
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
    const {detail,disabled} = this.state
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
                    treeData={this.state.categoryList}
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
                beforeUpload={this.beforeUpload}
                onChange={this.handleChange}
                disabled={disabled}
              >
                {this.state.avatarUrl ? <img src={this.state.avatarUrl} alt="avatar" /> : uploadButton}
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
            {/* <NavLink to="/product/index">返回</NavLink> */}
            <Button type="default" onClick={this.goBack}>返回</Button>
            {
              disabled ? '' : (
                <Button style={{marginLeft: 10}} type="primary" onClick={this.submit}>提交</Button>
              )
            }
          </Form>
        </Col>
      </Row>
    );
  }
}

export default withRouter(Form.create()(ProductAdd));

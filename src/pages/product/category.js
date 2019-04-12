import React, { Component } from 'react'
import {Table, Button, Modal, Form, Input, message} from 'antd'
import ProductApi from '../../api/product';
import './index.scss'

const productApi = new ProductApi()

export default class Category extends Component {
  state = {
    modalShow: false
  }
  componentDidMount() {
    this.setState({
      categoryId: this.props.match.categoryId || 0
    })
    this.getCateList();
  }

  getCateList = () => {
    productApi.getCateById(this.state.categoryId).then(res => {
      console.log(res, 'res')
      const list = []
      for (let i = 0; i < 20; i++) {
        const item = res.data[i];
        item.key = i
        list.push(item)
      }
      this.setState({
        categoryList: res.data
      })
    })
  }

  openEditModal = (item) => {
    this.setState({
      modalShow: true,
      currentItem: item
    })
    console.log(item, 'item');
  }
  closeModal = (refreshList = false) => {
    this.setState({
      modalShow: false
    })
    refreshList && this.getCateList()
  }
  
  render() {
    const columns = [
      {
        title: '品类ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '品类名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        dataIndex: '',
        key: 'x',
        render: (text) => (
          <div className="btn-cell">
            <Button size="small" type="primary" onClick={() => {this.openEditModal(text)}}>修改名称</Button>
            <Button size="small" type="dashed">查看子类目</Button>
          </div>
        )
      }
    ]
    return (
      <div>
        <div className="category-title">当前分类ID: <strong>{this.state.categoryId}</strong></div>
        <Table bordered dataSource={this.state.categoryList} columns={columns} />
        <EditModal item={this.state.currentItem} modalShow={this.state.modalShow} closeModal={this.closeModal} />
      </div>
    )
  }
}

class EditModal extends Component{
  editCategory = () => {
    const {id} = this.props.item || {id: 0}
    const {categoryName} = this.props.form.getFieldsValue()
    productApi.editCateName(id, categoryName).then(res => {
      message.success(res.data)
      this.props.closeModal(true)
    })
  }
  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Modal 
        title="修改名称" 
        visible={this.props.modalShow}
        onCancel={() => this.props.closeModal()}
        onOk={() => this.editCategory()}
      >
        <Form>
          {
            getFieldDecorator('categoryName', {
              initialValue: this.props.item ? this.props.item.name : ''
            })(
              <Input type="text" placeholder="请输入类目名称" />
            )
          }
        </Form>
      </Modal>
    )
  }

}
EditModal = Form.create()(EditModal)
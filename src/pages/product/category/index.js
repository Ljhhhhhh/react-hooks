import React, { Component } from 'react'
import {Table, Button, Modal, Form, Input, message, Breadcrumb } from 'antd'
import ProductApi from '../../../api/product';
import './index.scss'

const productApi = new ProductApi()
const BreadcrumbItem = Breadcrumb.Item;

export default class Category extends Component {
  state = {
    modalShow: false,
    categoryTree: []
  }
  componentDidMount() {
    this.setState({
      categoryId: this.props.match.categoryId || 0,
      categoryTree: [{
        id: 0,
        name: '全部'
      }]
    })
    this.getCateList(this.props.match.categoryId);
  }

  getCateList = (id = 0) => {
    this.setState({
      categoryList: []
    })
    productApi.getCateById(id).then(res => {
      const list = []
      const len = res.data.length > 20 ? 20 : res.data.length
      for (let i = 0; i < len; i++) {
        const item = res.data[i];
        item.key = i
        list.push(item)
      }
      this.setState({
        categoryList: list
      })
    })
  }

  getCateChild = (item, index) => {
    const {id} = item
    let categoryTree;
    if (index) {
      if (index === this.state.categoryTree.length) return;
      categoryTree = this.state.categoryTree.splice(0, index)
    } else {
      categoryTree = [...this.state.categoryTree, {
        name: item.name,
        id: item.id
      }]
    }
    this.setState({
      categoryId: id,
      categoryTree
    })
    this.getCateList(id)
  }

  openEditModal = (item) => {
    this.setState({
      modalShow: true,
      currentItem: item
    })
  }
  closeModal = (refreshList = false) => {
    this.setState({
      modalShow: false
    })
    refreshList && this.getCateList(this.state.categoryId)
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
            <Button icon="edit" size="small" type="primary" onClick={() => {this.openEditModal(text)}}>修改名称</Button>
            <Button icon="eye" size="small" type="dashed" onClick={() => {this.getCateChild(text)}}>查看子类目</Button>
          </div>
        )
      }
    ]
    return (
      <div>
        <div className="category-title">
          <CategoryTree categoryTree={this.state.categoryTree} getCateChild={this.getCateChild} />
          <Button type="primary" icon="plus">添加类目</Button>
        </div>
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

class CategoryTree extends Component{
  render() {
    return (
      <Breadcrumb>
      {
        // this.props.categoryTree
        this.props.categoryTree.map((item, index) => {
          return (
            <BreadcrumbItem key={item.id}>
              <span onClick={() => {this.props.getCateChild(item, index + 1)}}>{item.name}</span>
            </BreadcrumbItem>
          )
        })
      }
        
      </Breadcrumb>
    )
  }
}
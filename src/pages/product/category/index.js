import React, { useState, useEffect, useCallback } from "react";
import { Table, Button, Modal, Form, Input, message, Breadcrumb } from "antd";
import { withRouter } from "react-router-dom";
import ProductApi from "../../../api/product";
import "./index.scss";

const productApi = new ProductApi();
const BreadcrumbItem = Breadcrumb.Item;

function Category(props) {
  const [categoryId, setCategoryId] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [currentItem, setCurrentItem] = useState({});
  const [categoryTree, setCategoryTree] = useState([
    {
      id: 0,
      name: "全部"
    }
  ]);

  useEffect(() => {
    const id = props.match.categoryId || 0;
    setCategoryId(id);
    getCateList(id);
  }, []);

  const addCategory = () => {
    // TODO:: redux传递当前类目过去
    props.history.push("/product/category/add");
  };

  const openEditModal = useCallback(item => {
    setModalShow(true);
    setCurrentItem(item);
  }, []);

  const getCateChild = useCallback((item, index) => {
    const { id } = item;
    let Tree;
    if (index) {
      if (index === categoryTree.length) return;
      Tree = categoryTree.splice(0, index);
    } else {
      Tree = [
        ...categoryTree,
        {
          name: item.name,
          id: item.id
        }
      ];
    }
    setCategoryTree(Tree);
    setCategoryId(id);
    getCateList(id);
  }, []);

  const getCateList = useCallback((id = 0) => {
    productApi.getCateById(id).then(res => {
      if (!res.data) return;
      const list = [];
      const len = res.data.length > 20 ? 20 : res.data.length;
      for (let i = 0; i < len; i++) {
        const item = res.data[i];
        item.key = i;
        list.push(item);
      }
      setCategoryList(list);
    });
  }, []);

  const closeModal = useCallback((refreshList = false) => {
    setModalShow(false);
    refreshList && getCateList(categoryId);
  }, []);

  const columns = [
    {
      title: "品类ID",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "品类名称",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "操作",
      dataIndex: "",
      key: "x",
      render: text => (
        <div className="btn-cell">
          <Button
            icon="edit"
            size="small"
            type="primary"
            onClick={() => openEditModal(text)}>
            修改名称
          </Button>
          <Button
            icon="eye"
            size="small"
            type="dashed"
            onClick={() => getCateChild(text)}>
            查看子类目
          </Button>
        </div>
      )
    }
  ];

  return (
    <div>
      <div className="category-title">
        <CategoryMenu categoryTree={categoryTree} getCateChild={getCateChild} />
        <Button type="primary" icon="plus" onClick={addCategory}>
          添加类目
        </Button>
      </div>
      <Table bordered dataSource={categoryList} columns={columns} />
      <EditModal
        item={currentItem}
        modalShow={modalShow}
        closeModal={closeModal}
      />
    </div>
  );
}

const CategoryMenu = props => {
  const { categoryTree, getCateChild } = props;

  return (
    <Breadcrumb>
      {categoryTree.map((item, index) => {
        return (
          <BreadcrumbItem key={item.id}>
            <span
              onClick={() => {
                getCateChild(item, index + 1);
              }}>
              {item.name}
            </span>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
};

let EditModal = props => {
  const { form, item, closeModal, modalShow } = props;
  const { getFieldDecorator } = form;

  const editCategory = useCallback(() => {
    const { id } = item || { id: 0 };
    const { categoryName } = form.getFieldsValue();
    productApi.editCateName(id, categoryName).then(res => {
      message.success(res.data);
      closeModal(true);
    });
  });

  return (
    <Modal
      title="修改名称"
      visible={modalShow}
      onCancel={() => closeModal()}
      onOk={() => editCategory()}>
      <Form>
        {getFieldDecorator("categoryName", {
          initialValue: item ? item.name : ""
        })(<Input type="text" placeholder="请输入类目名称" />)}
      </Form>
    </Modal>
  );
};
EditModal = Form.create()(EditModal);

export default withRouter(Category);

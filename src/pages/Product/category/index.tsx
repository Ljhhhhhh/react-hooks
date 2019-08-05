import React, { useEffect, useState, useCallback } from 'react';
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import { Dispatch } from "redux";
import { Button, Divider, Modal } from 'antd';
import SchemaForm, { Field, Submit, FormButtonGroup } from "@uform/antd";
// import { formatMessage } from "umi-plugin-react/locale";
import { connect } from "dva";
import StandardTable from '@/components/StandardTable';
import { CategoryState } from './model';
// import { UserListItemParams } from './data';
import { ColumnProps } from 'antd/lib/table';

interface CategoryItemProps {
  createTime: number
  id: number
  name: string
  parentId: number
  sortOrder?: null
  status: boolean
  updateTime: number
}

interface TableListProps {
  dispatch: Dispatch<any>;
  category: CategoryState
}

// interface userListProps {
//   dispatch: Dispatch<any>;
//   category: CategoryState
// }

const List = (props: TableListProps) => {
  const [selectedRows, SetRows] = useState([])
  const [modalShow, SetModalShow] = useState<boolean>(false)
  const [addModalShow, SetAddModalShow] = useState<boolean>(false)
  const [categoryPath, SetCategoryPath] = useState<any[]>([])
  const [selectedCategory, SetSelectedCategory] = useState<any>({})
  // const [selectedCategory, SetSelectedCategory] = useState<any>({})
  // const [originCategoryName, SetModalShow] = useState<boolean>(false)
  const { dispatch } = props;
  const category = props.category
  const {loading, ...datas} = category
  const data = {
    list: datas.list
  }

  useEffect(() => {
    const { dispatch } = props;
    dispatch({
      type: 'category/getList',
    })
  }, [])

  const setCategoryName = (item: CategoryItemProps) => {
    SetSelectedCategory(item)
    SetModalShow(true)
  }

  const cancelChange = () => {
    SetSelectedCategory({})
    SetModalShow(false)
  }

  const submitCategoryName = (values: any) => {
    const data = {
      ...values,
      categoryId: selectedCategory.id
    }
    const { dispatch } = props;
    dispatch({
      type: 'category/setCategoryName',
      payload: data
    })
  }

  const columns:ColumnProps<any>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: '品类名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '操作',
      dataIndex: '',
      key: 'x',
      render: (item: any) => {
        return (
          <>
            <Button size="small" type="primary" onClick={() => setCategoryName(item)} >修改名称</Button>
            <Divider type="vertical" />
            <Button size="small" type="ghost" onClick={() => findChild(item)} >查看子类目</Button>
          </>
        )
      }
    }
  ];

  const handleSelectRows = (rows: any) => {
    SetRows(rows)
  };

  const handleStandardTableChange = (pagination: any) => {
    dispatch({
      type: 'category/getList',
      payload: pagination
    });
  };

  const handleAddModalVisible = useCallback((flag: boolean) => {
    SetAddModalShow(flag)
    console.log(flag, 'flag')
  }, [])
  
  const findChild = useCallback((item?: CategoryItemProps, index?: number) => {
    console.log(item, 'item', categoryPath.length);
    // TODO:: 选择子类后回到全部 谷歌搜索：面包屑处理
    if (index === categoryPath.length - 1) return;
    if (!item && !categoryPath.length) return;
    if (item) {
      const newPath = categoryPath.concat(item)
      SetCategoryPath(newPath)
    }
    dispatch({
      type: 'category/getList',
      payload: item && item.id ? item.id : 100003
    })
  }, [categoryPath])

  const CategoryPathRender = (path: any[]) => {
    if (!path.length) return;
    return path.map((category, index) => {
      if (index === category.length - 1) {
        return (
          <React.Fragment key={category.id}>
          <span>/</span>
          <Button disabled={true} key={category.id} type="link" size="small">{category.name}</Button>
        </React.Fragment>
        )
      }
      return (
        <React.Fragment key={category.id}>
          <span>/</span>
          <Button key={category.id} type="link" size="small">{category.name}</Button>
        </React.Fragment>
      )
    })
  }

  return (
    <PageHeaderWrapper>
      <Button style={{marginBottom: 15}} icon="plus" type="primary" onClick={() => handleAddModalVisible(true)}>
        新建
      </Button>
      <div>
        <Button type="link" onClick={() => findChild()}>全部</Button>
        {
          CategoryPathRender(categoryPath)
        }
      </div>
      
      <StandardTable
        data={data}
        pagination={false}
        rowKey="id"
        selectedRows={selectedRows}
        onSelectRow={handleSelectRows}
        columns={columns}
        loading={loading}
        onChange={handleStandardTableChange}
      />
      <ChangeCategoryNameModal 
        submit={(v: any) => submitCategoryName(v)}
        visible={modalShow}
        cancelChange={() => cancelChange()}
        originName={selectedCategory.name}
      />
    </PageHeaderWrapper>
  )
}

interface ModalParams {
  visible: boolean
  originName?: string
  submit: (v: any) => void
  cancelChange: () => void
}

const ChangeCategoryNameModal = (props: ModalParams) => {
  const {visible, submit, cancelChange, originName} = props
  return (
    <Modal 
      title="修改分类名称" 
      visible={visible}
      footer={null}
    >
      <SchemaForm layout="vertical" onSubmit={submit} defaultValue={{categoryName: originName}}>
          <Field
            type="string"
            required
            name="categoryName"
          />
          <FormButtonGroup>
            <Submit/>
            <Button onClick={cancelChange}>取消</Button>
          </FormButtonGroup>
        </SchemaForm>
    </Modal>
  )
}

export default connect(
  ({
    category
  }: {
    category: CategoryItemProps;
  }) => ({
    category
  })
)(List);
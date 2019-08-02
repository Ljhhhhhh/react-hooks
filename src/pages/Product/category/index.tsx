import React, { useEffect, useState } from 'react';
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import { Dispatch } from "redux";
import { Button, Divider } from 'antd';
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

const UserList = (props: TableListProps) => {
  const [selectedRows, SetRows] = useState([])

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
            <Button size="small" type="primary" >修改名称</Button>
            <Divider type="vertical" />
            <Button size="small" type="ghost" >查看子类目</Button>
          </>
        )
      }
    }
  ];

  const handleSelectRows = (rows: any) => {
    SetRows(rows)
  };

  const handleStandardTableChange = (pagination: any) => {
    const { dispatch } = props;

    dispatch({
      type: 'category/getList',
      payload: pagination
    });
  };

  return (
    <PageHeaderWrapper>
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
    </PageHeaderWrapper>
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
)(UserList);
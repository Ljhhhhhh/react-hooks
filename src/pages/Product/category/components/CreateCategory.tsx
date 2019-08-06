import React from 'react';
import { Drawer, Button } from 'antd'
import SchemaForm, { Field, Submit, FormButtonGroup } from "@uform/antd";

interface CreateCategoryParams {
  toggleCreate: () => void
  createCategoryShow: boolean
  categoryList: any[]
  categoryPath: any[]
}

const CreateCategory = (props: CreateCategoryParams) => {

  const { toggleCreate, createCategoryShow, categoryList, categoryPath } = props
  let parentsCategory = '全部/'
  let parent = {}
  if (categoryPath.length) {
    categoryPath.forEach(category => {
      parentsCategory += (category.name + '/')
    })
    parent = {
      label: parentsCategory,
      value: categoryPath[categoryPath.length - 1].id
    }
  } else {
    parent = {
      label: '全部/',
      value: 0
    }
  }
  console.log(categoryList, 'categoryList');
  const normalizeCategoryList = categoryList.map(item => {
    return {
      label: parentsCategory + item.name,
      value: item.id
    }
  })

  normalizeCategoryList.unshift(parent)

  const submit = (e: any) => {
    console.log(e, 'submit')
  }

  // const cancelChange = () => {
  //   console.log('a')
  // }

  return (
    <Drawer visible={createCategoryShow} closable={false} width={500}>
      <SchemaForm layout="vertical" onSubmit={submit}>
        <Field
          type="string"
          enum={normalizeCategoryList}
          required
          title="所属品类"
          name="select"
        />
        <Field
          type="string"
          required
          title="品类名称"
          name="categoryName"
        />

        <FormButtonGroup>
          <Submit />
          <Button onClick={toggleCreate}>取消</Button>
        </FormButtonGroup>
      </SchemaForm>
    </Drawer>
  )
}

export default CreateCategory;
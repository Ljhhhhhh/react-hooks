import React from 'react'
// import { Button } from 'antd'
import SchemaForm, { Field, Submit, Reset, FormButtonGroup } from "@uform/antd";

interface searchFormProps {
  handleSubmit: (data: any) => void;
}

const SearchForm = (props: searchFormProps) => {

  const { handleSubmit } = props

  const submit = (value: any) => {
    console.log(value, 'value');
    handleSubmit(value)
  }

  const categoryList = [
    {label: '按商品名', value: 'productName'},
    {label: '按商品ID', value: 'productId'},
  ]

  // const toggleCreate = (flag: boolean) => {}

  return (
    <SchemaForm layout="inline" onSubmit={submit}>
        <Field
          default="productName"
          type="string"
          enum={categoryList}
          name="searchType"
        />
        <Field
          type="string"
          name="searchValue"
          x-rules={{
            required: true,
            message: "请先输入搜索内容"
          }}
        />

        <FormButtonGroup>
          <Submit />
          <Reset />
        </FormButtonGroup>
      </SchemaForm>
  )
}

export default SearchForm;
import React from 'react'
import '../App.css'
import { Form, Input, Button, Select } from 'antd'
import { status, json } from '../utilities/requestHandlers'
import { api } from '../utilities/common_api'
import GoHomeButton from './Gohome'
import UserContext from '../contexts/user'
import { useParams } from 'react-router-dom'



function CatUpdate() {
  const id = useParams()
  const onFinish = (values) => {
    console.log('Received values of form: ', values)
    const { confirm, ...data } = values
    console.log("Json  ", JSON.stringify(data))
    fetch(`${api.uri}/cats/${id.id}`, {
      method: "PUT",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(status)
      .then(json)
      .then(data => {
        console.log(data)
      })
      .catch(errorResponse => {
        console.error(errorResponse)
        alert(`Error: ${errorResponse}`)
      })
  }
  return (
    <Form name="register" scrollToFirstError onFinish={onFinish}>

      <Form.Item name="catname" label="Cat Name">
        <Input />
      </Form.Item>

      <Form.Item name="age" label="Age">
        <Input />
      </Form.Item>

      <Form.Item name="gender" label="Gender" >
        <Select
          options={[
            {
              value: 'male',
              label: 'Male',
            },
            {
              value: 'female',
              label: 'Female',
            }
          ]}
        />
      </Form.Item>

      <Form.Item name="breed" label="Breed" >
        <Input />
      </Form.Item>

      <Form.Item name="contact" label="Contact" >
        <Input />
      </Form.Item>

      <Form.Item name="imageurl" label="Imageurl" >
        <Input />
      </Form.Item>


      <Form.Item name="description" label="Description" >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit"  >
          Add Cat
        </Button>

      </Form.Item>
    </Form>
  )
}

export default CatUpdate

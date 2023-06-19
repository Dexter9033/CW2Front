import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { Card, Row, Col, Spin } from 'antd'
import { Link } from 'react-router-dom'
import UserContext from '../contexts/user'
import { api } from '../utilities/common_api'



const Cats = () => {
  const user = useContext(UserContext)
  const [cats, setCats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`${api.uri}/cats`)
      .then((res) => {
        setCats(res.data)
      })
      .then(() => {
        setLoading(false)
      })
  }, [])

  const del = (id) => {
    axios.delete(`${api.uri}/cats/${id}`)
      .then(res => {
      })
  }


  if (loading) {
    const loadingIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />
    return (<Spin indicator={loadingIcon} />)
  } else {
    if (!Cats) {
      return (<div>There is no cats avalible now.</div>)
    } else {
      return (
        <Row>
          {
            cats && cats.map(({ id, catname, breed, age, gender, contact, imageurl, description }) => (
              <Col span={8} key={id}>
                <Card
                  actions={user.user.role === 'staff' && [
                    <Link to={`/CatUpdate/${id}`}>Update</Link>,
                    <button onClick={() => { del(id) }}>Delete</button>,
                  ]}
                  cover=<img src={imageurl} alt={imageurl} />>
                  <Card.Meta title={catname} />
                  <Link to={`/cat/${id}`}>Details</Link>
                </Card>
              </Col>
            ))
          }
        </Row >
      )
    }
  }

}

export default Cats
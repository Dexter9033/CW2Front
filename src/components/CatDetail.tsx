import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Spin } from 'antd'
import axios from 'axios'
import { LoadingOutlined, RollbackOutlined } from '@ant-design/icons'

//local file
import { api } from '../utilities/common_api'

const CatDetail = () => {
  const [cat, setCat] = useState(null)
  const [loading, setLoading] = useState(true)
  const { pid } = useParams()
  const navigate = useNavigate()

  useEffect(()=>{
    axios.get(`${api.uri}/cats/${pid}`)
      .then((res)=>{
        setCat(res.data)
      })
      .then(()=>{
        setLoading(false)
      })
  }, [])
  if(loading){
    const loadingIcon = <LoadingOutlined style={{fontSize: 48}} spin />
    return(<Spin indicator={loadingIcon}/>)
  } else {
    if(!cat){
      return(<div>Page does not exist</div>)
    } else {
      if(!cat.gender){
        catgender = "boy"
      }
      return(
        <div>
          <h1>Name: {cat.catname}</h1>
          <img src={cat.imageurl} width="500" />
          <p>Age: {cat.age}</p>
          <p>Breed: {cat.breed}</p>
          <p>Gender: {cat.gender}</p>
          <p>Description: {cat.description}</p>
          <p>Contact: {cat.contact}</p>
          <Button type="primary" onClick={()=>alert("Application success! You can find the contact information for your cat's current shelter in the (Contact) below!")}>Adopt</Button>
          <Button type="primary" icon={<RollbackOutlined />} onClick={()=>navigate(-1)}/>
        </div>
      )
    }
  }
  
  
}

export default CatDetail
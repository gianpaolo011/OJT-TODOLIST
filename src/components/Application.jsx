import { useEffect, useState } from 'react'
import TodoContainer from './TodoContainer'
import { Card } from '@mui/material'
import { useGetTodosQuery } from '../app/features/api/apiSlice'

const Application = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const { data: datatask } = useGetTodosQuery()
  console.log(datatask)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.10.10.17:8001/api/task', {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },

          body: JSON.stringify(data),
        })
        const data = await response.json()
        console.log(data)
        setData(data)
        setLoading(true)
      } catch (err) {
        console.error('Error fetching data:', err)
      }
    }
    fetchData()
  }, [])

  return <div>{loading ? <TodoContainer fakeTodosArr={data} /> : <Card />}</div>
}

export default Application

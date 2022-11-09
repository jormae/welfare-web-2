import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import { Input } from '@mui/material'
import Button from '@mui/material/Button'

import TextField from '@mui/material/TextField'
import TableStockFolder from 'src/views/tables/TableStockFolder'
import toast, { Toaster } from 'react-hot-toast'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import { useEffect, useState, createContext } from 'react'
import { useForm } from 'react-hook-form'
import apiConfig from 'src/configs/apiConfig'

export const DataContext = createContext()

export const CardContext = createContext()

const FormLayouts = () => {
  const [stockFolders, setStocks] = useState({ blogs: [] })
  const staffName = typeof window !== 'undefined' ? localStorage.getItem('staffName') : null

  const fetchStockFolders = async () => {
    let uri = apiConfig.baseURL + '/chart/stock-folder'
    console.log(uri)
    try {
      const { data } = await axios.get(uri)
      console.log(data)
      setStocks({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = data => {
    // console.log(data)
    let uri = apiConfig.baseURL + '/chart/stock-folder/'
    fetch(uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        if (data.status == 'success') {
          toast.success(data.message)
          fetchStockFolders()
        } else {
          toast.error(data.message)
        }
      })
      .catch(function (error) {
        console.log(JSON.stringify(error))
      })
  }

  const verifyToken = async () => {
    const token = localStorage.getItem('token')
    let uri = apiConfig.baseURL + '/auth/token'
    fetch(uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.status !== 'success') {
          localStorage.removeItem('token')
          localStorage.removeItem('staffName')
          window.location = '/pages/login'
          console.log(data)
        }
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  useEffect(() => {
    verifyToken()
    fetchStockFolders()
  }, [])

  return (
    <Grid container spacing={6}>
      {/* <Grid item xs={12}>
        <CardContext.Provider value={statStockFolder}>
          <CardNewFolder />
        </CardContext.Provider>
      </Grid> */}
      <Grid item xs={12}>
        <Card>
          <CardHeader title='จัดเก็บชาร์ต' titleTypographyProps={{ variant: 'h6' }} />
          <Toaster />
          <Divider sx={{ margin: 0 }} />
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12}></Grid>
                <Grid item xs={3} sm={3}>
                  <Button variant='contained' color='primary' size='large' type='submit'>
                    สร้างโฟลเดอร์ใหม่
                  </Button>
                  <Input type='hidden' {...register('staffName', { value: staffName })} />
                  <Input type='hidden' {...register('stockId', { value: 1 })} />
                </Grid>
              </Grid>
            </CardContent>
          </form>
        </Card>
      </Grid>
      <DataContext.Provider value={stockFolders}>
        <Grid item xs={12}>
          <TableStockFolder />
        </Grid>
      </DataContext.Provider>
    </Grid>
  )
}

export default FormLayouts

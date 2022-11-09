import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import { Input } from '@mui/material'
import TextField from '@mui/material/TextField'
import TableStockChart from 'src/views/tables/TableStockChart'
import CardNewChart from 'src/views/cards/CardNewChart'
import toast, { Toaster } from 'react-hot-toast'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import { useEffect, useState, createContext } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import apiConfig from 'src/configs/apiConfig'

export const DataContext = createContext()

export const CardContext = createContext()

const FormLayouts = () => {
  const router = useRouter()
  if (router.isReady) {
    router.query.folderId
    console.log(router.query.folderId)
  }

  const [stockCharts, setStocks] = useState({ blogs: [] })
  const [statStockChart, setStatStockChart] = useState(0)
  const staffName = typeof window !== 'undefined' ? localStorage.getItem('staffName') : null

  const fetchStockCharts = async () => {
    let uri = apiConfig.baseURL + `/chart/stock-folder/${router.query.folderId}`
    console.log(uri)
    try {
      const { data } = await axios.get(uri)
      console.log(data)
      setStocks({ blogs: data })
    } catch (error) {
      // console.log(error)
    }
  }

  const fetchStatStockChart = async () => {
    let uri = apiConfig.baseURL + '/stat/stock-chart'
    try {
      await axios
        .get(uri)
        .then(result => setStatStockChart(result.data[0]))
        .catch(error => console.log('An error occurred' + error))
    } catch (error) {
      console.log(error)
    }
  }

  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = data => {
    let uri = apiConfig.baseURL + `/chart/stock-chart/${router.query.folderId}`
    fetch(uri, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        if (data.status == 'success') {
          toast.success(data.message)
          fetchStockCharts()
          fetchStatStockChart()
        } else {
          toast.error(data.message)
        }
      })
      .catch(function (error) {
        console.log(JSON.stringify(error))
      })

    resetField('an')
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
    if (router.isReady) {
      router.query
      verifyToken()
      fetchStockCharts()
      fetchStatStockChart()
    }
  }, [router.isReady, router.query])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <CardContext.Provider value={statStockChart}>
          <CardNewChart />
        </CardContext.Provider>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='จัดเก็บชาร์ต' titleTypographyProps={{ variant: 'h6' }} />
          <Toaster />
          <Divider sx={{ margin: 0 }} />
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12}></Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    autoFocus
                    fullWidth
                    label='สแกนบาร์โค้ด'
                    placeholder='สแกนบาร์โค้ด'
                    {...register('an', { required: true })}
                  />
                  <Input type='hidden' {...register('staffName', { value: staffName })} />
                </Grid>
              </Grid>
            </CardContent>
          </form>
        </Card>
      </Grid>
      <DataContext.Provider value={stockCharts}>
        <Grid item xs={12}>
          <TableStockChart />
        </Grid>
      </DataContext.Provider>
    </Grid>
  )
}

export default FormLayouts

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import { Input } from '@mui/material'
import TextField from '@mui/material/TextField'
import toast, { Toaster } from 'react-hot-toast'
import CardReturnChart from 'src/views/cards/CardReturnChart'
import 'react-datepicker/dist/react-datepicker.css'
import TableReturnChart from 'src/views/tables/TableReturnChart'
import axios from 'axios'
import { useEffect, useState, createContext } from 'react'
import { useForm } from 'react-hook-form'
import apiConfig from 'src/configs/apiConfig'

export const DataContext = createContext()

export const CardContext = createContext()

const FormLayouts = () => {
  const [returnCharts, setReturnCharts] = useState({ blogs: [] })
  const [statReturnChart, setStatReturnChart] = useState(0)
  const staffName = typeof window !== 'undefined' ? localStorage.getItem('staffName') : null
  const [an, setAn] = useState()

  const fetchCharts = async () => {
    let uri = apiConfig.baseURL + `/chart/return-chart/${staffName}`
    try {
      const { data } = await axios.get(uri)
      setReturnCharts({ blogs: data })
    } catch (error) {
      // console.log(error)
    }
  }

  const fetchStatReturnChart = async () => {
    let uri = apiConfig.baseURL + '/stat/return-chart'
    try {
      await axios
        .get(uri)
        .then(result => setStatReturnChart(result.data[0]))
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
    an = data.an
    let uri = apiConfig.baseURL + `/chart/return-chart/${an}`
    fetch(uri, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        // console.log(data)
        if (data.status == 'success') {
          toast.success(data.message)
          fetchCharts()
          fetchStatReturnChart()
        } else {
          toast.error(data.errors[0].msg)
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
    verifyToken()
    fetchCharts()
    fetchStatReturnChart()
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <CardContext.Provider value={statReturnChart}>
          <CardReturnChart />
        </CardContext.Provider>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='รับคืนสรุปชาร์ต' titleTypographyProps={{ variant: 'h6' }} />
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
      <DataContext.Provider value={returnCharts}>
        <Grid item xs={12}>
          <TableReturnChart />
        </Grid>
      </DataContext.Provider>
    </Grid>
  )
}

export default FormLayouts

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import { Input } from '@mui/material'
import TextField from '@mui/material/TextField'
import TableSummaryReturnChart from 'src/views/tables/TableSummaryReturnChart'
import CardNewChart from 'src/views/cards/CardNewChart'
import toast, { Toaster } from 'react-hot-toast'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import { useEffect, useState, createContext } from 'react'
import { useForm } from 'react-hook-form'
import apiConfig from 'src/configs/apiConfig'

export const DataContext = createContext()

export const CardContext = createContext()

const FormLayouts = () => {
  const [summaryReturnCharts, setSummaryReturnCharts] = useState({ blogs: [] })
  const [statSummaryReturnChart, setStatSummaryReturnChart] = useState(0)
  const staffName = typeof window !== 'undefined' ? localStorage.getItem('staffName') : null

  const fetchSummaryReturnCharts = async () => {
    let uri = apiConfig.baseURL + '/chart/summary-return-chart'
    try {
      const { data } = await axios.get(uri)
      setSummaryReturnCharts({ blogs: data })
    } catch (error) {
      // console.log(error)
    }
  }

  const fetchStatSummaryReturnChart = async () => {
    let uri = apiConfig.baseURL + '/stat/summary-return-chart'
    try {
      await axios
        .get(uri)
        .then(result => setStatSummaryReturnChart(result.data[0]))
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
    let uri = apiConfig.baseURL + '/chart/summary-return-chart/'
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
          fetchCharts()
          fetchStatNewChart()
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
    fetchSummaryReturnCharts()
    fetchStatSummaryReturnChart()
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <CardContext.Provider value={statSummaryReturnChart}>
          <CardNewChart />
        </CardContext.Provider>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='ส่ง-รับคืนสรุปชาร์ต' titleTypographyProps={{ variant: 'h6' }} />
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
      <DataContext.Provider value={summaryReturnCharts}>
        <Grid item xs={12}>
          <TableSummaryReturnChart />
        </Grid>
      </DataContext.Provider>
    </Grid>
  )
}

export default FormLayouts

import { forwardRef, useState, useEffect, createContext } from 'react'
import { useForm } from 'react-hook-form'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import { Input } from '@mui/material'
import axios from 'axios'
import moment from 'moment'
import toast, { Toaster } from 'react-hot-toast'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import CardNewChart from 'src/views/cards/CardNewChart'
import TableReauditChart from 'src/views/tables/TableReauditChart'
import 'react-datepicker/dist/react-datepicker.css'
import apiConfig from 'src/configs/apiConfig'

export const DataContext = createContext()

const FormLayouts = () => {
  const staffName = typeof window !== 'undefined' ? localStorage.getItem('staffName') : null
  const today = moment().format('YYYY-MM-DD')

  const [reauditCharts, setReauditCharts] = useState({ blogs: [] })

  const fetchCharts = async () => {
    let uri = apiConfig.baseURL + '/chart/reaudit-chart'
    try {
      const { data } = await axios.get(uri)
      setReauditCharts({ blogs: data })
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
    console.log(data)
    let an = data.an
    let date = data.date
    let uri = apiConfig.baseURL + `/chart/reaudit-chart/${an}/${staffName}/${date}`
    console.log(uri)

    fetch(uri, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.status == 'success') {
          toast.success(data.message)
          fetchCharts()
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
  }, [setReauditCharts])

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <CardNewChart />
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='ส่งรีออดิทชาร์ต' titleTypographyProps={{ variant: 'h6' }} />
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
                    <Input type='hidden' {...register('date', { value: today })} />
                  </Grid>
                </Grid>
              </CardContent>
            </form>
          </Card>
        </Grid>
        <DataContext.Provider value={reauditCharts}>
          <Grid item xs={12}>
            <TableReauditChart />
          </Grid>
        </DataContext.Provider>
      </Grid>
    </DatePickerWrapper>
  )
}

export default FormLayouts

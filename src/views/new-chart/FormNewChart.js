// ** React Imports
import { forwardRef, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
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
import Select from '@mui/material/Select'
import Box from '@mui/material/Box'
import axios from 'axios'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import { Input } from '@mui/material'

import moment from 'moment'
import toast, { Toaster } from 'react-hot-toast'

const FormNewChart = () => {
  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const verifyToken = async () => {
    const token = localStorage.getItem('token')
    fetch('http://localhost:3001/auth/token', {
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

  const notify = () => toast('Here is your toast.')

  useEffect(() => {
    verifyToken()
  }, [])

  return (
    <Card>
      <CardHeader title='รับชาร์ต' titleTypographyProps={{ variant: 'h6' }} />
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
  )
}

export default FormNewChart

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

// import BadgeIcon from '@mui/material/Badge'

import moment from 'moment'
import toast, { Toaster } from 'react-hot-toast'

const FormSummaryChart = () => {
  // ** States
  // const [an, setAn] = useState('')
  const staffName = localStorage.getItem('staffName')
  moment.locale('th')
  const today = moment().add(543, 'year').format('L')

  const [charts, setCharts] = useState({ blogs: [] })

  const fetchCharts = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3001/chart/summary`)
      setCharts({ blogs: data })

      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  // const notify = () => toast('Here is your toast.')
  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = data => {
    fetch('http://localhost:3001/chart/upload/', {
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
    fetchCharts()
  }, [setCharts])

  const submitSummaryChart = async (doctorCode, insertedAt) => {
    console.log(doctorCode)
    console.log(insertedAt)

    try {
      const chart = {
        staffName,
        insertedAt
      }

      axios
        .put(`http://localhost:3001/chart/submit-summary/${doctorCode}/${insertedAt}`, chart)
        .then(response => {
          console.log(response.data)
          if (response.data.status == 'success') {
            toast.success(response.data.message)
            fetchCharts()
          } else {
            toast.error(response.data.errors[0].msg)
          }
        })
        .catch(error => {
          if (error.response) {
            console.log(error)
          } else if (error.request) {
            console.log(error.request)
          } else {
            console.log('Error', error.message)
          }
          console.log(error.config)
        })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Card>
      <Toaster />
      <CardHeader title='รายการรับชาร์ต' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <CardContent>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>ชื่อแพทย์</TableCell>
                <TableCell align='center'>จำนวนชาร์ต</TableCell>
                <TableCell align='center'>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {charts.blogs.map(row => (
                <TableRow key={row.doctorCode} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component='th' scope='row'>
                    {row.dischargeDoctor}
                  </TableCell>
                  <TableCell align='center'>{row.TOTAL_CHART}</TableCell>
                  <TableCell align='center'>
                    <Button
                      variant='contained'
                      color='success'
                      size='large'
                      onClick={() => submitSummaryChart(row.doctorCode, row.insertedAt)}
                    >
                      ส่งสรุปชาร์ต
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}

export default FormSummaryChart

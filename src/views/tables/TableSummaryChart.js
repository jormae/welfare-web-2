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

import apiConfig from 'src/configs/apiConfig'

import moment from 'moment'
import toast, { Toaster } from 'react-hot-toast'

const TableSummaryChart = () => {
  moment.locale('th')
  const today = moment().add(543, 'year').format('L')
  const staffName = typeof window !== 'undefined' ? localStorage.getItem('staffName') : null

  const [charts, setCharts] = useState({ blogs: [] })

  const fetchCharts = async () => {
    let uri = apiConfig.baseURL + '/chart/summary-chart'
    console.log(uri)
    try {
      const { data } = await axios.get(uri)
      setCharts({ blogs: data })

      // console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCharts()
  }, [setCharts])

  const submitSummaryChart = async doctorCode => {
    // console.log(doctorCode)

    try {
      const chart = {
        staffName
      }
      let uri = apiConfig.baseURL + `/chart/summary-chart/${doctorCode}`

      axios
        .put(uri, chart)
        .then(response => {
          console.log(response.data)
          if (response.data.status == 'success') {
            toast.success(response.data.message)
            fetchCharts()
          } else {
            toast.error(response.data.errors[0].msg)

            // toast.error(response.data.errors.msg)
          }
        })
        .catch(error => {
          if (error.response) {
            console.log(error)
          } else if (error.request) {
            console.log(error.request)
          } else {
            console.log('Error', error.message)

            // console.log('Error', error)
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
                    {row.doctorName}
                  </TableCell>
                  <TableCell align='center'>{row.TOTAL_CHART}</TableCell>
                  <TableCell align='center'>
                    <Button
                      variant='contained'
                      color='success'
                      size='large'
                      onClick={() => submitSummaryChart(row.doctorCode)}
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

export default TableSummaryChart

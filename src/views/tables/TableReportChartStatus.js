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
import Link from 'next/link'

import moment from 'moment'
import toast, { Toaster } from 'react-hot-toast'

const TableReportChartStatus = () => {
  moment.locale('th')
  const today = moment().add(543, 'year').format('L')
  const staffName = typeof window !== 'undefined' ? localStorage.getItem('staffName') : null

  const [reportCharts, setReportCharts] = useState({ blogs: [] })

  const fetchCharts = async () => {
    let uri = apiConfig.baseURL + '/report/chart-status'

    try {
      const { data } = await axios.get(uri)
      setReportCharts({ blogs: data })

      // console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCharts()
  }, [setReportCharts])

  const submitSummaryChart = async (doctorCode, insertedAt) => {
    console.log(doctorCode)
    console.log(insertedAt)

    try {
      const chart = {
        staffName,
        insertedAt
      }
      let uri = apiConfig.baseURL + `/chart/summary-chart/${doctorCode}/${insertedAt}`

      axios
        .put(uri, chart)
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
      <CardHeader title='รายงานสรุปความครบถ้วนของชาร์ต' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <CardContent>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>D/C เดือน-ปี</TableCell>
                <TableCell align='center'>รับชาร์ต</TableCell>
                <TableCell align='center'>ส่งสรุป</TableCell>
                <TableCell align='center'>รับสรุป</TableCell>
                <TableCell align='center'>รับออดิต</TableCell>
                <TableCell align='center'>รีออดิต</TableCell>
                <TableCell align='center'>ส่งอีเคลม</TableCell>
                <TableCell align='center'>รับอีเคลม</TableCell>
                <TableCell align='center'>เก็บคลัง</TableCell>
                <TableCell align='center'>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reportCharts.blogs.map(row => (
                <TableRow key={row.dischargeDate}>
                  <TableCell component='th' scope='row' align='center'>
                    {row.dischargeDate}
                  </TableCell>
                  <TableCell align='center'>{row.registerDate}</TableCell>
                  <TableCell align='center'>{row.startSummaryDate}</TableCell>
                  {/* <TableCell align='center'>{moment(row.dischargeDate).format('L')}</TableCell> */}
                  <TableCell align='center'>{row.returnSummaryDate}</TableCell>
                  <TableCell align='center'>{row.returnAuditDate}</TableCell>
                  <TableCell align='center'>{row.reauditDate}</TableCell>
                  <TableCell align='center'>{row.startEclaimDate}</TableCell>
                  <TableCell align='center'>{row.returnEclaimDate}</TableCell>
                  <TableCell align='center'>{row.stockDate}</TableCell>
                  <TableCell align='center'>
                    <Link href={`/report-chart-status/${row.dischargeDate}`} color='success'>
                      <Button type='button' variant='outlined'>
                        เปิด
                      </Button>
                    </Link>
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

export default TableReportChartStatus

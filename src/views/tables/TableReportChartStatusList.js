// ** React Imports
import { useContext } from 'react'

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

import { ChartContext } from 'src/pages/report-chart-status/[year_month]'

const TableReportChartStatusList = () => {

  const chartStatusLists = useContext(ChartContext)

  return (
    <Card>
      <Toaster />
      <CardHeader title='รายการรับชาร์ตที่จำหน่ายเดือน `${year_month}`' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <CardContent>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
              <TableCell align='center'>AN</TableCell>
                <TableCell align='center'>ชื่อ-สกุล</TableCell>
                <TableCell align='center'>หอผู้ป่วย</TableCell>
                <TableCell align='center'>สถานะ</TableCell>
                <TableCell align='center'>วันที่จำหน่าย</TableCell>
                <TableCell align='center'>สาเหตุจำหน่าย</TableCell>
                <TableCell align='center'>สิทธิ์การรักษา</TableCell>
                <TableCell align='center'>แพทย์</TableCell>
                <TableCell align='center'>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {chartStatusLists.blogs.map(row => (
                <TableRow key={row.dischargeDate}>
                  <TableCell component='th' scope='row'>
                    {row.an}
                  </TableCell>
                  <TableCell align='left'>{row.ptName}</TableCell>
                  <TableCell align='left'>{row.wardName}</TableCell>
                  <TableCell align='left'>{row.dischargeStatusName}</TableCell>
                  <TableCell align='center'>{moment(row.dischargeDate).format('L')}</TableCell>
                  <TableCell align='left'>{row.dischargeTypeName}</TableCell>
                  <TableCell align='left'>{row.pttypeName}</TableCell>
                  <TableCell align='left'>{row.doctorName}</TableCell>
                  <TableCell align='center'>
                    <Link href={`/detail-chart/${row.an}`} color='success'>
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

export default TableReportChartStatusList

// ** MUI Imports
import React, { useContext } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import moment from 'moment'

import { DataContext } from 'src/pages/new-chart'

const TableNewChart = () => {
  const charts = useContext(DataContext)

  return (
    <Card>
      <CardHeader title='รายการรับชาร์ต' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <CardContent>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>วันที่รับชาร์ต</TableCell>
                <TableCell align='center'>AN</TableCell>
                <TableCell align='center'>HN</TableCell>
                <TableCell align='center'>ชื่อ-สกุล</TableCell>
                <TableCell align='center'>หอผู้ป่วย</TableCell>
                <TableCell align='center'>วันที่ Discharge</TableCell>
                <TableCell align='center'>ชื่อแพทย์</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {charts.blogs.map(row => (
                <TableRow key={row.an}>
                  <TableCell align='center' component='th' scope='row'>
                    {moment(row.registerDate).format('DD-MM-YY hh:mm:ss')}
                  </TableCell>
                  <TableCell align='center'>{row.an}</TableCell>
                  <TableCell align='center'>{row.hn}</TableCell>
                  <TableCell align='left'>{row.ptName}</TableCell>
                  <TableCell align='left'>{row.wardName}</TableCell>
                  <TableCell align='center'>{moment(row.dischargeDate).format('L')}</TableCell>
                  <TableCell align='left'>{row.dischargeDoctor}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}

export default TableNewChart

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
import { DataContext } from 'src/pages/stock-chart'

const TableStockChart = () => {
  const stockCharts = useContext(DataContext)

  return (
    <Card>
      <CardHeader title='รายการรับคืนชาร์ตจากงาน e-claim' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <CardContent>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>AN</TableCell>
                <TableCell align='center'>HN</TableCell>
                <TableCell align='center'>ชื่อ-สกุล</TableCell>
                <TableCell align='center'>หอผู้ป่วย</TableCell>
                <TableCell align='center'>สิทธิ์การรักษา</TableCell>
                <TableCell align='center'>วันที่รับคืนชาร์ตจากงาน e-claim</TableCell>
                <TableCell align='center'>จำนวนวัน</TableCell>
                <TableCell align='center'>ชื่อผู้รับ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stockCharts.blogs.map(row => (
                <TableRow key={row.an}>
                  <TableCell component='th' scope='row' align='center'>
                    {row.an}
                  </TableCell>
                  <TableCell align='center'>{row.hn}</TableCell>
                  <TableCell align='left'>{row.ptName}</TableCell>
                  <TableCell align='left'>{row.wardName}</TableCell>
                  <TableCell align='left'>{row.mainPttypeName}</TableCell>
                  <TableCell align='center'>{row.returnEclaimDate}</TableCell>
                  <TableCell align='center'>{row.eclaimDuration}</TableCell>
                  <TableCell align='left'>{row.returnedEclaimBy}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}

export default TableStockChart

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
import { DataContext } from 'src/pages/stock-chart//[folderId]'

const TableStockChart = () => {
  const stockCharts = useContext(DataContext)
  // console.log(stockCharts.blogs[0][folderLabel])
  // let folderLabel = stockCharts.blogs[0].folderLabel

  return (
    <Card>
      <CardHeader
        title='รายการชาร์ตเก็บเข้าคลังหมายเลขอ้างอิง '
        // {folderLabel}
        titleTypographyProps={{ variant: 'h6' }}
      />
      <Divider sx={{ margin: 0 }} />
      <CardContent>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>AN</TableCell>
                <TableCell align='center'>HN</TableCell>
                <TableCell align='left'>ชื่อ-สกุล</TableCell>
                <TableCell align='center'>รหัสโฟลเดอร์</TableCell>
                <TableCell align='center'>วันที่เก็บ</TableCell>
                <TableCell align='left'>ผู้เก็บ</TableCell>
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
                  <TableCell align='center'>{row.folderLabel}</TableCell>
                  <TableCell align='center'>{row.stockDate}</TableCell>
                  <TableCell align='left'>{row.stockedBy}</TableCell>
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

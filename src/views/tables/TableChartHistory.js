import React, { useContext, useEffect } from 'react'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import moment from 'moment'

import { HistoriesContext } from 'src/pages/detail-chart/[an]'

const TableChartHistory = () => {
  moment.locale('th')
  const histories = useContext(HistoriesContext)

  return (
    <Card>
      <CardHeader title='ประวัติชาร์ต' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <CardContent>
        <TableContainer component={Paper}>
          <Table aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='left'>วันที่</TableCell>
                <TableCell align='left'>เหตุการณ์</TableCell>
                <TableCell align='left'>เจ้าหน้าที่</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {histories.blogs.map(row => (
                <TableRow key={row.datetime}>
                  <TableCell align='left'>{moment(row.datetime).format('L')}</TableCell>
                  <TableCell align='left'>{row.action}</TableCell>
                  <TableCell align='left'>{row.staffName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}

export default TableChartHistory

import React, { useContext, useEffect } from 'react'
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
                <TableCell align='left'>รายละเอียด</TableCell>
                <TableCell align='left'>เจ้าหน้าที่</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {histories.blogs.map(row => (
                <TableRow>
                  <TableCell align='left'>{moment(row.datetime).format('L')}</TableCell>
                  <TableCell align='left'>{row.action}</TableCell>
                  <TableCell align='left'>{row.details}</TableCell>
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

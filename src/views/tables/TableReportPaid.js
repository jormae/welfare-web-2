// ** MUI Imports
import { useEffect, useState, createContext } from 'react'
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
import Button from '@mui/material/Button'
import Link from 'next/link'
import axios from 'axios'
import apiConfig from 'src/configs/apiConfig'
import moment from 'moment'

import { PaidContext, StrDateContext } from 'src/pages/reports/monthly/welfare-payment/index'

const TableReportPaid = () => {

    const paidReports = useContext(PaidContext)
    const strDate = useContext(StrDateContext)
    const i = 1;
    console.log(paidReports)
    
  return (
    <Card>
      <CardHeader title={`รายการชำระเงินสวัสดิการประจำเดือน ${strDate}`} titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <CardContent>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>ที่</TableCell>
                <TableCell align='center'>วันที่ชำระ</TableCell>
                <TableCell align='center'>ชื่อ-สกุล</TableCell>
                <TableCell align='center'>งวดที่</TableCell>
                <TableCell align='center'>ช่องทางชำระ</TableCell>
                <TableCell align='center'>ยอดชำระ</TableCell>
                {/* <TableCell align='center'>กำไร</TableCell> */}
                <TableCell align='center'>ผู้ชำระ</TableCell>
                <TableCell align='center'>หลักฐานการชำระ</TableCell>
                <TableCell align='center'>สถานะการชำระ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paidReports.blogs.map(row => (
                <TableRow key={row.loanId}>
                  <TableCell align='center' component='th' scope='row'>
                  {i++}
                  </TableCell>
                  <TableCell align='center' color='success'> {moment(row.createdAt).add(543, 'year').format('DD/MM/YYYY hh:mm')}</TableCell>
                  <TableCell>{row.memberName}</TableCell>
                  <TableCell align='center' >{row.monthNo}</TableCell>
                  <TableCell >{row.paymentTypeName}</TableCell>
                  <TableCell  color='success'>{row.paymentAmount}</TableCell>
                  {/* <TableCell align='center' color='success'>{row.PROFIT}</TableCell> */}
                  <TableCell align='center' color='success'>{row.createdBy}</TableCell>
                  <TableCell align='center' color='success'>{row.paymentFilePath}</TableCell>
                  <TableCell align='center' color='success'>{row.paymentApprovedBy == null ? 'รออนุมัติ' : 'อนุมัติ'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}

export default TableReportPaid

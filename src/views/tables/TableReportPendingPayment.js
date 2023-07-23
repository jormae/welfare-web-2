// ** MUI Imports
import React, { useContext, useEffect, useState } from 'react'
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

import { PendingPaymentContext, StrDateContext } from 'src/pages/reports/monthly/welfare-payment/index'

const TableReportPendingPayment = () => {

    const pendingPaymentReports = useContext(PendingPaymentContext)
    const strDate = useContext(StrDateContext)
    const i = 1;

    const [search, setSearch] = useState('')

    
  return (
    <Card>
      <CardHeader title={`รายการรอชำระเงินสวัสดิการประจำเดือน ${strDate}`}  titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <CardContent>
        <TableContainer component={Paper}>
          <Table  sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>ลำดับ</TableCell>
                <TableCell align='center'>ชื่อ-สกุล</TableCell>
                <TableCell align='center'>ตำแหน่ง</TableCell>
                <TableCell align='center'>ประเภทสวัสดิการ</TableCell>
                <TableCell align='center'>ยอดคงเหลือ</TableCell>
                <TableCell align='center'>ยอดที่ต้องชำระ</TableCell>
                <TableCell align='center'>จัดการ</TableCell> 
              </TableRow>
            </TableHead>
            <TableBody>
              { pendingPaymentReports.blogs.filter((row)=>{
                return search.toLowerCase() === '' ? row : row.memberName.toLowerCase().include(search);
              }).map(row => (
                <TableRow key={row.loanId}>
                  <TableCell align='center' component='th' scope='row'>
                  {i++}
                  </TableCell>
                  <TableCell>{row.memberName}</TableCell>
                  <TableCell >{row.positionName}</TableCell>
                  <TableCell >{row.loanTypeName} ({row.loanAmount.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')})</TableCell>
                  <TableCell color='success' align='right'></TableCell>
                  <TableCell align='center' color='success'>{row.monthlyPayment}</TableCell>
                  <TableCell align='center' color='success'>
                    <Link href={`../../loan-payment/${row.nationalId}/${row.loanId}`} color='success'>
                      <Button type='button' variant='outlined'>
                        ชำระ
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

export default TableReportPendingPayment

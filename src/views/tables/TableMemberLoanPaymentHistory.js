// ** MUI Imports
import React, { useContext } from 'react'
import { useRouter } from 'next/router'
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
import moment from 'moment'

import { LoanRecordHistoryContext } from 'src/pages/loan/[nationalId]/[loanId]'

const TableMemberLoanPaymentHistory = () => {
  const router = useRouter()
  if (router.isReady) {
    router.query.nationalId
  }
  console.log(router.query.nationalId)
  console.log(router.query.loanId)
  const memberLoanRecordHistories = useContext(LoanRecordHistoryContext)

  return (
    <Card>
      <CardHeader title='ประวัติการชำระเงินกู้สวัสดิการ' titleTypographyProps={{ variant: 'h6' }} />
      <Link href={`../../loan-payment/${router.query.nationalId}/${router.query.loanId}`} color='primary' sx={{ align:'right'}}>
          <Button type='button' variant='outlined'>
              เปิด
          </Button>
        </Link>
      <Divider sx={{ margin: 0 }} />
      <CardContent>
        <TableContainer component={Paper}>
          <Table sx={{ width: '100%' }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>งวดที่</TableCell>
                <TableCell align='center'>เดือน</TableCell>
                <TableCell align='center'>วันที่ชำระ</TableCell>
                <TableCell align='center'>ประเภทการชำระ</TableCell>
                <TableCell align='center'>จำนวนเงิน</TableCell>
                <TableCell align='center'>หลักฐาน</TableCell>
                <TableCell align='center'>ยอดค้างชำระ</TableCell>
                <TableCell align='center'>สถานะ</TableCell>
                <TableCell align='center'>ผู้อนุมัติ</TableCell>
                <TableCell align='center'>วันที่อนุมัติ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {memberLoanRecordHistories.blogs.map(row => (
                <TableRow key={row.loanPaymentId}>
                  <TableCell align='center'>{row.monthNo}</TableCell>
                  <TableCell align='center'>{moment(row.loanPaymentMonth).add(543, 'year').format('MM/YYYY')}</TableCell>
                  <TableCell align='center' component='th' scope='row'>
                    {moment(row.createdAt).add(543, 'year').format('DD/MM/YYYY HH:mm')}
                  </TableCell>
                  <TableCell align='center'>{row.paymentTypeName}</TableCell>
                  <TableCell align='center'>{row.paymentAmount}</TableCell>
                  <TableCell align='center'></TableCell>
                  <TableCell align='center'></TableCell>
                  <TableCell align='center'>{row.loanStatusName}</TableCell>
                  <TableCell align='center'>{row.approvedBy ?? '-'}</TableCell>
                  <TableCell align='center'>{moment(row.approvedAt).add(543, 'year').format('DD/MM/YYYY') ?? '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
      </CardContent>
    </Card>
  )
}

export default TableMemberLoanPaymentHistory

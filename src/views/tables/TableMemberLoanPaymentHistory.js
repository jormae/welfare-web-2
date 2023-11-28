/* eslint-disable no-unused-expressions */
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
import Link from 'next/link'
import moment from 'moment'
import Avatar from '@mui/material/Avatar'
import apiConfig from 'src/configs/apiConfig'
import Chip from '@mui/material/Chip'

import { LoanPaymentHistoryContext } from 'src/pages/loan/[nationalId]/[loanId]'

function stringAvatar (name) {
  return {
    children: `${name}`
  }
}

const TableMemberLoanPaymentHistory = () => {
  const router = useRouter()
  if (router.isReady) {
    router.query.nationalId
  }
  console.log(router.query.nationalId)
  console.log(router.query.loanId)
  const memberLoanPaymentHistories = useContext(LoanPaymentHistoryContext)
  // const i = 1
  // const i2 = 1
  const j = memberLoanPaymentHistories.blogs[0].paymentAmount
  let k = 0
  let k2 = 0
  console.log(j)

  return (
    <Card>
      <CardHeader title='ประวัติการชำระเงินกู้สวัสดิการ' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <CardContent>
        <TableContainer component={Paper}>
          <Table sx={{ width: '100%' }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>งวดที่</TableCell>
                <TableCell align='center'>เดือน</TableCell>
                <TableCell align='center'>วันที่ชำระ</TableCell>
                <TableCell align='center'>ช่องทางการชำระ</TableCell>
                <TableCell align='center'>ยอดก่อนชำระ</TableCell>
                <TableCell align='center'>ยอดชำระ</TableCell>
                <TableCell align='center'>คงเหลือ</TableCell>
                <TableCell align='center'>ประเภทการชำระ</TableCell>
                <TableCell align='center'>หลักฐาน</TableCell>
                <TableCell align='center'>ผู้อนุมัติ</TableCell>
                <TableCell align='center'>วันที่อนุมัติ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {memberLoanPaymentHistories.blogs.map(row => (
                <TableRow key={row.loanPaymentId}>
                  <TableCell align='center'>{row.monthNo}</TableCell>
                  <TableCell align='center'>{moment(row.loanPaymentMonth).add(543, 'year').format('MM/YYYY')}</TableCell>
                  <TableCell align='center' component='th' scope='row'>
                    {moment(row.approvedAt).add(543, 'year').format('DD/MM/YYYY HH:mm')}
                  </TableCell>
                  <TableCell align='center'>{row.paymentTypeName}</TableCell>
                  <TableCell align='center'>{parseInt((row.loanAmount + row.totalProfit), 10) - parseInt(k++ * j, 10)}</TableCell>
                  <TableCell align='center'>{row.paymentAmount}</TableCell>
                  <TableCell align='center'>{parseInt((row.loanAmount + row.totalProfit), 10) - parseInt((k2++ * j), 10) - parseInt((row.paymentAmount), 10)}</TableCell>
                  <TableCell align='center'>
                    {row.isCloseLoanPayment === 1
                      ? (
                      <Chip label={'ปิดยอดสวัสดิการ'} color="primary" />
                        )
                      : (
                      <Chip label={'ชำระรายเดือน'} color="primary" variant='outlined'/>
                        )}
                  </TableCell>
                  <TableCell align='center'>
                    <Link passHref href={`${apiConfig.baseURL}/files/payment-slip/${row.paymentFilePath}`} color='success'>
                      <Avatar alt='N/A' {...stringAvatar('N/A')} src={`${apiConfig.baseURL}/files/payment-slip/${row.paymentFilePath}`} sx={{ width: '2.5rem', height: '2.5rem', fontSize: 14 }} />
                    </Link>
                  </TableCell>
                  <TableCell align='center'>{row.approvedBy ?? '-'}</TableCell>
                  <TableCell align='center'>{moment(row.approvedAt).add(543, 'year').format('DD/MM/YYYY HH:mm') ?? '-'}</TableCell>
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

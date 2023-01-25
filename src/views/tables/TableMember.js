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
import Button from '@mui/material/Button'
import Link from 'next/link'
import moment from 'moment'

import { DataContext } from 'src/pages/member'

const TableMember = () => {
  const members = useContext(DataContext)

  return (
    <Card>
      <CardHeader title='ทะเบียนสมาชิกทั้งหมด' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <CardContent>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>รหัสสมาชิก</TableCell>
                <TableCell align='center'>ชื่อ-สกุล</TableCell>
                <TableCell align='center'>ตำแหน่ง</TableCell>
                <TableCell align='center'>ประเภทสมาชิก</TableCell>
                <TableCell align='center'>สถานะสมาชิก</TableCell>
                <TableCell align='center'>จัดการ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {members.blogs.map(row => (
                <TableRow key={row.memberId}>
                  <TableCell align='center' component='th' scope='row'>
                  {row.nationalId}
                  </TableCell>
                  <TableCell align='center'>{row.memberName}</TableCell>
                  <TableCell align='center'>{row.positionName}</TableCell>
                  <TableCell align='center'>{row.memberTypeName}</TableCell>
                  <TableCell align='center'>{row.memberStatus == 0 ? 'ปิดบัญชี' : 'ปกติ'}</TableCell>
                  <TableCell align='center'>
                    <Link href={`member/${row.nationalId}`} color='success'>
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

export default TableMember

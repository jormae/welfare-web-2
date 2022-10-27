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
import Link from 'next/link'
import Button from '@mui/material/Button'

import { DataContext } from 'src/pages/stock-folder'

const TableStockFolder = () => {
  const stockFolders = useContext(DataContext)

  return (
    <Card>
      <CardHeader title='รายการโฟลเดอร์เก็บชาร์ต' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <CardContent>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>ชื่อโฟลเดอร์</TableCell>
                <TableCell align='center'>ชื่อคลัง</TableCell>
                <TableCell align='center'>จำนวนชาร์ต</TableCell>
                <TableCell align='center'>ชื่อเจ้าหน้าที่</TableCell>
                <TableCell align='center'>วันที่</TableCell>
                <TableCell align='center'>จัดการ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stockFolders.blogs.map(row => (
                <TableRow key={row.folderId}>
                  <TableCell component='th' scope='row' align='center'>
                    {row.folderLabel}
                  </TableCell>
                  <TableCell align='left'>{row.stockName}</TableCell>
                  <TableCell align='center'>{row?.totalChart ?? 0}</TableCell>
                  <TableCell align='center'>{row.createdBy}</TableCell>
                  <TableCell align='center'>{row.createdAt}</TableCell>
                  <TableCell align='center'>
                    <Link href={`/stock-chart/${row.folderId}`} color='success'>
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

export default TableStockFolder

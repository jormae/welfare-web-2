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
import { DataContext } from 'src/pages/submit-eclaim'

const TableSubmitEclaim = () => {
  const submitEclaim = useContext(DataContext)

  return (
    <Card>
      <CardHeader title='รายการส่ง-รับคืนสรุปชาร์ต' titleTypographyProps={{ variant: 'h6' }} />
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
                <TableCell align='center'>เจ้าหน้าที่</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {submitEclaim.blogs.map(row => (
                <TableRow key={row.an}>
                  <TableCell component='th' scope='row'>
                    {row.an}
                  </TableCell>
                  <TableCell align='center'>{row.hn}</TableCell>
                  <TableCell align='left'>{row.ptName}</TableCell>
                  <TableCell align='left'>{row.wardName}</TableCell>
                  <TableCell align='center'>{row.mainPttypeName}</TableCell>
                  <TableCell align='left'>{row.submitedEclaimBy}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}

export default TableSubmitEclaim

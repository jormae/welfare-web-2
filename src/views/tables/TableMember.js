// ** MUI Imports
import React, { useContext, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from "@mui/material/TablePagination"
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Link from 'next/link'
import Grid from '@mui/material/Grid'
import TextField  from "@mui/material/TextField";
import { DataContext } from 'src/pages/member'

const TableMember = (props) => {

  const members = useContext(DataContext)

  const { register } = useForm();
  const [search, setSearch] = useState('')
  const i = 1;

  const [pg, setpg] = React.useState(0);
  const [rpg, setrpg] = React.useState(10);

  function handleChangePage(event, newpage) {
      setpg(newpage);
  }

  function handleChangeRowsPerPage(event) {
      setrpg(parseInt(event.target.value, 10));
      setpg(0);
  }

  return (
    <Card>
      <CardHeader title='ทะเบียนสมาชิกทั้งหมด' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <CardContent>
        <Grid item xs={12} md={12} lg={12}>
          <form noValidate autoComplete='off'>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <TextField fullWidth label='ค้นหาสมาชิก' placeholder='ค้นหาสมาชิก' {...register('search', {
                    onChange: (e) => {setSearch(e.target.value)},
                    onBlur: (e) => {},
                  })} />
                </Grid>
              </Grid>
          </form>
        </Grid>
        <Divider sx={{ margin: 0, mt:5 }} />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>ที่</TableCell>
                <TableCell align='center'>รหัสสมาชิก</TableCell>
                <TableCell align='center'>ชื่อ-สกุล</TableCell>
                <TableCell align='center'>ตำแหน่ง</TableCell>
                <TableCell align='center'>เงินหุ้นทั้งหมด</TableCell>
                <TableCell align='center'>ประเภทสมาชิก</TableCell>
                <TableCell align='center'>สถานะสมาชิก</TableCell>
                <TableCell align='center'>จัดการ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            { members.blogs.filter((row)=>{
                return search.toLowerCase() === '' ? row : row.memberName.toLowerCase().includes(search);
              }).slice(pg * rpg, pg *
                rpg + rpg).map(row => (
                <TableRow key={row.nationalId} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell align='center'  component='th' scope='row'>{i++}</TableCell>
                  <TableCell align='center'>
                  {row.nationalId}
                  </TableCell>
                  <TableCell >{row.memberName}</TableCell>
                  <TableCell >{row.positionName}</TableCell>
                  <TableCell align='center'>{row.TOTAL_SHARE ?? 0}</TableCell>
                  <TableCell>{row.memberTypeName}</TableCell>
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
        <TablePagination
                rowsPerPageOptions={[10, 20, 50]}
                component="div"
                count={members.blogs.length}
                rowsPerPage={rpg}
                page={pg}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
       
      </CardContent>
    </Card>
  )
}

export default TableMember

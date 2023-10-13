// ** MUI Imports
import React, { useContext,useState } from 'react'
import { useForm } from 'react-hook-form'
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
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import SaveIcon from '@material-ui/icons/Save';
import LoadingButton from '@mui/lab/LoadingButton'
import PrintIcon from '@material-ui/icons/Print';
import Button from '@mui/material/Button'
import Link from 'next/link'
import moment from 'moment'
import toast, { Toaster } from 'react-hot-toast'
import apiConfig from 'src/configs/apiConfig'

import { DataReportSalaryContext, DataDateContext} from 'src/pages/reports/monthly/salary/index'


const TableReportSalary = () => {

    const salaries = useContext(DataReportSalaryContext)
    const date = useContext(DataDateContext)
 
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const i = 1;
    const [loading, setLoading] = useState(false)
    const strDate = 'เดือน '+ moment(date).format('MMMM') +' พ.ศ.'+ moment(date).add(543, 'year').format('YYYY');
    const memberName = typeof window !== 'undefined' ? localStorage.getItem('memberName') : null

  return (
    <Card>
      <CardHeader title={`รายงานบัญชีการจ่ายเงินเดือนบุคลากร โรงเรียนดารุสสาลาม ประจำเดือน ${strDate}`} titleTypographyProps={{ variant: 'h6' }} />
      <Toaster />
      <Divider sx={{ margin: 0 }} />
      <CardContent>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>ที่</TableCell>
                <TableCell align='center'>เลขที่บัตรประชาชน</TableCell>
                <TableCell align='center'>ชื่อ-สกุล</TableCell>
                <TableCell align='center'>เงินเดือน</TableCell>
                <TableCell align='center'>หักประกันสังคม (%)</TableCell>
                <TableCell align='center'>รับจริง</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salaries.blogs.map(row => (
                <TableRow key={row.salaryId}>
                  <TableCell align='center' component='th' scope='row'>
                  {i++}
                  </TableCell>
                  <TableCell>{row.nationalId}</TableCell>
                  <TableCell>{row.memberName}</TableCell>
                  <TableCell align='center'>{(row.salary ?? 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</TableCell>
                  <TableCell align='center'>{row.healthInsurance.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</TableCell>
                  <TableCell align='center'>{(row.netSalary).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
                <Grid container spacing={5}>

                    <Grid item xs={12} md={3}>
                            <Box
                                sx={{
                                gap: 5,
                                display: 'flex',
                                flexWrap: 'wrap',
                                alignItems: 'left',
                                justifyContent: 'space-between',
                                mt:4
                                }}
                            >
                                <Box sx={{ '& > button': { m: 10 } }}></Box>
                                <LoadingButton
                                type='submit'
                                color='primary'
                                loading={loading}
                                loadingPosition='start'
                                startIcon={<PrintIcon />}
                                variant='contained'
                                size='large'
                                >
                                พิมพ์ซองเงินเดือน
                                </LoadingButton>
                            </Box>
                    </Grid>
                    <Grid item xs={12} md={6}></Grid>
                
                        <Grid item xs={12} md={3}>
                            <Box
                                sx={{
                                gap: 5,
                                display: 'flex',
                                flexWrap: 'wrap',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                mt:4
                                }}
                            >
                                <Box sx={{ '& > button': { m: 10 } }}></Box>
                                <LoadingButton
                                type='submit'
                                color='primary'
                                loading={loading}
                                loadingPosition='start'
                                startIcon={<PrintIcon />}
                                variant='contained'
                                size='large'
                                >
                                พิมพ์รายงานเงินเดือน
                                </LoadingButton>
                      <Button type='button' variant='outlined' onClick={() => window.print()}>
                        รายละเอียด
                      </Button>
                            </Box>
                        </Grid>
                </Grid>
      </CardContent>
    </Card>
  )
}

export default TableReportSalary

// ** MUI Imports
import React, { useContext,useState, useRef } from 'react'
import { useReactToPrint } from 'react-to-print';
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
import {Button, H2} from '@mui/material'
import Link from 'next/link'
import moment from 'moment'
import { makeStyles } from '@mui/styles';
import toast, { Toaster } from 'react-hot-toast'
import apiConfig from 'src/configs/apiConfig'

import { DataReportSalaryContext, DataDateContext} from 'src/pages/reports/monthly/salary/index'
import { DataReportPrintSalaryContext, DataDatePrintContext} from 'src/pages/reports/monthly/salary/print-doc'

const useStyles = makeStyles({
  // root: {
  //   backgroundColor: 'grey',
  //   color:'white'
  // },
  [`@page`] : {
    size: 'A4 Portrait',
    margin: 0,
  },
  [`@media print`]: {
    
    table: {
      minWidth: 650,
      marginTop: 30,
      fontSize:20,
      color:'000',
      width:740,
      "& .MuiTableCell-root": {
        border: '1px solid black'
      },
      margin:'auto',
      color:'black',
    },
  },
  color:'black',

});


const TableReportSalary = () => {
 
    const classes = useStyles();
    const reportSalary = useContext(DataReportSalaryContext);
    const reportDate = useContext(DataDateContext);
    const printSalary = useContext(DataReportPrintSalaryContext);
    const printDate = useContext(DataDatePrintContext);

    const salaries = reportSalary ?? printSalary;
    const date = reportDate ?? printDate;
 
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const i = 1;
    const [loading, setLoading] = useState(false)
    const strDate = 'เดือน '+ moment(date).format('MMMM') +' พ.ศ.'+ moment(date).add(543, 'year').format('YYYY');
    const memberName = typeof window !== 'undefined' ? localStorage.getItem('memberName') : null

    const printRef = useRef();

    const handlePrint = useReactToPrint({
      content: () => printRef.current,
    });

    
  return (
    
    <Card>
      <CardHeader title={`รายงานบัญชีการจ่ายเงินเดือนบุคลากร โรงเรียนดารุสสาลาม ประจำเดือน ${strDate}`} titleTypographyProps={{ variant: 'h6', textAlign:'center' }} />
      <Divider sx={{ margin: 0 }} />
      <CardContent>
        <TableContainer component={Paper} ref={printRef} >
          <h3 style={{textAlign:'center', marginTop:40}}>รายงานบัญชีการจ่ายเงินเดือนบุคลากร โรงเรียนดารุสสาลาม</h3>
          <h4 style={{textAlign:'center'}}>{`ประจำเดือน ${strDate}`}</h4>
          <Table className={classes.table} aria-label='simple table' size="small" style={{ color: "black" }}>
            <TableHead>
              <TableRow style={{ backgroundColor: "#dedede" }}>
                <TableCell align='center' sx={{width: 10}} style={{ color: "black" }}>ที่</TableCell>
                <TableCell align='center' sx={{width: 10}} style={{ color: "black" }}>เลขที่บัตรประชาชน</TableCell>
                <TableCell align='center' style={{ color: "black" }}>ชื่อ-สกุล</TableCell>
                <TableCell align='center' style={{ color: "black" }}>เงินเดือน</TableCell>
                <TableCell align='center' style={{ color: "black" }}>หักประกันสังคม (%)</TableCell>
                <TableCell align='center' style={{ color: "black" }}>รับจริง</TableCell>
                <TableCell align='center' style={{ color: "black" }}>ลงชื่อ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "black" }}>
              {salaries.blogs.map(row => (
                <TableRow key={row.salaryId} >
                  <TableCell align='center' component='th' scope='row' style={{ color: "black" }}>
                  {i++}
                  </TableCell>
                  <TableCell style={{ color: "black" }}>{row.nationalId}</TableCell>
                  <TableCell style={{ color: "black" }}>{row.memberName}</TableCell>
                  <TableCell style={{ color: "black" }} align='center'>{(row.salary ?? 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</TableCell>
                  <TableCell style={{ color: "black" }} align='center'>{row.healthInsurance.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</TableCell>
                  <TableCell style={{ color: "black" }} align='center'>{(row.netSalary).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
                <Grid container spacing={5}>

                    <Grid item xs={12} md={3}>
                      <Link href={'../monthly/salary/print-doc'}>
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
                                loadingPosition='start'
                                startIcon={<PrintIcon />}
                                variant='contained'
                                size='large'
                                >
                                พิมพ์ซองเงินเดือน
                                </LoadingButton>
                            </Box>
                            </Link>
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
                                onClick={handlePrint}
                                color='primary'
                                loading={loading}
                                loadingPosition='start'
                                startIcon={<PrintIcon />}
                                variant='contained'
                                size='large'
                                >
                                พิมพ์รายงานเงินเดือน
                                </LoadingButton>
                            </Box>
                        </Grid>
                </Grid>
      </CardContent>
    </Card>
  )
}

export default TableReportSalary


import React, { useState, useRef, useEffect } from 'react'
import { useReactToPrint } from 'react-to-print';

// import * as React from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import apiConfig from 'src/configs/apiConfig'
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Slide from '@mui/material/Slide';
import { makeStyles } from '@mui/styles';
import PrintIcon from '@material-ui/icons/Print';
import moment from 'moment'
import 'moment/locale/th' 

const useStyles = makeStyles({
    [`@page`] : {
      size: 'A4 Portrait',
      margin: 20,
    },
    [`@media print`]: {
      
      table: {
        minWidth: 650,
        fontSize:20,
        color:'000',
        width:1024,
        "& .MuiTableCell-root": {
          border: '1px solid black'
        },
        margin:'auto',
        color:'black',
      },
    },
    color:'black',
  
  });

const FormLayouts = () => {
    const classes = useStyles();
    const date = moment().format('YYYY-MM')
    const strDate = 'เดือน '+ moment(date).format('MMMM') +' พ.ศ.'+ moment(date).add(543, 'year').format('YYYY');
    const strShortDate = moment(date).format('MM') +'/'+ moment(date).add(543, 'year').format('YYYY');
    const [debts, setDebts] = useState({ blogs: [] })

    const i = 1;
    const printRef = useRef();

    const handlePrint = useReactToPrint({
      content: () => printRef.current,
    });

    const fetchDebts = async () => {
    const date = moment().format('YYYY-MM')

    let uri = apiConfig.baseURL + `/debts/date/${date}`
    console.log(uri)
    try {
        const { data } = await axios.get(uri)
        setDebts({ blogs: data })
        handlePrint();
    } catch (error) {
        console.log(error)
    }
    }

    useEffect(() => {
        fetchDebts();
    }, [])

  return (
    <Grid container spacing={6} onLoad={handlePrint}>
        <Grid item lg={9} md={3}></Grid>
        <Grid item lg={3} md={3}>
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
                loadingPosition='start'
                startIcon={<PrintIcon />}
                variant='contained'
                size='large'
                
                >
                พิมพ์รายงานเงินเดือน
                </LoadingButton>
            </Box>
        </Grid>
        <Grid item xs={12}>
              <Card >
              <CardContent>
                <TableContainer component={Paper} ref={printRef}>
                    <h3 style={{textAlign:'center', marginTop:40}}>{`รายงานหนี้ประจำ ${strDate}`}</h3>
                  <Table className={classes.table} width="1024" size="small" style={{ color: "black", }}>
                    <TableHead>
                      <TableRow style={{ backgroundColor: "#dedede" }}>
                        <TableCell align='center' style={{ color: "black" }}>ที่</TableCell>
                        <TableCell align='center' style={{ color: "black" }}>เดือน</TableCell>
                        <TableCell align='center' style={{ color: "black" }}>รหัสสมาชิก</TableCell>
                        <TableCell align='center' style={{ color: "black" }}>ชื่อลูกหนี้</TableCell>
                        <TableCell align='center' style={{ color: "black" }}>สามัญ</TableCell>
                        <TableCell align='center' style={{ color: "black" }}>ฉุกเฉิน</TableCell>
                        <TableCell align='center' style={{ color: "black" }}>หนี้ธนาคาร</TableCell>
                        <TableCell align='center' style={{ color: "black" }}>หนี้กยศ</TableCell>
                        <TableCell align='center' style={{ color: "black" }}>ค่าเช่าบ้าน</TableCell>
                        <TableCell align='center' style={{ color: "black" }}>เงินสมทบ</TableCell>
                        <TableCell align='center' style={{ color: "black" }}>รวมทั้งหมด</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {debts.blogs.map(row => (
                        <TableRow key={row.debtId}>
                          <TableCell align='center' style={{ color: "black" }} component='th' scope='row'>{i++} </TableCell>
                          <TableCell align='center' style={{ color: "black" }}>{strShortDate}</TableCell>
                          <TableCell align='center' style={{ color: "black" }}>{row.nationalId}</TableCell>
                          <TableCell align='left' style={{ color: "black" }}>{row.memberName}</TableCell>
                          <TableCell align='center' style={{ color: "black" }}>{row.debt1 ?? 0}</TableCell>
                          <TableCell align='center' style={{ color: "black" }}>{row.debt2 ?? 0}</TableCell>
                          <TableCell align='center' style={{ color: "black" }}>{row.bank}</TableCell>
                          <TableCell align='center' style={{ color: "black" }}>{row.studentLoan}</TableCell>
                          <TableCell align='center' style={{ color: "black" }}>{row.allowance}</TableCell>
                          <TableCell align='center' style={{ color: "black" }}>{row.houseRent}</TableCell>
                          <TableCell align='center' style={{ color: "black" }}>{(row.houseRent + row.bank + row.studentLoan +row.allowance+ row.debt1+row.debt2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
        </Grid>
    </Grid>
  )
}

export default FormLayouts

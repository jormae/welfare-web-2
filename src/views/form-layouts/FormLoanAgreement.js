// ** React Imports
import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import THBText from 'thai-baht-text' 
// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Autocomplete from '@mui/material/Autocomplete';
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import apiConfig from 'src/configs/apiConfig'
import Divider from '@mui/material/Divider'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material'
// ** Icons Imports
import SaveIcon from 'mdi-material-ui/Plus'
import LoadingButton from '@mui/lab/LoadingButton'
import moment from 'moment'
import 'moment/locale/th'
import { LoanContext } from 'src/pages/loan/[nationalId]/[loanId]'

const FormLoanAgreement = () => {

    const router = useRouter()
    if (router.isReady) {
      router.query.nationalId
    }

    moment.locale('th')
    console.log(moment().format('LL'))
    const [loanDetail, setLoanDetail] = useState()
    const userName = typeof window !== 'undefined' ? localStorage.getItem('memberName') : null
    const memberRoleId = typeof window !== 'undefined' ? localStorage.getItem('memberRoleId') : null

  const fetchLoanDetail = async () => {
    let uri = apiConfig.baseURL + `/loans/request/${router.query.nationalId}/${router.query.loanId}`
    console.log(uri)
    try{
    const res = await axios.get(uri)
    console.log(res.data[0])
    setLoanDetail(res.data[0])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (router.isReady) {
      router.query
      fetchLoanDetail()
    }
  }, [router.isReady, router.query])

  const getPlansContent = () => {
    let content = [];
    for (let i = 1; i <=30; i++) {
      const item = i;
      // content.push(<li key={item.id}>{item.animal}</li>);
      content.push(
      <TableRow key={item.i}>
                  <TableCell align='center' component='th' scope='row'>
                  {item.i} Hello
                  </TableCell>
                </TableRow>
      );
    }
    return content;
  }
  
  return (

          <Grid container spacing={2} sx={{p: 20}}>
            <Grid item xs={12} sm={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant='h5' sx={{ marginBottom: 2}}>
                กลุ่มสวัสดิการครูดารุสสาลาม
                </Typography>
            </Grid>
            <Grid item xs={12} sm={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant='h6' sx={{ marginBottom: 2 }}>
                หนังสือสัญญา
                </Typography>
            </Grid>
            <Grid item xs={12} sm={12} sx={{ display: 'flex', justifyContent: 'right' }}>
                <Typography variant='body2'>
                โรงเรียนดารุสสาลาม เลขที่ 7 ถ.เทศบาล 8
                </Typography>
            </Grid>
            <Grid item xs={12} sm={12} sx={{ display: 'flex', justifyContent: 'right' }}>
                <Typography variant='body2'>
                ต.ตันหยงมัส อ.ระแงะ จ.นราธิวาส 96130
                </Typography>
            </Grid>
            <Grid item xs={12} sm={12} sx={{ display: 'flex', justifyContent: 'right' }}>
                <Typography variant='body2'>
                วันที่  {moment().format('DD')} เดือน {moment().format('MMMM')} พ.ศ.  {moment().add(543,'year').format('YYYY')}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={12} sx={{ display: 'flex', justifyContent: 'left' }}>
                <Typography variant='body2' sx={{lineHeight:2, justifyContent:'justify'}} paragraph="true">
                ข้าพเจ้า (นาย, นาง, นางสาว) {loanDetail?.memberName} ที่อยู่ {loanDetail?.houseNo} ถ.{loanDetail?.streetName ?? '-'} ม.{loanDetail?.villageNo} ต.{loanDetail?.subDistrict} อ.{loanDetail?.district} จ.{loanDetail?.province} รหัสไปรษณีย์ {loanDetail?.postCode}   
                 ได้รับเงินสวัสดิการสามัญกลุ่มสวัสดิการครูดารุสสาลาม จำนวน {loanDetail?.loanAmount} บาท ({THBText(loanDetail?.loanAmount)}) โดยกำหนดชำระดังต่อไปนี้
                </Typography>
            </Grid>
            <Grid item xs={12} sx={{ml:-8}}>
        <TableContainer sx={{ml:12}}>
          <Table style={{width:'100%'}} sx={{  border: "1px solid rgba(224, 224, 224, 1)" }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='center' sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}><Typography>รายการ</Typography></TableCell>
                <TableCell colSpan={2} align='center'><Typography>จำนวนเงิน</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {getPlansContent()}
            </TableBody>
          </Table>
        </TableContainer>
        </Grid>
            <Grid item xs={6}/>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', mt:20}}>
                <Typography>ลงชื่อ......................................ผู้รับเงิน</Typography>
            </Grid>
            <Grid item xs={6}/>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center'}}>
                <Typography>( {loanDetail?.memberName} )</Typography>
            </Grid>
            <Grid item xs={6}/>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', mt:10}}>
                <Typography>ลงชื่อ......................................ผู้จ่ายเงิน</Typography>
            </Grid>
            <Grid item xs={6}/>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center'}}>
                <Typography>( .............................................. )</Typography>
            </Grid>
        </Grid>
       
  )
}

export default FormLoanAgreement

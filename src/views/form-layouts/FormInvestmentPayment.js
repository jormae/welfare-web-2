// ** React Imports
import React, { useState, useEffect, useContext } from 'react'
import Skeleton from '@mui/material/Skeleton'
import { Controller, useForm } from 'react-hook-form'
import DatePicker from 'react-datepicker'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
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

// ** Icons Imports
import SaveIcon from 'mdi-material-ui/Plus'
import LoadingButton from '@mui/lab/LoadingButton'
import moment from 'moment'

import {MemberContext} from 'src/pages/investment-payment/[nationalId]'

const FormInvestmentPayment = () => {

    // const paymentSuggestionInfo = useContext(PaymentSuggestionContext)
   
    const memberDetail = useContext(MemberContext)
    
    console.log(memberDetail)

    const { register, handleSubmit, control } = useForm();
  
    const [loading, setLoading] = React.useState(false)
    const [paymentTypes, setPaymentTypes] = useState([])
    const userName = typeof window !== 'undefined' ? localStorage.getItem('userName') : null
//   const loanPaymentMonth = moment(paymentSuggestionInfo?.loanPaymentMonth).format('DD/MM/YYYY')
// console.log(paymentSuggestionInfo?.loanId)

    const [shareQuantity, setShareQuantity] = useState()
    const [valuePerShare, setValuePerShare] = useState()
    const [netTotalShare, setNetTotalShare] = useState()
    const totalShare = (parseInt(shareQuantity, 10) * parseInt(valuePerShare, 10))

    const handleChangeShareQuantity = (event) => {
        setShareQuantity(event.target.value);
    };
    const handleChangeValuePerShare = (event) => {
        setValuePerShare(event.target.value);
    }

    // useEffect(() => {
    //     // setTotalShare(parseInt(shareQuantity, 10) * parseInt(valuePerShare, 10))
    //     setNetTotalShare(totalShare)
    //   }, [])

    const onSubmit = data => {
        setLoading(true)
        console.log(data)
        let uri = apiConfig.baseURL + `/investments`

        fetch(uri, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setLoading(false)
            if (data.status == 'success') {
            toast.success(data.message)
            } else {
            toast.error(data.message || data.errors[0].msg)
            }
        })
        .catch(function (error) {
            console.log(JSON.stringify(error))
        })
    }

  return (
    <Card>
      <CardHeader title='ข้อมูลเพิ่ม/ถอน/ลา หุ้น' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <Toaster />
      <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={6}>
                {memberDetail?.nationalId ? (
                <TextField InputProps={{ readOnly: true }} fullWidth defaultValue={memberDetail?.nationalId} label='เลขประจำตัวประชาชน' {...register('nationalId')} />
                ) : (
                    <Skeleton variant='rectangular' width={250} height={55} />
                )}
            </Grid>
            <Grid item xs={6}>
                {memberDetail?.memberName ? (
                    <TextField InputProps={{ readOnly: true }} fullWidth defaultValue={memberDetail?.memberName} label='ชื่อสมาชิก' />
                ) : (
                    <Skeleton variant='rectangular' width={250} height={55} />
                )}
            </Grid>
            <Grid item xs={6}>
                {memberDetail?.nationalId ? (
                <TextField InputProps={{ readOnly: true }} fullWidth defaultValue={memberDetail?.totalShareQuantity} label='ยอดหุ้นทั้งหมด' />
                ) : (
                    <Skeleton variant='rectangular' width={250} height={55} />
                )}
            </Grid>
            <Grid item xs={6}>
                {memberDetail?.nationalId ? (
                    <TextField InputProps={{ readOnly: true }} fullWidth defaultValue={memberDetail?.totalShare} label='ยอดเงินลงทุนทั้งหมด' />
                ) : (
                    <Skeleton variant='rectangular' width={250} height={55} />
                )}
            </Grid>
            <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel>ประเภทธุรกรรม</InputLabel>
                        <Select label='ประเภทธุรกรรม' defaultValue="1" {...register('investmentTypeId', { required: true })}>
                            <MenuItem key="1" value="1">ฝากหุ้น</MenuItem>
                            <MenuItem key="2" value="2">ถอนหุ้น</MenuItem>
                            <MenuItem key="3" value="3">ลาหุ้น</MenuItem>
                        </Select>
                    </FormControl>
            </Grid> 
            <Grid item xs={6}>
                <TextField fullWidth defaultValue="0" label='จำนวนหุ้น' type='number' {...register('shareQuantity')} onChange={handleChangeShareQuantity} />
            </Grid>
            <Grid item xs={6}>
                    <TextField fullWidth defaultValue="100" label='ราคาหุ้นต่อหน่วย' {...register('valuePerShare')} onChange={handleChangeValuePerShare} />
            </Grid>
            <Grid item xs={6}>
                <TextField fullWidth InputProps={{ readOnly: true }} value={totalShare} label='จำนวนเงินลงทุนทั้งหมด' />
                <input type="hidden" value={userName} {...register('username')}/>
            </Grid>

            <Grid item xs={12}>
              <Box
                sx={{
                  gap: 5,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Box sx={{ '& > button': { m: 1 } }}></Box>
                <LoadingButton
                  type='submit'
                  color='primary'
                  //   onClick={handleClick}
                  onClick={handleSubmit(onSubmit)}
                  loading={loading}
                  loadingPosition='start'
                  startIcon={<SaveIcon />}
                  variant='contained'
                  size='large'
                >
                  บันทึก
                </LoadingButton>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </form>
    </Card>
  )
}

export default FormInvestmentPayment

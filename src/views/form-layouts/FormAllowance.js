// ** React Imports
import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
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
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import apiConfig from 'src/configs/apiConfig'
import Divider from '@mui/material/Divider'
import FormHelperText from '@mui/material/FormHelperText';

// ** Icons Imports
import SaveIcon from '@material-ui/icons/Save';
import LoadingButton from '@mui/lab/LoadingButton'
import moment from 'moment'


const FormAllowance = () => {

    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const [loading, setLoading] = React.useState(false)
    const memberName = typeof window !== 'undefined' ? localStorage.getItem('memberName') : null
    const memberRoleId = typeof window !== 'undefined' ? localStorage.getItem('memberRoleId') : null


    const onSubmit = data => {
        setLoading(true)
        console.log(data)
        let uri = apiConfig.baseURL + `/allowances`

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
      <CardHeader title='เพิ่มข้อมูลสวัสดิการ' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <Toaster />
      <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} md={3}>
              <TextField type="date" fullWidth label='วันที่' {...register('allowanceDateTime', { required: true })}/>
                {errors.allowanceDateTime && errors.allowanceName.type === "required" && (
                  <FormHelperText id="allowanceDateTime" sx={{color:'#d32f2f'}}>Error : กรุณาเลือกวันที่</FormHelperText>
                )}
            </Grid>
            <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                        <InputLabel>ประเภทสวัสดิการ</InputLabel>
                        <Select label='ประเภทสวัสดิการ' defaultValue="1" {...register('allowanceTypeId', { required: true })}>
                            <MenuItem key="1" value="1">รายรับ</MenuItem>
                            <MenuItem key="2" value="2">รายจ่าย</MenuItem>
                        </Select>
                    </FormControl>
            </Grid> 
            <Grid item xs={12} md={3}>
                <TextField fullWidth label='ชื่อสวัสดิการ' {...register('allowanceName', { required: true })} />
                {errors.allowanceName && errors.allowanceName.type === "required" && (
                  <FormHelperText id="allowanceName" sx={{color:'#d32f2f'}}>Error : กรุณาใส่ข้อมูลชื่อสวัสดิการ</FormHelperText>
                )}
            </Grid>
            <Grid item xs={12} md={3}>
                <TextField fullWidth type='number' label='จำนวนเงิน' {...register('allowanceAmount', { required: true })} />
                {errors.allowanceAmount && errors.allowanceAmount.type === "required" && (
                  <FormHelperText id="allowanceAmount" sx={{color:'#d32f2f'}}>Error : กรุณาใส่ข้อมูลจำนวนเงิน</FormHelperText>
                )}
            </Grid>
            <input type="hidden" value={memberName} {...register('username')}/>
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

export default FormAllowance

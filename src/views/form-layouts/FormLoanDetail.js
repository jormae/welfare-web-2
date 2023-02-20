// ** React Imports
import React, { useState, useEffect, useContext } from 'react'
import Skeleton from '@mui/material/Skeleton'
import { useForm } from 'react-hook-form'

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
import { LoanContext } from 'src/pages/loan/[nationalId]/[loanId]'

const FormLoanDetail = () => {

    const loanDetail = useContext(LoanContext)

    const { register, handleSubmit, control } = useForm();
    const [loading, setLoading] = React.useState(false)
    const userName = typeof window !== 'undefined' ? localStorage.getItem('memberName') : null
    const memberRoleId = typeof window !== 'undefined' ? localStorage.getItem('memberRoleId') : null
    

  const onSubmit = data => {
    setLoading(true)
    console.log(data)
    let uri = apiConfig.baseURL + `/loans/${data.loanId}`
    console.log(uri)
    fetch(uri, {
      method: 'PUT',
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
      <CardHeader title='ข้อมูลคำร้องขอสวัสดิการ' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <Toaster />
      <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} md={6} lg={4}>
            {loanDetail?.loanId ? (
              <TextField fullWidth InputProps={{ readOnly: true }} defaultValue={loanDetail?.loanId} label='รหัสสวัสดิการ' {...register('loanId')} />
              ) : (
                <Skeleton variant='rectangular' width={250} height={55} />
              )}
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
            {loanDetail?.nationalId ? (
              <TextField fullWidth InputProps={{ readOnly: true }} defaultValue={loanDetail?.nationalId} label='เลขที่บัตรประชาชน' />
              ) : (
                <Skeleton variant='rectangular' width={250} height={55} />
              )}
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
            {loanDetail?.loanMemberName ? (
                <TextField fullWidth InputProps={{ readOnly: true }} defaultValue={loanDetail?.loanMemberName} label='ชื่อสมาชิก' />
              ) : (
                <Skeleton variant='rectangular' width={250} height={55} />
              )}
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
            {loanDetail?.nationalId ? (
              <TextField fullWidth InputProps={{ readOnly: true }} defaultValue={loanDetail?.contactNo} label='โทรศัพท์' />
              ) : (
                <Skeleton variant='rectangular' width={250} height={55} />
              )}
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
            {loanDetail?.nationalId ? (
                <TextField fullWidth InputProps={{ readOnly: true }} defaultValue={loanDetail?.memberTypeName} label='ประเภทบุคลากร' />
              ) : (
                <Skeleton variant='rectangular' width={250} height={55} />
              )}
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
            {loanDetail?.nationalId ? (
                <TextField fullWidth InputProps={{ readOnly: true }} defaultValue={loanDetail?.loanTypeName +' '+ loanDetail.loanAmount} label='ประเภทสวัสดิการ' />
              ) : (
                <Skeleton variant='rectangular' width={250} height={55} />
              )}
            </Grid>
            
            <Grid item xs={12} md={6} lg={4}>
            {loanDetail?.nationalId ? (
                <TextField fullWidth InputProps={{ readOnly: true }} defaultValue={loanDetail?.firstReferenceName} label='ชื่อผู้ค้ำคนที่ 1' />
              ) : (
                <Skeleton variant='rectangular' width={250} height={55} />
              )}
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
            {loanDetail?.nationalId ? (
                <TextField fullWidth InputProps={{ readOnly: true }} defaultValue={loanDetail?.firstReferenceId} label='เลขบัตรประชาชน' />
              ) : (
                <Skeleton variant='rectangular' width={250} height={55} />
              )}
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
            {loanDetail?.nationalId ? (
                <TextField fullWidth InputProps={{ readOnly: true }} defaultValue={loanDetail?.firstReferenceContactNo} label='โทรศัพท์' />
              ) : (
                <Skeleton variant='rectangular' width={250} height={55} />
              )}
            </Grid>
            
            <Grid item xs={12} md={6} lg={4}>
            {loanDetail?.nationalId ? (
                <TextField fullWidth InputProps={{ readOnly: true }} defaultValue={loanDetail?.secondReferenceName} label='ชื่อผู้ค้ำคนที่ 2' />
              ) : (
                <Skeleton variant='rectangular' width={250} height={55} />
              )}
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
            {loanDetail?.nationalId ? (
                <TextField fullWidth InputProps={{ readOnly: true }} defaultValue={loanDetail?.secondReferenceId} label='เลขบัตรประชาชน' />
              ) : (
                <Skeleton variant='rectangular' width={250} height={55} />
              )}
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
            {loanDetail?.nationalId ? (
                <TextField fullWidth InputProps={{ readOnly: true }} defaultValue={loanDetail?.secondReferenceContactNo} label='โทรศัพท์' />
              ) : (
                <Skeleton variant='rectangular' width={250} height={55} />
              )}
            </Grid>
            {memberRoleId != 4 ? (
            <Grid item xs={12} md={6} lg={4}>
            <FormControl fullWidth>
                <InputLabel>สถานะการอนุมัติ</InputLabel>
                <Select label='สถานะการอนุมัติ' defaultValue={loanDetail?.loanRequestStatusId ?? '0'} {...register('loanRequestStatusId', { required: true })}>
                    <MenuItem key='0' value='0'> รออนุมัติ</MenuItem>
                    <MenuItem key='1' value='1'> อนุมัติ</MenuItem>
                    <MenuItem key='2' value='2'> ไม่อนุมัติ</MenuItem>
                </Select>
            </FormControl>
            <input type='hidden' defaultValue={userName}  {...register('approvedBy')} />
            </Grid>
              ) : ''
            }
            {memberRoleId != 4 ? (
            <Grid item xs={12} md={6} lg={4}>
            {loanDetail?.nationalId ? (
                <TextField fullWidth defaultValue={loanDetail?.refId} label='เลขที่สัญญา' {...register('refId')} />
              ) : (
                <Skeleton variant='rectangular' width={250} height={55} />
              )}
            </Grid>
            ) : ''
            }

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
              <input type='hidden' {...register('approvedBy')} value={userName} />
                <Box sx={{ '& > button': { m: 1 } }}></Box>
                {memberRoleId != 4 ? (
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
                  บันทึกการอนุมัติ
                </LoadingButton>
              ) : ''
            }              </Box>

            </Grid>
          </Grid>
        </CardContent>
      </form>
    </Card>
  )
}

export default FormLoanDetail

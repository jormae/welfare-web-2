// ** React Imports
import React, { useContext, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
// import { useParams } from 'react-router-dom'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import FormHelperText from '@mui/material/FormHelperText'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import apiConfig from 'src/configs/apiConfig'
import moment from 'moment'

import { ChartContext } from 'src/pages/detail-chart/[an]'
import { WardsContext } from 'src/pages/detail-chart/[an]'
import { DischargeStutusesContext } from 'src/pages/detail-chart/[an]'
import { DischargeTypesContext } from 'src/pages/detail-chart/[an]'
import { DoctorsContext } from 'src/pages/detail-chart/[an]'
import { ReferCausesContext } from 'src/pages/detail-chart/[an]'
import { ReferHospitalsContext } from 'src/pages/detail-chart/[an]'
import { PttypesContext } from 'src/pages/detail-chart/[an]'

const FormChartDetail = () => {
  const chartDetail = useContext(ChartContext)

  const wards = useContext(WardsContext)
  const dischargeStatuses = useContext(DischargeStutusesContext)
  const dischargeTypes = useContext(DischargeTypesContext)
  const doctors = useContext(DoctorsContext)
  const referCauses = useContext(ReferCausesContext)
  const referHospitals = useContext(ReferHospitalsContext)
  const pttypes = useContext(PttypesContext)
  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    if (chartDetail) {
      reset({
        patientName: chartDetail?.ptName,
        hn: chartDetail?.hn,
        admitDate: moment(chartDetail?.admitDate).format('YYYY-MM-DD'),
        dischargeDate: moment(chartDetail?.dischargeDate).format('YYYY-MM-DD'),
        dischargeDoctorName: chartDetail?.dischargeDoctorName,
        wardName: chartDetail?.wardName,
        dischargeStatusName: chartDetail?.dischargeStatusName,
        dischargeTypeName: chartDetail?.dischargeTypeName,
        referCauseName: chartDetail?.referCauseName,
        referHospitalName: chartDetail?.referHospitalName,
        admitDuration: chartDetail?.admitDuration,
        pttypeName: chartDetail?.pttypeName,
        wardCode: chartDetail?.wardCode,
        dischargeStatusCode: chartDetail?.dischargeStatusCode,
        dischargeTypeCode: chartDetail?.dischargeTypeCode,
        doctorCode: chartDetail?.doctorCode,
        referCauseCode: chartDetail?.referCauseCode,
        referHospitalCode: chartDetail?.referHospitalCode,
        pttypeCode: chartDetail?.pttypeCode
      })
    }
  }, [chartDetail])

  const onSubmit = data => console.log(data)

  return (
    <Card>
      <CardHeader title='ข้อมูลผู้ป่วย' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={6}>
              <TextField fullWidth label='ชื่อผู้ป่วย' {...register('patientName')} />
              {/* <input type='text' name='firstName' value={patientName} {...register('patientName')} /> */}
              {/* <Controller
                name={'textValue'}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField onChange={onChange} value={value} label={'Text Value'} />
                )}
              /> */}
            </Grid>
            {/* <Grid item xs={6}>
              <TextField fullWidth label='วันที่แอดมิต' id='ptName' type='date' value={admitDate || ''} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label='วันที่จำหน่าย' id='ptName' type='date' value={dischargeDate || ''} />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>ชื่อแพทย์</InputLabel>
                <Select label='ชื่อแพทย์' value={doctorCode ?? ''} {...register('doctorCode', { required: true })}>
                  {doctors.map(item => {
                    return (
                      <MenuItem key={item.doctorCode} value={item.doctorCode}>
                        {item.doctorName}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>ชื่อหอผู้ป่วย</InputLabel>
                <Select
                  label='ชื่อหอผู้ป่วย'
                  defaultValue={wardCode ?? ''}
                  {...register('wardCode', { required: true })}
                >
                  {wards.map(item => {
                    return <MenuItem key={item.wardCode}>{item.wardName}</MenuItem>
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label='จำนวนวันนอน' id='ptName' value={admitDuration || ''} />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>สถานะการจำหน่าย</InputLabel>
                <Select
                  label='สถานะการจำหน่าย'
                  defaultValue={dischargeStatusCode ?? ''}
                  {...register('dischargeStatusCode', { required: true })}
                >
                  {dischargeStatuses.map(item => {
                    return <MenuItem key={item.dischargeStatusCode}>{item.dischargeStatusName}</MenuItem>
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>ประเภทการจำหน่าย</InputLabel>
                <Select
                  label='ประเภทการจำหน่าย'
                  defaultValue={dischargeTypeCode ?? ''}
                  {...register('dischargeTypeCode', { required: true })}
                >
                  {dischargeTypes.map(item => {
                    return <MenuItem key={item.dischargeTypeCode}>{item.dischargeTypeName}</MenuItem>
                  })}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>สิทธิ์การรักษา</InputLabel>
                <Select
                  label='สิทธิ์การรักษา'
                  defaultValue={pttypeCode ?? ''}
                  {...register('pttypeCode', { required: true })}
                >
                  {pttypes.map(item => {
                    return <MenuItem key={item.pttypeCode}>{item.pttypeName}</MenuItem>
                  })}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>สาเหตุการส่งต่อ</InputLabel>
                <Select
                  label='สาเหตุการส่งต่อ'
                  defaultValue={referCauseCode ?? ''}
                  {...register('referCauseCode', { required: true })}
                >
                  {referCauses.map(item => {
                    return <MenuItem key={item.referCauseCode}>{item.referCauseName}</MenuItem>
                  })}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>โรงพยาบาล</InputLabel>
                <Select
                  label='โรงพยาบาล'
                  defaultValue={referHospitalCode ?? ''}
                  {...register('referHospitalCode', { required: true })}
                >
                  {referHospitals.map(item => {
                    return <MenuItem key={item.referHospitalCode}>{item.referHospitalName}</MenuItem>
                  })}
                </Select>
              </FormControl>
            </Grid> */}

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
                <Button type='submit' variant='contained' size='large'>
                  บันทึก
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default FormChartDetail

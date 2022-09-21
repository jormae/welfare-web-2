// ** React Imports
import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
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
  let patientName = chartDetail?.ptName
  let admitDate = moment(chartDetail?.admitDate).format('YYYY-MM-DD')
  let dischargeDate = moment(chartDetail?.dischargeDate).format('YYYY-MM-DD')
  let dischargeDoctorName = chartDetail?.dischargeDoctorName
  let wardName = chartDetail?.wardName

  let dischargeStatusName = chartDetail?.dischargeStatusName
  let dischargeTypeName = chartDetail?.dischargeTypeName
  let referCauseName = chartDetail?.referCauseName
  let referHospitalName = chartDetail?.referHospitalName
  let admitDuration = chartDetail?.admitDuration
  let pttypeName = chartDetail?.pttypeName
  let wardCode = chartDetail?.wardCode
  let dischargeStatusCode = chartDetail?.dischargeStatusCode
  let dischargeTypeCode = chartDetail?.dischargeTypeCode
  let doctorCode = chartDetail?.doctorCode
  let referCauseCode = chartDetail?.referCauseCode
  let referHospitalCode = chartDetail?.referHospitalCode
  let pttypeCode = chartDetail?.pttypeCode
  console.log(wardCode)

  const wards = useContext(WardsContext)
  const dischargeStatuses = useContext(DischargeStutusesContext)
  const dischargeTypes = useContext(DischargeTypesContext)
  const doctors = useContext(DoctorsContext)
  const referCauses = useContext(ReferCausesContext)
  const referHospitals = useContext(ReferHospitalsContext)
  const pttypes = useContext(PttypesContext)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()
  const onSubmit = data => console.log(data)

  return (
    <Card>
      <CardHeader title='ข้อมูลผู้ป่วย' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={6}>
              <TextField fullWidth label='ชื่อผู้ป่วย' id='ptName' type='text' value={patientName || ''} />
            </Grid>
            <Grid item xs={6}>
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
                      <MenuItem value={item.doctorCode} key={item.doctorCode}>
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
                <Select label='ชื่อหอผู้ป่วย' value={wardCode ?? ''} {...register('wardCode', { required: true })}>
                  {wards.map(item => {
                    return (
                      <MenuItem value={item.wardCode} key={item.wardCode}>
                        {item.wardName}
                      </MenuItem>
                    )
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
                  value={dischargeStatusCode ?? ''}
                  {...register('dischargeStatusCode', { required: true })}
                >
                  {dischargeStatuses.map(item => {
                    return (
                      <MenuItem value={item.dischargeStatusCode} key={item.dischargeStatusCode}>
                        {item.dischargeStatusName}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>ประเภทการจำหน่าย</InputLabel>
                <Select
                  label='ประเภทการจำหน่าย'
                  value={dischargeTypeCode ?? ''}
                  {...register('dischargeTypeCode', { required: true })}
                >
                  {dischargeTypes.map(item => {
                    return (
                      <MenuItem value={item.dischargeTypeCode} key={item.dischargeTypeCode}>
                        {item.dischargeTypeName}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>สิทธิ์การรักษา</InputLabel>
                <Select label='สิทธิ์การรักษา' value={pttypeCode ?? ''} {...register('pttypeCode', { required: true })}>
                  {pttypes.map(item => {
                    return (
                      <MenuItem value={item.pttypeCode} key={item.pttypeCode}>
                        {item.pttypeName}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>สาเหตุการส่งต่อ</InputLabel>
                <Select
                  label='สาเหตุการส่งต่อ'
                  value={referCauseCode ?? ''}
                  {...register('referCauseCode', { required: true })}
                >
                  {referCauses.map(item => {
                    return (
                      <MenuItem value={item.referCauseCode} key={item.referCauseCode}>
                        {item.referCauseName}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>โรงพยาบาล</InputLabel>
                <Select
                  label='โรงพยาบาล'
                  value={referHospitalCode ?? ''}
                  {...register('referHospitalCode', { required: true })}
                >
                  {referHospitals.map(item => {
                    return (
                      <MenuItem value={item.referHospitalCode} key={item.referHospitalCode}>
                        {item.referHospitalName}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
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

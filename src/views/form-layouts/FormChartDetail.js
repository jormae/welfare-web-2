// ** React Imports
import React, { useContext } from 'react'

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

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import apiConfig from 'src/configs/apiConfig'
import moment from 'moment'

import { ChartContext } from 'src/pages/detail-chart/[an]'

const FormChartDetail = () => {
  const chartDetail = useContext(ChartContext)
  let patientName = chartDetail?.ptName
  console.log(patientName)
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

  return (
    <Card>
      <CardHeader title='ข้อมูลผู้ป่วย' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form autoComplete='off'>
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
              <TextField fullWidth label='ชื่อแพทย์' id='ptName' value={dischargeDoctorName || ''} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label='ชื่อหอผู้ป่วย' id='ptName' value={wardName || ''} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label='สถานะการจำหน่าย' id='ptName' value={dischargeStatusName || ''} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label='ประเภทการจำหน่าย' id='ptName' value={dischargeTypeName || ''} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label='สาเหตุการส่งต่อ' id='ptName' value={referCauseName || ''} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label='โรงพยาบาล' id='ptName' value={referHospitalName || ''} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label='จำนวนวันนอน' id='ptName' value={admitDuration || ''} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label='สิทธิ์การรักษา' id='ptName' value={pttypeName || ''} />
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
                  Get Started!
                </Button>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ mr: 2 }}>Already have an account?</Typography>
                  <Link href='/' onClick={e => e.preventDefault()}>
                    Log in
                  </Link>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default FormChartDetail

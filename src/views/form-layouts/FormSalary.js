// ** React Imports
import React, { useState, createContext } from 'react'
import { useForm } from 'react-hook-form'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import apiConfig from 'src/configs/apiConfig'
import Divider from '@mui/material/Divider'
import FormHelperText from '@mui/material/FormHelperText';

// ** Icons Imports
import LoadingButton from '@mui/lab/LoadingButton'
import moment from 'moment'
import TableSalary from '../tables/TableSalary'
import FlipCameraAndroidIcon from '@material-ui/icons/FlipCameraAndroid';

export const DataSalaryContext = createContext()

export const DataHealthInsuranceContext = createContext()

export const DataDateContext = createContext()

const FormSalary = () => {
    
    // const date= moment().format('YYYY-MM')
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false)
    const [salaries, setSalaries] = useState({ blogs: [] })
    const [healthInsurance, setHealthInsurance] = useState(0)
    const [date, setDate] = useState()
    console.log(salaries)
    const memberName = typeof window !== 'undefined' ? localStorage.getItem('memberName') : null
    const memberRoleId = typeof window !== 'undefined' ? localStorage.getItem('memberRoleId') : null


    const onSubmit = async (data) => {
        setLoading(true)
        console.log(data)
        setHealthInsurance(data.healthInsurance / 100)
        setDate(data.salaryMonth)
        let uri = apiConfig.baseURL + `/salaries/date/${date}`
        console.log(uri)
        try {
            const { data } = await axios.get(uri)
            setSalaries({ blogs: data })
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <Grid container spacing={6}>
        <Grid item xs={12}>
            <Card>
            <CardHeader title='ประมวลข้อมูลบัญชีการจ่ายเงินเดือนบุคลากร' titleTypographyProps={{ variant: 'h6' }} />
            <Divider sx={{ margin: 0 }} />
            <Toaster />
            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                <CardContent>
                <Grid container spacing={5}>
                    <Grid item xs={12} md={3}></Grid>
                    <Grid item xs={12} md={3}>
                    <TextField type="month" fullWidth label='เดือน' InputLabelProps={{shrink: true,}} {...register('salaryMonth', { required: true })}/>
                        {errors.salaryMonth && errors.salaryMonth.type === "required" && (
                        <FormHelperText id="salaryMonth" sx={{color:'#d32f2f'}}>Error : กรุณาเลือกเดือน</FormHelperText>
                        )}
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField fullWidth type='number' label='หักประกันสังคม(%)' {...register('healthInsurance', { required: true })} />
                        {errors.healthInsurance && errors.healthInsurance.type === "required" && (
                        <FormHelperText id="healthInsurance" sx={{color:'#d32f2f'}}>Error : กรุณาใส่ข้อมูลหักประกันสังคม</FormHelperText>
                        )}
                    </Grid>
                    <Grid item xs={12} md={3}>
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
                        color='success'
                        onClick={handleSubmit(onSubmit)}
                        loading={loading}
                        loadingPosition='start'
                        startIcon={<FlipCameraAndroidIcon />}
                        variant='contained'
                        size='large'
                        >
                        ประมวลผลเงินเดือน
                        </LoadingButton>
                    </Box>
                    </Grid>
                    <input type="hidden" value={memberName} {...register('username')}/>
                </Grid>
                </CardContent>
            </form>
            </Card>
        </Grid>
        <Grid item xs={12}>
            <DataSalaryContext.Provider value={salaries}>
                <DataHealthInsuranceContext.Provider value={healthInsurance}>
                    <DataDateContext.Provider value={date}>
                        <TableSalary />
                    </DataDateContext.Provider>
                </DataHealthInsuranceContext.Provider>
            </DataSalaryContext.Provider>
        </Grid>
    </Grid>
  )
}

export default FormSalary

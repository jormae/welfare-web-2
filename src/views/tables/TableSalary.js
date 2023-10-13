// ** MUI Imports
import React, { useContext,useState } from 'react'
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
import moment from 'moment'
import toast, { Toaster } from 'react-hot-toast'
import apiConfig from 'src/configs/apiConfig'

import { DataSalaryContext, DataHealthInsuranceContext, DataDateContext } from 'src/views/form-layouts/FormSalary'


const TableSalary = () => {

    const salaries = useContext(DataSalaryContext)
    const healthInsurance = useContext(DataHealthInsuranceContext)
    const date = useContext(DataDateContext)
    console.log(healthInsurance)
    console.log(date)
 
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false)
    const i = 1;

    // const date = moment().format('YYYY-MM')
    const memberName = typeof window !== 'undefined' ? localStorage.getItem('memberName') : null
    
    // console.log(salaries)

    const onSubmit = async () => {
        setLoading(true)
        let uri = apiConfig.baseURL + `/salaries`
        console.log(uri)

        fetch(uri, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify({date,healthInsurance,memberName})
        })
        .then(response => response.json())
        .then(data => {
                console.log(data)
                setLoading(false)
                if (data.status == 'success') {
                toast.success(data.message)
                } else {
                toast.error(data.message)
                }
            })
        .catch(function (error) {
            console.log(JSON.stringify(error))
        })
    }

  return (
    <Card>
      <CardHeader title='บัญชีการจ่ายเงินเดือนบุคลากร โรงเรียนดารุสสาลาม ประจำเดือน' titleTypographyProps={{ variant: 'h6' }} />
      <Toaster />
      <Divider sx={{ margin: 0 }} />
      <CardContent>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>ที่</TableCell>
                <TableCell align='center'>เลขที่บัตรประชาชน</TableCell>
                <TableCell align='center'>ชื่อ-สกุล</TableCell>
                <TableCell align='center'>เงินเดือน</TableCell>
                <TableCell align='center'>หักประกันสังคม ({healthInsurance * 100}%)</TableCell>
                <TableCell align='center'>รับจริง</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salaries.blogs.map(row => (
                <TableRow key={row.salaryId}>
                  <TableCell align='center' component='th' scope='row'>
                  {i++}
                  </TableCell>
                  <TableCell>{row.nationalId}</TableCell>
                  <TableCell>{row.memberName}</TableCell>
                  <TableCell align='center'>{(row.salary ?? 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</TableCell>
                  <TableCell align='center'>{(healthInsurance * (row.salary ?? 0)).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</TableCell>
                  <TableCell align='center'>{(row.salary - (healthInsurance * row.salary)).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                {/* <input type="hidden" value={memberName} {...register('username')}/>
                <input type="hidden" value={date} {...register('date')}/>
                <input type="hidden" value={healthInsurance} {...register('healthInsurance')}/> */}
                <Grid container spacing={5}>
                    <Grid item xs={12} md={9}></Grid>
                
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
                                type='submit'
                                color='success'
                                onClick={handleSubmit(onSubmit)}
                                loading={loading}
                                loadingPosition='start'
                                startIcon={<SaveIcon />}
                                variant='contained'
                                size='large'
                                >
                                บันทึกข้อมูลเงินเดือน
                                </LoadingButton>
                            </Box>
                        </Grid>
                </Grid>
                
            </form>
      </CardContent>
    </Card>
  )
}

export default TableSalary

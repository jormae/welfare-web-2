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

import { DataSalaryContext, DataHealthInsuranceContext } from 'src/views/form-layouts/FormSalary'


const TableSalary = () => {

    const salaries = useContext(DataSalaryContext)
    const healthInsurance = useContext(DataHealthInsuranceContext)
 
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false)
    const i = 1;
    const date = moment().format('YYYY-MM')
    const memberName = typeof window !== 'undefined' ? localStorage.getItem('memberName') : null
    console.log(salaries)

    const onSubmit = async (data) => {
        // setLoading(true)
        console.log(data)

        // setHealthInsurance(data.healthInsurance / 100)
        // let uri = apiConfig.baseURL + `/salaries/date/${date}`
        // console.log(uri)
        // try {
        //     const { data } = await axios.get(uri)
        //     setSalaries({ blogs: data })
        //     setLoading(false)
        // } catch (error) {
        //     console.log(error)
        // }
    }

  return (
    <Card>
      <CardHeader title='บัญชีการจ่ายเงินเดือนบุคลากร โรงเรียนดารุสสาลาม ประจำเดือน' titleTypographyProps={{ variant: 'h6' }} />
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
            <input type="hidden" value={memberName} {...register('username')}/>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default TableSalary

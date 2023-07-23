import * as React from 'react'
import Grid from '@mui/material/Grid'
import axios from 'axios'
import { useEffect, useState, createContext } from 'react'
import { Controller, useForm } from 'react-hook-form'
import apiConfig from 'src/configs/apiConfig'
import moment from 'moment'
import 'moment/locale/th'  // without this line it didn't work
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Skeleton from '@mui/material/Skeleton'
import TableReportPaid from 'src/views/tables/TableReportPaid'
import TableReportPendingPayment from 'src/views/tables/TableReportPendingPayment'
import TableReportFollowupPayment from 'src/views/tables/TableReportFollowupPayment'
import CardWelfarePayments from 'src/views/cards/CardWelfarePayments'
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, IconButton, Stack, TextField } from "@mui/material";
// import FormControlContext from "@mui/material/FormControl/FormControlContext";
import CloseIcon from "@mui/icons-material/Close"
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import AssessmentIcon from '@material-ui/icons/Assessment';
import LoadingButton from '@mui/lab/LoadingButton'
import Badge from '@mui/material/Badge';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Link from 'next/link'

export const PaidContext = createContext()

export const PendingPaymentContext = createContext()

export const FollowupPaymentContext = createContext()

export const StrDateContext = createContext()


const FormLayouts = () => {
  const i = 1;
  
  moment.locale('th')
  const [paidReports, setPaidReports] = useState({ blogs: [] })
  const [pendingPaymentReports, setPendingPaymentReports] = useState({ blogs: [] })
  const [followupPaymentReports, setFollowupPaymentReports] = useState({ blogs: [] })
  const [tabPayments, setTabPayments] = React.useState('pending-payment')
  const [date, setDate ]= useState(moment().format('YYYY-MM'))
  // const [date, setDate ]= useState()
  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const [loading, setLoading] = React.useState(false)
  const [searchDate, setSearchDate ]= useState()
  console.log('searchDate = '+searchDate)
  const strDate = 'เดือน '+ moment(date).format('MMMM') +' พ.ศ.'+ moment(date).add(543, 'year').format('YYYY');
  const [search, setSearch] = useState('')
  // if (typeof(searchDate) !== 'undefined' && searchDate != null) {
  //   console.log("yes!")
  //   // fetchPaidReports2()
  //   // fetchPendingPaymentReports2()
  // }


  const [open,openchange]=useState(false);
    const functionopenpopup=()=>{
        openchange(true);
    }
    const closepopup=()=>{
        openchange(false);
    }

  const handleTabChange = (event, newValue) => {
    setTabPayments(newValue)
  }

  const fetchPaidReports = async () => {
    let uri = apiConfig.baseURL + `/reports/monthly/welfare/paid/${date}`
    console.log('paid uri = '+uri)
    try {
        const { data } = await axios.get(uri)
        setPaidReports({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  const fetchPaidReports2 = async () => {
    let uri = apiConfig.baseURL + `/reports/monthly/welfare/paid/${searchDate}`
    console.log('paid uri = '+uri)
    try {
        const { data } = await axios.get(uri)
        setPaidReports({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  const fetchPendingPaymentReports = async () => {
    let uri = apiConfig.baseURL + `/reports/monthly/welfare/pending-payment/${date}`
    console.log(uri)
    try {
      const { data } = await axios.get(uri)
      setPendingPaymentReports({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  const fetchPendingPaymentReports2 = async () => {
    let uri = apiConfig.baseURL + `/reports/monthly/welfare/pending-payment/${searchDate}`
    console.log(uri)
    try {
      const { data } = await axios.get(uri)
      setPendingPaymentReports({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  const fetchFollowupPaymentReports = async () => {
    let uri = apiConfig.baseURL + `/reports/monthly/welfare/followup-payment/${date}`
    console.log(uri)
    try {
      const { data } = await axios.get(uri)
      setFollowupPaymentReports({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  const onSubmit = async data => {
    setLoading(true)
    // console.log(data)
    let strYearMonth = data.reportDate.slice(0,7);
    setSearchDate(strYearMonth)
    setDate(strYearMonth)

    let uri = apiConfig.baseURL + `/reports/monthly/welfare/pending-payment/${strYearMonth}`
    console.log(uri)
    try {
      const { data } = await axios.get(uri)
      setPendingPaymentReports({ blogs: data })
      setLoading(false)
    } catch (error) {
      console.log(error)
    }

    let paid_uri = apiConfig.baseURL + `/reports/monthly/welfare/paid/${strYearMonth}`
    console.log(paid_uri)
    try {
      const { data } = await axios.get(paid_uri)
      console.log(data)
      setPaidReports({ blogs: data })
    } catch (error) {
      console.log(error)
    }

    // console.log('searchDate = '+searchDate)
    // console.log('strYearMonth = '+strYearMonth)
    // if (typeof(searchDate) !== 'undefined') {
    //   console.log("not null!")
    //   // fetchPaidReports2()
    //   // fetchPendingPaymentReports2()
    // }
    

}



  useEffect(() => {
    fetchPaidReports()
    fetchPendingPaymentReports()
    fetchFollowupPaymentReports()
  }, [])

  const SkeletonReportMonthlyWelfarePaymentsLoading = () => (
    <Box sx={{ width: '100%' }}>
      <TabContext value={tabPayments}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleTabChange} aria-label='lab API tabs example' >
            <Tab label='รายการรอชำระเงิน' value='pending-payment' />
            <Badge badgeContent={4} color="primary" sx={{mt:4}} />
            <Tab label='รายการชำระเงิน' value='paid' />
            <Badge badgeContent={3} color="primary" sx={{mt:4}} />
            <Tab label='รายการติดตามการชำระเงิน' value='followup-payment' />
            <Badge badgeContent={2} color="primary" sx={{mt:4}} />
          </TabList>
        </Box>
        <TabPanel value='paid'>
          {paidReports.blogs.length > 0 ? (
            <Grid container wrap='nowrap'>
              <Grid item xs={12} md={12} lg={12}>
                <PaidContext.Provider value={paidReports}>
                  <StrDateContext.Provider value={strDate}>
                    <TableReportPaid />
                  </StrDateContext.Provider>
                </PaidContext.Provider>
              </Grid>
            </Grid>
          ) : (
            <Typography variant='h4'>
              <Skeleton width='100%' height={200} sx={{ animationDuration: '3.0s' }} />
            </Typography>
          )}
        </TabPanel>
        <TabPanel value='pending-payment'>
          {pendingPaymentReports.blogs.length > 0 ? (
            <Grid container wrap='nowrap'>
              <Grid item xs={12} md={12} lg={12}>
              {/* <PendingPaymentContext.Provider value={pendingPaymentReports}>
                <StrDateContext.Provider value={strDate}>
                  <TableReportPendingPayment />
                </StrDateContext.Provider>
              </PendingPaymentContext.Provider> */}
              <Card>
      <CardHeader title={`รายการรอชำระเงินสวัสดิการประจำเดือน ${strDate}`}  titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <CardContent>
        <TableContainer component={Paper}>
          <Table  sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>ลำดับ</TableCell>
                <TableCell align='center'>ชื่อ-สกุล</TableCell>
                <TableCell align='center'>ตำแหน่ง</TableCell>
                <TableCell align='center'>ประเภทสวัสดิการ</TableCell>
                <TableCell align='center'>ยอดคงเหลือ</TableCell>
                <TableCell align='center'>ยอดที่ต้องชำระ</TableCell>
                <TableCell align='center'>จัดการ</TableCell> 
              </TableRow>
            </TableHead>
            <TableBody>
              { pendingPaymentReports.blogs.filter((row)=>{
                return search.toLowerCase() === '' ? row : row.memberName.toLowerCase().includes(search);
              }).map(row => (
                <TableRow key={row.loanId}>
                  <TableCell align='center' component='th' scope='row'>
                  {i++}
                  </TableCell>
                  <TableCell>{row.memberName}</TableCell>
                  <TableCell >{row.positionName}</TableCell>
                  <TableCell >{row.loanTypeName} ({row.loanAmount.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')})</TableCell>
                  <TableCell color='success' align='right'></TableCell>
                  <TableCell align='center' color='success'>{row.monthlyPayment}</TableCell>
                  <TableCell align='center' color='success'>
                    <Link href={`../../loan-payment/${row.nationalId}/${row.loanId}`} color='success'>
                      <Button type='button' variant='outlined'>
                        ชำระ
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
              </Grid>
            </Grid>
          ) : (
            <Typography variant='h4'>
              <Skeleton width='100%' height={200} sx={{ animationDuration: '3.0s' }} />
            </Typography>
          )}
        </TabPanel>
        <TabPanel value='followup-payment'>
          {followupPaymentReports.blogs.length > 0 ? (
            <Grid container wrap='nowrap'>
              <Grid item xs={12} md={12} lg={12}>
              <FollowupPaymentContext.Provider value={followupPaymentReports}>
                <TableReportFollowupPayment />
              </FollowupPaymentContext.Provider>
              </Grid>
            </Grid>
          ) : (
            <Typography variant='h4'>
              <Skeleton width='100%' height={200} sx={{ animationDuration: '3.0s' }} />
            </Typography>
          )}
        </TabPanel>
      </TabContext>
    </Box>
  )

  return (
    <Grid container spacing={6}>
       <Grid container item>
        <CardWelfarePayments />
       </Grid>
       <Grid item md={12} xs={12}>
       <Card>
      <CardHeader title='ค้นหารายงาน' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={6}><Typography style={{ fontSize: 24 }} >  </Typography></Grid>
            <Grid item xs={4} md={4}>
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="เลือกวันที่" {...register('reportDate')}/>
            </LocalizationProvider> */}
              {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Container components={['DatePicker']}>
                  <DatePicker label="Basic date picker" {...register('reportDate', { required: true })}/>
                </Container>
              </LocalizationProvider> */}
              <TextField type="date" fullWidth label='วันที่' {...register('reportDate', { required: true })}/>
            </Grid>
            <Grid item xs={2}>
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
                  startIcon={<AssessmentIcon />}
                  variant='contained'
                  size='large'
                >
                  แสดง
                </LoadingButton>
              </Box>
            </Grid>
            <Grid item xs={12}>
            </Grid>
          </Grid>
        </CardContent>
      </form>
    </Card>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
              <form noValidate autoComplete='off'>
                  <Grid container spacing={5}>
                    <Grid item xs={12}>
                      <TextField fullWidth label='ค้นหาสมาชิก' placeholder='ค้นหาสมาชิก' {...register('search', {
                        onChange: (e) => {setSearch(e.target.value)},
                        onBlur: (e) => {},
                      })} />
                    </Grid>
                  </Grid>
              </form>
              </Grid>
       <Grid item md={12} xs={12}>
        
        <SkeletonReportMonthlyWelfarePaymentsLoading />
      </Grid>
      <Button onClick={functionopenpopup} color="primary" variant="contained">Open Popup</Button>
            <Dialog 
            // fullScreen 
            open={open} onClose={closepopup} fullWidth maxWidth="sm">
                <DialogTitle>User Registeration  <IconButton onClick={closepopup} style={{float:'right'}}><CloseIcon color="primary"></CloseIcon></IconButton>  </DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>Do you want remove this user?</DialogContentText> */}
                    <Stack spacing={2} margin={2}>
                      <TextField variant="outlined" label="Username"></TextField>
                      <TextField variant="outlined" label="Password"></TextField>
                      <TextField variant="outlined" label="Email"></TextField>
                      <TextField variant="outlined" label="Phone"></TextField>
                      <FormControlLabel control={<Checkbox defaultChecked color="primary"></Checkbox>} label="Agree terms & conditions"></FormControlLabel>
                      <Button color="primary" variant="contained">Submit</Button>
                    </Stack>
                </DialogContent>
                <DialogActions>
                {/* <Button color="success" variant="contained">Yes</Button>
                    <Button onClick={closepopup} color="error" variant="contained">Close</Button> */}
                </DialogActions>
            </Dialog>
    </Grid>

  )
}

export default FormLayouts

import * as React from 'react'
import { useEffect, useState, createContext } from 'react'
import { useForm } from "react-hook-form";

import Grid from '@mui/material/Grid'
import Router from 'next/router'
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import TextField  from "@mui/material/TextField";
import AssessmentIcon from '@material-ui/icons/Assessment';
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Skeleton from '@mui/material/Skeleton'
import TableReportPaid from 'src/views/tables/TableReportPaid'
import TableReportPendingPayment from 'src/views/tables/TableReportPendingPayment'
import TableReportFollowupPayment from 'src/views/tables/TableReportFollowupPayment'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import Greeting from 'src/views/dashboard/Greeting'
import apiConfig from 'src/configs/apiConfig'
import axios from 'axios'
import CardMember from 'src/views/cards/CardMember'
import CardActiveLoan from 'src/views/cards/CardActiveLoan'
import CardFollowUpLoan from 'src/views/cards/CardFollowUpLoan'
import CardTotalMoney from 'src/views/cards/CardTotalMoney'
import CardTotalLoan from 'src/views/cards/CardTotalLoan'
import CardQueueLoan from 'src/views/cards/CardQueueLoan'
import TableLoanRequest from 'src/views/tables/TableLoanRequest'
import TableInvestmentRequest from 'src/views/tables/TableInvestmentRequest'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Swal from 'sweetalert2';
import LoadingButton from '@mui/lab/LoadingButton'
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import moment from 'moment'
import 'moment/locale/th'  // without this line it didn't work
import TableDashboardRequests from 'src/views/tables/TableDashboardRequests'

export const DataContext = createContext()

export const DashboardPaidContext = createContext()

export const DashboardPendingPaymentContext = createContext()

export const FollowupPaymentContext = createContext()

export const DashboardStrDateContext = createContext()

export const StrSumPaymentContext = createContext()

const Dashboard = () => {

  const [err, setError] = useState()
  const [search, setSearch] = useState('')
  const [pg, setpg] = useState(0);
    const [rpg, setrpg] = useState(10);
  
    function handleChangePage(event, newpage) {
        setpg(newpage);
    }
  
    function handleChangeRowsPerPage(event) {
        setrpg(parseInt(event.target.value, 10));
        setpg(0);
    }

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    // if(!token){
    //   window.location = '/pages/login'
    // }

  const userRole = typeof window !== 'undefined' ? localStorage.getItem('memberRoleId') : null
  const username = typeof window !== 'undefined' ? localStorage.getItem('username') : null

  const i = 1;  
  moment.locale('th')
  const [dashboardPaidReports, setPaidReports] = useState({ blogs: [] })
  const [dashboardPendingPaymentReports, setPendingPaymentReports] = useState({ blogs: [] })
  const [followupPaymentReports, setFollowupPaymentReports] = useState({ blogs: [] })
  const [tabPayments, setTabPayments] = useState('pending-payment')

  // const [date, setDate]=  React.useState(dayjs('2023-07-17'));
  
  const [date, setDate]= useState(moment().format('YYYY-MM'))
  console.log(date)
  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false)
  const [searchDate, setSearchDate ]= useState()
  const [badgeCouter, setBadgeCouter ]= useState(0)
  const [sumPayment, setSumPayment ]= useState(0)
  const strDate = 'เดือน '+ moment(date).format('MMMM') +' พ.ศ.'+ moment(date).add(543, 'year').format('YYYY');
  const [value, setValue] = useState(dayjs('2022-04-17'));

  const handleTabChange = (event, newValue) => {
    setTabPayments(newValue)
  }

  const fetchBadgeCouter = async () => {
    let uri = apiConfig.baseURL + `/reports/monthly/welfare/count-payment/${date}`
    try {
        const { data } = await axios.get(uri)
        console.log(data)
        setBadgeCouter(data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchSumPayment = async () => {
    let uri = apiConfig.baseURL + `/reports/monthly/welfare/sum-payment/${date}`
    console.log(uri)
    try {
      const { data } = await axios.get(uri)
      console.log(data)
      setSumPayment(data)
    } catch (error) {
      console.log(error)
    }
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

  const getUserPass = async () => {
    let uri = apiConfig.baseURL + `/auth/default-password/${username}`
    console.log(uri)
    try {
      const { data } = await axios.get(uri)
      console.log(data)
      if(data.status == "error"){
        Swal.fire({ icon: 'warning',
                title: "คำแนะนำ!",
                text: data.message,
                }).then(okay => {
                  if (okay) {
                    // window.location.href = `/member/${username}`;
                    window.location.href = `/reset-password`;
                  }
                });
      }
    } catch (error) {
      console.log(error)
    }
  }

  const resetDefaultPassword = () => {
    Swal.fire({ title: "คำแนะนำ!",
                text: "กรุณาเปลี่ยนรหัสผ่านใหม่!",
                type: "warning"}).then(okay => {
                  if (okay) {
                    window.location.href = `/member/${username}`;
                  }
                });
  }

  const verifyToken = async () => {
    let uri = apiConfig.baseURL + '/auth/token'
    fetch(uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.status !== 'success') {
          localStorage.removeItem('token')
          localStorage.removeItem('staffName')
          window.location = '/pages/login'
          console.log(data)
        }
      })
      .catch(error => {
        console.error('Error:', error)
        setError('Unable to connect to database, please contact administrator')
      })
  }

  const onSubmit = async data => {
    setLoading(true)
    let strYearMonth = data.reportDate.slice(0,7);
    setSearchDate(strYearMonth)
    setDate(strYearMonth)

    let balance_uri = apiConfig.baseURL + `/reports/monthly/welfare/sum-payment/${strYearMonth}`
    try {
      const { data } = await axios.get(balance_uri)
      setSumPayment(data)
    } catch (error) {
      console.log(error)
    }

    let badge_uri = apiConfig.baseURL + `/reports/monthly/welfare/count-payment/${strYearMonth}`
    try {
        const { data } = await axios.get(badge_uri)
        setBadgeCouter(data)
    } catch (error) {
      console.log(error)
    }

    let pending_uri = apiConfig.baseURL + `/reports/monthly/welfare/pending-payment/${strYearMonth}`
    try {
      const { data } = await axios.get(pending_uri)
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

}

  useEffect(() => {
    verifyToken();
    getUserPass();
    fetchSumPayment();
    fetchBadgeCouter();
    fetchPaidReports();
    fetchPendingPaymentReports();
    fetchFollowupPaymentReports();
  }, []);

  const SkeletonReportMonthlyWelfarePaymentsLoading = () => (
    <Box sx={{ width: '100%' }}>
      <TabContext value={tabPayments}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleTabChange} aria-label='lab API tabs example' >
            <Tab label='รายการรอชำระเงิน' value='pending-payment' />
            <Badge badgeContent={badgeCouter[0]?.TOTAL_MEMBER} color="primary" sx={{mt:4}} />
            <Tab label='รายการชำระเงิน' value='paid' />
            <Badge badgeContent={badgeCouter[1]?.TOTAL_MEMBER} color="primary" sx={{mt:4}} />
          </TabList>
        </Box>
        <TabPanel value='paid'>
          {dashboardPaidReports.blogs.length > 0 ? (
            <Grid container wrap='nowrap'>
              <Grid item xs={12} md={12} lg={12}>
                <DashboardPaidContext.Provider value={dashboardPaidReports}>
                  <DashboardStrDateContext.Provider value={strDate}>
                    <TableReportPaid />
                  </DashboardStrDateContext.Provider>
                </DashboardPaidContext.Provider>
              </Grid>
            </Grid>
          ) : (
            <Typography variant='h4'>
              <Skeleton width='100%' height={200} sx={{ animationDuration: '3.0s' }} />
            </Typography>
          )}
        </TabPanel>
        <TabPanel value='pending-payment'>
          {dashboardPendingPaymentReports.blogs.length > 0 ? (
            <Grid container wrap='nowrap'>
              <Grid item xs={12} md={12} lg={12}>
              <DashboardPendingPaymentContext.Provider value={dashboardPendingPaymentReports}>
                <DashboardStrDateContext.Provider value={strDate}>
                  <TableReportPendingPayment />
                </DashboardStrDateContext.Provider>
              </DashboardPendingPaymentContext.Provider>
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
    <ApexChartWrapper>
      <Grid container spacing={6}>
        {err ? (
          <Grid item xs={12} md={12}>
            <Alert severity='error'>
              <AlertTitle>Error!</AlertTitle>
              {err}
            </Alert>
          </Grid>
        ) : (
          ''
        )}

        <Grid item xs={12} md={4}>
          <Greeting />
        </Grid>
        <Grid item xs={12} md={12} lg={8}>
        {userRole != 4 ? (
          <Grid container spacing={6}>
            <Grid item xs={12} md={6} lg={6}>
              <CardTotalMoney />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <CardTotalLoan />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <CardMember />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <CardActiveLoan />
            </Grid> 
            <Grid item xs={12} md={6} lg={6}>
              <CardQueueLoan />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <CardFollowUpLoan />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              {/* <TableReportPendingPayment /> */}
            </Grid>
          </Grid>
          ) : (
          ''
        )}
        </Grid>

        {userRole != 4 ? (
        <Grid item xs={12}>
          <TableDashboardRequests />
        </Grid>
        ) : (
          ''
        )}
        {userRole != 4 ? (
        <Grid item xs={12}>
          <Grid item md={12} xs={12}>
            <Card>
              <CardHeader title='รายการชำระสวัสดิการ' titleTypographyProps={{ variant: 'h6' }} />
              <Divider sx={{ margin: 0 }} />
                <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                  <CardContent>
                    <Grid container spacing={5}>
                      <Grid item xs={6}><Typography style={{ fontSize: 24 }} >  </Typography></Grid>
                      <Grid item xs={4} md={4}>
                        <TextField type="month" fullWidth label='วันที่' {...register('reportDate', { required: true })}/>
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
                    <Grid item md={12} xs={12}>        
                      <SkeletonReportMonthlyWelfarePaymentsLoading />
                    </Grid>
                  </CardContent>
                </form>
            

              
            </Card>
          </Grid>
        </Grid>
        ) : (
          ''
        )}
      </Grid>
      
    </ApexChartWrapper>
  )
}

export default Dashboard

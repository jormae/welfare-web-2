import * as React from 'react'
import Grid from '@mui/material/Grid'
import axios from 'axios'
import { useEffect, useState, createContext } from 'react'
import apiConfig from 'src/configs/apiConfig'
import moment from 'moment'
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

export const PaidContext = createContext()

export const PendingPaymentContext = createContext()

export const FollowupPaymentContext = createContext()


const FormLayouts = () => {
  const [paidReports, setPaidReports] = useState({ blogs: [] })
  const [pendingPaymentReports, setPendingPaymentReports] = useState({ blogs: [] })
  const [followupPaymentReports, setFollowupPaymentReports] = useState({ blogs: [] })
  const [tabPayments, setTabPayments] = React.useState('paid')
  const date = moment().format('YYYY-MM')

  const handleTabChange = (event, newValue) => {
    setTabPayments(newValue)
  }

  const fetchPaidReports = async () => {
    let uri = apiConfig.baseURL + `/reports/monthly/welfare/paid/${date}`
    console.log(uri)
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



  useEffect(() => {
    fetchPaidReports()
    fetchPendingPaymentReports()
    fetchFollowupPaymentReports()
  }, [])

  const SkeletonReportMonthlyWelfarePaymentsLoading = () => (
    <Box sx={{ width: '100%' }}>
      <TabContext value={tabPayments}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleTabChange} aria-label='lab API tabs example'>
            <Tab label='รายการชำระเงิน' value='paid' />
            <Tab label='รายการรอชำระเงิน' value='pending-payment' />
            <Tab label='รายการติดตามการชำระเงิน' value='followup-payment' />
          </TabList>
        </Box>
        <TabPanel value='paid'>
          {paidReports.blogs.length > 0 ? (
            <Grid container wrap='nowrap'>
              <PaidContext.Provider value={paidReports}>
                <TableReportPaid />
              </PaidContext.Provider>
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
              <PendingPaymentContext.Provider value={pendingPaymentReports}>
                <TableReportPendingPayment />
              </PendingPaymentContext.Provider>
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
              <FollowupPaymentContext.Provider value={followupPaymentReports}>
                <TableReportFollowupPayment />
              </FollowupPaymentContext.Provider>
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
        <SkeletonReportMonthlyWelfarePaymentsLoading />
      </Grid>
    </Grid>

  )
}

export default FormLayouts

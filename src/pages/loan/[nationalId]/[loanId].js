import { useEffect, useState, createContext } from 'react'
import * as React from 'react'
import { useRouter } from 'next/router'
import Grid from '@mui/material/Grid'
import apiConfig from 'src/configs/apiConfig'
import FormMemberDetail from 'src/views/form-layouts/FormMemberDetail'
import axios from 'axios'
import CardUser from 'src/views/cards/CardUser'
import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import FormSpouseDetail from 'src/views/form-layouts/FormSpouseDetail'
import TableMemberInvestmentHistory from 'src/views/tables/TableMemberInvestmentHistory'
import TableMemberLoanHistory from 'src/views/tables/TableMemberLoanHistory'
import TableMemberDividendHistory from 'src/views/tables/TableMemberDividendHistory'
import TableMemberLoanPaymentHistory from 'src/views/tables/TableMemberLoanPaymentHistory'
import FormLoanDetail from 'src/views/form-layouts/FormLoanApproval'
import CardAddLoanPayment from 'src/views/cards/CardLoanPayment'
import CardLoanAgreement from 'src/views/cards/CardLoanAgreement'
import CardLoanReceipt from 'src/views/cards/CardLoanReceipt'
import CardLoanSurety1 from 'src/views/cards/CardLoanSurety1'
import CardLoanSurety2 from 'src/views/cards/CardLoanSurety2'
import FormDebtReport from 'src/views/form-layouts/FormDebtReport'
import CardOtherLoanPayment from 'src/views/cards/CardOtherLoanPayment'
import CardLoanStat from 'src/views/cards/CardLoanStat'

export const LoanMemberContext = createContext()

export const LoanPaymentHistoryContext = createContext()

export const LoanContext = createContext()

const FormLayouts = () => {
  const router = useRouter()
  if (router.isReady) {
    router.query.nationalId
  }
  const [memberLoanPaymentHistories, setMemberLoanPaymentHistories] = useState({ blogs: [] })
  const [memberDetail, setMemberDetail] = useState()
  const [loanDetail, setLoanDetail] = useState()
  const username = typeof window !== 'undefined' ? localStorage.getItem('username') : null

  const [value, setValue] = React.useState('member')
  const [tabHistoryValue, setTabHistoryValue] = React.useState('loan')
  const [tabRequests, setTabRequests] = React.useState('request-loan')
    const [badgeCouter, setBadgeCouter ]= useState(0)

    const handleTabChange = (event, newValue) => {
        setTabRequests(newValue)
    }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleTabHistoryChange = (event, newValue) => {
    setTabHistoryValue(newValue)
  }
  
  const fetchMemberDetail = async () => {
    let uri = apiConfig.baseURL + `/members/${router.query.nationalId}`
    console.log(uri)
    try{
     const res = await axios.get(uri)
      setMemberDetail(res.data[0])
    } catch (error) {
      console.log(error)
    }
  }

  const fetchLoanDetail = async () => {
    let uri = apiConfig.baseURL + `/loans/request/${router.query.nationalId}/${router.query.loanId}`
    console.log(uri)
    try{
    const res = await axios.get(uri)
    console.log(res.data[0])
    setLoanDetail(res.data[0])

      // .then(result => setLoanDetail(result.data[0]))
      // .catch(error => console.log('An error occurred' + error))
    } catch (error) {
      console.log(error)
    }
  }

  const fetchMemberLoanPaymentHistories = async () => {
    let uri = apiConfig.baseURL + `/loans/payment-history/${router.query.nationalId}/${router.query.loanId}`
    console.log(uri)
    try {
      const { data } = await axios.get(uri)
      console.log(data)
      setMemberLoanPaymentHistories({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (router.isReady) {
      router.query
      fetchMemberDetail()
      fetchMemberLoanPaymentHistories()
      fetchLoanDetail()
    }
  }, [router.isReady, router.query])

  console.log('memberLoanPaymentHistories = '+memberLoanPaymentHistories)
  console.log('memberDetail = '+memberDetail)
  console.log('loanDetail = '+loanDetail)

  // const SkeletonMemberCardLoading = () => (
  //   <Box sx={{ width: '100%' }}>
  //         {memberDetail?.nationalId ? (
  //           <LoanMemberContext.Provider value={memberDetail}>
  //             <CardUser />
  //           </LoanMemberContext.Provider>
  //         ) : (
  //           <Typography variant='h4'>
  //             <Skeleton width='100%' height={300} sx={{ animationDuration: '3.0s' }} />
  //           </Typography>
  //         )}
  //   </Box>
  // )
  const SkeletonMemberLoanFormLoading = () => (
    <Box sx={{ width: '100%' }}>
      {memberDetail?.nationalId ? (
        <LoanContext.Provider value={loanDetail}>
          <FormLoanDetail />
        </LoanContext.Provider>
      ) : (
        <Typography variant='h4'>
          <Skeleton width='100%' height={200} sx={{ animationDuration: '3.0s' }} />
        </Typography>
      )}
    </Box>
  )

  const SkeletonMemberDebtReportFormLoading = () => (
    <Box sx={{ width: '100%' }}>
      {memberDetail?.nationalId ? (
        <LoanContext.Provider value={loanDetail}>
          <FormDebtReport />
        </LoanContext.Provider>
      ) : (
        <Typography variant='h4'>
          <Skeleton width='100%' height={200} sx={{ animationDuration: '3.0s' }} />
        </Typography>
      )}
    </Box>
  )

  const SkeletonMemberLoanLoading = () => (
    <Box sx={{ width: '100%' }}>
      {memberDetail?.nationalId ? (
        <LoanPaymentHistoryContext.Provider value={memberLoanPaymentHistories}>
          <TableMemberLoanPaymentHistory />
        </LoanPaymentHistoryContext.Provider>
      ) : (
        <Typography variant='h4'>
          <Skeleton width='100%' height={200} sx={{ animationDuration: '3.0s' }} />
        </Typography>
      )}
    </Box>
  )

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={4} lg={4}>
        <LoanContext.Provider value={loanDetail}>
          <CardLoanStat />
        </LoanContext.Provider>
      </Grid>
      <Grid item xs={12} md={12} lg={8}>
        <Grid container spacing={6}>
            <Grid item xs={12} md={6} lg={6}>
              <CardAddLoanPayment />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <CardLoanAgreement />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <CardLoanReceipt/>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <CardLoanSurety1 />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <CardLoanSurety2 />
            </Grid>
        </Grid> 
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <Box sx={{ width: '100%' }}>
          <TabContext value={tabRequests}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleTabChange} aria-label='lab API tabs example' >
                        <Tab label='รายละเอียดสวัสดิการ' value='request-loan' />
                        <Tab label='ประวัติการชำระสวัสดิการ' value='request-investment' />
                    </TabList>
                </Box>
                    <TabPanel value='request-loan'>
                      
                        <Grid container wrap='nowrap'>
                            {/* <Grid item xs={12} md={12} lg={12}> */}
                            <Grid container spacing={6}>
                              <Grid item xs={12} md={6} lg={6}>
                                <SkeletonMemberLoanFormLoading />
                              </Grid>
                              <Grid item xs={12} md={6} lg={6}>
                                <SkeletonMemberDebtReportFormLoading />
                              </Grid>
                            {/* </Grid> */}
                            </Grid>
                        </Grid>
                    </TabPanel>
                    <TabPanel value='request-investment'>
                      <Grid container wrap='nowrap'>
                          <Grid item xs={12} md={12} lg={12}>
                            <Grid item xs={12}>
                              <SkeletonMemberLoanLoading />
                            </Grid>
                          </Grid>
                      </Grid>
                    </TabPanel>
                </TabContext>
            </Box>
      </Grid>
    </Grid>
  )
}

export default FormLayouts

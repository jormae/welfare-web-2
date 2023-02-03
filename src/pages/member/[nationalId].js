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

const defaultData = {
  ptName: 'Loading',
  admitDate: '2022-04-09T17:00:00.000Z',
  dischargeDate: '2022-04-11T17:00:00.000Z',
  doctorCode: 'Loading',
  wardCode: 'Loading',
  dischargeStatusCode: 'Loading',
  dischargeTypeCode: 'Loading',
  referCauseCode: 0,
  referHospitalCode: 0,
  pttypeCode: 'Loading',
  admitDuration: 'Loading'
}

export const MemberContext = createContext()

export const PositionsContext = createContext()

export const MemberTypesContext = createContext()

export const MemberRolesContext = createContext()

export const PaymentTypesContext = createContext()

export const MemberStatusContext = createContext()

export const ReferHospitalsContext = createContext()

export const PttypesContext = createContext()

export const InvesmentHistoryContext = createContext()

export const LoanHistoryContext = createContext()

export const DividendHistoryContext = createContext()

export const SpouseContext = createContext()

const FormLayouts = () => {
  const router = useRouter()
  if (router.isReady) {
    router.query.nationalId
  }
  const [memberDetail, setMemberDetail] = useState(defaultData)
  const [position, setPositions] = useState([])
  const [memberTypes, setMemberTypes] = useState([])
  const [memberRoles, setMemberRoles] = useState([])
  const [paymentTypes, setPaymentTypes] = useState([])
  const [MemberStatus, setReferCauses] = useState([])
  const [spouseDetails, setSpouseDetails] = useState()
  const [memberInvestmentHistories, setMemberInvestmentHistories] = useState({ blogs: [] })
  const [memberLoanHistories, setMemberLoanHistories] = useState({ blogs: [] })
  const [memberDividendHistories, setMemberDividendHistories] = useState({ blogs: [] })
  const [value, setValue] = React.useState('member')
  const [tabHistoryValue, setTabHistoryValue] = React.useState('loan')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleTabHistoryChange = (event, newValue) => {
    setTabHistoryValue(newValue)
  }

  const fetchMemberDetail = () => {
    let uri = apiConfig.baseURL + `/members/${router.query.nationalId}`
    console.log(uri)

    axios
      .get(uri)
      .then(result => setMemberDetail(result.data[0]))
      .catch(error => console.log('An error occurred' + error))
  }

  const fetchPositions = async () => {
    let uri = apiConfig.baseURL + `/utils/positions`
    console.log(uri)
    try {
      await axios
        .get(uri)
        .then(result => setPositions(result.data))
        .catch(error => console.log('An error occurred' + error))
    } catch (error) {
      console.log(error)
    }
  }

  const fetchMemberTypes = async () => {
    let uri = apiConfig.baseURL + `/utils/member-types`
    try {
      await axios
        .get(uri)
        .then(result => setMemberTypes(result.data))
        .catch(error => console.log('An error occurred' + error))
    } catch (error) {
      console.log(error)
    }
  }

  const fetchMemberRoles = async () => {
    let uri = apiConfig.baseURL + `/utils/member-roles`
    try {
      await axios
        .get(uri)
        .then(result => setMemberRoles(result.data))
        .catch(error => console.log('An error occurred' + error))
    } catch (error) {
      console.log(error)
    }
  }

  const fetchPaymentTypes = async () => {
    let uri = apiConfig.baseURL + `/utils/payment-types`
    try {
      await axios
        .get(uri)
        .then(result => setPaymentTypes(result.data))
        .catch(error => console.log('An error occurred' + error))
    } catch (error) {
      console.log(error)
    }
  }

  const fetchMemberStatus = async () => {
    let uri = apiConfig.baseURL + `/utils/member-status`
    try {
      await axios
        .get(uri)
        .then(result => setReferCauses(result.data))
        .catch(error => console.log('An error occurred' + error))
    } catch (error) {
      console.log(error)
    }
  }

  const fetchSpouseDetail = () => {
    let uri = apiConfig.baseURL + `/spouses/${router.query.nationalId}`
    console.log(uri)

    axios
      .get(uri)
      .then(result => setSpouseDetails(result.data[0]))
      .catch(error => console.log('An error occurred' + error))
  }

  const fetchMemberInvestments = async () => {
    let uri = apiConfig.baseURL + `/investments/${router.query.nationalId}`
    try {
      const { data } = await axios.get(uri)
      setMemberInvestmentHistories({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  const fetchMemberLoans = async () => {
    let uri = apiConfig.baseURL + `/loans/members/${router.query.nationalId}`
    console.log(uri)
    try {
      const { data } = await axios.get(uri)
      setMemberLoanHistories({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  const fetchMemberDividends = async () => {
    let uri = apiConfig.baseURL + `/dividends/${router.query.nationalId}`
    console.log(uri)
    try {
      const { data } = await axios.get(uri)
      setMemberDividendHistories({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (router.isReady) {
      router.query
      fetchMemberDetail()
      fetchPositions()
      fetchMemberTypes()
      fetchMemberRoles()
      fetchPaymentTypes()
      fetchMemberStatus()
      fetchSpouseDetail()
      fetchMemberInvestments()
      fetchMemberLoans()
      fetchMemberDividends()
    }
  }, [router.isReady, router.query])

  const SkeletonMemberCardLoading = () => (
    <Box sx={{ width: '100%' }}>
          {memberDetail.nationalId ? (
            <MemberContext.Provider value={memberDetail}>
              <CardUser />
            </MemberContext.Provider>
          ) : (
            <Typography variant='h4'>
              <Skeleton width='100%' height={300} sx={{ animationDuration: '3.0s' }} />
            </Typography>
          )}
    </Box>
  )

  const SkeletonMemberFormsLoading = () => (
    <Box sx={{ width: '100%' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label='lab API tabs example'>
            <Tab label='ข้อมูลสมาชิก' value='member' />
            <Tab label='ข้อมูลคู่สมรส' value='spouse' />
            <Tab label='ประวัติหุ้น' value='investment2' />
          </TabList>
        </Box>
      <TabPanel value='member'>
          {memberDetail.nationalId ? (
            <MemberContext.Provider value={memberDetail}>
              <PositionsContext.Provider value={position}>
                <MemberTypesContext.Provider value={memberTypes}>
                  <MemberRolesContext.Provider value={memberRoles}>
                    <PaymentTypesContext.Provider value={paymentTypes}>
                      <MemberStatusContext.Provider value={MemberStatus}>
                        <FormMemberDetail />
                      </MemberStatusContext.Provider>
                    </PaymentTypesContext.Provider>
                  </MemberRolesContext.Provider>
                </MemberTypesContext.Provider>
              </PositionsContext.Provider>
            </MemberContext.Provider>
          ) : (
            <Typography variant='h4'>
              <Skeleton width='100%' height={200} sx={{ animationDuration: '3.0s' }} />
            </Typography>
          )}
        </TabPanel>
        <TabPanel value='spouse'>
          {memberDetail.nationalId ? (
            <SpouseContext.Provider value={spouseDetails}>
              <FormSpouseDetail />
            </SpouseContext.Provider>
          ) : (
            <Typography variant='h4'>
              <Skeleton width='100%' height={200} sx={{ animationDuration: '3.0s' }} />
            </Typography>
          )}
        </TabPanel>
        <TabPanel value='investment2'>
          {memberDetail.nationalId ? (
            <InvesmentHistoryContext.Provider value={memberInvestmentHistories}>
              <TableMemberInvestmentHistory />
            </InvesmentHistoryContext.Provider>
          ) : (
            <Typography variant='h4'>
              <Skeleton width='100%' height={200} sx={{ animationDuration: '3.0s' }} />
            </Typography>
          )}
        </TabPanel>
      </TabContext>
    </Box>
  )

  const SkeletonMemberInvestmentAndLoadHistotiesLoading = () => (
    <Box sx={{ width: '100%' }}>
      <TabContext value={tabHistoryValue}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleTabHistoryChange} aria-label='lab API tabs example'>
            <Tab label='ประวัติกู้' value='loan' />
            <Tab label='ประวัติหุ้น' value='investment' />
            <Tab label='ประวัติปันผล' value='dividend' />
          </TabList>
        </Box>
        <TabPanel value='loan'>
          {memberLoanHistories.blogs.length > 0 ? (
            <Grid container wrap='nowrap'>
              <LoanHistoryContext.Provider value={memberLoanHistories}>
                <TableMemberLoanHistory />
              </LoanHistoryContext.Provider>
            </Grid>
          ) : (
            <Typography variant='h4'>
              <Skeleton width='100%' height={200} sx={{ animationDuration: '3.0s' }} />
            </Typography>
          )}
        </TabPanel>
        <TabPanel value='investment'>
          {memberInvestmentHistories.blogs.length > 0 ? (
            <Grid container wrap='nowrap'>
              <InvesmentHistoryContext.Provider value={memberInvestmentHistories}>
                <TableMemberInvestmentHistory />
              </InvesmentHistoryContext.Provider>
            </Grid>
          ) : (
            <Typography variant='h4'>
              <Skeleton width='100%' height={200} sx={{ animationDuration: '3.0s' }} />
            </Typography>
          )}
        </TabPanel>
        <TabPanel value='dividend'>
          {memberDividendHistories.blogs.length > 0 ? (
            <Grid container wrap='nowrap'>
              <DividendHistoryContext.Provider value={memberDividendHistories}>
                <TableMemberDividendHistory />
              </DividendHistoryContext.Provider>
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
      <Grid item xs={4}>
        <SkeletonMemberCardLoading />
      </Grid>
      <Grid item xs={8}>
        <SkeletonMemberFormsLoading />
      </Grid>
      <Grid item xs={12}>
        <SkeletonMemberInvestmentAndLoadHistotiesLoading />
      </Grid>
    </Grid>
  )
}

export default FormLayouts

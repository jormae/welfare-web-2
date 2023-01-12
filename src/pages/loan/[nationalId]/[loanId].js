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
import TableMemberLoanRecordHistory from 'src/views/tables/TableMemberLoanRecordHistory'

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

export const LoanRecordHistoryContext = createContext()

export const SpouseContext = createContext()

const FormLayouts = () => {
  const router = useRouter()
  if (router.isReady) {
    router.query.nationalId
  }
  const [memberDetail, setMemberDetail] = useState(defaultData)
  const [memberLoanHistories, setMemberLoanHistories] = useState({ blogs: [] })
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

  const fetchMemberLoansHistories = async () => {
    let uri = apiConfig.baseURL + `/loans/loan-history/${router.query.nationalId}/${router.query.loanId}`
    console.log(uri)
    try {
      const { data } = await axios.get(uri)
      setMemberLoanHistories({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (router.isReady) {
      router.query
      fetchMemberDetail()
      fetchMemberLoansHistories()
    }
  }, [router.isReady, router.query])

  const SkeletonMemberLoanLoading = () => (
    <Box sx={{ width: '100%' }}>
      {memberDetail.nationalId ? (
        <LoanRecordHistoryContext.Provider value={memberLoanHistories}>
          <TableMemberLoanRecordHistory />
        </LoanRecordHistoryContext.Provider>
      ) : (
        <Typography variant='h4'>
          <Skeleton width='100%' height={200} sx={{ animationDuration: '3.0s' }} />
        </Typography>
      )}
    </Box>
  )

  return (
    <Grid container spacing={6}>
      <Grid item xs={4}>
        <CardUser />
      </Grid>
      <Grid item xs={8}>
        <SkeletonMemberLoanLoading />
      </Grid>
    </Grid>
  )
}

export default FormLayouts

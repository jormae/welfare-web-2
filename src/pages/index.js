import { useEffect, useState, createContext } from 'react'
import Grid from '@mui/material/Grid'
import Router from 'next/router'
// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import Trophy from 'src/views/dashboard/Trophy'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
import SalesByCountries from 'src/views/dashboard/SalesByCountries'
import ChartChangeLogs from 'src/views/dashboard/ChartChangeLog'
import TableChartWard from 'src/views/dashboard/TableChartWard'
import TableDashboardDischargeType from 'src/views/dashboard/TableDashboardDischargeType'
import StatisticChart from 'src/views/dashboard/StatisticsChart'
import TableDoctorTask from 'src/views/dashboard/TableDoctorTask'
import Greeting from 'src/views/dashboard/Greeting'
import apiConfig from 'src/configs/apiConfig'
import axios from 'axios'
import CardHorizontalRatings from 'src/views/cards/CardHorizontalRatings'
import CardAppleWatch from 'src/views/cards/CardAppleWatch'
import CardFacebook from 'src/views/cards/CardFacebook'
import CardInfluencer from 'src/views/cards/CardInfluencer'
import CardMembership from 'src/views/cards/CardMembership'
import CardMobile from 'src/views/cards/CardMobile'
import CardSupport from 'src/views/cards/CardSupport'
import CardTwitter from 'src/views/cards/CardTwitter'
import CardUser from 'src/views/cards/CardUser'
import CardVerticalRatings from 'src/views/cards/CardVerticalRatings'
import CardNavigation from 'src/views/cards/CardNavigation'
import CardMember from 'src/views/cards/CardMember'
import CardActiveLoan from 'src/views/cards/CardActiveLoan'
import CardFollowUpLoan from 'src/views/cards/CardFollowUpLoan'
import CardTotalMoney from 'src/views/cards/CardTotalMoney'
import CardTotalLoan from 'src/views/cards/CardTotalLoan'
import CardQueueLoan from 'src/views/cards/CardQueueLoan'
import CardNews from 'src/views/cards/CardNews'
import TableMember from 'src/views/tables/TableMember'
import TableLoanRequest from 'src/views/tables/TableLoanRequest'
import TableInvestmentRequest from 'src/views/tables/TableInvestmentRequest'

export const DataContext = createContext()

const Dashboard = () => {
  const [err, setError] = useState()
  const [members, setMembers] = useState({ blogs: [] })
  const userRole = typeof window !== 'undefined' ? localStorage.getItem('memberRoleId') : null

  const fetchMembers = async () => {
    let uri = apiConfig.baseURL + `/members`
    console.log(uri)
    try {
      const { data } = await axios.get(uri)
      setMembers({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  const verifyToken = async () => {
    const token = localStorage.getItem('token')
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

  useEffect(() => {
    verifyToken()
    fetchMembers()

  }, [])

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
          </Grid>
          ) : (
          ''
        )}
        </Grid>
        {userRole != 4 ? (
        <Grid item xs={12} md={6} lg={4}>
          <CardFollowUpLoan />
        </Grid>
                 ) : (
                  ''
                )}
         {userRole != 4 ? (
         <Grid item xs={12} md={6} lg={4}>
          <CardQueueLoan />
        </Grid>
        ) : (
          ''
        )}
         {userRole != 4 ? (
        <Grid item xs={12} md={6} lg={4}>
          <CardNews />
        </Grid>
        ) : (
          ''
        )}
        {/* <Grid item xs={12} md={6} lg={4}>
          <WeeklyOverview />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TotalEarning />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <ChartChangeLogs />
        </Grid> */}
        {/* <Grid item xs={12} md={8} lg={8}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6} lg={4}>
              <TableChartWard />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TableDashboardDischargeType />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <CardStatisticsVerticalComponent
                stats='15'
                color='warning'
                trend='negative'
                trendNumber='-18%'
                subtitle='Last Week'
                title='Sales Queries'
                icon={<HelpCircleOutline />}
              />
            </Grid>
          </Grid>
        </Grid> */}
        {userRole != 4 ? (
        <Grid item xs={12}>
          <TableLoanRequest />
        </Grid>
        ) : (
          ''
        )}
        {userRole != 4 ? (
        <Grid item xs={12}>
          <TableInvestmentRequest />
        </Grid>
        ) : (
          ''
        )}
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard

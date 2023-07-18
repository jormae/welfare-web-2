import { useEffect, useState, createContext } from 'react'
import Grid from '@mui/material/Grid'
import Router from 'next/router'
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

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

export const DataContext = createContext()

const Dashboard = () => {

  const [err, setError] = useState()
  const userRole = typeof window !== 'undefined' ? localStorage.getItem('memberRoleId') : null
  const username = typeof window !== 'undefined' ? localStorage.getItem('username') : null

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
                    window.location.href = `/member/${username}`;
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
    getUserPass()
    // resetDefaultPassword()
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
            <Grid item xs={12} md={6} lg={6}>
              <CardQueueLoan />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <CardFollowUpLoan />
            </Grid>
          </Grid>
          ) : (
          ''
        )}
        </Grid>

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

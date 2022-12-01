import { useEffect } from 'react'
import Grid from '@mui/material/Grid'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import CardNewChart from 'src/views/cards/CardNewChart'
import apiConfig from 'src/configs/apiConfig'
import TableReportChartStatus from 'src/views/tables/TableReportChartStatus'

const FormLayouts = () => {
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
      })
  }
  useEffect(() => {
    verifyToken()
  }, [])

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <CardNewChart />
        </Grid>

        <Grid item xs={12}>
          <TableReportChartStatus />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default FormLayouts

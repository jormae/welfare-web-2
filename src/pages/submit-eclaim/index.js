import { useEffect, useState, createContext } from 'react'
import Grid from '@mui/material/Grid'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import CardSubmitEclaim from 'src/views/cards/CardSubmitEclaim'
import TableSubmitEclaim from 'src/views/tables/TableSubmitEclaim'
import apiConfig from 'src/configs/apiConfig'
import axios from 'axios'

export const CardContext = createContext()

const FormLayouts = () => {
  const [statSubmitEclaim, setStatSubmitEclaim] = useState(0)

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

  const fetchStatNewChart = async () => {
    let uri = apiConfig.baseURL + '/stat/submit-eclaim'
    try {
      await axios
        .get(uri)
        .then(result => setStatSubmitEclaim(result.data[0]))
        .catch(error => console.log('An error occurred' + error))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    verifyToken()
    fetchStatNewChart()
  }, [])

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <CardContext.Provider value={statSubmitEclaim}>
          <Grid item xs={12}>
            <CardSubmitEclaim />
          </Grid>
        </CardContext.Provider>

        <Grid item xs={12}>
          <TableSubmitEclaim />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default FormLayouts

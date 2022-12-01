import { useEffect, useState, createContext } from 'react'
import { useRouter } from 'next/router'
import Grid from '@mui/material/Grid'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import CardNewChart from 'src/views/cards/CardNewChart'
import apiConfig from 'src/configs/apiConfig'
import axios from 'axios'
import TableReportChartStatusList from 'src/views/tables/TableReportChartStatusList'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'

export const ChartContext = createContext()

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

  const router = useRouter()
  if (router.isReady) {
    router.query.year_month
  }

  const [chartStatusLists, setChartStatusLists] = useState({ blogs: [] })


  const fetchAllCharts = async () => {
    let uri = apiConfig.baseURL + `/report/chart-status/${router.query.year_month}`

    try {
      const { data } = await axios.get(uri)
      setChartStatusLists({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (router.isReady) {
      router.query
      fetchAllCharts()
      verifyToken()
    }
  }, [router.isReady, router.query])

  const SkeletonChartsLoading = () => (
    <Box>
      {chartStatusLists.blogs.length > 0 ? (
        <Grid container wrap='nowrap'>
        <ChartContext.Provider value={chartStatusLists}>
            <TableReportChartStatusList/>
            </ChartContext.Provider>
        </Grid>
      ) : (
        <Skeleton width='100%' height={200} />
      )}
    </Box>
  )

  return (
    <Grid container spacing={6}>
        <Grid item xs={12}>
          <CardNewChart />
        </Grid>

        <Grid item xs={12}>
        <SkeletonChartsLoading />
      </Grid>
    </Grid>
  )

}

export default FormLayouts

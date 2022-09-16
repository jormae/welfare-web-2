import { useEffect, useState, createContext } from 'react'
import { useRouter } from 'next/router'
import Grid from '@mui/material/Grid'
import apiConfig from 'src/configs/apiConfig'
import FormChartDetail from 'src/views/form-layouts/FormChartDetail'
import axios from 'axios'
import CardNewChart from 'src/views/cards/CardNewChart'

export const ChartContext = createContext()

const FormLayouts = () => {
  const router = useRouter()
  const [chartDetail, setChartDetail] = useState()

  if (router.isReady) {
    const { an } = router.query
    console.log(an)
  }

  const fetchChartDetail = async () => {
    let uri = apiConfig.baseURL + `/chart/all-chart/${an}`
    console.log(uri)
    try {
      await axios
        .get(uri)
        .then(result => setChartDetail(result.data[0]))
        .catch(error => console.log('An error occurred' + error))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (router.isReady) {
      router.query
      fetchChartDetail()

      // console.log(router.query)
    }
  }, [router.isReady, router.query])

  return (
    <ChartContext.Provider value={chartDetail}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <CardNewChart />
        </Grid>
        <Grid item xs={6}>
          <FormChartDetail />
        </Grid>
        <Grid item xs={6}>
          <FormChartDetail />
        </Grid>
      </Grid>
    </ChartContext.Provider>
  )
}

export default FormLayouts

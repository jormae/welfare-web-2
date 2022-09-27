import { useEffect, useState, createContext } from 'react'
import { useRouter } from 'next/router'
import Grid from '@mui/material/Grid'
import apiConfig from 'src/configs/apiConfig'
import FormChartDetail from 'src/views/form-layouts/FormChartDetail'
import axios from 'axios'
import CardNewChart from 'src/views/cards/CardNewChart'
import TableChartHistory from 'src/views/tables/TableChartHistory'
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const defaultData = {
  ptName: 'Loading',
  admitDate: '2022-04-09T17:00:00.000Z',
  dischargeDate: '2022-04-11T17:00:00.000Z',
  doctorCode: 'Loading',
  wardCode: 'Loading',
  dischargeStatusCode: 'Loading',
  dischargeTypeCode: 'Loading',
  referCauseCode: 'Loading',
  referHospitalCode: 'Loading',
  pttypeCode: 'Loading',
  admitDuration: 'Loading'
}

export const ChartContext = createContext()
export const WardsContext = createContext()
export const DischargeStutusesContext = createContext()
export const DischargeTypesContext = createContext()
export const DoctorsContext = createContext()
export const ReferCausesContext = createContext()
export const ReferHospitalsContext = createContext()
export const PttypesContext = createContext()
export const HistoriesContext = createContext()

const FormLayouts = () => {
  const router = useRouter()
  const [chartDetail, setChartDetail] = useState(defaultData)
  const [wards, setWards] = useState([])
  const [dischargeStatuses, setDischargeStatuses] = useState([])
  const [dischargeTypes, setDischargeTypes] = useState([])
  const [doctors, setDoctors] = useState([])
  const [referCauses, setReferCauses] = useState([])
  const [referHospitals, setReferHospitals] = useState([])
  const [pttypes, setPttypes] = useState([])
  const [chartHistories, setChartHistories] = useState({ blogs: [] })
  console.log(chartDetail.id)
  // console.log(chartHistories)
  // console.log(chartHistories.blogs.length)

  if (router.isReady) {
    const { an } = router.query
    // console.log(an)
  }

  const fetchChartDetail = () => {
    let uri = apiConfig.baseURL + `/chart/all-chart/${an}`
    console.log(uri)

    axios
      .get(uri)
      .then(result => setChartDetail(result.data[0]))
      .catch(error => console.log('An error occurred' + error))
  }

  const fetchWards = async () => {
    let uri = apiConfig.baseURL + `/utils/ward`
    console.log(uri)
    try {
      await axios
        .get(uri)
        .then(result => setWards(result.data))
        .catch(error => console.log('An error occurred' + error))
    } catch (error) {
      console.log(error)
    }
  }

  const fetchDischargeStatuses = async () => {
    let uri = apiConfig.baseURL + `/utils/discharge-status`
    try {
      await axios
        .get(uri)
        .then(result => setDischargeStatuses(result.data))
        .catch(error => console.log('An error occurred' + error))
    } catch (error) {
      console.log(error)
    }
  }

  const fetchDischargeTypes = async () => {
    let uri = apiConfig.baseURL + `/utils/discharge-type`
    try {
      await axios
        .get(uri)
        .then(result => setDischargeTypes(result.data))
        .catch(error => console.log('An error occurred' + error))
    } catch (error) {
      console.log(error)
    }
  }

  const fetchDoctors = async () => {
    let uri = apiConfig.baseURL + `/utils/doctor`
    try {
      await axios
        .get(uri)
        .then(result => setDoctors(result.data))
        .catch(error => console.log('An error occurred' + error))
    } catch (error) {
      console.log(error)
    }
  }

  const fetchReferCauses = async () => {
    let uri = apiConfig.baseURL + `/utils/refer-cause`
    try {
      await axios
        .get(uri)
        .then(result => setReferCauses(result.data))
        .catch(error => console.log('An error occurred' + error))
    } catch (error) {
      console.log(error)
    }
  }

  const fetchReferHospitals = async () => {
    let uri = apiConfig.baseURL + `/utils/refer-hospital`
    try {
      await axios
        .get(uri)
        .then(result => setReferHospitals(result.data))
        .catch(error => console.log('An error occurred' + error))
    } catch (error) {
      console.log(error)
    }
  }

  const fetchPttypes = async () => {
    let uri = apiConfig.baseURL + `/utils/pttype`
    try {
      await axios
        .get(uri)
        .then(result => setPttypes(result.data))
        .catch(error => console.log('An error occurred' + error))
    } catch (error) {
      console.log(error)
    }
  }

  const fetchChartHistories = async () => {
    let uri = apiConfig.baseURL + `/chart/history/${an}`

    try {
      const { data } = await axios.get(uri)
      setChartHistories({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (router.isReady) {
      router.query
      fetchChartDetail()
      fetchWards()
      fetchDischargeStatuses()
      fetchDischargeTypes()
      fetchDoctors()
      fetchReferCauses()
      fetchReferHospitals()
      fetchPttypes()
      fetchChartHistories()
    }
  }, [router.isReady, router.query])

  const SkeletonChartFormsLoading = () => (
    <Box>
      {
      chartDetail.id ? 
      (
        <ChartContext.Provider value={chartDetail}>
          <WardsContext.Provider value={wards}>
              <DischargeStutusesContext.Provider value={dischargeStatuses}>
                <DischargeTypesContext.Provider value={dischargeTypes}>
                  <DoctorsContext.Provider value={doctors}>
                    <ReferCausesContext.Provider value={referCauses}>
                      <ReferHospitalsContext.Provider value={referHospitals}>
                        <PttypesContext.Provider value={pttypes}>
                          <FormChartDetail />
                        </PttypesContext.Provider>
                      </ReferHospitalsContext.Provider>
                    </ReferCausesContext.Provider>
                  </DoctorsContext.Provider>
                </DischargeTypesContext.Provider>
              </DischargeStutusesContext.Provider>
            </WardsContext.Provider>
          </ChartContext.Provider>
      ) : 
      ( 
      <Typography variant="h4">
        <Skeleton width="100%" height={300} sx={{ animationDuration: "3.0s" }}/>
      </Typography>
      )}
    </Box>
  );

  const SkeletonChartHistotiesLoading = () => (
    <Box>
      {
      chartHistories.blogs.length > 0 ? 
      (
        <Grid container wrap="nowrap">
        <HistoriesContext.Provider value={chartHistories}>
          <TableChartHistory />
        </HistoriesContext.Provider>
      </Grid>
      ) : 
      ( 
        <Skeleton width="100%"  height="20%"/>
      )}
    </Box>
  );

  return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <CardNewChart />
        </Grid>
        <Grid item xs={6}>
            <SkeletonChartFormsLoading />
        </Grid>
        <Grid item xs={6}>
          <SkeletonChartHistotiesLoading />
        </Grid>
      </Grid>
  )
}



export default FormLayouts

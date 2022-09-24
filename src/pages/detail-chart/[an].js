import { useEffect, useState, createContext } from 'react'
import { useRouter } from 'next/router'
import Grid from '@mui/material/Grid'
import apiConfig from 'src/configs/apiConfig'
import FormChartDetail from 'src/views/form-layouts/FormChartDetail'
import axios from 'axios'
import CardNewChart from 'src/views/cards/CardNewChart'
import TableChartHistory from 'src/views/tables/TableChartHistory'

const defaultData = {
  id: 0,
  an: '00000000',
  hn: '0000',
  ptName: 'N/A',
  admitDate: '2022-04-09T17:00:00.000Z',
  admitTime: '13:34:00',
  dischargeDate: '2022-04-11T17:00:00.000Z',
  dischargeTime: '12:00:00',
  doctorCode: 421,
  dischargeDoctor: 'นพ.สรวิชญ์ ไชยเจริญทรัพย์',
  wardCode: '16',
  dischargeStatusCode: '02',
  dischargeTypeCode: '01',
  referCauseCode: null,
  referHospitalCode: null,
  pttypeCode: '72',
  admitDuration: 2,
  startSummaryDate: '2022-09-15T05:39:03.000Z',
  dueSummaryDate: '2022-09-24T17:00:00.000Z',
  submitedBy: 'นายมาฮีดีน จอแม',
  returnSummaryDate: '2022-09-15T08:54:25.000Z',
  returnedSummaryBy: 'นายมาฮีดีน จอแม',
  reauditDate: null,
  collectedBy: null,
  isReaudit: null,
  codeDuration: 1,
  summaryDuration: 0,
  completionDuration: null,
  chartStatusId: 1,
  insertedBy: 'นายมาฮีดีน จอแม',
  insertedAt: '2022-09-15T08:54:26.000Z',
  updatedBy: null,
  updatedAt: null,
  wardId: 1,
  wardName: 'หอผู้ป่วยใน 1',
  wardLabel: 'IPD 1',
  wardStatusId: 1,
  dischargeStatusName: 'Improved',
  dischargeTypeName: 'With Approval',
  pttypeName: 'ประเภทผู้มีรายได้น้อย',
  referCauseName: null,
  referHospitalName: null
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

  if (router.isReady) {
    const { an } = router.query
    // console.log(an)
  }

  const fetchChartDetail = () => {
    let uri = apiConfig.baseURL + `/chart/all-chart/${an}`
    // console.log(uri)

    axios
      .get(uri)
      .then(result => setChartDetail(result.data[0]))
      .catch(error => console.log('An error occurred' + error))
  }

  const fetchWards = async () => {
    let uri = apiConfig.baseURL + `/utils/ward`
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
      // console.log({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (router.isReady) {
      router.query
      fetchChartDetail()
      // fetchWards()
      // fetchDischargeStatuses()
      // fetchDischargeTypes()
      // fetchDoctors()
      // fetchReferCauses()
      // fetchReferHospitals()
      // fetchPttypes()
      // fetchChartHistories()
    }
  }, [router.isReady, router.query])

  // const [registeredAddresses, setRegisteredAddresses] = useState([]);

  return (
    <ChartContext.Provider value={chartDetail}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <CardNewChart />
        </Grid>
        <Grid item xs={6}>
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
        </Grid>
        <Grid item xs={6}>
          <HistoriesContext.Provider value={chartHistories}>
            <TableChartHistory />
          </HistoriesContext.Provider>
        </Grid>
      </Grid>
    </ChartContext.Provider>
  )
}

export default FormLayouts

import { useEffect, useState, createContext } from 'react'
import { useRouter } from 'next/router'
import Grid from '@mui/material/Grid'
import apiConfig from 'src/configs/apiConfig'
import FormMemberDetail from 'src/views/form-layouts/FormMemberDetail'
import axios from 'axios'
// import CardNewMember from 'src/views/cards/CardNewMember'
// import TableMemberHistory from 'src/views/tables/TableMemberHistory'
import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

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

export const HistoriesContext = createContext()

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
  // const [referHospitals, setReferHospitals] = useState([])
  // const [pttypes, setPttypes] = useState([])
  const [memberHistories, setMemberHistories] = useState({ blogs: [] })

  const fetchMemberDetail = () => {
    let uri = apiConfig.baseURL + `/members/${router.query.nationalId}`
    console.log(uri)

    axios
      .get(uri)
      .then(result => setMemberDetail(result.data[0]))
      .catch(error => console.log('An error occurred' + error))
  }

  const fetchMemberInvestments = async () => {
    let uri = apiConfig.baseURL + `/investments/${router.query.nationalId}`

    try {
      const { data } = await axios.get(uri)
      setMemberHistories({ blogs: data })
    } catch (error) {
      console.log(error)
    }
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

  // const fetchReferHospitals = async () => {
  //   let uri = apiConfig.baseURL + `/utils/refer-hospital`
  //   try {
  //     await axios
  //       .get(uri)
  //       .then(result => setReferHospitals(result.data))
  //       .catch(error => console.log('An error occurred' + error))
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // const fetchPttypes = async () => {
  //   let uri = apiConfig.baseURL + `/utils/pttype`
  //   try {
  //     await axios
  //       .get(uri)
  //       .then(result => setPttypes(result.data))
  //       .catch(error => console.log('An error occurred' + error))
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  useEffect(() => {
    if (router.isReady) {
      router.query
      fetchMemberDetail()
      fetchPositions()
      fetchMemberTypes()
      fetchMemberRoles()
      fetchPaymentTypes()
      fetchMemberStatus()
      // fetchReferHospitals()
      // fetchPttypes()
      fetchMemberInvestments()
    }
  }, [router.isReady, router.query])

  const SkeletonMemberFormsLoading = () => (
    <Box>
      {memberDetail.nationalId ? (
        <MemberContext.Provider value={memberDetail}>
          <PositionsContext.Provider value={position}>
            <MemberTypesContext.Provider value={memberTypes}>
              <MemberRolesContext.Provider value={memberRoles}>
                <PaymentTypesContext.Provider value={paymentTypes}>
                  <MemberStatusContext.Provider value={MemberStatus}>
                    {/* <ReferHospitalsContext.Provider value={referHospitals}> */}
                      {/* <PttypesContext.Provider value={pttypes}> */}
                        <FormMemberDetail />
                      {/* </PttypesContext.Provider> */}
                    {/* </ReferHospitalsContext.Provider> */}
                  </MemberStatusContext.Provider>
                </PaymentTypesContext.Provider>
              </MemberRolesContext.Provider>
            </MemberTypesContext.Provider>
          </PositionsContext.Provider>
        </MemberContext.Provider>
      ) : (
        <Typography variant='h4'>
          {/* <CircularProgress /> */}
          <Skeleton width='100%' height={200} sx={{ animationDuration: '3.0s' }} />
        </Typography>
      )}
    </Box>
  )

  // const SkeletonMemberHistotiesLoading = () => (
  //   <Box>
  //     {memberHistories.blogs.length > 0 ? (
  //       <Grid container wrap='nowrap'>
  //         <HistoriesContext.Provider value={memberHistories}>
  //           <TableMemberHistory />
  //         </HistoriesContext.Provider>
  //       </Grid>
  //     ) : (
  //       <Skeleton width='100%' height={200} />
  //     )}
  //   </Box>
  // )

  return (
    <Grid container spacing={6}>
      {/* <Grid item xs={12}>
        <CardNewMember />
      </Grid> */}
      <Grid item xs={12}>
        <SkeletonMemberFormsLoading />
      </Grid>
      {/* <Grid item xs={6}>
        <SkeletonMemberHistotiesLoading />
      </Grid> */}
    </Grid>
  )
}

export default FormLayouts

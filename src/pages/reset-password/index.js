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
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import toast, { Toaster } from 'react-hot-toast'
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingButton from '@mui/lab/LoadingButton'
import { useForm } from 'react-hook-form'
import SaveIcon from '@material-ui/icons/Save';
import Slide from '@mui/material/Slide';


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

export const InvesmentHistoryContext = createContext()

export const LoanHistoryContext = createContext()

export const DividendHistoryContext = createContext()

export const SuretyHistoryContext = createContext()

export const SpouseContext = createContext()

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FormLayouts = () => {
  const router = useRouter()
  if (router.isReady) {
    router.query.nationalId
  }
  const nationalId = typeof window !== 'undefined' ? localStorage.getItem('username') : null

  const [memberDetail, setMemberDetail] = useState(defaultData)
  console.log(memberDetail)
  const [position, setPositions] = useState([])
  const [memberTypes, setMemberTypes] = useState([])
  const [memberRoles, setMemberRoles] = useState([])
  const [paymentTypes, setPaymentTypes] = useState([])
  const [MemberStatus, setReferCauses] = useState([])
  const [spouseDetails, setSpouseDetails] = useState()
  const [memberInvestmentHistories, setMemberInvestmentHistories] = useState({ blogs: [] })
  const [memberLoanHistories, setMemberLoanHistories] = useState({ blogs: [] })
  const [memberDividendHistories, setMemberDividendHistories] = useState({ blogs: [] })
  const [memberSuretyHistories, setMemberSuretyHistories] = useState({ blogs: [] })
  const [value, setValue] = React.useState('account')
  const [tabHistoryValue, setTabHistoryValue] = React.useState('loan')
  const [saveLoading, setSaveLoading] = React.useState(false)

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleTabHistoryChange = (event, newValue) => {
    setTabHistoryValue(newValue)
  }

  const fetchMemberDetail = () => {
    let uri = apiConfig.baseURL + `/members/${nationalId}`
    console.log(uri)

    axios
      .get(uri)
      .then(result => setMemberDetail(result.data[0]))
      .catch(error => console.log('An error occurred' + error))
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

  const fetchSpouseDetail = () => {
    let uri = apiConfig.baseURL + `/spouses/${router.query.nationalId}`
    console.log(uri)

    axios
      .get(uri)
      .then(result => setSpouseDetails(result.data[0]))
      .catch(error => console.log('An error occurred' + error))
  }

  const fetchMemberInvestments = async () => {
    let uri = apiConfig.baseURL + `/investments/history/${router.query.nationalId}`
    try {
      const { data } = await axios.get(uri)
      setMemberInvestmentHistories({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  const fetchMemberLoans = async () => {
    let uri = apiConfig.baseURL + `/loans/members/${router.query.nationalId}`
    console.log(uri)
    try {
      const { data } = await axios.get(uri)
      setMemberLoanHistories({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  const fetchMemberDividends = async () => {
    let uri = apiConfig.baseURL + `/dividends/${router.query.nationalId}`
    console.log(uri)
    try {
      const { data } = await axios.get(uri)
      setMemberDividendHistories({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  const fetchMemberSureties = async () => {
    let uri = apiConfig.baseURL + `/loans/surety/${router.query.nationalId}`
    console.log(uri)
    try {
      const { data } = await axios.get(uri)
      console.log(data)
      setMemberSuretyHistories({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  const { register, handleSubmit, control, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    setSaveLoading(true)
    console.log('onSubmit')
    console.log(data)

    let uri = apiConfig.baseURL + `/auth/${data.nationalId}`
    console.log(uri)

    fetch(uri, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setSaveLoading(false)
        if (data.status == 'success') {
          toast.success(data.message)
        } else {
          toast.error(data.message)
        }
      })
      .catch(function (error) {
        console.log(JSON.stringify(error))
      })
  }

  useEffect(() => {
    if (router.isReady) {
      router.query
      fetchMemberDetail()
      fetchPositions()
      fetchMemberTypes()
      fetchMemberRoles()
      fetchPaymentTypes()
      fetchMemberStatus()
      fetchSpouseDetail()
      fetchMemberInvestments()
      fetchMemberLoans()
      fetchMemberDividends()
      fetchMemberSureties()
    }
  }, [router.isReady, router.query])

  const SkeletonMemberCardLoading = () => (
    <Box sx={{ width: '100%' }}>
          {memberDetail.nationalId ? (
            <MemberContext.Provider value={memberDetail}>
              <CardUser />
            </MemberContext.Provider>
          ) : (
            <Typography variant='h4'>
              <Skeleton width='100%' height={300} sx={{ animationDuration: '3.0s' }} />
            </Typography>
          )}
    </Box>
  )

  const SkeletonMemberFormsLoading = () => (
    <Box sx={{ width: '100%' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label='lab API tabs example'>
            <Tab label='ข้อมูลบัญชีผู้ใช้' value='account' />
          </TabList>
        </Box>
        <TabPanel value='account'>
          {memberDetail.nationalId ? (
            <MemberContext.Provider value={memberDetail}>
             
             <Card>
              <CardHeader title='ข้อมูลบัญชีผู้ใช้' titleTypographyProps={{ variant: 'h6' }} />
              <Toaster />
              <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                keepMounted
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"คุณแน่ใจ?"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                  กรุณายืนยันการรีเซตรหัสผ่านใหม่? รหัสผ่านใหม่ของบัญชีนี้คือ 123456
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button variant='contained' color='secondary' onClick={handleClose}>ยกเลิก</Button>
                  <Box sx={{ '& > button': { m: 1 } }}></Box>
                        {/* <LoadingButton
                          color='primary'
                          onClick={handleReset}
                          loading={confirmLoading}
                          loadingPosition='start'
                          startIcon={<SaveIcon />}
                          variant='contained'
                          size='large'
                          autoFocus
                        >
                          ตกลง
                        </LoadingButton> */}
                </DialogActions>
              </Dialog>
                <CardContent>
                <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)} >
                  <Grid container spacing={5}>
                  <Grid item xs={12} md={4}>
                      {memberDetail?.nationalId ? (
                        <TextField fullWidth InputProps={{ readOnly: true }} label='เลขที่บัตรประชาชน'  defaultValue={memberDetail.nationalId}/>
                      ) : (
                        <Skeleton variant='rectangular' width={250} height={55} />
                      )}
                    </Grid>
                    <Grid item xs={12} md={4}>
                      {memberDetail?.memberName ? (
                        <TextField fullWidth InputProps={{ readOnly: true }} label='ชื่อ-สกุล'  defaultValue={memberDetail.memberName}/>
                      ) : (
                        <Skeleton variant='rectangular' width={250} height={55} />
                      )}
                    </Grid>
                    <Grid item xs={12} md={4}>
                      {memberDetail?.nationalId ? (
                        <TextField fullWidth InputProps={{ readOnly: true }} label='สถานะบัญชี' defaultValue={memberDetail.memberStatusId == 1 ? 'ปกติ' : 'ปิดการใช้งาน'} />
                      ) : (
                        <Skeleton variant='rectangular' width={250} height={55} />
                      )}
                    </Grid>
                    <Grid item xs={12} md={4}>
                      {memberDetail?.nationalId ? (
                        <TextField fullWidth InputProps={{ readOnly: true }} label='บัญชีผู้ใช้' defaultValue={memberDetail.nationalId} {...register('nationalId')}/>
                      ) : (
                        <Skeleton variant='rectangular' width={250} height={55} />
                      )}
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField fullWidth label='รหัสผ่านใหม่' type='password' {...register('newPassword', { required: true, minLength:6 })}/>
                        {errors.newPassword && errors.newPassword.type === "required" && (
                            <FormHelperText id="newPassword" sx={{color:'#d32f2f'}}>Error : กรุณาใส่ข้อมูลรหัสผ่านใหม่</FormHelperText>
                          )}
                        {errors.newPassword && errors.newPassword.type === "minLength" && (
                            <FormHelperText id="newPassword" sx={{color:'#d32f2f'}}>Error : กรุณากำหนดรหัสผ่านความยาว 6 ตัวขึ้นไป</FormHelperText>
                          )}
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField fullWidth label='ยืนยันรหัสผ่านใหม่' type='password' 
                        {...register('confirmPassword', { required: true})}/>
                        {errors.confirmPassword && errors.confirmPassword.type === "required" && (
                            <FormHelperText id="confirmPassword" sx={{color:'#d32f2f'}}>Error : กรุณาใส่ข้อมูลยืนยันรหัสผ่านใหม่</FormHelperText>
                          )}
                        {errors.confirmPassword && errors.confirmPassword !== newPassword && (
                            <FormHelperText id="confirmPassword" sx={{color:'#d32f2f'}}>Error : คุณใส่ข้อมูลยืนยันรหัสผ่านไม่เหมือนกัน</FormHelperText>
                          )}
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Box
                      m={1} //margin
                      display="flex"
                      justifyContent="flex-start"
                      alignItems="flex-start"
                      >
                        <Box sx={{ '& > button': { m: 1 } }}></Box>
                        <LoadingButton
                        fullWidth
                          type='submit'
                          color='primary'
                          onClick={handleSubmit(onSubmit)}
                          loading={saveLoading}
                          loadingPosition='start'
                          startIcon={<SaveIcon />}
                          variant='contained'
                          size='large'
                        >
                          บันทึกรหัสผ่านใหม่
                        </LoadingButton>
                      </Box>
                    </Grid> 
                    <Grid item xs={6}>
                      </Grid>
                  </Grid>
                  </form>
                </CardContent>
            </Card>
            </MemberContext.Provider>
          ) : (
            <Typography variant='h4'>
              <Skeleton width='100%' height={200} sx={{ animationDuration: '3.0s' }} />
            </Typography>
          )}
        </TabPanel>
      </TabContext>
    </Box>
  )

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <SkeletonMemberFormsLoading />
      </Grid>
    </Grid>
  )
}

export default FormLayouts

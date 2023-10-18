import * as React from 'react'
import Grid from '@mui/material/Grid'
import axios from 'axios'
import { useEffect, useState, createContext } from 'react'
import { useForm } from 'react-hook-form'
import apiConfig from 'src/configs/apiConfig'
import moment from 'moment'
import 'moment/locale/th'  // without this line it didn't work
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Skeleton from '@mui/material/Skeleton'
import TableReportPaid from 'src/views/tables/TableReportPaid'
import TableReportPendingPayment from 'src/views/tables/TableReportPendingPayment'
import TableReportFollowupPayment from 'src/views/tables/TableReportFollowupPayment'
import CardWelfarePayments from 'src/views/cards/CardWelfarePayments'
import TextField  from "@mui/material/TextField";
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import AssessmentIcon from '@material-ui/icons/Assessment';
import LoadingButton from '@mui/lab/LoadingButton'
import Badge from '@mui/material/Badge';
import TableReportSalary from 'src/views/tables/TableReportSalary'
import SearchIcon from '@material-ui/icons/Search';
import FormHelperText from '@mui/material/FormHelperText';

export const DataReportSalaryContext = createContext()

export const DataDateContext = createContext()

export const PaidContext = createContext()

export const PendingPaymentContext = createContext()

export const FollowupPaymentContext = createContext()

export const StrDateContext = createContext()

export const StrSumPaymentContext = createContext()

const FormLayouts = () => {

  const i = 1;  
  moment.locale('th')
  const [reportSalaries, setReportSalaries] = useState({ blogs: [] })
  const [paidReports, setPaidReports] = useState({ blogs: [] })
  const [pendingPaymentReports, setPendingPaymentReports] = useState({ blogs: [] })
  const [followupPaymentReports, setFollowupPaymentReports] = useState({ blogs: [] })
  const [tabPayments, setTabPayments] = React.useState('pending-payment')

  const [date, setDate ]= useState(moment().format('YYYY-MM'))
  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const [loading, setLoading] = React.useState(false)
  const [searchDate, setSearchDate ]= useState()
  const [badgeCouter, setBadgeCouter ]= useState(0)
  const [sumPayment, setSumPayment ]= useState(0)
  const strDate = 'เดือน '+ moment(date).format('MMMM') +' พ.ศ.'+ moment(date).add(543, 'year').format('YYYY');

  const fetchReportSalaries= async () => {
    let uri = apiConfig.baseURL + `/salaries/report/${date}`
    console.log('fetchReportSalaries uri = '+uri)
    try {
        const { data } = await axios.get(uri)
        setReportSalaries({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  const onSubmit = async (data) => {
    setLoading(true)
    console.log(data)
    console.log(data.reportDate)
    setDate(data.reportDate)
    let uri = apiConfig.baseURL + `/salaries/report/${data.reportDate}`
    console.log('fetchReportSalaries uri = '+uri)
    try {
        const { data } = await axios.get(uri)
        setReportSalaries({ blogs: data })
        setLoading(false)
    } catch (error) {
      console.log(error)
    }

}

  useEffect(() => {
    fetchReportSalaries();
  }, [])

  const SkeletonReportMonthlySalariesLoading = () => (
    <Box sx={{ width: '100%' }}>
      <DataReportSalaryContext.Provider value={reportSalaries}>
        <DataDateContext.Provider value={date}>
          <TableReportSalary/>
        </DataDateContext.Provider>
      </DataReportSalaryContext.Provider>
    </Box>
  )

  return (
    <Grid container spacing={6}>
       <Grid container item>
          <StrSumPaymentContext.Provider value={sumPayment}>
            {/* <CardWelfarePayments /> */}
          </StrSumPaymentContext.Provider>
       </Grid>
       <Grid item md={12} xs={12}>
        <Card>
          <CardHeader title='ค้นหารายงาน' titleTypographyProps={{ variant: 'h6' }} />
          <Divider sx={{ margin: 0 }} />
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={6}><Typography style={{ fontSize: 24 }} >  </Typography></Grid>
                <Grid item xs={4} md={4}>
                <TextField type="month" fullWidth label='เดือน' defaultValue={date} InputLabelProps={{shrink: true,}} {...register('reportDate', { required: true })}/>
                        {errors.reportDate && errors.reportDate.type === "required" && (
                        <FormHelperText id="reportDate" sx={{color:'#d32f2f'}}>Error : กรุณาเลือกเดือน</FormHelperText>
                        )}
                </Grid>
                <Grid item xs={2}>
                  <Box
                    sx={{
                      gap: 5,
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Box sx={{ '& > button': { m: 1 } }}></Box>
                    <LoadingButton
                      type='submit'
                      color='primary'
                      onClick={handleSubmit(onSubmit)}
                      loading={loading}
                      loadingPosition='start'
                      startIcon={<SearchIcon />}
                      variant='contained'
                      size='large'
                    >
                      แสดง
                    </LoadingButton>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                </Grid>
              </Grid>
            </CardContent>
          </form>
        </Card>
      </Grid>

       <Grid item md={12} xs={12}>        
        <SkeletonReportMonthlySalariesLoading />
      </Grid>
    </Grid>

  )
}

export default FormLayouts

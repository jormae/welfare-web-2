import * as React from 'react'
import { useRouter } from 'next/router'
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
import TableReportSalary from 'src/views/tables/TableReportMonthlySalary'
import SearchIcon from '@material-ui/icons/Search';
import FormHelperText from '@mui/material/FormHelperText';
import TableReportSalaryDoc from 'src/views/tables/TableReportSalaryDoc'

export const DataReportPrintSalaryContext = createContext()

export const DataDatePrintContext = createContext()

const FormLayouts = () => {

  const router = useRouter()
  if (router.isReady) {
    router.query.date
  }

  console.log(router.query.date)

  const i = 1;  
  moment.locale('th')
  const [reportSalaries, setReportSalaries] = useState({ blogs: [] })

  const fetchReportSalaries= async () => {
    let uri = apiConfig.baseURL + `/salaries/report/${router.query.date}`
    console.log('fetchReportSalaries uri = '+uri)
    try {
        const { data } = await axios.get(uri)
        setReportSalaries({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (router.isReady) {
      router.query
      fetchReportSalaries();
    }
  }, [router.isReady, router.query])

  return (
    <Grid container spacing={6}>
       <Grid item md={12} xs={12}>        
       <Box sx={{ width: '100%' }}>
      <DataReportPrintSalaryContext.Provider value={reportSalaries}>
        <DataDatePrintContext.Provider value={router.query.date}>
          <TableReportSalaryDoc/>
        </DataDatePrintContext.Provider>
      </DataReportPrintSalaryContext.Provider>
    </Box>
      </Grid>
    </Grid>

  )
}

export default FormLayouts

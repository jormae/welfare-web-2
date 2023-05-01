import { useEffect, useState, createContext } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Icon from '@mdi/react'
import Link from 'next/link'
import { mdiAccount } from '@mdi/js'
import { CardActionArea } from '@mui/material';
import moment from 'moment'
import axios from 'axios'
import apiConfig from 'src/configs/apiConfig'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

const CardWelfarePayments = () => {

  const [welfareMonthlyPayments, setWelfareMonthlyPayments] = useState(0)
  const memberName = typeof window !== 'undefined' ? localStorage.getItem('memberName') : null
  let today = moment().format('YYYY-MM')
  console.log(welfareMonthlyPayments)

  const fetchWelfareMonthlyPayment = async () => {
    let uri = apiConfig.baseURL + `/reports/monthly/welfare/sum-payment/${today}`
    console.log(uri)
    try {
      const { data } = await axios.get(uri)
      setWelfareMonthlyPayments(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchWelfareMonthlyPayment()
  }, [])
  
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={6} lg={3}>
        <CardActionArea>
        <Card sx={{ pt: 5 }}>
          <CardContent sx={{ pt: theme => `${theme.spacing(1)} !important` }}>
            <Grid container spacing={[5, 0]}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    variant='rounded'
                    sx={{
                      mr: 3,
                      width: 70,
                      height: 70,
                      boxShadow: 3,
                      color: 'common.white',
                      backgroundColor: `primary.main`
                    }}
                  >
                    <MonetizationOnIcon fontSize='large'/>
                  </Avatar>
                  <Box sx={{ display: 'flex', flexDirection: 'column', width: 30 }}>
                    <Typography variant='h6' sx={{ width: 300 }}>
                      ยอดชำระประจำเดือน
                    </Typography>
                        <Typography variant='h6' sx={{ width: 300 }}>{welfareMonthlyPayments[0]?.TOTAL_PAID?.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') ?? 0} บาท</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        </CardActionArea>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <CardActionArea>
        <Card sx={{ pt: 5 }}>
          <CardContent sx={{ pt: theme => `${theme.spacing(1)} !important` }}>
            <Grid container spacing={[5, 0]}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    variant='rounded'
                    sx={{
                      mr: 3,
                      width: 70,
                      height: 70,
                      boxShadow: 3,
                      color: 'common.white',
                      backgroundColor: `primary.main`
                    }}
                  >
                    <MonetizationOnIcon fontSize='large'/>
                  </Avatar>
                  <Box sx={{ display: 'flex', flexDirection: 'column', width: 30 }}>
                    <Typography variant='h6' sx={{ width: 300 }}>
                      ยอดค้างชำระประจำเดือน
                    </Typography>
                        <Typography variant='h6' sx={{ width: 300 }}>{welfareMonthlyPayments[0]?.TOTAL_PENDING_PAYMENT?.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') ?? 0} บาท</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        </CardActionArea>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <CardActionArea>
        <Card sx={{ pt: 5 }}>
          <CardContent sx={{ pt: theme => `${theme.spacing(1)} !important` }}>
            <Grid container spacing={[5, 0]}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    variant='rounded'
                    sx={{
                      mr: 3,
                      width: 70,
                      height: 70,
                      boxShadow: 3,
                      color: 'common.white',
                      backgroundColor: `primary.main`
                    }}
                  >
                    <MonetizationOnIcon fontSize='large'/>
                  </Avatar>
                  <Box sx={{ display: 'flex', flexDirection: 'column', width: 30 }}>
                    <Typography variant='h6' sx={{ width: 300 }}>
                      ยอดติดตามชำระประจำเดือน
                    </Typography>
                        <Typography variant='h6' sx={{ width: 300 }}>{welfareMonthlyPayments[0]?.TOTAL_FOLLOWUP_PAYMENT?.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') ?? 0} บาท</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        </CardActionArea>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <CardActionArea>
        <Card sx={{ pt: 5 }}>
          <CardContent sx={{ pt: theme => `${theme.spacing(1)} !important` }}>
            <Grid container spacing={[5, 0]}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    variant='rounded'
                    sx={{
                      mr: 3,
                      width: 70,
                      height: 70,
                      boxShadow: 3,
                      color: 'common.white',
                      backgroundColor: `primary.main`
                    }}
                  >
                    <MonetizationOnIcon fontSize='large'/>
                  </Avatar>
                  <Box sx={{ display: 'flex', flexDirection: 'column', width: 30 }}>
                    <Typography variant='h6' sx={{ width: 300 }}>
                      กำไรประจำเดือน
                    </Typography>
                        <Typography variant='h6' sx={{ width: 300 }}>{welfareMonthlyPayments[0]?.TOTAL_PROFIT?.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') ?? 0} บาท</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        </CardActionArea>
      </Grid>
    
    </Grid>

    
  )
}

export default CardWelfarePayments

import { useEffect, useState } from 'react'
// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Icon from '@mdi/react'
import { mdiAccount } from '@mdi/js'
import axios from 'axios'
import apiConfig from 'src/configs/apiConfig'
import Link from 'next/link'
import { CardActionArea } from '@mui/material';

const CardActiveLoan = () => {
  const [totalActiveLoan, setTotalActiveLoan] = useState(0)
  console.log(totalActiveLoan)

  const fetchTotalActiveLoan = async () => {
    let uri = apiConfig.baseURL + `/dashboard/totalActiveLoan`
    console.log(uri)
    try {
      const { data } = await axios.get(uri)
      console.log(data[0].totalActiveLoan)
      setTotalActiveLoan(data[0].totalActiveLoan)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTotalActiveLoan()
  }, [])
  return (
    <Link href="/loan" color='success'>
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
                  backgroundColor: `success.main`
                }}
              >
                <Icon path={mdiAccount} title='User Profile' size={2} />
              </Avatar>
              <Box sx={{ display: 'flex', flexDirection: 'column', width: 30 }}>
                <Typography variant='h6' sx={{ width: 300 }}>
                  รายการกู้สวัสดิการ
                </Typography>
                <Typography variant='h6' sx={{ width: 300 }}>{totalActiveLoan ?? 0} รายการ</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
    </CardActionArea>
    </Link>
  )
}

export default CardActiveLoan

// ** MUI Imports
import { useRouter } from 'next/router'
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
import { mdiCashPlus } from '@mdi/js';

const CardLoanPayment = () => {

    const router = useRouter()
    if (router.isReady) {
      router.query.nationalId
    }
    console.log(router.query.nationalId)
    console.log(router.query.loanId)

  return (
    <Link href={`../../loan-payment/${router.query.nationalId}/${router.query.loanId}`} color='success'>
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
                <Icon path={mdiCashPlus} title='User Profile' size={2} />
              </Avatar>
              <Box sx={{ display: 'flex', flexDirection: 'column', width: 30 }}>
                <Typography variant='h6' sx={{ width: 300 }}>
                  Loan Payment
                </Typography>
                    <Typography variant='h6' sx={{ width: 300 }}>แจ้งชำระเงิน</Typography>
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

export default CardLoanPayment

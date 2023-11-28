// ** MUI Imports
import * as React from 'react';
import { useContext } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Icon from '@mdi/react'
import { mdiCashPlus, mdiCurrencyUsd } from '@mdi/js';
import Grid from '@mui/material/Grid'
import PaidIcon from '@mui/icons-material/Paid';

import { LoanContext } from 'src/pages/loan/[nationalId]/[loanId]'


const CardLoanStat = () => {

    const loanDetail = useContext(LoanContext)
    console.log(loanDetail)


  return (
    <Card sx={{ pt: 2 }}>
      <CardContent sx={{ pt: theme => `${theme.spacing(1)} !important` }}></CardContent>
      <Grid container spacing={[2, 0]}>
        <Grid item xs={12} sm={12} lg={12}>
        <Box sx={{ display: 'flex'}}>
                <Grid item xs={9}>
                    <Typography variant='h5' sx={{ width: 300, paddingLeft:10 }}>
                    {loanDetail?.loanTypeName}
                    </Typography>
                        <Typography variant='p' sx={{ width: 300, paddingLeft:10, color: 'grey' }}>{loanDetail?.loanAmount.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Icon path={mdiCurrencyUsd} size={2} color='grey' />
                </Grid>
                </Box>
            </Grid>
        </Grid>
        <Divider/>
        <List>
            <ListItem secondaryAction={(loanDetail?.loanAmount+loanDetail?.totalProfit).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}>
                <ListItemAvatar>
                <Avatar>
                    <PaidIcon />
                </Avatar>
                </ListItemAvatar>
                <ListItemText
                primary="ยอดจัดสวัสดิการ"
                />
            </ListItem>
            <Divider/>
            <ListItem secondaryAction={(loanDetail?.totalLoanPayment ?? 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}>
                <ListItemAvatar>
                <Avatar>
                    <PaidIcon />
                </Avatar>
                </ListItemAvatar>
                <ListItemText
                primary="ชำระทั้งหมด"
                />
            </ListItem>
            <Divider/>
            <ListItem
                secondaryAction={((loanDetail?.loanAmount + loanDetail?.totalProfit) - (loanDetail?.totalLoanPayment ?? 0)).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
            >
                <ListItemAvatar>
                <Avatar>
                    <PaidIcon/>
                </Avatar>
                </ListItemAvatar>
                <ListItemText
                primary="คงเหลือ"
                />
            </ListItem>
            <Divider/>
            <ListItem
                secondaryAction={loanDetail?.loanAmount - (loanDetail?.totalLoanPayment ?? 0) > 0 ? "active" : "ปิดบัญชี"}
            >
                <ListItemAvatar>
                <Avatar>
                    <PaidIcon />
                </Avatar>
                </ListItemAvatar>
                <ListItemText
                primary="สถานะ"
                />
            </ListItem>
        </List>

    </Card>
            
  );
}

export default CardLoanStat

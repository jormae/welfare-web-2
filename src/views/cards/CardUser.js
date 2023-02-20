// ** MUI Imports
import React, { useContext } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import AvatarGroup from '@mui/material/AvatarGroup'
import Link from 'next/link'

import { MemberContext } from 'src/pages/member/[nationalId]'
import { LoanMemberContext } from 'src/pages/loan/[nationalId]/[loanId]'

const CardUser = () => {

  const memberDetail = useContext(MemberContext) 
  const loanMemberDetail = useContext(LoanMemberContext) 
  // const staffName = typeof window !== 'undefined' ? localStorage.getItem('staffName') : null
  const user = typeof memberDetail !== 'undefined' ? memberDetail : loanMemberDetail
  // console.log('memberDetail = '+memberDetail)

  return (
    <Card sx={{ position: 'relative' }}>
      <CardMedia sx={{ height: '12.625rem' }} image='/images/cards/background-user.png' />
      <Avatar
        alt='Robert Meyer'
        src='/images/avatars/1.png'
        sx={{
          width: 120,
          height: 120,
          left: '7.313rem',
          top: '8.28125rem',
          position: 'absolute',
          border: theme => `0.25rem solid ${theme.palette.common.white}`
        }}
      />
      <CardContent>
        <Box
          sx={{
            mt: 5.75,
            mb: 8.75,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            alignContent:'center',
          }}
        >
          <Box sx={{ ml:23, mt:5, display: 'flex',  flexWrap: 'wrap',flexDirection: 'column', alignItems:'center',justifyContent: 'space-between', }}>
            <Typography variant='h6' align='center' sx={{ color: 'primary.main' }}>{user?.memberName}</Typography>
            <Typography variant='caption' sx={{ color: 'primary.main' }}>{user?.memberTypeName}</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            mt: 5.75,
            mb: 8.75,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Link href={`../../loan-payment/${user?.nationalId}`} color='primary'>
            <Button variant='outlined'>ชำระเงินกู้</Button>
          </Link>
          <Link href={`../../investment-payment/${user?.nationalId}`} color='primary'>
            <Button variant='outlined'>ฝาก-ถอนหุ้น</Button>
          </Link>
          <Link href={`../../loan-form/`} color='primary'>
            <Button variant='outlined'>ใบคำร้อง</Button>
          </Link>
          {/* <Button variant='contained'>ใบคำร้อง</Button> */}
        </Box>
        <Box sx={{ gap: 2, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap', color: 'text.primary' }}>
            18 mutual friends
          </Typography>
          <AvatarGroup max={4}>
            <Avatar src='/images/avatars/8.png' alt='Alice Cobb' />
            <Avatar src='/images/avatars/7.png' alt='Jeffery Warner' />
            <Avatar src='/images/avatars/3.png' alt='Howard Lloyd' />
            <Avatar src='/images/avatars/2.png' alt='Bettie Dunn' />
            <Avatar src='/images/avatars/4.png' alt='Olivia Sparks' />
            <Avatar src='/images/avatars/5.png' alt='Jimmy Hanson' />
            <Avatar src='/images/avatars/6.png' alt='Hallie Richards' />
          </AvatarGroup>
        </Box>
      </CardContent>
    </Card>
  )
}

export default CardUser

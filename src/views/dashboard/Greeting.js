// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'

// Styled component for the triangle shaped background image
const TriangleImg = styled('img')({
  right: 0,
  bottom: 0,
  height: 170,
  position: 'absolute'
})

// Styled component for the trophy image
const TrophyImg = styled('img')({
  right: 36,
  bottom: 20,
  height: 98,
  position: 'absolute'
})

const Greeting = () => {
  // ** Hook
  const staffName = typeof window !== 'undefined' ? localStorage.getItem('staffName') : null
  const theme = useTheme()
  const imageSrc = theme.palette.mode === 'light' ? '1.png' : '1.png'

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Typography variant='h6'>สวัสดี</Typography>
        <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
        {staffName}
        </Typography>
        <Typography variant='h5' sx={{ my: 4, color: 'primary.main' }}>
          $42.8k
        </Typography>
        <Button size='small' variant='contained'>
          View Sales
        </Button>
        <TriangleImg alt='triangle background' src={`/images/avatars/${imageSrc}`} />
        {/* <TrophyImg alt='trophy' src='/images/avatars/1.png'  height='400'/> */}
      </CardContent>
    </Card>
  )
}

export default Greeting

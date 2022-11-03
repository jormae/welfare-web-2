import { useEffect, useState, createContext } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import axios from 'axios'
import apiConfig from 'src/configs/apiConfig'
import moment from 'moment'

const TableChartStatuses = () => {
  const [chartStatuses, setChartStatuses] = useState({ blogs: [] })
  // const date = '2022-10'
  const date = moment().format('YYYY-MM')

  const fetchChartLogs = async () => {
    let uri = apiConfig.baseURL + `/dashboard/chart-status/${date}`
    console.log(uri)

    try {
      const { data } = await axios.get(uri)
      setChartStatuses({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchChartLogs()
  }, [])

  return (
    <Card>
      <CardHeader
        title='รายงานสถาะนชาร์ตประจำเดือน'
        titleTypographyProps={{ sx: { lineHeight: '1.2 !important', letterSpacing: '0.31px !important' } }}
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(2)} !important` }}>
        {chartStatuses.blogs.map((item, index) => {
          return (
            <Box
              key={item.action}
              sx={{
                display: 'flex',
                alignItems: 'center',
                ...(index !== chartStatuses.length - 1 ? { mb: 5.875 } : {})
              }}
            >
              <Avatar
                sx={{
                  width: 38,
                  height: 38,
                  marginRight: 3,
                  fontSize: '1rem',
                  color: 'common.white',
                  backgroundColor: `${item.avatarColor}.main`
                }}
              >
                {item.avatarText}
              </Avatar>

              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='caption' sx={{ lineHeight: 1.5 }}>
                    {item.action}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', textAlign: 'end', flexDirection: 'column' }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', lineHeight: 1.72, letterSpacing: '0.22px' }}>
                    {item.totalRecord}
                  </Typography>
                  <Typography variant='caption' sx={{ lineHeight: 1.5 }}>
                    รายการ
                  </Typography>
                </Box>
              </Box>
            </Box>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default TableChartStatuses

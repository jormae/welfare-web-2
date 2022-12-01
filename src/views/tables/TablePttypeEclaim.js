// ** React Imports
import { forwardRef, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

// ** MUI Imports
import { pink } from '@mui/material/colors'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Select from '@mui/material/Select'
import Box from '@mui/material/Box'
import axios from 'axios'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import EditIcon from '@mui/material/Icon'
// import SendIcon from '@mui/material/Send'
import Link from 'next/link'

// import BadgeIcon from '@mui/material/Badge'

import apiConfig from 'src/configs/apiConfig'

import moment from 'moment'
import toast, { Toaster } from 'react-hot-toast'

const TablePttypeEclaim = () => {
  moment.locale('th')
  const today = moment().add(543, 'year').format('L')
  const staffName = typeof window !== 'undefined' ? localStorage.getItem('staffName') : null

  const [charts, setCharts] = useState({ blogs: [] })

  const fetchPttypes = async () => {
    let uri = apiConfig.baseURL + '/chart/pttype-eclaim'

    try {
      const { data } = await axios.get(uri)
      setCharts({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPttypes()
  }, [setCharts])

  return (
    <Card>
      <Toaster />
      <CardHeader title='เลือกสิทธิ์การรักษาส่งชาร์ตงาน eclaim' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <CardContent>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>ชื่อสิทธ์การรักษา </TableCell>
                <TableCell align='center'>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {charts.blogs.map(row => (
                <TableRow key={row.doctorCode} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component='th' scope='row'>
                    {row.pttypeCode} - {row.mainPttypeName}
                  </TableCell>
                  <TableCell align='center'>
                    <Link href={`/submit-eclaim/${row.an}`} color='success'>
                      <Button type='button' variant='outlined'>
                        เปิด
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}

export default TablePttypeEclaim

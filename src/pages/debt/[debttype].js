import * as React from 'react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import apiConfig from 'src/configs/apiConfig'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import LoadingButton from '@mui/lab/LoadingButton'
import Skeleton from '@mui/material/Skeleton'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TablePagination from '@mui/material/TablePagination'
import PrintIcon from '@material-ui/icons/Print'
import Link from 'next/link'

import moment from 'moment'
import 'moment/locale/th'

const FormLayouts = () => {
  const router = useRouter()
  if (router.isReady) {
    // eslint-disable-next-line no-unused-expressions
    router.query.debttype
  }
  let debtTypeLabel
  if (router.query.debttype === 'bank') {
    debtTypeLabel = 'หนี้ธนาคาร'
  } else if (router.query.debttype === 'allowance') {
    debtTypeLabel = 'เงินสมทบ'
  } else if (router.query.debttype === 'student-loan') {
    debtTypeLabel = 'หนี้กยศ'
  } else if (router.query.debttype === 'house-rent') {
    debtTypeLabel = 'ค่าเช่าบ้าน'
  }
  const date = moment().format('YYYY-MM')
  const strDate = 'เดือน ' + moment(date).format('MMMM') + ' พ.ศ.' + moment(date).add(543, 'year').format('YYYY')
  const strShortDate = moment(date).format('MM') + '/' + moment(date).add(543, 'year').format('YYYY')
  const { register } = useForm()
  // const [loading, setLoading] = useState(false)
  // const [confirmLoading, setConfirmLoading] = useState(false)

  const [debts, setDebts] = useState({ blogs: [] })

  // const handleClickOpen = () => {
  //   setOpen(true)
  // }

  const [search, setSearch] = useState('')
  let i = 1

  const [pg, setpg] = React.useState(0)
  const [rpg, setrpg] = React.useState(10)

  function handleChangePage (event, newpage) {
    setpg(newpage)
  }

  function handleChangeRowsPerPage (event) {
    setrpg(parseInt(event.target.value, 10))
    setpg(0)
  }

  // const onSubmit = data => {
  //   setLoading(true)
  //   console.log(data)
  //   const uri = apiConfig.baseURL + '/debts'

  //   fetch(uri, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(data)
  //   })
  //     .then(response => response.json())
  //     .then(async data => {
  //       console.log(data)
  //       setLoading(false)
  //       if (data.status == 'success') {
  //         toast.success(data.message)
  //         fetchDebts()
  //         window.location.reload()
  //       } else {
  //         toast.error(data.message || data.errors[0].msg)
  //       }
  //     })
  //     .catch(function (error) {
  //       console.log(JSON.stringify(error))
  //     })
  // }

  // const fetchMemberInfo = async () => {
  //   const uri = apiConfig.baseURL + '/members'
  //   console.log(uri)
  //   try {
  //     await axios
  //       .get(uri)
  //       .then(result => setMemberInfo(result.data))
  //       .catch(error => console.log('An error occurred' + error))
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const fetchDebts = async () => {
    const date = moment().format('YYYY-MM')

    let uri
    if (router.query.debttype === 'bank') {
      uri = apiConfig.baseURL + `/debts/bank/${date}`
    } else if (router.query.debttype === 'allowance') {
      uri = apiConfig.baseURL + `/debts/allowance/${date}`
    } else if (router.query.debttype === 'student-loan') {
      uri = apiConfig.baseURL + `/debts/student-loan/${date}`
    } else if (router.query.debttype === 'house-rent') {
      uri = apiConfig.baseURL + `/debts/house-rent/${date}`
    }
    console.log(uri)

    try {
      const { data } = await axios.get(uri)
      setDebts({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (router.isReady) {
      // eslint-disable-next-line no-unused-expressions
      router.query
      fetchDebts()
    }
  }, [router.isReady, router.query])

  return (
    <Grid container spacing={6}>
        <Grid item xs={12}>
            {debts.blogs.length > 0
              ? (
              <Card>
              <CardHeader title={`ทะเบียน${debtTypeLabel} ประจำเดือน ${strDate}`} titleTypographyProps={{ variant: 'h6' }} />
              <Divider sx={{ margin: 0 }} />
              <CardContent>
              <Grid item xs={12} md={12} lg={12}>
                  <form noValidate autoComplete='off'>
                      <Grid container spacing={5}>
                        <Grid item xs={12}>
                          <TextField fullWidth label='ค้นหาสมาชิก' placeholder='ค้นหาสมาชิก' {...register('search', {
                            onChange: (e) => { setSearch(e.target.value) },
                            onBlur: (e) => {}
                          })} />
                        </Grid>
                      </Grid>
                  </form>
                </Grid>
                <Divider sx={{ margin: 0, mt: 5 }} />
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    <TableHead>
                      <TableRow>
                        <TableCell align='center'>ที่</TableCell>
                        <TableCell align='center'>เดือน</TableCell>
                        <TableCell align='center'>รหัสสมาชิก</TableCell>
                        <TableCell align='center'>ชื่อลูกหนี้</TableCell>
                        <TableCell align='center'>{debtTypeLabel}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {debts.blogs.filter((row) => {
                        return search === '' ? row : row.memberName.includes(search)
                      }).slice(pg * rpg, pg * rpg + rpg).map(row => (
                        <TableRow key={row.debtId}>
                          <TableCell align='center' component='th' scope='row'>{i++} </TableCell>
                          <TableCell align='center'> {strShortDate}</TableCell>
                          <TableCell align='center'>{row.nationalId}</TableCell>
                          <TableCell align='left'>{row.memberName}</TableCell>
                          <TableCell align='center'>{row.bank || row.allowance || row.studentLoan || row.houseRent}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[10, 20, 50]}
                  component="div"
                  count={debts.blogs.length}
                  rowsPerPage={rpg}
                  page={pg}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />

                <Link href={'../debt/print'}>
                  <Box
                      sx={{
                        gap: 5,
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'left',
                        justifyContent: 'space-between',
                        mt: 4
                      }}
                  >
                      <Box sx={{ '& > button': { m: 10 } }}></Box>
                      <LoadingButton
                      type='submit'
                      color='primary'
                      loadingPosition='start'
                      startIcon={<PrintIcon />}
                      variant='contained'
                      size='large'
                      >
                      พิมพ์รายงาน
                      </LoadingButton>
                  </Box>
                </Link>
              </CardContent>
            </Card>
                )
              : (
                <Typography variant='h4'>
                  <Skeleton width='100%' height={200} sx={{ animationDuration: '3.0s' }} />
                </Typography>
                )}
        </Grid>
    </Grid>
  )
}

export default FormLayouts

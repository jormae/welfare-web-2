import * as React from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import { Input } from '@mui/material'
import TextField from '@mui/material/TextField'
import TableLoanRequest from 'src/views/tables/TableLoanRequest'
import toast, { Toaster } from 'react-hot-toast'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import { useEffect, useState, createContext } from 'react'
import { useForm } from 'react-hook-form'
import apiConfig from 'src/configs/apiConfig'

import CardGolds from 'src/views/cards/CardGolds'
import FormGold from 'src/views/form-layouts/FormGold'
import TableGold from 'src/views/tables/TableGold'

import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText';

import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Button from '@mui/material/Button'
import TablePagination from "@mui/material/TablePagination"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';

import moment from 'moment'
import 'moment/locale/th'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FormLayouts = () => {

  const { register: register, handleSubmit, control, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const [golds, setGolds] = useState({ blogs: [] })
  const memberName = typeof window !== 'undefined' ? localStorage.getItem('memberName') : null
  console.log(golds)
  
  const [open, setOpen] = useState(false);
  const [deleteGoldId, setDeleteGoldId] = useState();

  const handleClose = () => {
    setOpen(false);
  };

  const [pg, setpg] = useState(0);
    const [rpg, setrpg] = useState(10);
  
  function handleChangePage(event, newpage) {
      setpg(newpage);
  }

  function handleChangeRowsPerPage(event) {
      setrpg(parseInt(event.target.value, 10));
      setpg(0);
  }

  const fetchGolds = async () => {
    let uri = apiConfig.baseURL + `/golds`
    console.log(uri)
    try {
      const { data } = await axios.get(uri)
      setGolds({ blogs: data })
    } catch (error) {
      console.log(error)
    }
  }

  const deleteGold = () => {
    setOpen(false)
    setLoading(true)
    console.log(deleteGoldId)
    console.log('confirm deleteGold')

    let uri = apiConfig.baseURL + `/golds/${deleteGoldId}`
    console.log(uri)

    fetch(uri, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setLoading(false)
        if (data.status == 'success') {
          toast.success(data.message)
          fetchGolds();
        } else {
          toast.error(data.message)
        }
      })
      .catch(function (error) {
        console.log(JSON.stringify(error))
      })
  }

  const handleDeleteGold = (goldId) => {
    setOpen(true)
    setDeleteGoldId(goldId)
    console.log('handleDeleteGold')
    console.log(goldId)
  }

  const onSubmit = data => {
    setLoading(true)
    console.log(data)
    let uri = apiConfig.baseURL + `/golds`

    fetch(uri, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        setLoading(false)
        if (data.status == 'success') {
        toast.success(data.message)
        fetchGolds();
        } else {
        toast.error(data.message || data.errors[0].msg)
        }
    })
    .catch(function (error) {
        console.log(JSON.stringify(error))
    })
}

  useEffect(() => {
    fetchGolds()
}, [])

  return (
    <Grid container spacing={6}>
       <Grid container item>
        <CardGolds />
       </Grid>
        <Grid item xs={12}>
        <Card>
            <CardHeader title='เพิ่มข้อมูลทอง' titleTypographyProps={{ variant: 'h6' }} />
            <Divider sx={{ margin: 0 }} />
            <Toaster />
            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
              <CardContent>
                <Grid container spacing={5}>
                  <Grid item xs={12} md={3}>
                    <TextField type="date" fullWidth label='วันที่' {...register('goldDateTime', { required: true })}/>
                      {errors.goldDateTime && errors.goldDateTime.type === "required" && (
                        <FormHelperText id="goldDateTime" sx={{color:'#d32f2f'}}>Error : กรุณาเลือกวันที่</FormHelperText>
                      )}
                  </Grid>
                  <Grid item xs={12} md={3}>
                          <FormControl fullWidth>
                              <InputLabel>ประเภทส่วนต่างราคาทอง</InputLabel>
                              <Select label='ประเภทส่วนต่างราคาทอง' defaultValue="1" {...register('goldTypeId', { required: true })}>
                                  <MenuItem key="1" value="1">กำไร</MenuItem>
                                  <MenuItem key="2" value="2">ขาดทุน</MenuItem>
                              </Select>
                          </FormControl>
                  </Grid> 
                  <Grid item xs={12} md={3}>
                      <TextField fullWidth label='ชื่อส่วนต่างราคาทอง' {...register('goldName', { required: true })} />
                      {errors.goldName && errors.goldName.type === "required" && (
                        <FormHelperText id="goldName" sx={{color:'#d32f2f'}}>Error : กรุณาใส่ข้อมูลชื่อส่วนต่างราคาทอง</FormHelperText>
                      )}
                  </Grid>
                  <Grid item xs={12} md={3}>
                      <TextField fullWidth type='number' label='จำนวนเงิน' {...register('goldAmount', { required: true })} />
                      {errors.goldAmount && errors.goldAmount.type === "required" && (
                        <FormHelperText id="goldAmount" sx={{color:'#d32f2f'}}>Error : กรุณาใส่ข้อมูลจำนวนเงิน</FormHelperText>
                      )}
                  </Grid>
                  <input type="hidden" value={memberName} {...register('username')}/>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        gap: 5,
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Box sx={{ '& > button': { m: 1 } }}></Box>
                      <LoadingButton
                        type='submit'
                        color='warning'
                        onClick={handleSubmit(onSubmit)}
                        loading={loading}
                        loadingPosition='start'
                        startIcon={<SaveIcon />}
                        variant='contained'
                        size='large'
                      >
                        บันทึก
                      </LoadingButton>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </form>
          </Card>
        </Grid>
        <Grid item xs={12}>
        <Card>
              <CardHeader title={`ทะเบียนทองทั้งหมด`} titleTypographyProps={{ variant: 'h6' }} />
              <Toaster />
        
              <Divider sx={{ margin: 0 }} />
              <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                keepMounted
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"คุณแน่ใจ?"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                  กรุณายืนยันการลบข้อมูลรายการทอง
                  </DialogContentText>
                </DialogContent>
                  <DialogActions>
                    <Box sx={{ '& > button': { m: 1 } }}></Box>
                          <LoadingButton
                            color='secondary'
                            onClick={handleClose}
                            loadingPosition='start'
                            startIcon={<CloseIcon />}
                            variant='contained'
                            size='large'
                          >
                            ยกเลิก
                          </LoadingButton>
                          <LoadingButton
                            color='primary'
                            onClick={deleteGold}
                            loading={confirmLoading}
                            loadingPosition='start'
                            startIcon={<CheckIcon />}
                            variant='contained'
                            size='large'
                            autoFocus
                          >
                            ตกลง
                          </LoadingButton>
                  </DialogActions>
                </Dialog>
              <CardContent>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    <TableHead>
                      <TableRow>
                      <TableCell align='center'>ที่</TableCell>
                      <TableCell align='center'>วันที่</TableCell>
                      <TableCell align='center'>ประเภทส่วนต่าง</TableCell>
                      <TableCell align='center'>ชื่อซากาต</TableCell>
                      <TableCell align='center'>จำนวนเงิน</TableCell>
                      <TableCell align='center'>จัดการ</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {golds.blogs.slice(pg * rpg, pg * rpg + rpg).map(row => (
                        <TableRow key={row.goldId}>
                           <TableCell align='center' component='th' scope='row'>
                          {row.goldId}
                          </TableCell>
                          <TableCell align='center'> {moment(row.goldDateTime).add(543, 'year').format('DD/MM/YYYY')}</TableCell>
                          <TableCell align='center'>{row.goldTypeId == 1 ? "กำไร" : "ขาดทุน"}</TableCell>
                          <TableCell align='center'>{row.goldName}</TableCell>
                          <TableCell align='center'>{row.goldAmount}</TableCell>
                          <TableCell align='center'>
                            <Button type='button' variant='outlined' onClick={() => handleDeleteGold(row.goldId)}>
                                ลบ
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[10, 20, 50]}
                  component="div"
                  count={golds.blogs.length}
                  rowsPerPage={rpg}
                  page={pg}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </CardContent>
            </Card>
        </Grid>
    </Grid>
  )
}

export default FormLayouts

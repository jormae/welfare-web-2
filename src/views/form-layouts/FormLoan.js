// ** React Imports
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Skeleton from '@mui/material/Skeleton'
import { useForm } from 'react-hook-form'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Autocomplete from '@mui/material/Autocomplete';
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import apiConfig from 'src/configs/apiConfig'

// ** Icons Imports

import mdiContentSave from 'mdi-material-ui'
// import SaveIcon from 'mdi-material-ui/Plus'
import SaveIcon from '@material-ui/icons/Save';
import LoadingButton from '@mui/lab/LoadingButton'
import moment from 'moment'
import { letterSpacing } from '@mui/system'

const FormLoan = () => {

  const router = useRouter()
  const userName = typeof window !== 'undefined' ? localStorage.getItem('username') : null

  let loanRequestId
  if (router.isReady) {
    router.query.nationalId
    loanRequestId = router.query.nationalId ?? userName
  }

  console.log('ready = '+router.isReady)
  console.log('loanRequestId = '+loanRequestId)

  const { register, handleSubmit, control } = useForm();
  
  const [loading, setLoading] = React.useState(false)
  const [memberDetail, setMemberDetail] = useState()
  const [loanTypes, setLoanTypes] = useState()
  const [firstRefMember, setFirstMember] = useState()
  const [secondRefMember, setSecondMember] = useState()
  // const [value, setValue] = useState(firstRefMember?.value);
  // const [value2, setValue2] = useState(secondRefMember?.value);

    const memberName = typeof window !== 'undefined' ? localStorage.getItem('memberName') : null
    const memberRoleId = typeof window !== 'undefined' ? localStorage.getItem('memberRoleId') : null
    const loanRequestName = memberDetail?.memberName ? memberDetail?.memberName : memberName

  const fetchMemberDetail = () => {
    let uri = apiConfig.baseURL + `/members/${loanRequestId}`
    console.log(uri)
    axios
      .get(uri)
      .then(result => setMemberDetail(result.data[0]))
      .catch(error => console.log('An error occurred' + error))
  }

  const fetchLoanTypes = async () => {
    let uri = apiConfig.baseURL + `/utils/loan-types/${loanRequestId}`
    console.log(uri)
    try {
      await axios
        .get(uri)
        .then(result => setLoanTypes(result.data))
        .catch(error => console.log('An error occurred' + error))
    } catch (error) {
      console.log(error)
    }
  }

  const fetchFirstMember = async () => {
    let uri = apiConfig.baseURL + `/members`
    console.log(uri)
    try {
      await axios
        .get(uri)
        .then(result => setFirstMember(result.data))
        .catch(error => console.log('An error occurred' + error))
    } catch (error) {
      console.log(error)
    }
  }

  const fetchSecondMember = async () => {
    let uri = apiConfig.baseURL + `/members`
    console.log(uri)
    try {
      await axios
        .get(uri)
        .then(result => setSecondMember(result.data))
        .catch(error => console.log('An error occurred' + error))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (router.isReady) {
      router.query
      fetchMemberDetail()
    }
    fetchMemberDetail()
    fetchLoanTypes()
    fetchFirstMember()
    fetchSecondMember()
  }, [router.isReady, router.query, ])

  const onSubmit = data => {
    setLoading(true)
    
    console.log(data)

    let uri = apiConfig.baseURL + `/loans`

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
        } else {
          toast.error(data.message || data.errors[0].msg)
        }
      })
      .catch(function (error) {
        console.log(JSON.stringify(error))
      })
  }

  return (
    <Card>
      <Toaster />
      <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Grid container spacing={5}>
          <Grid container spacing={5} item xs={12} md={6}>
              <Grid item xs={12} md={6}>
                <TextField fullWidth InputProps={{ readOnly: true }} value={loanRequestId} label='???????????????????????????????????????????????????' {...register('nationalId')} />
              </Grid>
              <Grid item xs={12} md={6}>
                  <TextField fullWidth InputProps={{ readOnly: true }} value={loanRequestName} label='??????????????????????????????' />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>????????????????????????????????????????????????</InputLabel>
                  {loanTypes? (
                  <Select label='????????????????????????????????????????????????' defaultValue={loanTypes?.loanTypeId ?? ''} {...register('loanTypeId', { required: true })}>
                    {loanTypes.map(item => {
                      return (
                        <MenuItem key={item.loanTypeId} value={item.loanTypeId}>
                          {item.loanTypeName} {item.loanAmount} ({item.loanDurationInMonth} ???????????????)
                        </MenuItem>
                      )
                    })}
                  </Select>
                  ) : (
                      <Skeleton variant='rectangular' width={250} height={55} />
                    )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>????????????????????????????????????????????? 1</InputLabel>
                  {firstRefMember ? (
                  <Select label='????????????????????????????????????????????? 1' defaultValue={firstRefMember?.nationalId ?? ''} {...register('firstReferenceId')}>
                    {firstRefMember.map(item => {
                      return (
                        <MenuItem key={item.nationalId} value={item.nationalId}>
                          {item.memberName}
                        </MenuItem>
                      )
                    })}
                  </Select>
                  ) : (
                      <Skeleton variant='rectangular' width={250} height={55} />
                    )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>????????????????????????????????????????????? 2</InputLabel>
                  {secondRefMember ? (
                  <Select label='????????????????????????????????????????????? 2' defaultValue={secondRefMember?.nationalId ?? ''} {...register('secondReferenceId')}>
                    {secondRefMember.map(item => {
                      return (
                        <MenuItem key={item.nationalId} value={item.nationalId}>
                          {item.memberName}
                        </MenuItem>
                      )
                    })}
                  </Select>
                  ) : (
                      <Skeleton variant='rectangular' width={250} height={55} />
                    )}
                </FormControl>
              </Grid>
              <input type="hidden" value={memberName} {...register('username')}/>
              <input type="hidden" value={memberRoleId} {...register('memberRoleId')}/>
            </Grid>
            <Grid container spacing={5} item xs={12} md={6}>
              <Grid item xs={12} md={12}>
                <FormControl fullWidth>
                  <InputLabel>????????????????????????????????????????????????</InputLabel>
                  <Select label='????????????????????????????????????????????????' defaultValue='1' {...register('debtStatusId', { required: true })}>
                        <MenuItem value='1'>????????????????????????????????????????????? </MenuItem>
                        <MenuItem value='2'>??????????????????????????? </MenuItem>
                  </Select>
                </FormControl>
              </Grid> 
              <Grid item xs={12} md={6}>
                <TextField fullWidth type='number' label='????????????????????????????????????????????????????????????????????????' {...register('debt1')}/>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth type='number' label='?????????????????????????????????????????????????????????????????????????????????' {...register('debt2')}/>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth type='number' label='?????????????????????????????????????????????????????????????????????????????????' {...register('debt3')}/>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth type='number' label='??????????????????????????????.????????????????????????' {...register('debt4')}/>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth type='number' label='??????????????????????????????????????????????????????????????????????????????????????????' {...register('debt5')}/>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth type='number' label='????????????????????????????????????????????????????????????' {...register('debt6')}/>
              </Grid>
            </Grid>

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
                  color='primary'
                  //   onClick={handleClick}
                  onClick={handleSubmit(onSubmit)}
                  loading={loading}
                  loadingPosition='start'
                  startIcon={<SaveIcon />}
                  variant='contained'
                  size='large'
                >
                  ????????????????????????????????????????????????
                </LoadingButton>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </form>
    </Card>
  )
}

export default FormLoan

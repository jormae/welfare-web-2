// ** React Imports
import React, { useState, useEffect } from 'react'
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
import SaveIcon from 'mdi-material-ui/Plus'
import LoadingButton from '@mui/lab/LoadingButton'
import moment from 'moment'

const FormLoan = () => {

    const { register, handleSubmit, control } = useForm();
  
  const [loading, setLoading] = React.useState(false)
  const [memberDetail, setMemberDetail] = useState()
  const [loanTypes, setLoanTypes] = useState()
  const [firstRefMember, setFirstMember] = useState()
  const [secondRefMember, setSecondMember] = useState()
  const [value, setValue] = useState(firstRefMember?.value);
  const [value2, setValue2] = useState(secondRefMember?.value);
    // const [val,setVal]=useState({})
  const userName = typeof window !== 'undefined' ? localStorage.getItem('userName') : null
  
  console.log(memberDetail)
  console.log(loanTypes)
    const nationalId = memberDetail?.nationalId
    const memberName = memberDetail?.memberName
    const loanTypeId = loanTypes?.loanTypeId
    console.log(nationalId)
    console.log(memberName)

  const fetchMemberDetail = () => {
    let uri = apiConfig.baseURL + `/members/${userName}`
    console.log(uri)
    axios
      .get(uri)
      .then(result => setMemberDetail(result.data[0]))
      .catch(error => console.log('An error occurred' + error))
  }

  const fetchLoanTypes = async () => {
    let uri = apiConfig.baseURL + `/utils/loan-types`
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
    fetchMemberDetail()
    fetchLoanTypes()
    fetchFirstMember()
    fetchSecondMember()
  }, [])

//   const handleClick = () => {
//     setVal(firstRefMember[1]);
//  };

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
      {/* <CardHeader title='ข้อมูลสมาชิก' titleTypographyProps={{ variant: 'h6' }} /> */}
      <Toaster />
      <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={4}>
            {memberDetail?.nationalId ? (
              <TextField fullWidth defaultValue={nationalId} label='เลขที่บัตรประชาชน' {...register('nationalId')} />
              ) : (
                <Skeleton variant='rectangular' width={250} height={55} />
              )}
            </Grid>
            <Grid item xs={4}>
            {memberDetail?.memberName ? (
                <TextField fullWidth defaultValue={memberName} label='ชื่อสมาชิก' />
              ) : (
                <Skeleton variant='rectangular' width={250} height={55} />
              )}
              {/* <input type='hidden' {...register('updatedBy')} value={updatedBy} /> */}
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>ประเภทสสวัสดิการ</InputLabel>
                {loanTypes? (
                <Select label='ประเภทสสวัสดิการ' defaultValue={loanTypeId ?? ''} {...register('loanTypeId', { required: true })}>
                  {loanTypes.map(item => {
                    return (
                      <MenuItem key={item.loanTypeId} value={item.loanTypeId}>
                        {item.loanTypeName} ({item.loanAmount})
                      </MenuItem>
                    )
                  })}
                </Select>
                ) : (
                    <Skeleton variant='rectangular' width={250} height={55} />
                  )}
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                {/* <InputLabel>ตำแหน่ง</InputLabel> */}
                {firstRefMember? (
                <Autocomplete
                    // value={firstRefMember.find((option) => option.value === value)}
                    onChange={(_, v) => setValue(v?.value)}
                    disablePortal
                    id="combo-box-demo"
                    options={firstRefMember}
                    getOptionLabel={(option) => option.nationalId.toString()}
                    sx={{ width: 300 }}
                    renderOption={(props, option) => (
                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                          {option.memberName}
                        </Box>
                      )}
                    renderInput={(params) => <TextField fullWidth {...params} label="ชื่อผู้ค้ำคนที่ 1" {...register('firstReferenceId')} />}
                    />
                    ) : (
                        <Skeleton variant='rectangular' width={250} height={55} />
                      )}
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl >
                <Autocomplete
                //  value={secondRefMember.find((option) => option.value2 === value2)}
                 onChange={(_, v) => setValue2(v?.value)}
                    disablePortal
                    id="combo-box-demo"
                    options={secondRefMember}
                    getOptionLabel={(option) => option.nationalId.toString()}
                    sx={{ width: 300 }}
                    renderOption={(props, option) => (
                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                          {option.memberName}
                        </Box>
                      )}
                    renderInput={(params) => <TextField {...params} label="ชื่อผู้ค้ำคนที่ 2" {...register('secondReferenceId')}/> }
                    />
              </FormControl>
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
                  บันทึกการส่งคำขอ
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

// ** React Imports
import React, { useContext, useEffect } from 'react'
import Skeleton from '@mui/material/Skeleton'
import { Controller, useForm } from 'react-hook-form'
// import { useParams } from 'react-router-dom'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import FormHelperText from '@mui/material/FormHelperText'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import toast, { Toaster } from 'react-hot-toast'
import apiConfig from 'src/configs/apiConfig'

// ** Icons Imports
// import EyeOutline from 'mdi-material-ui/EyeOutline'
import SaveIcon from 'mdi-material-ui/Plus'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import Divider from '@mui/material/Divider';
import LoadingButton from '@mui/lab/LoadingButton';
// import SaveIcon from '@mui/icons-material/Save';
import Stack from '@mui/material/Stack';
// import SaveIcon from '@mui/icons-material/Save';
// import SendIcon from '@mui/icons-material/Send';
import moment from 'moment'

import { MemberContext,
    PositionsContext,
    MemberTypesContext,
    MemberRolesContext,
    PaymentTypesContext, 
    MemberStatusContext } from 'src/pages/member/[nationalId]'
// import { Details } from 'mdi-material-ui'

const FormMemberDetail = () => {
  const memberDetail = useContext(MemberContext)
  const positions = useContext(PositionsContext)
  const memberTypes = useContext(MemberTypesContext)
  const memberRoles = useContext(MemberRolesContext)
  const paymentTypes = useContext(PaymentTypesContext)
  const memberStatus = useContext(MemberStatusContext)
//   const referHospitals = useContext(ReferHospitalsContext)
//   const pttypes = useContext(PttypesContext)

  const { register, handleSubmit, formState, reset, setValue, control } = useForm()
  const { isSubmitting } = formState;
  const [loading, setLoading] = React.useState(false);
//   function handleClick() {
//     setLoading(true);
//   }

  const nationalId = memberDetail?.nationalId
  const memberName = memberDetail?.memberName
  const villageNo = memberDetail?.villageNo
  const subDistrict = memberDetail?.subDistrict
  const district = memberDetail?.district
  const province = memberDetail?.province ?? 190
  const houseNo = memberDetail?.houseNo ?? 1
//   // const province = 190
  const postCode = memberDetail?.postCode ?? 0
  const contactNo = memberDetail?.contactNo ?? 0
  const positionId = memberDetail?.positionId
  const memberTypeId = memberDetail?.memberTypeId
  const memberRoleId = memberDetail?.memberRoleId
  const paymentTypeId = memberDetail?.paymentTypeId
  const memberStatusId = memberDetail?.memberStatusId
//   const updatedBy = typeof window !== 'undefined' ? localStorage?.getItem('staffName') : 'system'
//   console.log(memberDetail)
//   console.log('postCode : ' + postCode)
//   console.log('contactNo : ' + contactNo)

  useEffect(() => {
    if (memberDetail) {
      reset({
        nationalId: memberDetail?.nationalId,
        memberName: memberDetail?.memberName,
        salary: memberDetail?.salary,
        houseNo: memberDetail?.houseNo,
        streetName: memberDetail?.streetName,
        villageName: memberDetail?.villageName,
        villageNo: memberDetail?.villageNo,
        subDistrict: memberDetail?.subDistrict,
        district: memberDetail?.district,
        province: memberDetail?.province,
        postCode: memberDetail?.postCode,
        contactNo: memberDetail?.contactNo,
        positionId: memberDetail?.positionId,
        memberTypeId: memberDetail?.memberTypeId,
        memberRoleId: memberDetail?.memberRoleId,
        paymentTypeId: memberDetail?.paymentTypeId,
        memberStatusId: memberDetail?.memberStatusId
      })
    }
  }, [])
//   console.log(province)

  // handleSelectChange = ({target: {name,value}}) => {
  //   console.log(name);
  //   console.log(value);
  // }

  const onSubmit = data => {
    setLoading(true);

    // return new Promise(resolve => {
    //     setTimeout(() => {
    //         resolve();
    //     }, 2000);

        let uri = apiConfig.baseURL + `/members/${nationalId}`

    fetch(uri, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.status == 'success') {
          toast.success(data.message)
        } else {
          toast.error(data.errors[0].msg)
        }
        setLoading(false);
      })
      .catch(function (error) {
        console.log(JSON.stringify(error))
      })
    // });

    

    // resetField('nationalId')
    // fetchMembers()
  }

  return (
    <Card>
      <CardHeader title='ข้อมูลสมาชิก' titleTypographyProps={{ variant: 'h6' }} />
      <Toaster />
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={3}>
              {memberDetail.nationalId ? (
                <TextField fullWidth label='เลขที่บัตรประชาชน' {...register('nationalId')} />
              ) : (
                <Skeleton variant='rectangular' width={250} height={55} />
              )}
            </Grid>
            <Grid item xs={3}>
              {memberDetail.memberName ? (
                <TextField fullWidth label='ชื่อผู้ป่วย' {...register('memberName')} />
              ) : (
                <Skeleton variant='rectangular' width={250} height={55} />
              )}
              {/* <input type='hidden' {...register('updatedBy')} value={updatedBy} /> */}
            </Grid>
            <Grid item xs={3}>
              <TextField fullWidth label='เงินเดือน' type='number' {...register('salary')} />
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel>ตำแหน่ง</InputLabel>
                <Select
                  label='ตำแหน่ง'
                  defaultValue={positionId ?? ''}
                  {...register('positionId', { required: true })}
                >
                  {positions.map(item => {
                    return (
                      <MenuItem key={item.positionId} value={item.positionId}>
                        {item.positionName}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel>ประเภทสมาชิก</InputLabel>
                <Select
                  label='ประเภทสมาชิก'
                  defaultValue={memberTypeId ?? ''}
                  {...register('memberTypeId', { required: true })}
                >
                  {memberTypes.map(item => {
                    return (
                      <MenuItem key={item.memberTypeId} value={item.memberTypeId}>
                        {item.memberTypeName}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel>ประเภทการชำระเงิน</InputLabel>
                <Select
                  label='ประเภทการชำระเงิน'
                  defaultValue={paymentTypeId ?? ''}
                  {...register('paymentTypeId', { required: true })}
                >
                  {paymentTypes.map(item => {
                    return (
                      <MenuItem key={item.paymentTypeId} value={item.paymentTypeId}>
                        {item.paymentTypeName}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel>ประเภทบัญชีผู้ใช้</InputLabel>
                <Select
                  label='ประเภทบัญชีผู้ใช้'
                  defaultValue={memberRoleId ?? ''}
                  {...register('memberRoleId', { required: true })}
                >
                  {memberRoles.map(item => {
                    return (
                      <MenuItem key={item.memberRoleId} value={item.memberRoleId}>
                        {item.memberRoleName}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel>สถานะสมาชิก</InputLabel>
                <Select
                  label='สถานะสมาชิก'
                  defaultValue={memberStatusId ?? ''}
                  {...register('memberStatusId', { required: true })}
                >
                  {memberStatus.map(item => {
                    return (
                      <MenuItem key={item.memberStatusId} value={item.memberStatusId}>
                        {item.memberStatusName}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Grid>
            </Grid>
            </CardContent>
            <CardHeader title='ข้อมูลที่อยู่' titleTypographyProps={{ variant: 'h6' }} />
            <CardContent>
            <Grid container spacing={5}>
            <Grid item xs={3}>
              <TextField fullWidth label='บ้านเลขที่' type='text' {...register('houseNo')} />
            </Grid>
            <Grid item xs={3}>
              <TextField fullWidth label='ถนน' type='text' {...register('streetName')} />
            </Grid>
            <Grid item xs={3}>
              <TextField fullWidth label='หมู่บ้าน' type='text' {...register('villageName')} />
            </Grid>
            <Grid item xs={3}>
              <TextField fullWidth label='หมู่ที่' type='text' {...register('villageNo')} />
            </Grid>
            <Grid item xs={3}>
              <TextField fullWidth label='ตำบล' type='text' {...register('subDistrict')} />
            </Grid>
            <Grid item xs={3}>
              <TextField fullWidth label='อำเภอ' type='text' {...register('district')} />
            </Grid>
            <Grid item xs={3}>
              <TextField fullWidth label='จังหวัด' type='text' {...register('province')} />
            </Grid>
            <Grid item xs={3}>
              <TextField fullWidth label='รหัสไปรษณีย์' type='text' {...register('postCode')} />
            </Grid>
            <Grid item xs={3}>
              <TextField fullWidth label='โทรศัพท์' type='text' {...register('contactNo')} />
            </Grid>
            {/* 
            
            
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel>ชื่อหอผู้ป่วย</InputLabel>
                <Select
                  label='ชื่อหอผู้ป่วย'
                  defaultValue={villageNo ?? ''}
                  {...register('villageNo', { required: true })}
                >
                  {wards.map(item => {
                    return (
                      <MenuItem key={item.villageNo} value={item.villageNo}>
                        {item.wardName}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel>สถานะการจำหน่าย</InputLabel>
                <Select
                  label='สถานะการจำหน่าย'
                  defaultValue={subDistrict ?? ''}
                  {...register('subDistrict', { required: true })}
                >
                  {dischargeStatuses.map(item => {
                    return (
                      <MenuItem key={item.subDistrict} value={item.subDistrict}>
                        {item.dischargeStatusName}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel>ประเภทการจำหน่าย</InputLabel>
                <Select
                  label='ประเภทการจำหน่าย'
                  defaultValue={district ?? ''}
                  {...register('district', { required: true })}
                >
                  {dischargeTypes.map(item => {
                    return (
                      <MenuItem key={item.district} value={item.district}>
                        {item.dischargeTypeName}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>สิทธิ์การรักษา</InputLabel>
                <Select
                  label='สิทธิ์การรักษา'
                  defaultValue={pttypeCode ?? ''}
                  {...register('pttypeCode', { required: true })}
                >
                  {pttypes.map(item => {
                    return (
                      <MenuItem key={item.pttypeCode} value={item.pttypeCode}>
                        {item.pttypeName}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel>สาเหตุการส่งต่อ</InputLabel>
                <Select
                  label='สาเหตุการส่งต่อ'
                  defaultValue={postCode ?? ''}
                  {...register('postCode', { required: true })}
                >
                  {memberStatus.map(item => {
                    return (
                      <MenuItem key={item.postCode} value={item.postCode}>
                        {item.referCauseName}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel>โรงพยาบาล</InputLabel>
                <Select
                  label='โรงพยาบาล'
                  defaultValue={contactNo ?? ''}
                  {...register('contactNo', { required: true })}
                >
                  {referHospitals.map(item => {
                    return (
                      <MenuItem key={item.contactNo} value={item.contactNo}>
                        {item.referHospitalName}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Grid> */}

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
                {/* <Button disabled={isSubmitting} type='submit' variant='contained' size='large'>
                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                  บันทึก
                </Button> */}
                <Box sx={{ '& > button': { m: 1 } }}></Box>
                <LoadingButton type='submit'
                color="primary"
                //   onClick={handleClick}
                onClick={handleSubmit(onSubmit)}
                loading={loading}
                loadingPosition="start"
                  startIcon={<SaveIcon />}
                variant="contained"
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
  )
}

export default FormMemberDetail

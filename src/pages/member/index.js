import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Box, Avatar, Icon, Typography, Link , Button} from 'mdi-material-ui'
import { mdiAccount } from '@mdi/js'
import Divider from '@mui/material/Divider'
import { Input } from '@mui/material'
import TextField from '@mui/material/TextField'
import TableMember from 'src/views/tables/TableMember'
import toast, { Toaster } from 'react-hot-toast'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import { useEffect, useState, createContext } from 'react'
import { useForm } from 'react-hook-form'
import apiConfig from 'src/configs/apiConfig'
import CardFollowUpLoan from 'src/views/cards/CardFollowUpLoan'
import CardQueueLoan from 'src/views/cards/CardQueueLoan'
import CardMember from 'src/views/cards/CardMember'
import CardTotalLoan from 'src/views/cards/CardTotalLoan'
import CardAddMember from 'src/views/cards/CardAddMember'

export const DataContext = createContext()

export const CardContext = createContext()

const FormLayouts = () => {
  const [members, setMembers] = useState({ blogs: [] })
  const [statNewMember, setStatNewMember] = useState(0)
  const staffName = typeof window !== 'undefined' ? localStorage.getItem('staffName') : null

  const fetchMembers = async () => {
    let uri = apiConfig.baseURL + `/members`
    console.log(uri)
    try {
      const { data } = await axios.get(uri)
      setMembers({ blogs: data })
    } catch (error) {
      // console.log(error)
    }
  }

  const fetchStatNewMember = async () => {
    let uri = apiConfig.baseURL + `/stat/new-member/${staffName}`
    console.log(uri)

    try {
      await axios
        .get(uri)
        .then(result => setStatNewMember(result.data[0]))
        .catch(error => console.log('An error occurred' + error))
    } catch (error) {
      console.log(error)
    }
  }

  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = data => {
    let uri = apiConfig.baseURL + '/member/upload/'
    fetch(uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        if (data.status == 'success') {
          toast.success(data.message)
          fetchMembers()
          fetchStatNewMember()
        } else {
          toast.error(data.errors[0].msg)
        }
      })
      .catch(function (error) {
        console.log(JSON.stringify(error))
      })

    resetField('an')
  }

  const verifyToken = async () => {
    const token = localStorage.getItem('token')
    let uri = apiConfig.baseURL + '/auth/token'
    fetch(uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.status !== 'success') {
          localStorage.removeItem('token')
          localStorage.removeItem('staffName')
          window.location = '/pages/login'
          console.log(data)
        }
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  useEffect(() => {
    verifyToken()
    fetchMembers()
    fetchStatNewMember()
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={6} lg={4}>
          <CardMember />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CardTotalLoan />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CardAddMember/>
        </Grid>

      <DataContext.Provider value={members}>
        <Grid item xs={12}>
          <TableMember />
        </Grid>
      </DataContext.Provider>
    </Grid>
  )
}

export default FormLayouts

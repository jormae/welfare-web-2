// ** MUI Imports
import React, { useContext,useState, useRef } from 'react'
import { useReactToPrint } from 'react-to-print';
import { useForm } from 'react-hook-form'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import SaveIcon from '@material-ui/icons/Save';
import LoadingButton from '@mui/lab/LoadingButton'
import PrintIcon from '@material-ui/icons/Print';
import {Button, H2} from '@mui/material'
import Link from 'next/link'
import moment from 'moment'
import { makeStyles } from '@mui/styles';
import toast, { Toaster } from 'react-hot-toast'
import apiConfig from 'src/configs/apiConfig'

import { DataReportSalaryContext, DataDateContext} from 'src/pages/reports/monthly/salary/index'
import { DataReportPrintSalaryContext, DataDatePrintContext} from 'src/pages/reports/monthly/salary/print-envelop/[date]'

const useStyles = makeStyles({

  [`@page`] : {
    size: 'Letter',
    margin: 0,
  },
  [`@media print`]: {
    
    size: 'Letter'

  },
  color:'black',

});


// const pagestyle = "@page { size: 2.5in 4in }"
const pageStyle = `
        @page {
            size: 80mm 50mm;
        }

        @media all {
            .pagebreak {
            display: none;
            }
        }

        @media print {
            .pagebreak {
            page-break-before: always;
            }
        }
    `;

const TableReportSalaryDoc = () => {
 
    const styles = useStyles();
    const reportSalary = useContext(DataReportSalaryContext);
    const reportDate = useContext(DataDateContext);
    const printSalary = useContext(DataReportPrintSalaryContext);
    const printDate = useContext(DataDatePrintContext);

    const salaries = reportSalary ?? printSalary;
    const date = reportDate ?? printDate;
 
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const i = 1;
    const [loading, setLoading] = useState(false)
    const strDate = 'เดือน '+ moment(date).format('MMMM') +' พ.ศ.'+ moment(date).add(543, 'year').format('YYYY');
    const memberName = typeof window !== 'undefined' ? localStorage.getItem('memberName') : null

    const printRef = useRef();

    const handlePrint = useReactToPrint({
      content: () => printRef.current,
    });

    
 
    return (
        
    <Card>
        <Button
                onClick={handlePrint}
                color='primary'
                startIcon={<PrintIcon />}
                variant='contained'
                size='large'
                >
                พิมพ์
                </Button>
        <CardContent ref={printRef}>
            {salaries.blogs.map(row => (
                 <div key={row.salaryId}  
                 style={{ 
                    size: 'landscape', 
                    pageBreakAfter:'always', 
                    marginTop:60,
                    marginLeft:30, 

                    [`@media print`]: {
                        padding:100,
                  },}} > 
                  <Grid container spacing={3}>
                    <Grid item xs={12} textAlign="center" fontSize={18} paddingBottom={0}>
                        <p>โรงเรียนดารุสสาลาม<br/>ค่าตอบแทนประจำ{strDate}</p>
                    </Grid>
                </Grid>
                <Grid container spacing={3} fontSize={14}>
                    <Grid item xs={4}>
                        ชื่อ-สกุล
                    </Grid>
                    <Grid item xs={2} textAlign="center">
                        เงินเดือน
                    </Grid>
                    <Grid item xs={2} textAlign="center">
                        ประกันสังคม ({row.healthInsurancePercentage*100}%)
                    </Grid>
                    <Grid item xs={2}  textAlign="center">
                        สถาบันการเงินและอื่นๆ
                    </Grid>
                    <Grid item xs={2} textAlign="center">
                        คงเหลือ
                    </Grid>
                </Grid>
                <Grid container spacing={3} fontSize={14}>
                    <Grid item xs={4}>
                        {i++} - {row.memberName}
                    </Grid>
                    <Grid item xs={2} textAlign="center">
                        {(row.basedSalary ?? 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                    </Grid>
                    <Grid item xs={2} textAlign="center">
                        {(row.healthInsurance ?? 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                    </Grid>
                    <Grid item xs={2} textAlign="center">
                        N/A
                    </Grid>
                    <Grid item xs={2} textAlign="center">
                       {(row.netSalary ?? 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                    </Grid>
                </Grid>
                </div>
            ))}
        </CardContent>
        
    </Card>
  )
}

export default TableReportSalaryDoc


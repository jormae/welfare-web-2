// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import FileDocumentMultipleOutline from 'mdi-material-ui/FileDocumentMultipleOutline'
import BarcodeScan from 'mdi-material-ui/BarcodeScan'
import ChartLine from 'mdi-material-ui/ChartLine'

const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },

    // {
    //   title: 'Account Settings',
    //   icon: AccountCogOutline,
    //   path: '/account-settings'
    // },
    {
      sectionTitle: 'Pages'
    },
    {
      title: 'รับชาร์ต',
      icon: BarcodeScan,
      path: '/new-chart'
    },
    {
      title: 'ส่งสรุปชาร์ต',
      icon: Login,
      path: '/summary-chart'
    },
    {
      title: 'รับคืนสรุปชาร์ต',
      icon: BarcodeScan,
      path: '/return-chart'
    },
    {
      title: 'ส่งรีออดิตชาร์ต',
      icon: BarcodeScan,
      path: '/reaudit-chart'
    },

    // {
    //   title: 'Login',
    //   icon: Login,
    //   path: '/pages/login',
    //   openInNewTab: false
    // },
    // {
    //   title: 'Register',
    //   icon: AccountPlusOutline,
    //   path: '/pages/register',
    //   openInNewTab: false
    // },
    // {
    //   title: 'Error',
    //   icon: AlertCircleOutline,
    //   path: '/pages/error',
    //   openInNewTab: false
    // },
    {
      sectionTitle: 'System Reports'
    },
    {
      title: 'ชาร์ตทั้งหมด',
      icon: FileDocumentMultipleOutline,
      path: '/all-chart'
    },
    {
      title: 'รายงานสรุป',
      icon: ChartLine,
      path: '/report-summary'
    },
    {
      title: 'Icons',
      path: '/icons',
      icon: GoogleCirclesExtended
    }

    // {
    //   sectionTitle: 'User Interface'
    // },
    // {
    //   title: 'Typography',
    //   icon: FormatLetterCase,
    //   path: '/typography'
    // },
    // {
    //   title: 'Icons',
    //   path: '/icons',
    //   icon: GoogleCirclesExtended
    // },
    // {
    //   title: 'Cards',
    //   icon: CreditCardOutline,
    //   path: '/cards'
    // },
    // {
    //   title: 'Tables',
    //   icon: Table,
    //   path: '/tables'
    // },
    // {
    //   icon: CubeOutline,
    //   title: 'Form Layouts',
    //   path: '/form-layouts'
    // }
  ]
}

export default navigation

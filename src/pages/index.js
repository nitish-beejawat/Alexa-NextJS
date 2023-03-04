import React,{useState,useEffect} from 'react'
import Grid from '@mui/material/Grid'
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import Table from 'src/views/dashboard/Table'
import Trophy from 'src/views/dashboard/Trophy'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
import SalesByCountries from 'src/views/dashboard/SalesByCountries'
import axios from 'axios'
import { Input,Button } from '@mui/material'



const Dashboard = () => {
  const [datas, setDatas] = useState("")
  const [side, setSide] = useState("Right")
  const [dashData, setDashData] = useState("")

  useEffect(() => {


    const datas = localStorage.getItem("jwt")
    const parseIt = JSON.parse(datas)
    console.log(parseIt)

     try {
      
      axios.post("/api/DashData",{
        id:parseIt._id
      })
      .then((acc)=>{
        console.log(acc.data)
        setDashData(acc.data)
      })
      .catch((err)=>{
        console.log(err)
      })


     } catch (error) {
      console.log(error)
     }




  
  }, [])
  
  













  return (
    <div>

    <ApexChartWrapper>
      <Grid container spacing={6}>
      
      



      {
        dashData ? 

        <Grid style={{marginTop:20,marginLeft:10}} container spacing={12}>


<Grid item xs={12} md={4}>
            <div style={{borderColor:"#06A5A7",borderStyle:"solid",borderWidth:3,padding:10,borderRadius:20,backgroundColor:'rgb(3 232 235 / 10%)',paddingLeft:20,backgroundImage:"https://png.pngtree.com/element_our/sm/20180520/sm_5b0125134eb72.jpg",backgroundSize:80,backgroundRepeat:"no-repeat"}}>
              <h4>Active Package</h4>
              <h3 style={{marginTop:-20}}>{dashData.ActivePackage}</h3>

            </div>

          </Grid>


          <Grid item xs={12} md={4}>
            <div style={{borderColor:"#06A5A7",borderStyle:"solid",borderWidth:3,padding:10,borderRadius:20,backgroundColor:'rgb(3 232 235 / 10%)',paddingLeft:20,backgroundImage:"https://png.pngtree.com/element_our/sm/20180520/sm_5b0125134eb72.jpg",backgroundSize:80,backgroundRepeat:"no-repeat"}}>
              <h4>Dalily Bonus</h4>
              <h3 style={{marginTop:-20}}>{dashData.DailyFastBonus}</h3>

            </div>

          </Grid>

          <Grid item xs={12} md={4}>
            <div style={{borderColor:"#06A5A7",borderStyle:"solid",borderWidth:3,padding:10,borderRadius:20,backgroundColor:'rgb(3 232 235 / 10%)',paddingLeft:20,backgroundImage:"https://png.pngtree.com/element_our/sm/20180520/sm_5b0125134eb72.jpg",backgroundSize:80,backgroundRepeat:"no-repeat"}}>
              <h4>Future Earnings</h4>
              <h3 style={{marginTop:-20}}>{dashData.FutureIWillGet}</h3>

            </div>

          </Grid>

          <Grid item xs={12} md={4}>
            <div style={{borderColor:"#06A5A7",borderStyle:"solid",borderWidth:3,padding:10,borderRadius:20,backgroundColor:'rgb(3 232 235 / 10%)',paddingLeft:20,backgroundImage:"https://png.pngtree.com/element_our/sm/20180520/sm_5b0125134eb72.jpg",backgroundSize:80,backgroundRepeat:"no-repeat"}}>
              <h4>Maximum Earning</h4>
              <h3 style={{marginTop:-20}}>{Number(dashData.MaxCaping).toFixed(2)}</h3>

            </div>

          </Grid>
















          <Grid item xs={12} md={4}>
            <div style={{borderColor:"#06A5A7",borderStyle:"solid",borderWidth:3,padding:10,borderRadius:20,backgroundColor:'rgb(3 232 235 / 10%)',paddingLeft:20,backgroundImage:"https://png.pngtree.com/element_our/sm/20180520/sm_5b0125134eb72.jpg",backgroundSize:80,backgroundRepeat:"no-repeat"}}>
              <h4>Dalily Staking</h4>
              <h3 style={{marginTop:-20}}>{Number(dashData.DailyStakig).toFixed(2)}</h3>

            </div>

          </Grid>
          <Grid item xs={12} md={4}>
            <div style={{borderColor:"#06A5A7",borderStyle:"solid",borderWidth:3,padding:10,borderRadius:20,backgroundColor:'rgb(3 232 235 / 10%)',paddingLeft:20}}>
              <h4>Power Staking</h4>
              <h3 style={{marginTop:-20}}>{Number(dashData.PowerStaing).toFixed(2)}</h3>

            </div>

          </Grid>
          <Grid item xs={12} md={4}>
            <div style={{borderColor:"#06A5A7",borderStyle:"solid",borderWidth:3,padding:10,borderRadius:20,backgroundColor:'rgb(3 232 235 / 10%)',paddingLeft:20}}>
              <h4>Direct Reward</h4>
              <h3 style={{marginTop:-20}}>{Number(dashData.DirectReward).toFixed(2)}</h3>

            </div>

          </Grid>








          <Grid style={{marginTop:-20}} item xs={12} md={4}>
            <div style={{borderColor:"#06A5A7",borderStyle:"solid",borderWidth:3,padding:10,borderRadius:20,backgroundColor:'rgb(3 232 235 / 10%)',paddingLeft:20,backgroundImage:"https://png.pngtree.com/element_our/sm/20180520/sm_5b0125134eb72.jpg",backgroundSize:80,backgroundRepeat:"no-repeat"}}>
              <h4>Matching Bonus</h4>
              <h3 style={{marginTop:-20}}>{Number(dashData.MatcingBonus).toFixed(2)}</h3>

            </div>

          </Grid>
          <Grid style={{marginTop:-20}} item xs={12} md={4}>
            <div style={{borderColor:"#06A5A7",borderStyle:"solid",borderWidth:3,padding:10,borderRadius:20,backgroundColor:'rgb(3 232 235 / 10%)',paddingLeft:20}}>
              <h4>Rank Eligibilty</h4>
              <h3 style={{marginTop:-20}}>{Number(dashData.RankEligibility).toFixed(2)}</h3>

            </div>

          </Grid>
          <Grid style={{marginTop:-20}} item xs={12} md={4}>
            <div style={{borderColor:"#06A5A7",borderStyle:"solid",borderWidth:3,padding:10,borderRadius:20,backgroundColor:'rgb(3 232 235 / 10%)',paddingLeft:20}}>
              <h4>Global Pool Bonus</h4>
              <h3 style={{marginTop:-20}}>{Number(dashData.GobalPoolBonus).toFixed(2)}</h3>

            </div>

          </Grid>




          <Grid style={{marginTop:-20}} item xs={12} md={4}>
            <div style={{borderColor:"#06A5A7",borderStyle:"solid",borderWidth:3,padding:10,borderRadius:20,backgroundColor:'rgb(3 232 235 / 10%)',paddingLeft:20,backgroundImage:"https://png.pngtree.com/element_our/sm/20180520/sm_5b0125134eb72.jpg",backgroundSize:80,backgroundRepeat:"no-repeat"}}>
              <h4>Rebuy Bonus</h4>
              <h3 style={{marginTop:-20}}>{Number(dashData.RebuyBonus).toFixed(2)}</h3>

            </div>

          </Grid>
           <Grid style={{marginTop:-20}} item xs={12} md={4}>
            <div style={{borderColor:"#06A5A7",borderStyle:"solid",borderWidth:3,padding:10,borderRadius:20,backgroundColor:'rgb(3 232 235 / 10%)',paddingLeft:20}}>
              <h4>Direct Team</h4>
              <h3 style={{marginTop:-20}}>{Number(dashData.DirectTeam).toFixed(2)}</h3>

            </div>

          </Grid>
         <Grid style={{marginTop:-20}} item xs={12} md={4}>
            <div style={{borderColor:"#06A5A7",borderStyle:"solid",borderWidth:3,padding:10,borderRadius:20,backgroundColor:'rgb(3 232 235 / 10%)',paddingLeft:20}}>
              <h4>Avalible Tokens</h4>
              <h3 style={{marginTop:-20}}>${Number(dashData.AvaibleTokens).toFixed(2)}</h3>

            </div>

          </Grid>
         <Grid style={{marginTop:-20}} item xs={12} md={4}>
            <div style={{borderColor:"#06A5A7",borderStyle:"solid",borderWidth:3,padding:10,borderRadius:20,backgroundColor:'rgb(3 232 235 / 10%)',paddingLeft:20}}>
              <h4>Total Earning</h4>
              <h3 style={{marginTop:-20}}>${Number(dashData.TotalEarnings).toFixed(2)}</h3>

            </div>

          </Grid>





          <Grid style={{marginTop:-20}} item xs={12} md={4}>
            <div style={{borderColor:"#06A5A7",borderStyle:"solid",borderWidth:3,padding:10,borderRadius:20,backgroundColor:'rgb(3 232 235 / 10%)',paddingLeft:20}}>
              <h4>Direct Business</h4>
              <h3 style={{marginTop:-20}}>${Number(dashData.DirectBusiness).toFixed(2)}</h3>

            </div>

          </Grid>




        </Grid>

        :



        <div style={{alignSelf:"center"}}>
        <h1 style={{textAlign:'center',alignSelf:"center",alignContent:"center"}}>Loading...</h1>
        </div>
      }





      </Grid>
    </ApexChartWrapper>
    </div>
  )
}

export default Dashboard

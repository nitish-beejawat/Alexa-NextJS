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



  // useEffect(() => {

  //   var ids = localStorage.getItem("jwt")
  //   var parsedData = JSON.parse(ids)
    

  //   try {
      
  //     axios.post("/api/dashboardData/myDashboardData",{
  //       id:parsedData._id
  //     })
  //     .then((acc)=>{
  //       console.log(acc.data)
  //       setDatas(acc.data)
  //     })
  //     .catch((err)=>{
  //       console.log(err)
  //     })



  //   } catch (error) {
  //     console.log(error)
  //   }
  


  // }, [])


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
      
        <Grid item xs={12} md={12}>
          <div style={{borderColor:"#05A4A6",borderWidth:1,borderStyle:"solid",padding:20,borderRadius:20}}>

            <h2>Hello User (12345)</h2>
            <h4 style={{color:"red",marginTop:-20,fontWeight:"normal"}}>Inactive</h4>
            <h4 style={{color:"white",marginTop:-20,fontWeight:"normal"}}>Contact : <a style={{color:'yellow'}}>hsdkjghskdghsdkjgasjfjajlkfjalskfjalskfjalsfjasl</a></h4>




            <h4>Referral Link</h4>


<Button >

<svg xmlns="http://www.w3.org/2000/svg" style={{color:"white"}} width={16} height={16} fill="currentColor" className="bi bi-clipboard2-fill" viewBox="0 0 16 16">
  <path d="M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5h3Z" />
  <path d="M3.5 1h.585A1.498 1.498 0 0 0 4 1.5V2a1.5 1.5 0 0 0 1.5 1.5h5A1.5 1.5 0 0 0 12 2v-.5c0-.175-.03-.344-.085-.5h.585A1.5 1.5 0 0 1 14 2.5v12a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-12A1.5 1.5 0 0 1 3.5 1Z" />
</svg>
 


</Button>
            <Input style={{width:"50%"}} value="235265723658723562837562387563258723" contentEditable={false}></Input>
<Button style={{color:"white"}} onClick={()=>side =="Right"?setSide("Left"):setSide("Right")} >{side}</Button>

          </div>
        </Grid>



      {
        dashData ? 

        <Grid style={{marginTop:20,marginLeft:10}} container spacing={12}>
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
        {/*  <Grid style={{marginTop:-20}} item xs={12} md={4}>
            <div style={{borderColor:"#06A5A7",borderStyle:"solid",borderWidth:3,padding:10,borderRadius:20,backgroundColor:'rgb(3 232 235 / 10%)',paddingLeft:20}}>
              <h4>Account Status</h4>
              <h3 style={{marginTop:-20}}>In-Active</h3>

            </div>

          </Grid> */}




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

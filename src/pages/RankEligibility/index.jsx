import Grid from '@mui/material/Grid'
import React, { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import axios from 'axios'
import WeeklyOverview from '../../views/dashboard/WeeklyOverview'
import History from './History'
import AvalibleRewardsCard from './AvalibleRewardsCard'


const PackageHistory = () => {

  const [datas, setDatas] = useState('')
  const [buttonDisable, setButtonDisable] = useState(true)

  const [percantage, setPercantage] = useState(0)
  const [crWall, setCrWall] = useState(0)
  const [yourReward, setYourReward] = useState(0)
  const [userCurrentWallet, setUserCurrentWallet] = useState(0)


  const [teamCount, setTeamCount] = useState(0)


  useEffect(() => {
    const getData = async () => {
      const jwt = localStorage.getItem('jwt')
      const parsedData = JSON.parse(jwt)
      console.log("this is is => "+parsedData._id)

      axios
        .post('/api/checkPercantage', {
          id: parsedData._id
        })
        .then(acc => {
          console.log("below ==> ")
          console.log(acc.data)
          setPercantage(acc.data.goal)
          setCrWall(acc.data.crWall)
          setYourReward(acc.data.reward)




          if (Number(acc.data.crWall) >= Number(acc.data.goal)) {
            setButtonDisable(false)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
    getData()
  }, [])





  useEffect(() => {
    getDatas()
  }, [])




  const getDatas = () => {
    var data = localStorage.getItem('jwt')
    var parseData = JSON.parse(data)

    console.log(parseData._id)

    try {
      axios
        .post('/api/History/ReferalHistory', {
          id: parseData._id
        })
        .then(acc => {
          console.log(acc.data)
          setDatas(acc.data)
        })
        .catch(err => {
          console.log(err)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const handleButtonPress = () => {

    const ids = localStorage.getItem("jwt")
    const parsed = JSON.parse(ids)


    try {


      axios.post("/api/RankEligibility/ClaimReward",{
        id:parsed._id,
        ClaimedReward:yourReward,
        TotalBusiness:crWall
      })
      .then((acc)=>{
        console.log(acc.data)
        window.alert(acc.data.message)
      })
      .catch((err)=>{
        console.log(err)
      })




      
    } catch (error) {
      console.log(error)
    }







  }




  useEffect(() => {
    const getData = localStorage.getItem("jwt")
    const parseIt = JSON.parse(getData)
    
    try {
      
      axios.post("/api/RankTeamBusiness/FindMyTeamBusiness",{
        id:parseIt._id
      })
      .then((acc)=>{
        console.log(acc.data)

        setUserCurrentWallet(acc.data)
      })
      .catch((err)=>{
        console.log(err)
      })


    } catch (error) {
      console.log(error)
    }



   
  }, [])







  useEffect(() => {
    const getData = localStorage.getItem("jwt")
    const parseIt = JSON.parse(getData)
    
    try {
      
      axios.post("/api/RankEligibility/getUserTeamNumber",{
        id:parseIt._id
      })
      .then((acc)=>{
        console.log(acc.data)
        setTeamCount(acc.data)

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
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Typography style={{marginBottom:20}} variant='h4'>Rank Eligibility</Typography>
        </Grid>
      </Grid>
      <AvalibleRewardsCard teamCount={teamCount} userCurrentWallet={userCurrentWallet}/>
      <History/>
    </div>
  )
}

export default PackageHistory

import Grid from '@mui/material/Grid'
import React, { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import axios from 'axios'
import WeeklyOverview from '../../views/dashboard/WeeklyOverview'
import History from './History'


const PackageHistory = () => {

  const [datas, setDatas] = useState('')
  const [buttonDisable, setButtonDisable] = useState(true)

  const [percantage, setPercantage] = useState(0)
  const [crWall, setCrWall] = useState(0)
  const [yourReward, setYourReward] = useState(0)


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

  return (
    <div>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Typography variant='h4'>Rank Eligibility</Typography>
        </Grid>
        <Grid item xs={6}>
          <Card style={{}}>
            <WeeklyOverview />
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card style={{ padding: 10, paddingBottom: 40 }}>
            <div style={{ textAlign: 'center', marginTop: 40 }}>
              <img
                src='https://cdn-icons-png.flaticon.com/512/726/726461.png'
                style={{ width: 130, height: 130 }}
                alt=''
              />
              {buttonDisable ? (
                <p
                  onClick={handleButtonPress}
                  style={{
                    backgroundColor: 'gray',
                    padding: 5,
                    marginLeft: 100,
                    marginRight: 100,
                    fontWeight: 'bolder',
                    color: 'white',
                    borderRadius: 10
                  }}
                >
                  Claim Reward
                </p>
              ) : (
                <p
                  onClick={handleButtonPress}
                  style={{
                    backgroundColor: '#9357FD',
                    padding: 5,
                    marginLeft: 100,
                    marginRight: 100,
                    fontWeight: 'bolder',
                    color: 'white',
                    borderRadius: 10
                  }}
                >
                  Claim Reward
                </p>
              )}
            </div>
          </Card>
        </Grid>
      </Grid>


      <History/>
    </div>
  )
}

export default PackageHistory

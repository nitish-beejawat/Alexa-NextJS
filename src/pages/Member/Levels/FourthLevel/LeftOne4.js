import React from 'react'
import Typography from '@mui/material/Typography'


const leftOne4 = ({datas,handleClikedSuperUser}) => {
  return (
    <div onClick={()=>handleClikedSuperUser(datas.ThirdLevel.Four.LeftLine.userName)} style={{ textAlign: 'center' }}>
      {
        datas ? 

        <>
         <img src='https://lykacoin.net/images/1img.png' style={{ width: 80 }} alt='' />
    <Typography variant='h6'>{datas.ThirdLevel.Four.LeftLine.userName == "null" ?  "Vacant" : datas.ThirdLevel.Four.LeftLine.userName}</Typography>
    {
      datas.ThirdLevel.Four.LeftLine.userName == "null" ? 
      <></>
      :
      <Typography variant='h6'>14</Typography>

    }</>


        :


        <></>
      }
   
  </div>
  )
}

export default leftOne4
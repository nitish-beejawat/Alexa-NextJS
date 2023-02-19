import React from 'react'
import Typography from '@mui/material/Typography'


const ThirdLevelLeft2 = ({datas,handleClikedSuperUser}) => {
  return (
    <div onClick={()=>handleClikedSuperUser(datas.SecondLeve.TotalRight.LeftLine.userName)} style={{ textAlign: 'center' }}>

      {
        datas ? 


        <>
        
<img src='https://lykacoin.net/images/1img.png' style={{ width: 80 }} alt='' />
<Typography variant='h6'>{datas.SecondLeve.TotalRight.LeftLine.userName == "null" ? "Vacant":datas.SecondLeve.TotalRight.LeftLine.userName}</Typography>
{
  datas.SecondLeve.TotalRight.LeftLine.userName == "null" ? 
  <></>
  :
<Typography variant='h6'>6</Typography>
}
        </>


        :

        <></>
      }
                </div>
  )
}

export default ThirdLevelLeft2
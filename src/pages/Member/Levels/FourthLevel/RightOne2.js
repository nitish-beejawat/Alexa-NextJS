import React from 'react'
import Typography from '@mui/material/Typography'

const LevelTwo2 = ({datas,handleClikedSuperUser}) => {
  return (
    <div onClick={()=>handleClikedSuperUser(datas.ThirdLevel.Two.RightLine.userName)} style={{ textAlign: 'center' }}>

      {
        datas ? 

        <>
        
        
<img src='https://lykacoin.net/images/1img.png' style={{ width: 80 }} alt='' />
<Typography variant='h6'>{datas.ThirdLevel.Two.RightLine.userName == "null" ? "Vacant" :datas.ThirdLevel.Two.RightLine.userName}</Typography>
{
  datas.ThirdLevel.Two.RightLine.userName == "null" ? 
  <></>
  :

  <Typography variant='h6'>11</Typography>

}
        
        </>


        :


        <></>
      }
  </div>
  )
}

export default LevelTwo2
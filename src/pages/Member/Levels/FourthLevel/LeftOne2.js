import React from 'react'
import Typography from '@mui/material/Typography'

const LeftOne2 = ({datas,handleClikedSuperUser}) => {
  return (
    <div onClick={()=>handleClikedSuperUser(datas.ThirdLevel.Two.LeftLine.userName)} style={{ textAlign: 'center' }}>
      {
        datas ? 

        <>
        
<img src='https://lykacoin.net/images/1img.png' style={{ width: 80 }} alt='' />
<Typography variant='h6'>{datas.ThirdLevel.Two.LeftLine.userName == "null" ? "Vacant" :datas.ThirdLevel.Two.LeftLine.userName}</Typography>

{
  datas.ThirdLevel.Two.LeftLine.userName == "null" ? 

<></>
  :

  <Typography variant='h6'>10</Typography>

}
        
        </>


        :


        <></>
      }


  </div>
  )
}

export default LeftOne2
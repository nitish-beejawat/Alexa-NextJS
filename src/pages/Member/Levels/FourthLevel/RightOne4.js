import React from 'react'
import Typography from '@mui/material/Typography'


const RightOne4 = ({datas,handleClikedSuperUser}) => {
  return (
    <div onClick={()=>handleClikedSuperUser(datas.ThirdLevel.Four.RightLine.userName)} style={{ textAlign: 'center' }}>

      {
        datas ? 

        <>
<img src='https://lykacoin.net/images/0img.png' style={{ width: 80 }} alt='' />
<Typography variant='h6'>{datas.ThirdLevel.Four.RightLine.userName == "null" ? "Vacant" : datas.ThirdLevel.Four.RightLine.userName}</Typography>

{
  datas.ThirdLevel.Four.RightLine.userName == "null" ?

  <></>
  :
  
  <Typography variant='h6'>15</Typography>
}
        
        </>


:



<></>
      }

  </div>
  )
}

export default RightOne4
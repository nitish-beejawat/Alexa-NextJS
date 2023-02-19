import User from '../../../helper/Modal/User'
import initDB from '../../../helper/initDB'
import bcrypt from 'bcrypt'

initDB()

export default async (req, res) => {
  const { FullName, Position, Country, ContactNumber, EmailId, UpperlineUser, Passsword } = req.body
  console.log(UpperlineUser)

  if (!FullName || !Position || !Country || !ContactNumber || !EmailId || !Passsword) {
    return res.status(404).json({ error: 'You Have Not Provided All The Informations' })
  }

  let checkReferalUser;

  let upUser

  if (UpperlineUser) {
    checkReferalUser = await User.findOne({ SponserCode: UpperlineUser })
    upUser = await User.findOne({ SponserCode: UpperlineUser })
    if (!checkReferalUser) {
      return res.status(404).json({ error: 'Referal Id Is Wrong. Please Check It Again.' })
    }

    if (checkReferalUser.length == 0) {
      return res.status(404).json({ error: 'Referal Id Is Wrong. Please Check It Again.' })
    } else {

      let currentChildId = Position === "Left" ? checkReferalUser.LeftTeamId : checkReferalUser.RightTeamId;

      console.log("iniChilID", currentChildId);

      while(currentChildId !== "null") {
        const currentChildNode = await User.findById(currentChildId);

        console.log(currentChildNode);

        checkReferalUser = currentChildNode;
        currentChildId = Position === "Left" ? checkReferalUser.LeftTeamId : checkReferalUser.RightTeamId;
      }
    }
  }

  console.log(checkReferalUser);

  const hashedPassowd = await bcrypt.hash(Passsword, 12)

  var randValue = Math.floor(Math.random() * 900000)
  var randValue2 = Math.floor(Math.random() * 90000)

  var checkRandValue = await User.findOne({ UserName: randValue })

  while (checkRandValue !== null) {
    randValue = Math.floor(Math.random() * 900000)
    randValue2 = Math.floor(Math.random() * 90000)

    checkRandValue = await User.findOne({ UserName: randValue })
  }

  const generatedUserName = randValue
  var generateUserN = FullName.slice(0, 3)

  var today = new Date()
  var dd = String(today.getDate()).padStart(2, '0')
  var mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
  var yyyy = today.getFullYear()
  today = yyyy + '-' + mm + '-' + dd

  if (UpperlineUser) {
    var CreateUser = await User({
      FullName,
      Position,
      Country,
      ContactNumber,
      EmailId,
      UpperlineUser: upUser._id,
      Passsword: hashedPassowd,
      SponserCode: generatedUserName,
      UserName: generateUserN + randValue2
    }).save()

    console.log(CreateUser);

    if(checkReferalUser && Position === "Left") {
      const updatedCheckReferalUser = {
        LeftTeamId: CreateUser._id
      }
      await User.findByIdAndUpdate(checkReferalUser, {
        $set: updatedCheckReferalUser
      }, {
        new: true
      })
    }

    else if(checkReferalUser && Position === "Right"){
      const updatedCheckReferalUser = {
        RightTeamId: CreateUser._id
      }
      await User.findByIdAndUpdate(checkReferalUser, {
        $set: updatedCheckReferalUser
      }, {
        new: true
      })
    }
  } else {
    var CreateUser = await User({
      FullName,
      Position,
      Country,
      ContactNumber,
      EmailId,
      Passsword: hashedPassowd,
      SponserCode: generatedUserName,
      UserName: generateUserN + randValue2
    }).save()
  }

  res.status(200).json(CreateUser)
}

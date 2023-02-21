import initDB from '../../../helper/initDB'
import Package from '../../../helper/Modal/Plan'
import PackageHistory from '../../../helper/Modal/History/PackageHistory'
import ReferralHistory from '../../../helper/Modal/History/ReferralHistory'
import User from '../../../helper/Modal/User'
import LykaFastBonus from '../../../helper/Modal/Bonus/LykaFastBonus'
import GlobalBonus from '../../../helper/Modal/Bonus/GlobalBonus'
import RankEligibilityBonusFill from '../../../helper/Modal/Bonus/RankEligibilityBonusFill'
import RankBonusHistory from '../../../helper/Modal/History/RankBonusHistory'
import RenewalPurchasePackage from 'src/helper/Modal/Renewal/RenewalPurchasePackage'
import RankEligibilityClaim from 'src/helper/Modal/History/RankEligibilityClaim'
import PurchasePackageInvoice from 'src/helper/Modal/Invoice/PurchasePackageInvoice'
import ShortRecord from 'src/helper/Modal/ShortRecord'

initDB()


export default async (req, res) => {
  const { packageId, Anount, id } = req.body



  var checkUpperlineUser = await User.findById(id)
  if (checkUpperlineUser.UpperlineUser !== "null") {    
    var findUpperlineUser = await User.findById(checkUpperlineUser.UpperlineUser)
    var checkUpperlineUserPackageName = findUpperlineUser.PurchasedPackageName
  }



  const checkPackageHis = await PackageHistory.find({ PackageOwner: id })

 var checkRenewalPackage = ""
 var findMyPackage = await Package.findById(packageId)


 console.log(findMyPackage)

  if (checkPackageHis == 0) {

    var Lamount = Number(Anount) * 30

    const findPackage = await Package.findOne({PackageName:checkUpperlineUserPackageName})




    // console.log("below is the thing")
    // console.log(findMyPackage)

    const findPackagePurchaseUser = await User.findById(id)

    const uplineUser = findPackagePurchaseUser.UpperlineUser

    if (uplineUser !== 'null') {
      var findUplineUserDetails = await User.findById(uplineUser)

      // console.log("my package name => "+findUplineUserDetails.PurchasedPackageName)

      var upperPack = await Package.findOne({PackageName:findUplineUserDetails.PurchasedPackageName})


      var upperPercantage = upperPack.PackageReferalCommision



      checkRenewalPackage = await RenewalPurchasePackage.find({ PackageOwner: uplineUser })

      const lastWallete = findUplineUserDetails.MainWallet


      console.log("price is ====> "+Number(findMyPackage.PackagePrice))

      console.log("upperline is ====> "+Number(upperPercantage))

      const PackagePercantage = (Number(findMyPackage.PackagePrice) * Number(upperPercantage)) / 100


      // console.log(`======> ${upperPercantage}%`)

      const calWallete = Number(lastWallete) + Number(PackagePercantage)

      await User.findByIdAndUpdate({ _id: uplineUser }, { MainWallet: calWallete })

      const ReferalHistory = await ReferralHistory({
        ReferralFrom: findPackagePurchaseUser.SponserCode,
        ReferralTo: uplineUser,
        ReferralCoins: PackagePercantage,
        ReferralPercantage: upperPercantage,
        PackageName: findPackage.PackageName
      }).save()


      const findShortRecord = await ShortRecord.findOne({RecordOwner:uplineUser})


      if (findShortRecord) {

        let sum = Number(findShortRecord.DirectReward) + Number(PackagePercantage)

        const updateValue = await ShortRecord.findByIdAndUpdate({_id:findShortRecord._id},{DirectReward:sum})

      }else{

        const createShortRecord = await ShortRecord({
          RecordOwner:uplineUser,
          DirectReward:PackagePercantage
        }).save()

      }







      const uplinerCreationDate = findUplineUserDetails.createdAt

      var date = new Date(uplinerCreationDate)
      var dateToday = new Date()
      var month = date.getMonth() + 1
      var month2 = dateToday.getMonth() + 1

      var creationDate = month + '/' + date.getDate() + '/' + date.getFullYear()
      var todayDate = month2 + '/' + dateToday.getDate() + '/' + dateToday.getFullYear()

    

      const date1 = new Date(creationDate)
      const date2 = new Date(todayDate)
      const diffTime = Math.abs(date2 - date1)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
     

      if (diffDays <= 10) {
        const findData = await LykaFastBonus.find({ FastBonusCandidate: uplineUser })

      

        if (findData.length !== 0) {
          const updateData = await LykaFastBonus.findByIdAndUpdate(
            { _id: findData[0]._id },
            { ReferLength: Number(findData[0].ReferLength) + 1 }
          )
        } else {
          const createLykaFastBonus = await LykaFastBonus({
            FastBonusCandidate: uplineUser,
            ReferLength: '1'
          }).save()

          const CreateGlobalBonus = await GlobalBonus({
            BonusOwner: id,
            Percantage: "1"
          }).save()



        }
      }


      const upperlineWallet = findUplineUserDetails.PurchasedPackagePrice

      if (findMyPackage.PackagePrice >= upperlineWallet) {



        const AddRankEligibility = await RankEligibilityBonusFill({

          UpperLineUserId: uplineUser,
          DownLineUserId: id,
          BusinessAmount: findMyPackage.PackagePrice,
          BusinessMonth: month,
          BusinessYear: date.getFullYear()

        }).save()



        // const findShortRecord = await ShortRecord.findOne({RecordOwner:uplineUser})

        // if (findShortRecord) {
  
        //   let sum = Number(findShortRecord.RankEligibility) + Number(findMyPackage.PackagePrice)
  
        //   const updateValue = await ShortRecord.findByIdAndUpdate({_id:findShortRecord._id},{RankEligibility:sum})
  
        // }else{
  
        //   const createShortRecord = await ShortRecord({
        //     RecordOwner:uplineUser,
        //     DirectReward:findMyPackage.PackagePrice
        //   }).save()
  
        // }











        const AddRankEligibilityHistory = await RankBonusHistory({
          UpperLineUserId: uplineUser,
          UpperLineUserSponser: findUplineUserDetails.SponserCode,
          UpperLineUserEmail: findUplineUserDetails.EmailId,
          DownLineUserId: id,
          DownLineUserSponser: findPackagePurchaseUser.SponserCode,
          DownLineUserEmail: findPackagePurchaseUser.EmailId,
          BusinessAmount: findMyPackage.PackagePrice,
          PurchasedPackageName: findMyPackage.PackageName,
          PurchasedPackagePrice: findMyPackage.PackagePrice

        }).save()

        if (checkRenewalPackage.length !== 0) {
          
          const makeRenewalBonusActive = await RenewalPurchasePackage.findByIdAndUpdate({_id:checkRenewalPackage[0]._id},{DirectReferalDone:"true"})
        }









      }



    }

    // here ends

    const createPackage = await PackageHistory({
      PackageName: findMyPackage.PackageName,
      PackagePrice: findMyPackage.PackagePrice,
      PaackagePeriod: findMyPackage.PaackagePeriod,
      PackageMaximumLimit: '300',
      LykaToken: Lamount,
      PackgeRewardWallte: '0',
      PackageOwner: id,
      Type: "Basic"
    }).save()

    const createPackageInvoice = await PurchasePackageInvoice({
      PackageName: findMyPackage.PackageName,
      PackagePrice: findMyPackage.PackagePrice,
      PaackagePeriod: findMyPackage.PaackagePeriod,
      PackageMaximumLimit: '300',
      LykaToken: Lamount,
      PackgeRewardWallte: '0',
      PackageOwner: id,
      Type: "Basic"
    }).save()


    const createAnotherEntry = await User.findOneAndUpdate({ _id: id }, { PurchasedPackageName: findMyPackage.PackageName, PurchasedPackagePrice: Number(findMyPackage.PackagePrice), PurchasedPackageDate: "today" })

    return res.json('Package Created Successfully')


  } else {


    await PackageHistory.findByIdAndDelete(checkPackageHis[0]._id)
    if (checkRenewalPackage.length !== 0) {
      await RenewalPurchasePackage.findByIdAndDelete(checkRenewalPackage[0]._id)
    }


    var Lamount = Number(Anount) * 30

    const findPackage = await Package.findOne({PackageName:checkUpperlineUserPackageName})

    // console.log(findPackage)

    const findPackagePurchaseUser = await User.findById(id)

    const uplineUser = findPackagePurchaseUser.UpperlineUser


    if (uplineUser !== 'null') {
      var findUplineUserDetails = await User.findById(uplineUser)

      const lastWallete = findUplineUserDetails.MainWallet






      var findUplineUserDetails = await User.findById(uplineUser)

      // console.log("my package name => "+findUplineUserDetails.PurchasedPackageName)

      var upperPack = await Package.findOne({PackageName:findUplineUserDetails.PurchasedPackageName})


      var upperPercantage = upperPack.PackageReferalCommision


      console.log("price is ====> "+Number(findMyPackage.PackagePrice))

      console.log("upperline is ====> "+Number(upperPercantage))





      const PackagePercantage = (Number(findMyPackage.PackagePrice) * Number(upperPercantage)) / 100

      // console.log(`======> ${upperPercantage}%`)

      const calWallete = Number(lastWallete) + Number(PackagePercantage)

      await User.findByIdAndUpdate({ _id: uplineUser }, { MainWallet: calWallete })

      const ReferalHistory = await ReferralHistory({
        ReferralFrom: findPackagePurchaseUser.SponserCode,
        ReferralTo: uplineUser,
        ReferralCoins: PackagePercantage,
        ReferralPercantage: upperPercantage,
        PackageName: findPackage.PackageName
      }).save()


      const findShortRecord = await ShortRecord.findOne({RecordOwner:uplineUser})


      if (findShortRecord) {

        let sum = Number(findShortRecord.DirectReward) + Number(PackagePercantage)

        const updateValue = await ShortRecord.findByIdAndUpdate({_id:findShortRecord._id},{DirectReward:sum})

      }else{

        const createShortRecord = await ShortRecord({
          RecordOwner:uplineUser,
          DirectReward:PackagePercantage
        }).save()

      }






      const uplinerCreationDate = findUplineUserDetails.createdAt

      var date = new Date(uplinerCreationDate)
      var dateToday = new Date()
      var month = date.getMonth() + 1
      var month2 = dateToday.getMonth() + 1

      var creationDate = month + '/' + date.getDate() + '/' + date.getFullYear()
      var todayDate = month2 + '/' + dateToday.getDate() + '/' + dateToday.getFullYear()


      const date1 = new Date(creationDate)
      const date2 = new Date(todayDate)
      const diffTime = Math.abs(date2 - date1)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    

      if (diffDays <= 10) {
        const findData = await LykaFastBonus.find({ FastBonusCandidate: uplineUser })

        

        if (findData.length !== 0) {
          const updateData = await LykaFastBonus.findByIdAndUpdate(
            { _id: findData[0]._id },
            { ReferLength: Number(findData[0].ReferLength) + 1 }
          )
        } else {
          const createLykaFastBonus = await LykaFastBonus({
            FastBonusCandidate: uplineUser,
            ReferLength: '1'
          }).save()

          const CreateGlobalBonus = await GlobalBonus({
            BonusOwner: id,
            Percantage: "1"
          }).save()



        }
      }


      const upperlineWallet = findUplineUserDetails.PurchasedPackagePrice

      if (findMyPackage.PackagePrice >= upperlineWallet) {



        const AddRankEligibility = await RankEligibilityBonusFill({

          UpperLineUserId: uplineUser,
          DownLineUserId: id,
          BusinessAmount: findMyPackage.PackagePrice,
          BusinessMonth: month,
          BusinessYear: date.getFullYear()

        }).save()

        // const findShortRecord = await ShortRecord.findOne({RecordOwner:uplineUser})

        // if (findShortRecord) {
  
        //   let sum = Number(findShortRecord.RankEligibility) + Number(findMyPackage.PackagePrice)
  
        //   const updateValue = await ShortRecord.findByIdAndUpdate({_id:findShortRecord._id},{RankEligibility:sum})
  
        // }else{
  
        //   const createShortRecord = await ShortRecord({
        //     RecordOwner:uplineUser,
        //     DirectReward:findMyPackage.PackagePrice
        //   }).save()
  
        // }




        const AddRankEligibilityHistory = await RankBonusHistory({
          UpperLineUserId: uplineUser,
          UpperLineUserSponser: findUplineUserDetails.SponserCode,
          UpperLineUserEmail: findUplineUserDetails.EmailId,
          DownLineUserId: id,
          DownLineUserSponser: findPackagePurchaseUser.SponserCode,
          DownLineUserEmail: findPackagePurchaseUser.EmailId,
          BusinessAmount: findMyPackage.PackagePrice,
          PurchasedPackageName: findMyPackage.PackageName,
          PurchasedPackagePrice: findMyPackage.PackagePrice

        }).save()


      }



    }

    const createPackage = await PackageHistory({
      PackageName: findMyPackage.PackageName,
      PackagePrice: findMyPackage.PackagePrice,
      PaackagePeriod: findMyPackage.PaackagePeriod,
      PackageMaximumLimit: '300',
      LykaToken: Lamount,
      PackgeRewardWallte: '0',
      PackageOwner: id,
      Type: "Repurchased"
    }).save()




    const findShortRecord = await ShortRecord.findOne({RecordOwner:id})


    if (findShortRecord) {

      let sum = Number(findShortRecord.RebuyBonus) + Number(findMyPackage.PackagePrice)

      const updateValue = await ShortRecord.findByIdAndUpdate({_id:findShortRecord._id},{RebuyBonus:sum})

    }else{

      const createShortRecord = await ShortRecord({
        RecordOwner:uplineUser,
        RebuyBonus:findMyPackage.PackagePrice
      }).save()

    }



    





    
    const createPackageInvoice = await PurchasePackageInvoice({
      PackageName: findMyPackage.PackageName,
      PackagePrice: findMyPackage.PackagePrice,
      PaackagePeriod: findMyPackage.PaackagePeriod,
      PackageMaximumLimit: '300',
      LykaToken: Lamount,
      PackgeRewardWallte: '0',
      PackageOwner: id,
      Type: "Repurchased"
    }).save()


    const updateDataS = await RankEligibilityClaim.findOne({RankEligibilityClaimOwnerId:id})
    

    // const updatesdatas = await RankEligibilityClaim.findByIdAndUpdate({_id:updateDataS._id},{})
    if (updateDataS !== null) {
      const deleteOldData = await RankEligibilityClaim.findByIdAndDelete(updateDataS._id)
    }




      await RenewalPurchasePackage({
        PackageOwner:id
    }).save()




    await User.findByIdAndUpdate({ _id: id }, { UserEarnPercantage: "0%" })


    const createAnotherEntry = await User.findOneAndUpdate({ _id: id }, { PurchasedPackageName: findMyPackage.PackageName, PurchasedPackagePrice: Number(findMyPackage.PackagePrice), PurchasedPackageDate: "today" })

    return res.json('Package Created Successfully')



  }

}

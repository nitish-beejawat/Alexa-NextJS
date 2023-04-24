import initDB from "../../../helper/initDB";
import RankEligibilityClaim from "../../../helper/Modal/History/RankEligibilityClaim";
import RankEligibilityClaimForGlobalPool from "../../../helper/Modal/History/RankEligibilityClaimForGlobalPool";
import RankEligibilityBonusFill from "../../../helper/Modal/Bonus/RankEligibilityBonusFill";
import PackageHistory from "../../../helper/Modal/History/PackageHistory";
import User from "../../../helper/Modal/User";
import Plan from "../../../helper/Modal/Plan";
import RenewalPurchasePackage from "../../../helper/Modal/Renewal/RenewalPurchasePackage";
import ShortRecord from "../../../helper/Modal/ShortRecord";



initDB()

export default async (req, res) => {
  let {
    id,
    ClaimedReward,
    TotalBusiness
  } = req.body;
  let message = 'Claim Reward Done';

  if (!id || !ClaimedReward || !TotalBusiness) {
    return res.status(500).json({
      message: 'Please Provide All Data'
    })
  }

  const findRankEligibilityData = await RankEligibilityClaim.find({
    RankEligibilityClaimOwnerId: id
  })

  const MainUserData = await User.findById(id)

  const FindPackage = await Plan.findOne({
    PackagePrice: MainUserData.PurchasedPackagePrice
  })

  console.log("FindPackage ============== ", FindPackage)

  let NewWallet = Number(MainUserData.MainWallet) + Number(ClaimedReward)
  console.log("NewWallet ============== ", NewWallet, MainUserData.MainWallet, ClaimedReward)

  if(NewWallet > ((Number(FindPackage.PackagePrice) * Number(FindPackage.PackageMaximumLimit))/100)){
    ClaimedReward = ClaimedReward - (NewWallet - ((Number(FindPackage.PackagePrice) * Number(FindPackage.PackageMaximumLimit))/100))
    NewWallet = ((Number(FindPackage.PackagePrice) * Number(FindPackage.PackageMaximumLimit))/100);
  }


  if(ClaimedReward == 0){

    message = '300% capping reached';

    return res.status(200).json({

      message: message
      
    })
  }
  
  await User.findByIdAndUpdate({
    _id: id
  }, {
    MainWallet: NewWallet
  }) // giving reward

  // // finding renwal
  const findOldReneal = await RenewalPurchasePackage.find({
    PackageOwner: id
  })

  if (findOldReneal.length !== 0) {
    await RenewalPurchasePackage.findByIdAndUpdate({
      _id: findOldReneal[0]._id
    }, {
      RankEligibility: "false"
    })
  }

  RankEligibilityClaim({
    RankEligibilityClaimOwnerId: MainUserData._id,
    RankEligibilityClaimOwnerUserName: MainUserData.SponserCode,
    RankEligibilityClaimOwnerEmail: MainUserData.EmailId,
    PackageOwnName: FindPackage.PackageName,
    PackageOwnPrice: FindPackage.PackagePrice,
    ClaimedReward: ClaimedReward,
    TotBusiness: TotalBusiness
  }).save()

  const checkIfAlreadyExists = await RankEligibilityClaimForGlobalPool.findOne({
    RankEligibilityClaimOwnerId: MainUserData._id
  })

  if (checkIfAlreadyExists) {
    await RankEligibilityClaimForGlobalPool.findByIdAndDelete(checkIfAlreadyExists._id)
    RankEligibilityClaimForGlobalPool({
      RankEligibilityClaimOwnerId: MainUserData._id,
      RankEligibilityClaimOwnerUserName: MainUserData.SponserCode,
      RankEligibilityClaimOwnerEmail: MainUserData.EmailId,
      PackageOwnName: FindPackage.PackageName,
      PackageOwnPrice: FindPackage.PackagePrice,
      ClaimedReward: ClaimedReward,
      TotBusiness: TotalBusiness
    }).save()
  } else {
    RankEligibilityClaimForGlobalPool({
      RankEligibilityClaimOwnerId: MainUserData._id,
      RankEligibilityClaimOwnerUserName: MainUserData.SponserCode,
      RankEligibilityClaimOwnerEmail: MainUserData.EmailId,
      PackageOwnName: FindPackage.PackageName,
      PackageOwnPrice: FindPackage.PackagePrice,
      ClaimedReward: ClaimedReward,
      TotBusiness: TotalBusiness
    }).save()
  }

  const findShortRecord = await ShortRecord.findOne({
    RecordOwner: MainUserData._id
  })

  if (findShortRecord) {

    let sum = Number(findShortRecord.RankEligibility) + Number(ClaimedReward)

    const updateValue = await ShortRecord.findByIdAndUpdate({

      _id: findShortRecord._id
    }, {
      RankEligibility: sum
    })
  } else {
    
    const createShortRecord = await ShortRecord({
      RecordOwner: list[i].id,
      RankEligibility: ClaimedReward
    }).save()
  }

  return res.status(200).json({
    message: message
  })
}

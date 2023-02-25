import initDB from "../../../helper/initDB";
import RankEligibilityClaim from "../../../helper/Modal/History/RankEligibilityClaim";
import RankEligibilityBonusFill from "../../../helper/Modal/Bonus/RankEligibilityBonusFill";
import PackageHistory from "../../../helper/Modal/History/PackageHistory";
import User from "../../../helper/Modal/User";
import Plan from "../../../helper/Modal/Plan";
import RenewalPurchasePackage from "../../../helper/Modal/Renewal/RenewalPurchasePackage";
import ShortRecord from "../../../helper/Modal/ShortRecord";



initDB()

export default async (req, res) => {

    const { id, ClaimedReward, TotalBusiness } = req.body;

    if (!id || !ClaimedReward || !TotalBusiness) {
        return res.status(500).json({ message: 'Please Provide All Data' })
    }

    const findRankEligibilityData = await RankEligibilityClaim.find({RankEligibilityClaimOwnerId:id})


    // if (findRankEligibilityData.length !== 0) {
    //     return res.status(200).json({message:"Already Given Rank Eligibility"})
    // }


    const MainUserData = await User.findById(id)

    const FindPackage = await Plan.findOne({ PackagePrice: MainUserData.PurchasedPackagePrice })


    const NewWallet = Number(MainUserData.MainWallet) + Number(ClaimedReward)


    await User.findByIdAndUpdate({ _id: id }, { MainWallet: NewWallet }) // giving reward


    // finding renwal
    const findOldReneal = await RenewalPurchasePackage.find({PackageOwner:id})

    if (findOldReneal.length !== 0) {

        await RenewalPurchasePackage.findByIdAndUpdate({_id:findOldReneal[0]._id},{RankEligibility:"false"})
        
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


    const findShortRecord = await ShortRecord.findOne({RecordOwner:MainUserData._id})


    if (findShortRecord) {

      let sum = Number(findShortRecord.RankEligibility) + Number(ClaimedReward)

      const updateValue = await ShortRecord.findByIdAndUpdate({_id:findShortRecord._id},{RankEligibility:sum})

    }else{

      const createShortRecord = await ShortRecord({
        RecordOwner:list[i].id,
        RankEligibility:ClaimedReward
      }).save()

    }










   return res.status(200).json({ message: 'Claim Reward Done' })

}
import ShortRecord from 'src/helper/Modal/ShortRecord'
import initDB from '../../helper/initDB'
import PackageHistory from "../../helper/Modal/History/PackageHistory"
import User from "../../helper/Modal/User"

initDB()

export default async (req, res) => {

    const { id } = req.body;

    const findShortRecords = await ShortRecord.findOne({ RecordOwner: id })
    const findPackageHistory = await PackageHistory.findOne({PackageOwner:id})

    
    const findUser = await User.findById(id)


    res.json({
        DailyStakig: findShortRecords ? findShortRecords.DailyStakig : 0,
        PowerStaing: findShortRecords ? findShortRecords.PowerStaing : 0,
        DirectReward: findShortRecords ? findShortRecords.DirectReward : 0,
        MatcingBonus: findShortRecords ? findShortRecords.MatcingBonus : 0,
        RankEligibility: findShortRecords ? findShortRecords.RankEligibility : 0,
        GobalPoolBonus: findShortRecords ? findShortRecords.GobalPoolBonus : 0,
        RebuyBonus: findShortRecords ? findShortRecords.RebuyBonus : 0,
        DirectTeam: findShortRecords ? findShortRecords.DirectTeam : 0,
        TotalEarnings:findShortRecords ? findShortRecords.DailyStakig : 0+findShortRecords ? findShortRecords.PowerStaing : 0+findShortRecords ? findShortRecords.DirectReward : 0+findShortRecords ? findShortRecords.MatcingBonus : 0+findShortRecords ? findShortRecords.RankEligibility : findShortRecords ? findShortRecords.GobalPoolBonus : 0+findShortRecords ? findShortRecords.RebuyBonus : 0,
        AvaibleTokens:findShortRecords ? findShortRecords.DailyStakig : 0+findShortRecords ? findShortRecords.PowerStaing : 0+findShortRecords ? findShortRecords.DirectReward : 0+findShortRecords ? findShortRecords.MatcingBonus : 0+findShortRecords ? findShortRecords.RankEligibility : findShortRecords ? findShortRecords.GobalPoolBonus : 0+findShortRecords ? findShortRecords.RebuyBonus : 0,
        DirectBusiness:findShortRecords ? findShortRecords.DirectBusiness : 0,
        ActivePackage:findPackageHistory ? findPackageHistory.PackageName : "No Active Package",
        DailyFastBonus:"0%",
        MaxCaping:findPackageHistory ? Number(findPackageHistory.PackagePrice)*300/100 : "No Active Package",
        FutureIWillGet:findUser ? Number(findPackageHistory.PackagePrice)*300/100 - Number(findUser.MainWallet) : "Login Again"


    })


}
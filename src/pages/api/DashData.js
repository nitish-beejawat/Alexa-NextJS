import ShortRecord from 'src/helper/Modal/ShortRecord'
import initDB from '../../helper/initDB'


initDB()

export default async (req, res) => {

    const { id } = req.body;

    const findShortRecords = await ShortRecord.findOne({ RecordOwner: id })


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
        DirectBusiness:findShortRecords ? findShortRecords.DirectBusiness : 0
    })


}
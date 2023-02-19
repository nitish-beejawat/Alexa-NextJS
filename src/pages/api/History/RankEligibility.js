import initDB from "../../../helper/initDB";
import RankBonusHistory from "../../../helper/Modal/History/RankBonusHistory";

initDB()

export default async(req,res)=>{

    const {id} = req.body;


    const fetchDatas = await RankBonusHistory.find({UpperLineUserId:id})



    res.status(200).json(fetchDatas)





}
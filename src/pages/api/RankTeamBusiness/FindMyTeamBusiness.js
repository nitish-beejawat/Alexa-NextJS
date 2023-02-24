import initDB from "../../../helper/initDB";
import User from "../../../helper/Modal/User";
import PackageHistory from "../../../helper/Modal/History/PackageHistory";

initDB()

export default async (req, res) => {

    const { id } = req.body;

    const findMydirects = await User.find({ UpperlineUser: id })

    var num = 0

    for (let index = 0; index < findMydirects.length; index++) {

        const mainId = findMydirects[index]._id

        const findMyPackageHis = await PackageHistory.find({ PackageOwner: mainId })

        for (let index = 0; index < findMyPackageHis.length; index++) {

            const Price = findMyPackageHis[index].PackagePrice;

            num = num + Number(Price)

        }

    }

    res.json(num)
}
import initDB from '../../helper/initDB'
import User from '../../helper/Modal/User'

initDB()

export default async (req, res) => {
  const { id } = req.body

  var findSuperUser = await User.findOne({ SponserCode: id })

  var superUserId = findSuperUser.SponserCode == "null" ? null : findSuperUser.SponserCode
  var superUserName = findSuperUser.FullName == "null" ? null : findSuperUser.FullName

  var LevelOneRightSideId = findSuperUser.RightTeamId == "null" ? "null" : findSuperUser.RightTeamId
  var LevelOneLeftSideId = findSuperUser.LeftTeamId == "null" ? "null" : findSuperUser.LeftTeamId

  if (LevelOneRightSideId !== 'null') {
    var LevelOneRightSideUser = await User.findById(LevelOneRightSideId)
    var RightSideUserName = LevelOneRightSideUser.FullName
    var RightSideUserId = LevelOneRightSideUser.SponserCode
  } else {
    RightSideUserName = 'null'
    RightSideUserId = 'null'
    LevelOneRightSideUser = 'null'
  }

  if (LevelOneLeftSideId !== 'null') {
    var LevelOneLeftSideUser = await User.findById(LevelOneLeftSideId)
    var LeftSideUserName = LevelOneLeftSideUser.FullName
    var LeftSideUserId = LevelOneLeftSideUser.SponserCode
  } else {
    LeftSideUserName = 'null'
    LeftSideUserId = 'null'
    LevelOneLeftSideUser = 'null'
  }




  if (LevelOneLeftSideUser !== 'null') {
    if (LevelOneLeftSideUser.LeftTeamId !== 'null') {
      const fName = await User.findById(LevelOneLeftSideUser.LeftTeamId)
      var leftSideId1 = fName.FullName
    } else {
      leftSideId1 = 'null'
    }

    if (LevelOneLeftSideUser.RightTeamId !== 'null') {
      const f2Name = await User.findById(LevelOneLeftSideUser.RightTeamId)
      var RightSideId2 = f2Name.FullName

    } else {
      RightSideId2 = 'null'
    }


    var leftSideName1 = LevelOneLeftSideUser.LeftTeamName
    var RightSideName2 = LevelOneLeftSideUser.RightTeamName
  } else {
    leftSideName1 = 'null'
    leftSideId1 = 'null'
    RightSideName2 = 'null'
    RightSideId2 = 'null'
  }

  if (LevelOneRightSideUser !== 'null') {
    if (LevelOneRightSideUser.LeftTeamId !== 'null') {
      const fName = await User.findById(LevelOneRightSideUser.LeftTeamId)

      var AnotherLeftSideName2 = fName.RightTeamName
      var AnotherLeftSideId = fName.FullName
    } else {
      AnotherLeftSideName2 = 'null'
      AnotherLeftSideId = 'null'
    }

    if (LevelOneRightSideUser.RightTeamId !== 'null') {
      const f2Name = await User.findById(LevelOneRightSideUser.RightTeamId)

      var AnotherRightSideId = f2Name.FullName
      var AnotherRightSideName = f2Name.LeftTeamName
    } else {
      AnotherRightSideId = 'null'
      AnotherRightSideName = 'null'
    }
  } else {
    AnotherRightSideName = 'null'
    AnotherRightSideId = 'null'
    AnotherLeftSideName2 = 'null'
    AnotherLeftSideId = 'null'
  }

  // Third Step Line


  if (LevelOneLeftSideUser.LeftTeamId !== 'null' && LevelOneLeftSideUser.LeftTeamId !== undefined) {


    var fUserData1 = await User.findById(LevelOneLeftSideUser.LeftTeamId)


    if (fUserData1.LeftTeamId !== "null") {

      var firstLeftKaLeftName = "null"
      var firstLeftKaLeftSponser = "null"

      var againLeftUpper = await User.findById(fUserData1.LeftTeamId)

      firstLeftKaLeftName = againLeftUpper.FullName
      firstLeftKaLeftSponser = againLeftUpper.SponserCode
    }


    var firstLeftKaRightName = "null"
    var firstLeftKaRightSponser = "null"

    if (fUserData1.RightTeamId !== "null") {
      var againRightUpper = await User.findById(fUserData1.RightTeamId)


      firstLeftKaRightName = againRightUpper.FullName
      firstLeftKaRightSponser = againRightUpper.SponserCode

    }







    var OneLeftLineName = fUserData1.LeftTeamName









    var OneLeftLineId = fUserData1.LeftTeamId

    var OneRightLineName = fUserData1.RightTeamName
    var OneRightLineId = fUserData1.RightTeamId
  } else {
    OneLeftLineName = 'null'
    OneLeftLineId = 'null'
    OneRightLineName = 'null'
    OneRightLineId = 'null'
  }


  if (LevelOneLeftSideUser.RightTeamId !== 'null' && LevelOneLeftSideUser.RightTeamId !== undefined) {
    var fUserData2 = await User.findById(LevelOneLeftSideUser.RightTeamId)





    if (fUserData2.LeftTeamId !== "null") {

      var SecLeftKaLeftName = "null"
      var SecLeftKaLeftSponser = "null"

      var againLeftUpper = await User.findById(fUserData2.LeftTeamId)

      SecLeftKaLeftName = againLeftUpper.FullName
      SecLeftKaLeftSponser = againLeftUpper.SponserCode
    }


    var SecLeftKaRightName = "null"
    var SecLeftKaRightSponser = "null"

    if (fUserData2.RightTeamId !== "null") {
      var againRightUpper = await User.findById(fUserData2.RightTeamId)



      SecLeftKaRightName = againRightUpper.FullName
      SecLeftKaRightSponser = againRightUpper.SponserCode

    }

    var TwoLeftLineName = fUserData2.LeftTeamName
    var TwoLeftLineId = fUserData2.SponserCode

    var TwoRightLineName = fUserData2.RightTeamName
    var TwoRightLineId = fUserData2.RightTeamId
  } else {
    TwoLeftLineName = 'null'
    TwoLeftLineId = 'null'
    TwoRightLineName = 'null'
    TwoRightLineId = 'null'
  }


  if (LevelOneRightSideUser.LeftTeamId !== 'null' && LevelOneRightSideUser.LeftTeamId !== undefined) {
    var fUserData3 = await User.findById(LevelOneRightSideUser.LeftTeamId)


    var ThirdLeftKaLeftName = "null"
    var ThirdLeftKaLeftSponser = "null"

    if (fUserData3.LeftTeamId !== "null") {


      var againLeftUpper = await User.findById(fUserData3.LeftTeamId)

      ThirdLeftKaLeftName = againLeftUpper.FullName
      ThirdLeftKaLeftSponser = againLeftUpper.SponserCode
    }


    var ThirdLeftKaRightName = "null"
    var ThirdLeftKaRightSponser = "null"

    if (fUserData3.RightTeamId !== "null") {
      var againRightUpper = await User.findById(fUserData3.RightTeamId)


      ThirdLeftKaRightName = againRightUpper.FullName
      ThirdLeftKaRightSponser = againRightUpper.SponserCode

    }


    var ThreeLeftLineName = fUserData3.LeftTeamName
    var ThreeLeftLineId = fUserData3.SponserCode

    var ThreeRightLineName = fUserData3.RightTeamName
    var ThreeRightLineId = fUserData3.RightTeamId
  } else {
    ThreeLeftLineName = 'null'
    ThreeLeftLineId = 'null'
    ThreeRightLineName = 'null'
    ThreeRightLineId = 'null'
  }



  if (LevelOneRightSideUser.RightTeamId !== 'null' && LevelOneRightSideUser.RightTeamId !== undefined) {
    var fUserData4 = await User.findById(LevelOneRightSideUser.RightTeamId)

    var FourLeftKaLeftName = "null"
    var FourLeftKaLeftSponser = "null"

    if (fUserData4.LeftTeamId !== "null") {


      var againLeftUpper = await User.findById(fUserData4.LeftTeamId)

      FourLeftKaLeftName = againLeftUpper.FullName
      FourLeftKaLeftSponser = againLeftUpper.SponserCode
    }


    var FourLeftKaRightName = "null"
    var FourLeftKaRightSponser = "null"

    if (fUserData4.RightTeamId !== "null") {
      var againRightUpper = await User.findById(fUserData4.RightTeamId)

      FourLeftKaRightName = againRightUpper.FullName
      FourLeftKaRightSponser = againRightUpper.SponserCode

    }


    var FourLeftLineName = fUserData4.LeftTeamName
    var FourLeftLineId = fUserData4.SponserCode

    var FourRightLineName = fUserData4.RightTeamName
    var FourRightLineId = fUserData4.RightTeamId
  } else {
    FourLeftLineName = 'null'
    FourLeftLineId = 'null'
    FourRightLineName = 'null'
    FourRightLineId = 'null'
  }


  res.json({
    SuperUser: {
      id: superUserId,
      userName: superUserName
    },
    FirstLevel: {
      LeftLine: {
        id: LeftSideUserId,
        userName: LeftSideUserName
      },
      RightLine: {
        id: RightSideUserId,
        userName: RightSideUserName
      }
    },
    SecondLeve: {
      TotalLeft: {
        LeftLine: {
          id: leftSideName1,
          userName: leftSideId1
        },
        RightLine: {
          id: RightSideName2,
          userName: RightSideId2
        }
      },
      TotalRight: {
        LeftLine: {
          id: AnotherLeftSideName2,
          userName: AnotherLeftSideId
        },
        RightLine: {
          id: AnotherRightSideName,
          userName: AnotherRightSideId
        }
      }
    },
    ThirdLevel: {
      One: {
        LeftLine: {
          id: firstLeftKaLeftSponser,
          userName: firstLeftKaLeftName
        },
        RightLine: {
          id: firstLeftKaRightSponser,
          userName: firstLeftKaRightName
        }
      },
      Two: {
        LeftLine: {
          id: SecLeftKaLeftSponser,
          userName: SecLeftKaLeftName
        },
        RightLine: {
          id: SecLeftKaRightSponser,
          userName: SecLeftKaRightName
        }
      },
      Three: {
        LeftLine: {
          id: ThirdLeftKaLeftSponser,
          userName: ThirdLeftKaLeftName
        },
        RightLine: {
          id: ThirdLeftKaRightSponser,
          userName: ThirdLeftKaRightName
        }
      },
      Four: {
        LeftLine: {
          id: FourLeftKaLeftSponser,
          userName: FourLeftKaLeftName
        },
        RightLine: {
          id: FourLeftKaRightSponser,
          userName: FourLeftKaRightName
        }
      }
    }
  })
}

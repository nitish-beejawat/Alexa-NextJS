import mongoose from 'mongoose'

const Plan = mongoose.Schema(
  {
    PackageName: {
      default: 'null',
      type: 'String'
    },
    PackagePrice: {
      default: 'null',
      type: 'String'
    },
    PaackagePeriod: {
      default: 'null',
      type: 'String'
    },
    PackageMaximumLimit: {
      default: '300',
      type: 'String'
    },
    LykaToken: {
      default: 'null',
      type: 'String'
    },
    PackageReferalCommision:{
      default: '0',
      type: 'String'
    }
  },
  {
    timestamps: true
  }
)
export default mongoose.models.Plan || mongoose.model('Plan', Plan)

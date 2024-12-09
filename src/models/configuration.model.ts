import mongoose, { Document, Schema } from "mongoose";

interface IConfiguration extends Document {
  imageUrl: string;
  width: number;
  height: number;
  croppedImageUrl: string;
}


enum PhoneModel {
  iphone11,
  iphone12,
  iphone13,
  iphone14,
  iphone15,
}

enum CaseMaterial {
  silicon,
  polycarbonate
}

enum CaseFinish {
  smooth,
  textured,
}

enum CaseColor{
  black,
  rose,
  blue
}

const configurationSchema: Schema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true
  },
  width: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  model: {
    type: String,
    enum: Object.values(PhoneModel),
  },
  material:{
    type:String,
    enum: Object.values(CaseMaterial),
  },
  color:{
    type:String,
    enum:Object.values(CaseColor)
  },
  finish:{
    type:String,
    enum:Object.values(CaseFinish)
  },
  croppedImageUrl: {
    type: String,
  },
});

const Configuration = mongoose.models.Configuration || mongoose.model<IConfiguration>("Configuration", configurationSchema);

export default Configuration;
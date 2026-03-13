import mongoose, { Schema, model, models } from "mongoose";

export interface IMedia {
  public_id: string;
  url: string;
  type: "image" | "video";
  createdAt?: Date;
  updatedAt?: Date;
}

const mediaSchema = new Schema<IMedia>(
  {
    public_id: { type: String, required: true, unique: true },
    url: { type: String, required: true },
    type: { type: String, enum: ["image", "video"], required: true },
  },
  { timestamps: true },
);

const Media = models.Media || model<IMedia>("Media", mediaSchema);
export default Media;

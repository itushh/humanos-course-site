import { Schema, model } from "mongoose";

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },

    public_id: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },

    thumbnail: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    is_active: {
      type: Boolean,
      default: true,
    },

    tags: {
      type: [String],
      default: [],
    },

    duration: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Course = model("Course", courseSchema);

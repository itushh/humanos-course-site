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

    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },

    thumbnail: {
      type: String,
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

    duration_minutes: {
      type: Number,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Course = model("Course", courseSchema);

import { Schema, model } from "mongoose";

const chapterSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 200,
    },

    timestamp: {
      type: String,
      required: true,
    },

    duration: {
      type: String,
      required: true,
    },
  },
);

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

    chapters: {
      type: [chapterSchema],
      default: [],
    },

    guide: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      min: 0,
      max: 5
    },

    difficulty: {
      type: String,
      required: true,
    },

    objectives: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true,
  }
);

export const Course = model("Course", courseSchema);
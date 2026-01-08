import { Course } from "../models/course.model.js";

export const getOne = async (req, res) => {
  try {
    const { slug } = req.params;

    // 1. Find course
    const course = await Course.findOne({ slug, is_active: true });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // 2. Response
    return res.status(200).json({
      success: true,
      course: course,
    });
  } catch (error) {
    console.error("error in enroll.course.controller.js : ", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    // 1. Find all active courses
    const courses = await Course.find({ is_active: true });

    // 2. Response
    return res.status(200).json({
      success: true,
      count: courses.length,
      courses: courses,
    });
  } catch (error) {
    console.error("error in getAll.course.controller.js : ", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

/**
 * GET /api/course/enroll/:slug
 * - Fetch course by slug
 * - If free course, auto-enroll user
 */
export const enroll = async (req, res) => {
  try {
    const { slug } = req.params;
    const user = req.user;

    // 1. Find course
    const course = await Course.findOne({ slug, is_active: true });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // 2. If course is FREE, enroll user
    if (course.price === 0) {
      const alreadyEnrolled = user.courses_enrolled.some(
        (c) => c.courseId.toString() === course._id.toString()
      );

      if (!alreadyEnrolled) {
        user.courses_enrolled.push({
          courseId: course._id,
          status: "pending",
          payment_status: "paid",
        });

        await user.save();
      }
    }

    // 3. Response
    return res.status(200).json({
      success: true,
      data: {
        course,
        enrolled: user.courses_enrolled.some(
          (c) => c.courseId.toString() === course._id.toString()
        ),
      },
    });
  } catch (error) {
    console.error("error in enroll.course.controller.js : ", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

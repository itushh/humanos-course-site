import { generateSignedUrl } from "../lib/cloudinary.js";
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

export const accessCourse = async (req, res) => {
  try {
    const { slug } = req.params;
    const user = req.user;

    // 1. Find course
    const course = await Course.findOne({
      slug,
      is_active: true,
    }).select("public_id title");

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // 2. Check enrollment
    const enrollment = user.courses_enrolled.find(
      (c) => c.courseId.toString() === course._id.toString()
    );

    if (!enrollment) {
      return res.status(403).json({
        success: false,
        message: "You are not enrolled in this course",
      });
    }

    // 3. Check payment
    if (enrollment.payment_status !== "paid") {
      return res.status(402).json({
        success: false,
        message: "Payment not completed",
      });
    }

    // 4. Get client IP (important for token restriction)
    const clientIp = req.headers["x-forwarded-for"]?.split(",")[0] || req.ip;

    // 5. Generate signed Cloudinary HLS URL (1 hour)
    const accessUrl = generateSignedUrl(
      course.public_id,
      60 * 60, // 1 hour
      clientIp
    );

    // 6. Response
    return res.status(200).json({
      success: true,
      data: {
        title: course.title,
        access_url: accessUrl,
        expires_in: 3600,
      },
    });
  } catch (error) {
    console.error("error in accessCourse.controller.js :", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user;

    // 1. Transform response
    const enrolledCourses = user.courses_enrolled
      .filter((c) => c.courseId)
      .map((c) => ({
        _id: c.courseId._id,
        title: c.courseId.title,
        slug: c.courseId.slug,
        thumbnail: c.courseId.thumbnail,
        price: c.courseId.price,
        duration: c.courseId.duration,
        tags: c.courseId.tags,
        description: c.courseId.description,
        enrollment_status: c.status,
        payment_status: c.payment_status,
      }));

    // 2. Response
    return res.status(200).json({
      success: true,
      count: enrolledCourses.length,
      courses: enrolledCourses,
    });
  } catch (error) {
    console.error("error in course.controller.js >> getEnrolledCourses :", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

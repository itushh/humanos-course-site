import { create } from "zustand";

const BASE_URL = "http://localhost:3001/api/course";

export const useAccountStore = create((set) => ({
  enrolledCoursesData: null,
  isFetchingEnrolledCourses: false,
  errorFetchingEnrolledCourses: null,
  pendingCourses: null,
  completedCourses: null,

  fetchEnrolledCourses: async () => {
    set({
      isFetchingEnrolledCourses: true,
      errorFetchingEnrolledCourses: null,
    });
    try {
      const res = await fetch(`${BASE_URL}/enrolled`, {
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        set({
          isFetchingEnrolledCourses: false,
          errorFetchingEnrolledCourses: data.message,
        });
        return;
      }

      const courses = data.courses;

      const grouped = {
        pending: [],
        completed: [],
      };

      courses.forEach((course) => {
        if (course.enrollment_status === "pending") {
          grouped.pending.push(course);
        } else if (course.enrollment_status === "completed") {
          grouped.completed.push(course);
        }
      });

      set({
        enrolledCoursesData: courses,
        pendingCourses: grouped.pending,
        completedCourses: grouped.completed,
        isFetchingEnrolledCourses: false,
      });
    } catch (error) {
      set({
        isFetchingEnrolledCourses: false,
        errorFetchingEnrolledCourses: "Couldn't fetch enrolled courses",
      });
      console.log({ error });
    }
  },
}));

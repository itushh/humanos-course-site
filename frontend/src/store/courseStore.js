import { create } from "zustand";

const BASE_URL = "http://localhost:3001/api/course";

export const useCourseStore = create((set) => ({
  courseData: null,
  error: null,
  isFetchingCourseData: false,
  isEnrolling: false,
  errorEnrolling: null,
  isEnrolled: false,

  fetchCourse: async (url) => {
    set({ isFetchingCourseData: true });
    const res = await fetch(`${BASE_URL}/${url}`);
    if (!res.ok) {
      set({ error: "Something went wrong", isFetchingCourseData: false });
      return;
    }
    const data = await res.json();
    set({ courseData: data.course, isFetchingCourseData: false });
  },

  clearEnrollmentError: () => {
    set({ errorEnrolling: false })
  },

  enrollInCourse: async (url) => {
    set({ isEnrolling: true, errorEnrolling: false });
    try {
      const res = await fetch(`${BASE_URL}/enroll/${url}`, {
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        set({ isEnrolling: false, errorEnrolling: data.message });
      } else {
        set({ isEnrolling: false, isEnrolled: true })
      }

    } catch (error) {
      console.log(error);
      set({ error: "Somthing went wrong", isEnrolling: false });
    }
  },
}));

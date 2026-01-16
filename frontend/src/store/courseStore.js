import { create } from "zustand";

const BASE_URL = "http://localhost:3001/api/course";

export const useCourseStore = create((set) => ({
  allCoursesData: null,
  errorFetchingAllCourses: null,
  isFetchingAllCourses: false,

  courseData: null,
  error: null,
  isFetchingCourseData: false,
  
  errorEnrolling: null,
  isEnrolling: false,
  isEnrolled: false,

  isAccessingCourse: false,
  errorAccessing: null,
  courseContent: null,

  fetchCourse: async (url) => {
    set({ isFetchingCourseData: true });
    const res = await fetch(`${BASE_URL}/${url}`);
    if (!res.ok) {
      set({ error: "Something went wrong", isFetchingCourseData: false });
      return;
    }
    const data = await res.json();
    set({ courseData: data.course, isFetchingCourseData: false });
    console.log(data.course)
  },

  clearEnrollmentError: () => {
    set({ errorEnrolling: false });
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
        set({ isEnrolling: false, isEnrolled: true });
      }
    } catch (error) {
      console.log(error);
      set({ error: "Somthing went wrong", isEnrolling: false });
    }
  },

  accessCourse: async (url) => {
    set({ isAccessingCourse: true, errorAccessing: null });
    try {
      const res = await fetch(`${BASE_URL}/access/${url}`, {
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        set({ isAccessingCourse: false, errorAccessing: data.message });
        return;
      }

      set({ isAccessingCourse: false, courseContent: data.data });
    } catch {
      set({
        isAccessingCourse: false,
        errorAccessing: "Something went wrong!",
      });
    }
  },
}));

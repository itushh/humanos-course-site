import { create } from "zustand";

const BASE_URL = "http://localhost:3001/api/course";

export const useCourseStore = create((set) => ({
  courseData: null,
  error: null,
  isFetchingCourseData: false,
  fetchCourse: async (url) => {
    set({ isFetchingCourseData: true });
    console.log(`${BASE_URL}/${url}`);
    const res = await fetch(`${BASE_URL}/${url}`);
    if (!res.ok) {
      set({ error: "Something went wrong", isFetchingCourseData: false });
      return;
    }
    const data = await res.json();
    set({ courseData: data.course, isFetchingCourseData: false });
  },
}));

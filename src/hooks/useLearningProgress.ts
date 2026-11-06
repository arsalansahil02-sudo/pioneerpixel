import { useState, useEffect } from 'react';
import type { StudentProgressState } from '../types';
import { INITIAL_PROGRESS_STATE, COURSES_DATA } from '../data/learningHubData';

const STORAGE_KEY = 'bca_skill_hub_learning_progress_v2';

export function useLearningProgress() {
  const [progress, setProgress] = useState<StudentProgressState>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Could not read learning progress from localStorage', e);
    }
    return INITIAL_PROGRESS_STATE;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.warn('Could not save learning progress to localStorage', e);
    }
  }, [progress]);

  const toggleCompleteLesson = (lessonId: string) => {
    setProgress((prev) => {
      const exists = prev.completedLessonIds.includes(lessonId);
      const nextCompleted = exists
        ? prev.completedLessonIds.filter((id) => id !== lessonId)
        : [...prev.completedLessonIds, lessonId];
      return {
        ...prev,
        completedLessonIds: nextCompleted,
      };
    });
  };

  const isLessonCompleted = (lessonId: string) => {
    return progress.completedLessonIds.includes(lessonId);
  };

  const toggleEnrollCourse = (courseId: string) => {
    setProgress((prev) => {
      const exists = prev.enrolledCourseIds.includes(courseId);
      const nextEnrolled = exists
        ? prev.enrolledCourseIds.filter((id) => id !== courseId)
        : [...prev.enrolledCourseIds, courseId];
      return {
        ...prev,
        enrolledCourseIds: nextEnrolled,
      };
    });
  };

  const isCourseEnrolled = (courseId: string) => {
    return progress.enrolledCourseIds.includes(courseId);
  };

  const toggleBookmarkCourse = (courseId: string) => {
    setProgress((prev) => {
      const exists = prev.bookmarkedCourseIds.includes(courseId);
      const next = exists
        ? prev.bookmarkedCourseIds.filter((id) => id !== courseId)
        : [...prev.bookmarkedCourseIds, courseId];
      return {
        ...prev,
        bookmarkedCourseIds: next,
      };
    });
  };

  const isCourseBookmarked = (courseId: string) => {
    return progress.bookmarkedCourseIds.includes(courseId);
  };

  const toggleBookmarkNote = (noteId: string) => {
    setProgress((prev) => {
      const exists = prev.bookmarkedNoteIds.includes(noteId);
      const next = exists
        ? prev.bookmarkedNoteIds.filter((id) => id !== noteId)
        : [...prev.bookmarkedNoteIds, noteId];
      return {
        ...prev,
        bookmarkedNoteIds: next,
      };
    });
  };

  const isNoteBookmarked = (noteId: string) => {
    return progress.bookmarkedNoteIds.includes(noteId);
  };

  const recordLastStudiedLesson = (params: {
    courseId: string;
    chapterId: string;
    lessonId: string;
    lessonTitle: string;
    courseTitle: string;
  }) => {
    setProgress((prev) => ({
      ...prev,
      lastStudiedLesson: {
        ...params,
        timestamp: 'Just now',
      },
    }));
  };

  // Helper calculation for course percentage
  const getCourseProgress = (courseId: string) => {
    const course = COURSES_DATA.find((c) => c.id === courseId);
    if (!course) return { completedCount: 0, totalCount: 0, percentage: 0 };

    const allLessonIds = course.chapters.flatMap((ch) => ch.lessons.map((l) => l.id));
    const totalCount = allLessonIds.length;
    if (totalCount === 0) return { completedCount: 0, totalCount: 0, percentage: 0 };

    const completedCount = allLessonIds.filter((id) => progress.completedLessonIds.includes(id)).length;
    const percentage = Math.round((completedCount / totalCount) * 100);

    return { completedCount, totalCount, percentage };
  };

  const totalPossibleLessons = COURSES_DATA.flatMap((c) => c.chapters.flatMap((ch) => ch.lessons)).length;
  const totalCompletedLessons = progress.completedLessonIds.length;
  const overallPercentage = totalPossibleLessons > 0 ? Math.round((totalCompletedLessons / totalPossibleLessons) * 100) : 0;

  return {
    progress,
    toggleCompleteLesson,
    isLessonCompleted,
    toggleEnrollCourse,
    isCourseEnrolled,
    toggleBookmarkCourse,
    isCourseBookmarked,
    toggleBookmarkNote,
    isNoteBookmarked,
    recordLastStudiedLesson,
    getCourseProgress,
    totalCompletedLessons,
    totalPossibleLessons,
    overallPercentage,
  };
}

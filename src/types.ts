// types.ts
export type Student = {
  id: string;
  name: string;
  age: number;
  class: string;
  contact: string;
  department: string;
  courses: string[]; // Changed from 'course' to 'courses' array
};

export type StudentFormData = {
  name: string;
  age: number | string;
  class: string;
  contact: string;
  department: string;
  courses: string[]; // Changed from 'course' to 'courses' array
};

export type FormErrors = {
  name?: string;
  age?: string;
  class?: string;
  contact?: string;
  department?: string;
  courses?: string;
};

// List of available courses
export const AVAILABLE_COURSES = [
  'Web Development',
  'Machine Learning',
  'Data Science',
  'Mobile App Development',
  'Cloud Computing',
  'Cybersecurity',
  'Database Management',
  'Networking',
  'Software Engineering',
  'Artificial Intelligence',
];

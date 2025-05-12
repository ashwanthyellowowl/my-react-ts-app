// StudentManagementContainer.tsx
import { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import StudentListComponent from '../components/StudentListComponent';
import AddStudentComponent from '../components/AddStudentComponent';
import EditStudentComponent from '../components/EditStudentComponent';
import DeleteStudentComponent from '../components/DeleteStudentComponent';
import {
  Student,
  StudentFormData,
  FormErrors,
  AVAILABLE_COURSES,
} from '../types';

// Define possible states
type FetchState = 'empty' | 'loading' | 'error' | 'data';

const StudentManagementContainer = () => {
  // State management
  const [students, setStudents] = useState<Student[]>([]);
  const [fetchState, setFetchState] = useState<FetchState>('loading');
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterCriteria, setFilterCriteria] = useState<string>('');

  // Dialog states
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [formData, setFormData] = useState<StudentFormData>({
    name: '',
    age: '',
    class: '',
    contact: '',
    department: '',
    courses: [],
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [departmentFilter, setDepartmentFilter] = useState('');

  // Simulate fetching data
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setFetchState('loading');

        // Simulate API call

        // Mock data - replace with actual API call
        const mockData: Student[] = [
          {
            id: '1',
            name: 'John Doe',
            age: 20,
            class: 'Senior',
            contact: '123-456-7890',
            department: 'Computer Science',
            courses: ['Web Development', 'Database Management'],
          },
          {
            id: '2',
            name: 'Jane Smith',
            age: 19,
            class: 'Junior',
            contact: '123-456-7891',
            department: 'Engineering',
            courses: ['Mechanical Design', 'Cybersecurity'],
          },
        ];

        setStudents(mockData);
        setFetchState(mockData.length > 0 ? 'data' : 'empty');
      } catch (err) {
        console.error('Error fetching students:', err);
        setError('Failed to fetch students. Please try again later.');
        setFetchState('error');
      }
    };

    fetchStudents();
  }, []);

  // Form validation
  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    let isValid = true;

    // Name validation
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    } else if (formData.name.length < 2) {
      errors.name = 'Name must be at least 2 characters';
      isValid = false;
    }

    // Age validation
    const ageValue = Number(formData.age);
    if (!formData.age) {
      errors.age = 'Age is required';
      isValid = false;
    } else if (isNaN(ageValue) || ageValue <= 0) {
      errors.age = 'Age must be a positive number';
      isValid = false;
    } else if (ageValue < 16 || ageValue > 100) {
      errors.age = 'Age must be between 16 and 100';
      isValid = false;
    }

    // Class validation
    if (!formData.class.trim()) {
      errors.class = 'Class is required';
      isValid = false;
    }

    // Contact validation
    if (!formData.contact.trim()) {
      errors.contact = 'Contact is required';
      isValid = false;
    } else if (!/^\d{3}-\d{3}-\d{4}$/.test(formData.contact)) {
      errors.contact = 'Contact must be in format XXX-XXX-XXXX';
      isValid = false;
    }

    // Department validation
    if (!formData.department.trim()) {
      errors.department = 'Department is required';
      isValid = false;
    }

    // Courses validation
    if (formData.courses.length === 0) {
      errors.courses = 'At least one course must be selected';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  // Dialog handlers
  const handleOpenAddDialog = () => {
    setFormData({
      name: '',
      age: '',
      class: '',
      contact: '',
      department: '',
      courses: [],
    });
    setFormErrors({});
    setOpenAddDialog(true);
  };

  const handleOpenEditDialog = (student: Student) => {
    setCurrentStudent(student);
    setFormData({
      name: student.name,
      age: student.age.toString(),
      class: student.class,
      contact: student.contact,
      department: student.department,
      courses: student.courses,
    });
    setFormErrors({});
    setOpenEditDialog(true);
  };

  const handleOpenDeleteDialog = (student: Student) => {
    setCurrentStudent(student);
    setOpenDeleteDialog(true);
  };

  const handleCloseDialogs = () => {
    setOpenAddDialog(false);
    setOpenEditDialog(false);
    setOpenDeleteDialog(false);
    setFilterDialogOpen(false);
    setFormErrors({});
  };

  // Form handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle checkbox changes for courses
  const handleCourseChange = (course: string, checked: boolean) => {
    setFormData(prev => {
      if (checked) {
        return {
          ...prev,
          courses: [...prev.courses, course],
        };
      } else {
        return {
          ...prev,
          courses: prev.courses.filter(c => c !== course),
        };
      }
    });
  };

  // Add student handler
  const handleAddStudent = () => {
    if (!validateForm()) return;

    const newStudent: Student = {
      ...formData,
      id: Date.now().toString(),
      age: Number(formData.age),
    };

    setStudents(prevStudents => [...prevStudents, newStudent]);
    setFetchState('data');
    handleCloseDialogs();
  };

  // Edit student handler
  const handleEditStudent = () => {
    if (!validateForm() || !currentStudent) return;

    const updatedStudent: Student = {
      ...formData,
      id: currentStudent.id,
      age: Number(formData.age),
    };

    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.id === currentStudent.id ? updatedStudent : student,
      ),
    );
    handleCloseDialogs();
  };

  // Delete student handler
  const handleDeleteStudent = () => {
    if (currentStudent) {
      setStudents(prevStudents =>
        prevStudents.filter(student => student.id !== currentStudent.id),
      );

      // Update fetchState if we're deleting the last student
      if (students.length === 1) {
        setFetchState('empty');
      }
    }
    handleCloseDialogs();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  // Filter handlers
  const handleFilter = () => {
    setFilterCriteria(departmentFilter);
    handleCloseDialogs();
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDepartmentFilter(e.target.value);
  };

  // Filter students based on search query and filter criteria
  const filteredStudents = students.filter(student => {
    const matchesSearch =
      searchQuery === '' ||
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.courses.some(course =>
        course.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesFilter =
      !filterCriteria || student.department === filterCriteria;

    return matchesSearch && matchesFilter;
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Student Management System
      </Typography>

      {/* Main List Component - Always shown */}
      <StudentListComponent
        students={filteredStudents}
        fetchState={fetchState}
        error={error}
        searchQuery={searchQuery}
        departmentFilter={departmentFilter}
        filterDialogOpen={filterDialogOpen}
        handleOpenAddDialog={handleOpenAddDialog}
        handleOpenEditDialog={handleOpenEditDialog}
        handleOpenDeleteDialog={handleOpenDeleteDialog}
        handleSearchChange={handleSearchChange}
        setFilterDialogOpen={setFilterDialogOpen}
        handleFilterChange={handleFilterChange}
        handleFilterSubmit={handleFilter}
        handleCloseDialogs={handleCloseDialogs}
      />

      {/* Dialog Components - Conditionally rendered based on state */}
      {openAddDialog && (
        <AddStudentComponent
          open={openAddDialog}
          formData={formData}
          formErrors={formErrors}
          availableCourses={AVAILABLE_COURSES}
          handleClose={handleCloseDialogs}
          handleInputChange={handleInputChange}
          handleCourseChange={handleCourseChange}
          handleSubmit={handleAddStudent}
        />
      )}

      {openEditDialog && currentStudent && (
        <EditStudentComponent
          open={openEditDialog}
          formData={formData}
          formErrors={formErrors}
          availableCourses={AVAILABLE_COURSES}
          handleClose={handleCloseDialogs}
          handleInputChange={handleInputChange}
          handleCourseChange={handleCourseChange}
          handleSubmit={handleEditStudent}
        />
      )}

      {openDeleteDialog && currentStudent && (
        <DeleteStudentComponent
          open={openDeleteDialog}
          student={currentStudent}
          handleClose={handleCloseDialogs}
          handleDelete={handleDeleteStudent}
        />
      )}
    </Container>
  );
};

export default StudentManagementContainer;

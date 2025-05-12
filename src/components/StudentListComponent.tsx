// StudentListComponent.tsx
import React from 'react';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  InputAdornment,
  TextField,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import { Student } from '../types';

type StudentListComponentProps = {
  students: Student[];
  fetchState: 'empty' | 'loading' | 'error' | 'data';
  error: string | null;
  searchQuery: string;
  departmentFilter: string;
  filterDialogOpen: boolean;
  handleOpenAddDialog: () => void;
  handleOpenEditDialog: (student: Student) => void;
  handleOpenDeleteDialog: (student: Student) => void;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFilterDialogOpen: (open: boolean) => void;
  handleFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFilterSubmit: () => void;
  handleCloseDialogs: () => void;
};

const StudentListComponent: React.FC<StudentListComponentProps> = ({
  students,
  fetchState,
  error,
  searchQuery,
  departmentFilter,
  filterDialogOpen,
  handleOpenAddDialog,
  handleOpenEditDialog,
  handleOpenDeleteDialog,
  handleSearchChange,
  setFilterDialogOpen,
  handleFilterChange,
  handleFilterSubmit,
  handleCloseDialogs,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Helper function to render courses as chips
  const renderCourseChips = (courses: string[]) => (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
      {courses.map(course => (
        <Chip
          key={course}
          label={course}
          size="small"
          color="primary"
          variant="outlined"
        />
      ))}
    </Box>
  );

  // Render mobile card view for students
  const renderMobileView = () => (
    <Box>
      {students.length === 0 ? (
        <Typography align="center" sx={{ mt: 4 }}>
          No Records Available
        </Typography>
      ) : (
        students.map(student => (
          <Card key={student.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">{student.name}</Typography>
              <Typography variant="body2">Age: {student.age}</Typography>
              <Typography variant="body2">Class: {student.class}</Typography>
              <Typography variant="body2">
                Contact: {student.contact}
              </Typography>
              <Typography variant="body2">
                Department: {student.department}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Courses:
              </Typography>
              {renderCourseChips(student.courses)}
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton
                  color="primary"
                  onClick={() => handleOpenEditDialog(student)}
                  size="small"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => handleOpenDeleteDialog(student)}
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );

  // Render desktop table view for students
  const renderDesktopView = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>S.No</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Class</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Courses</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} align="center">
                No Records Available
              </TableCell>
            </TableRow>
          ) : (
            students.map((student, index) => (
              <TableRow key={student.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.age}</TableCell>
                <TableCell>{student.class}</TableCell>
                <TableCell>{student.contact}</TableCell>
                <TableCell>{student.department}</TableCell>
                <TableCell>{renderCourseChips(student.courses)}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenEditDialog(student)}
                    size="small"
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton
                    color="error"
                    onClick={() => handleOpenDeleteDialog(student)}
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );

  // Render appropriate UI based on state
  const renderContent = () => {
    switch (fetchState) {
      case 'loading':
        return (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
            <CircularProgress />
          </Box>
        );

      case 'error':
        return (
          <Box sx={{ my: 2 }}>
            <Alert severity="error">{error}</Alert>
          </Box>
        );

      case 'empty':
        return (
          <>
            {/* Header with Add Student button */}
            <Box
              sx={{
                mb: 2,
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'space-between',
                gap: 2,
              }}
            >
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpenAddDialog}
                sx={{ alignSelf: isMobile ? 'stretch' : 'flex-start' }}
              >
                Add Student
              </Button>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
              <Typography variant="h6">
                No students to display. Add a student to get started.
              </Typography>
            </Box>
          </>
        );

      case 'data':
      default:
        return (
          <>
            {/* Header with Add Student button and Search/Filter */}
            <Box
              sx={{
                mb: 2,
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'space-between',
                gap: 2,
              }}
            >
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpenAddDialog}
                sx={{ alignSelf: isMobile ? 'stretch' : 'flex-start' }}
              >
                Add Student
              </Button>

              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  flexDirection: isMobile ? 'column' : 'row',
                }}
              >
                <TextField
                  placeholder="Search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  variant="outlined"
                  startIcon={<FilterIcon />}
                  onClick={() => setFilterDialogOpen(true)}
                >
                  Filter
                </Button>
              </Box>
            </Box>

            {/* Student List - Table or Cards based on viewport */}
            <Box sx={{ mt: 3 }}>
              {isMobile ? renderMobileView() : renderDesktopView()}
            </Box>
          </>
        );
    }
  };

  return (
    <Box>
      {renderContent()}

      {/* Filter Dialog */}
      <Dialog open={filterDialogOpen} onClose={handleCloseDialogs}>
        <DialogTitle>Filter Students</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Department"
            value={departmentFilter}
            onChange={handleFilterChange}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogs}>Cancel</Button>
          <Button onClick={handleFilterSubmit} variant="contained">
            Apply Filter
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StudentListComponent;

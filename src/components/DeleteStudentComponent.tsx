// DeleteStudentComponent.tsx
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import { Student } from '../types';

type DeleteStudentComponentProps = {
  open: boolean;
  student: Student;
  handleClose: () => void;
  handleDelete: () => void;
};

const DeleteStudentComponent: React.FC<DeleteStudentComponentProps> = ({
  open,
  student,
  handleClose,
  handleDelete,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete Student</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete {student.name}?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDelete} variant="contained" color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteStudentComponent;

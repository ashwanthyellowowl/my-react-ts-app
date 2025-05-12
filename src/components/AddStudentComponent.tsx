// AddStudentComponent.tsx
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  FormHelperText,
  Checkbox,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { StudentFormData, FormErrors } from '../types';

type AddStudentComponentProps = {
  open: boolean;
  formData: StudentFormData;
  formErrors: FormErrors;
  availableCourses: string[];
  handleClose: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCourseChange: (course: string, checked: boolean) => void;
  handleSubmit: () => void;
};

const AddStudentComponent: React.FC<AddStudentComponentProps> = ({
  open,
  formData,
  formErrors,
  availableCourses,
  handleClose,
  handleInputChange,
  handleCourseChange,
  handleSubmit,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Add Student</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 0.5 }}>
          <Grid>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              margin="dense"
              error={!!formErrors.name}
              helperText={formErrors.name}
              required
            />
          </Grid>
          <Grid>
            <TextField
              fullWidth
              label="Age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleInputChange}
              margin="dense"
              error={!!formErrors.age}
              helperText={formErrors.age}
              required
            />
          </Grid>
          <Grid>
            <TextField
              fullWidth
              label="Class"
              name="class"
              value={formData.class}
              onChange={handleInputChange}
              margin="dense"
              error={!!formErrors.class}
              helperText={formErrors.class}
              required
            />
          </Grid>
          <Grid>
            <TextField
              fullWidth
              label="Contact (XXX-XXX-XXXX)"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              margin="dense"
              error={!!formErrors.contact}
              helperText={formErrors.contact}
              required
              placeholder="123-456-7890"
            />
          </Grid>
          <Grid>
            <TextField
              fullWidth
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              margin="dense"
              error={!!formErrors.department}
              helperText={formErrors.department}
              required
            />
          </Grid>
          <Grid>
            <FormControl
              required
              error={!!formErrors.courses}
              component="fieldset"
              sx={{ width: '100%' }}
            >
              <FormLabel component="legend">Courses</FormLabel>
              <FormGroup row>
                {availableCourses.map(course => (
                  <FormControlLabel
                    key={course}
                    control={
                      <Checkbox
                        checked={formData.courses.includes(course)}
                        onChange={e =>
                          handleCourseChange(course, e.target.checked)
                        }
                        name={course}
                      />
                    }
                    label={course}
                    sx={{ width: isMobile ? '100%' : '33%' }}
                  />
                ))}
              </FormGroup>
              {formErrors.courses && (
                <FormHelperText>{formErrors.courses}</FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddStudentComponent;

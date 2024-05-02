import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';
function App() {
  const [gender, setGender] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [score, setScore] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [inputColor, setInputColor] = useState('initial');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [genderError, setGenderError] = useState('');
  const theme = useTheme();

  const [rows, setRows] = useState([
    {
      "id": 1,
      "firstName": "Wilbur",
      "lastName": "Rogers",
      "gender": "Male",
      "score": 80
    },
    {
      "id": 2,
      "firstName": "Lorenzo",
      "lastName": "Underwood",
      "gender": "Male",
      "score": 40.5
    },
    {
      "id": 3,
      "firstName": "Pearl",
      "lastName": "Johnson",
      "gender": "Female",
      "score": 60.45
    },
    {
      "id": 4,
      "firstName": "Russell",
      "lastName": "Patrick",
      "gender": "Male",
      "score": 70.5
    },
    {
      "id": 5,
      "firstName": "Nicolas",
      "lastName": "Watts",
      "gender": "Male",
      "score": 34.25
    },
    {
      "id": 6,
      "firstName": "Anny",
      "lastName": "Bates",
      "gender": "Female",
      "score": 74.5
    }
  ]);

  // const handleChange = (event) => {
  //   setGender(event.target.value);
  // };

  const handleSubmit = (event) => {
    event.preventDefault();

    setFirstNameError('');
    setLastNameError('');
    setGenderError('');
    setErrorMessage('');
    
    //fristname
    if (!firstName.trim()) {
      setFirstNameError('First Name is required');
      
    }

    //lastname
    if (!lastName.trim()) {
      setLastNameError('Last Name is required');
      
    }
   
    // Gender validation
  if (!gender) {
    setGenderError('Gender is required');
    
  }

  //score
     if (score < 0) {
      setErrorMessage('Minimum is 0');
      setInputColor('red');
      return;
    } else if (score > 100) {
      setErrorMessage('Maximum is 100');
      setInputColor('red');
      return;
    }
    setInputColor('initial');
  
    const newRow = {
    firstName: firstName || 'XXX',
    lastName: lastName || 'XXX',
    gender: gender || 'XXX',
    score: score || 'Unknow',
  };

    //tb
    if (editMode) {
      const updatedRows = [...rows];
      updatedRows[editIndex] = newRow;
      setRows(updatedRows);
      setEditMode(false);
    } else {
      // const formData = new FormData(event.target);
      // const formDataObject = {};
      // formData.forEach((value, key) => {
      //   formDataObject[key] = value;
      // });
      // setRows([...rows, formDataObject]);
       setRows([...rows, newRow]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setGender('');
    setScore('');
  };

  const handleEdit = (index) => {
    const selectedRow = rows[index];
    setFirstName(selectedRow.firstName);
    setLastName(selectedRow.lastName);
    setGender(selectedRow.gender);
    setScore(selectedRow.score);
    setEditMode(true);
    setEditIndex(index);
  };

  const handleCancel = () => {
  resetForm(); 
  setEditMode(false); 
  setEditIndex(null); 
  };

  return (
    <div >
      <formData >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            '& > :not(style)': { m: 1 },
            width: '50ch',
            justifyContent: 'center',
            alignItems: 'center',
            padding:'20px',
            margin: 'auto '
          }}
          noValidate
          autoComplete="off"
        >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                required
                id="outlined-required-first-name"
                name="firstName"
                label="First Name"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                error={Boolean(firstNameError)}
                helperText={firstNameError}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                id="outlined-required-last-name"
                name="lastName"
                label="Last Name"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                error={Boolean(lastNameError)} // Display error if lastNameError is not empty
                helperText={lastNameError} // Show error message for LastName field
              />
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  required
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Gender"
                  value={gender}
                  onChange={(e) => {
                    setGender(e.target.value);
                    setGenderError(''); 
                  }}
                  name="gender"
                   error={Boolean(genderError)}
                   helperText={genderError}
                >
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Unknown">Unknown</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                id="outlined-required-Score"
                name="score"
                label="Score"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                fullWidth
                type="number"
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 0, max: 100 }}
                value={score}
                onChange={(e) => setScore(e.target.value)}
                style={{ borderColor: inputColor }} // Set border color dynamically
                error={Boolean(errorMessage)} // Show error if there's a message
                helperText={errorMessage} // Show error message
              />
            </Grid>
            <Grid item xs={6}>
               <Button variant="contained" type="submit">{editMode ? 'Edit' : 'Add'}</Button>
            </Grid>
            <Grid item xs={6}>
               <Button variant="outlined" type="reset" onClick={handleCancel} >Cancel</Button>
            </Grid>
          </Grid>
        </Box>
      </formData>

      <TableContainer component={Paper} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Table sx={{ maxWidth: 900, border: '1px solid #000',  }} aria-label="customized table">
          <TableHead sx={{ backgroundColor: theme.palette.primary.main, color: '#FFF' }}>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Score</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody sx={{ backgroundColor: theme.palette.background.paper }}>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(index)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>{row.firstName}</TableCell>
                <TableCell>{row.lastName}</TableCell>
                 <TableCell>
                    <Tooltip title={row.gender}>
                      <span>{row.gender === 'Female' ? 'F' : row.gender === 'Male' ? 'M' : 'U'}</span>
                    </Tooltip>
                  </TableCell>
                <TableCell>{parseFloat(row.score).toFixed(2)}</TableCell>
                
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>
    </div>
  );
}

export default App;

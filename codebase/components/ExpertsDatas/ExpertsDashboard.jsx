import React, { useState } from 'react';
import { Grid, Button, Dialog, DialogTitle, DialogContent, TextField, InputAdornment, IconButton, DialogActions,Paper  } from '@mui/material';
import { styled, ThemeProvider } from '@mui/system';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import RootContainer from '../styles/RootContainerStyles';
import ContentContainer from '../styles/ContentContainerStyles';
import theme from '../styles/theme';
import { redirectToPage } from '../../utils/redirect';
import ExpertsProfile from './ExpertsProfile';
import Cards from './Cards';
import AvailabilityForm from './AvailabilityForm';







// Custom styled components for the root container, content container, and dialog
const CustomRootContainer = styled(RootContainer)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
}));

const CustomContentContainer = styled(ContentContainer)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    padding: '2rem',
    [theme.breakpoints.up('lg')]: {
        padding: '4rem',
    },
}));

const CustomDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        backgroundColor: theme.palette.secondary.main,
    },
    '& .MuiInputLabel-outlined': {
        color: theme.palette.text.primary,
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: theme.palette.text.primary,
        },
    '& .MuiDialogTitle-root': {
        color: theme.palette.text.primary,
    },
    },
}));

// Button styles for cancel and save buttons
const buttonStyles = {
    cancelButton: {
        color: theme.palette.text.secondary,
        backgroundColor: theme.palette.tertiary.main,
        // Add more styling properties as needed
    },
    saveButton: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.quinary.main,
        // Add more styling properties as needed
    },
};

const ExpertsDashboard = ({ isLoggedIn }) => {
    // State variables
    const [expertsProfile, setExpertsProfile] = useState({
        name: 'Dr.Anaya',
        username: 'Anaya',
        email: 'Anaya@gmail.com',
        password: '********',
    });

    const [openDialog, setOpenDialog] = useState(false);
    const [editedProfile, setEditedProfile] = useState({ ...expertsProfile });
    const [showPassword, setShowPassword] = useState(false);

    // Open the profile edit dialog
    const handleOpenDialog = () => {
        setOpenDialog(true);
        setEditedProfile({ ...expertsProfile });
    };

    // Close the profile edit dialog
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    // Save the edited profile
    const handleSaveProfile = () => {
        setExpertsProfile(editedProfile);
        setOpenDialog(false);
    };

    // Handle input change in the profile edit form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProfile((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Toggle password visibility
    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    // Handle click on a tool card
    const handleCardClick = (tool) => {
        if (isLoggedIn) {
            console.log(`Redirecting to ${tool.path}`);
            redirectToPage(tool.path);
        } else {
            console.log('User not logged in. Redirecting to login page...');
            redirectToPage('/loginUser');
        }
    };
 
  
  

    return (

        <ThemeProvider theme={theme}>


            {/* Custom styled root container */}
            <CustomRootContainer>
                {/* Custom styled content container */}


                       <Grid container spacing={2}>
                        {/* User profile component */}

                        {/* Tool cards */}
                        
                        <Grid item xs={6} container spacing={2}>
                      {/*   <Paper style={{ height: '200px', width: '100%' }}>Container 1</Paper> */}
                        <ExpertsProfile style={{ height: '200px', width: '1000px' }} expertsProfile={expertsProfile} handleOpenDialog={handleOpenDialog} />

                        </Grid>
                        <Grid item xs={4} container spacing={2}>
                       <AvailabilityForm style={{ height: '492px',width:'500px', marginLeft: '-12rem', marginTop: '3.5rem' }}></AvailabilityForm>

                        </Grid>
                    </Grid>
            </CustomRootContainer>


            {/* Custom styled dialog */}
            <CustomDialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogContent>
                    {/* Profile edit form */}
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        type="text"
                        name="name"
                        value={editedProfile.name}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Username"
                        type="text"
                        name="username"
                        value={editedProfile.username}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        type="email"
                        name="email"
                        value={editedProfile.email}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Date of Birth"
                        type="date"
                        name="dob"
                        value={editedProfile.dob}
                        onChange={handleInputChange}
                        fullWidth
                    />
                      
                    <TextField
                        margin="dense"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={editedProfile.password}
                        onChange={handleInputChange}
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {/* Toggle password visibility */}
                                    <IconButton onClick={handleTogglePassword}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    
                </DialogContent>
                <DialogActions>
                    {/* Cancel button */}
                    <Button onClick={handleCloseDialog} style={buttonStyles.cancelButton}>
                        Cancel
                    </Button>
                    {/* Save button */}
                    <Button onClick={handleSaveProfile} style={buttonStyles.saveButton}>
                        Save
                    </Button>
                </DialogActions>
            </CustomDialog>
        </ThemeProvider>
    );
};

export default ExpertsDashboard;

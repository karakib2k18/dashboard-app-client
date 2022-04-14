import { Box } from '@mui/material';
import React from 'react';
import Dashboard from '../Dashboard/Dashboard/Dashboard';

const HomePage = () => {
    return (
        <Box sx={{ m:7, boxShadow: 3 }}>
            <Dashboard></Dashboard>
        </Box>
    );
};

export default HomePage;
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import DisplayPage from './pages/DisplayPage';

export default function App() {

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth={false} disableGutters>
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh', width:'100vw' }}>
          <DisplayPage/>
        </Box>
      </Container>
    </React.Fragment>
  );
}
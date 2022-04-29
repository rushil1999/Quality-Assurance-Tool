import React, { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import CircularProgress from '@mui/material/CircularProgress';
import { getTotalComponentCountService } from '../services/componentService';
import { getTotalProjectCountService } from '../services/projectService';
import Alert from '@mui/material/Alert';
import { getTotalTestCaseCountService } from '../services/testCaseService';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const Dashboard = () => {
  const [statistics, setStatistics] = useState({});
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  
  const fetchTotalProjectsCount = async () => {
    const serviceResponse1 = await getTotalProjectCountService();
    const serviceResponse2 = await getTotalComponentCountService();
    const serviceResponse3 = await getTotalTestCaseCountService();
    let projects, components, testCases;
    if (serviceResponse1.status === 200 ) {
      projects = serviceResponse1.data.payload[0]['COUNT'];
    }
    if (serviceResponse2.status === 200) {
      components = serviceResponse2.data.payload[0]['COUNT'];
    }
    if (serviceResponse3.status === 200) {
      testCases = serviceResponse3.data.payload[0]['COUNT'];
    }
    if(serviceResponse1.status !== 200 || serviceResponse3.status !== 200|| serviceResponse2.status !== 200) {
      setOpen(true);
      setMessage("Some Error Occured");
    }
    else{
      setStatistics({
        ...statistics,
        projects, 
        components,
        testCases,
      })
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchTotalProjectsCount();
  }, [])

  const handleClose = () => {
    setOpen(false);
  }
  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
      />
      {loading ?
        (<CircularProgress color="success" />)
        :
        (
          <>
            <Alert icon={false} severity="info" style={{ justifyContent: 'center' }}>
            <h1 style={{color: 'mediumseagreen'}}>Welcome to Spartan QA Tool</h1>
            </Alert>

            <div style={{display: 'flex', justifyContent: 'center', padding:'15px'}}>
              <Stack direction="row" spacing={2}>

                <Box component="span" sx={{ bgcolor: '#E4FF9C', p: 6, border: '1px groove grey', borderRadius: '10px' }}>
                  <h3>Projects Taken by the Company</h3>
                  <h2>{statistics.projects}</h2>
                </Box>
                <Box component="span" sx={{ bgcolor: '#E4FF9C', p: 6, border: '1px groove grey', borderRadius: '10px' }}>
                  <h3>Test Ready Component</h3>
                  <h2>{statistics.components}</h2>
                </Box>
                <Box component="span" sx={{ bgcolor: '#E4FF9C', p: 6, border: '1px groove grey', borderRadius: '10px' }}>
                  <h3>Test Cases Generated</h3>
                  <h2>{statistics.testCases}</h2>
                </Box>
              </Stack>
            </div>

            <div style={{display: 'flex', justifyContent: 'center', padding:'15px'}}>
              <h1 style={{color: 'mediumseagreen'}}>People Using this System</h1>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', padding:'15px'}}>
              <Stack direction="row" spacing={2}>

                <Box component="span" sx={{ bgcolor: '#E4FF9C', p: 6, border: '1px groove grey', borderRadius: '10px' }}>
                  <h3>Managers</h3>
                  <h2>{statistics.projects}</h2>
                </Box>
                <Box component="span" sx={{ bgcolor: '#E4FF9C', p: 6, border: '1px groove grey', borderRadius: '10px' }}>
                  <h3>Test Leads</h3>
                  <h2>{statistics.components}</h2>
                </Box>
                <Box component="span" sx={{ bgcolor: '#E4FF9C', p: 6, border: '1px groove grey', borderRadius: '10px' }}>
                  <h3>Testers</h3>
                  <h2>{statistics.projects}</h2>
                </Box>
                <Box component="span" sx={{ bgcolor: '#E4FF9C', p: 6, border: '1px groove grey', borderRadius: '10px' }}>
                  <h3>Developer</h3>
                  <h2>{statistics.components}</h2>
                </Box>
                
              </Stack>
            </div>
          </>
        )

      }
    </>
  )
}

export default Dashboard;


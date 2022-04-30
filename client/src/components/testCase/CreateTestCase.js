import React, { useState, useEffect, useContext } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import { addTestCaseService, fetchTestCaseDetailsService } from '../../services/testCaseService';
import { AuthContext } from '../authentication/ProvideAuth';
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from 'react-router-dom';
import { CardHeader } from '@mui/material';
import { checkEmptyFields } from '../../services/formValidationService';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useLocation } from 'react-router-dom';
import { getNextStatus } from '../../services/testCaseService';

const CreateTestCase = () => {
  const [testCaseState, setTestCaseState] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const contextValue = useContext(AuthContext);
  const {state} = location;


  const fetchComponentDetails = async (id) => {
    setLoading(true);
    const serviceResponse = await fetchTestCaseDetailsService(id);
    if (serviceResponse.status === 200) {
      setTestCaseState(serviceResponse.data.payload[0]);
      setStatus({
        ...status,
        current: serviceResponse.data.payload[0]['tc_status'],
        new: getNextStatus(serviceResponse.data.payload[0]['tc_status']),
        selected: serviceResponse.data.payload[0]['tc_status']
      });
      setLoading(false);
    }
    else {
      setOpen(true);
      setMessage('Some Error Occured while fetching data');
    }
  }

  useEffect(() => {
    const { e_id: tester_id } = contextValue.user;
    console.log(tester_id);
    setTestCaseState({
      ...testCaseState,
      tester_id
    })
    if (params.id !== 'new') { //update Project
      fetchComponentDetails(params.id);
    }
    else {
      setTestCaseState({
        ...testCaseState,
        tc_status: 'ToDo'
      })
      
      setLoading(false);
    }
  }, [])

  const handleFormChange = (e) => {
    // console.log('Form Change', e.target.name, e.target.value);
    setTestCaseState({
      ...testCaseState,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async () => {
    console.log(testCaseState);
    
    if (checkEmptyFields(testCaseState) === true) {
      const serviceResponse = await addTestCaseService(testCaseState);
      if (serviceResponse.status === 200) {
        setOpen(true);
        setMessage('Operation Successfull');
        setTimeout(() => { navigate('/Dashboard'); }, 2500)

      }
      else {
        setOpen(true);
        setMessage('Some Error Occured');
      }
    }
    else {
      setOpen(true);
      setMessage('Please Fill out all the fields');
    }
  }


  const handleStatusChange = (selected, current) => {
    console.log('Status selected', selected, current, status);
    setStatus({
      ...status,
      current,
      new: [].concat(status.current) ,
      selected,
    })
    setTestCaseState({
      ...testCaseState,
      tc_status: selected
    })
  }

  const handleClose = () => {
    setOpen(false);
  }
  return (
    <React.Fragment>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
      />
      {loading ? (
        <CircularProgress color="success" />

      ) : (

        <>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Card variant="outlined" sx={{ bgcolor: '#ffffe6', width: '80%' }}>
              <CardHeader title="Component Details">
              </CardHeader>
              <CardContent>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                  <h2>Component ID: {state.c_id}</h2>
                </div>
                <TextField
                  id="tc_name"
                  name="tc_name"
                  label="Name"
                  fullWidth
                  autoComplete="Source"
                  variant="standard"
                  onChange={handleFormChange}
                  value={testCaseState.tc_name}
                />
                <br></br>
                <br></br>
                <TextField
                  id="tc_desc"
                  name="tc_desc"
                  label="Description"
                  fullWidth
                  autoComplete="Source"
                  variant="standard"
                  onChange={handleFormChange}
                  value={testCaseState.tc_desc}
                />
                <br></br>
                <br></br>
                <div>
                  <Chip 
                    color={testCaseState.c_status === 'TestReady'  ? 'warning' : 'success' } 
                    label={params.id === 'new' ? 'TestReady' : status.selected }/>
                </div>
              </CardContent>
              <CardActions style={{ justifyContent: 'center' }}>
              <Stack direction="row" spacing={2}>
                {params.id !== 'new' && (
                  <>
                  {status.new && status.new.length > 0 && status.new.map((e) => {
                    console.log(e)
                      return(<Button variant={'contained'} onClick={() => {handleStatusChange(e, status.new)}}>{e}</Button>)
                  })}
                  </>
                )}
                <Button variant={'contained'} onClick={handleSubmit}>Submit</Button>
              </Stack>
              </CardActions>
            </Card>
          </div>
        </>


      )}


    </React.Fragment>);
}

export default CreateTestCase;


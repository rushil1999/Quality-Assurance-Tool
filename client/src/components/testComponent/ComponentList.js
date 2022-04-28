import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { useParams } from 'react-router-dom';
import { fetchComponentListOfTestleadService, fetchComponentListOfProjectService } from '../../services/componentService';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardHeader } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';


const ComponentList = (props) => {
  let id;
  const { source } = props;
  const params = useParams();
  if (source === 'testlead') {
    const { testlead_id } = params;
    id = testlead_id;

  }
  else {
    const { project_id } = params;
    id = project_id;
  }
  id = parseInt(id);

  console.log(params, id);
  const [componentListState, setComponentListState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  const fetchComponentListOfProject = async () => {
    const serviceResponse = await fetchComponentListOfProjectService(id);
    console.log(serviceResponse.data);
    if (serviceResponse.status === 200) {
      setComponentListState(serviceResponse.data.payload);
    }
    else if(serviceResponse === 500){
      setOpen(true);
      setMessage('Some error occured while fetching data');
    }
    else{
      setOpen(true);
      setMessage(serviceResponse.data.message);
      setAlertMessage(serviceResponse.data.message);
      setShowAlert(true);
    }
    setLoading(false);

  }
  const fetchComponentListOfTestlead = async () => {
    const serviceResponse = await fetchComponentListOfTestleadService(id);
    console.log(serviceResponse.data.payload);
    if (serviceResponse.status === 200) {
      setComponentListState(serviceResponse.data.payload);
      setLoading(false);
    }
    else if(serviceResponse === 500){
      setOpen(true);
      setMessage('Some error occured while fetching data');
    }
    else{
      setOpen(true);
      setMessage(serviceResponse.message);
      setAlertMessage(serviceResponse.message);
      setShowAlert(true);
    }
    setLoading(false);

  }


  useEffect(() => {
    if (source === 'testlead') {
      fetchComponentListOfTestlead();
    }
    else {
      fetchComponentListOfProject();
    }
  }, []);


  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleSnackbarClose = () => {
    setOpen(false);
  }

  const redirectToComponents = () => {
    navigate('/testcase_list/component/:component_id')
  }

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={message}
      />
      {loading ?
        (
          <CircularProgress color="success" />
        ) :
        (

          <div style={{ margin: 'auto', display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ bgcolor: '#e6ffe6', width: '80%' }} variant="outlined" >
              <CardHeader title="Components" />

              <CardContent >
                {!showAlert ? (componentListState.map((e) => {
                  const { c_id, c_name, c_desc, c_status } = e;
                  return (
                    <div style={{ padding: '15px' }}>
                      <Accordion expanded={expanded === c_id} onChange={handleChange(c_id)}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1bh-content"
                          id="panel1bh-header"
                        >
                          <Typography sx={{ width: '10%', flexShrink: 0 }}>
                            {c_name}
                          </Typography>
                          {/* <Typography sx={{ color: 'text.secondary' }}>I am an accordion</Typography> */}
                        </AccordionSummary>
                        <AccordionDetails>
                          <Divider></Divider>
                          <div style={{ paddingTop: '25px' }}>
                            <Typography style={{ paddingBottom: '12px' }}>
                              {c_desc}
                            </Typography>
                            <Button onClick={redirectToComponents} variant={'contained'}>Test Cases</Button>
                          </div>

                        </AccordionDetails>
                      </Accordion>
                    </div>
                  )
                })) : (
                  <Alert variant="filled" severity="warning">
                    {alertMessage}
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>

        )

      }


    </>);
}

export default ComponentList;
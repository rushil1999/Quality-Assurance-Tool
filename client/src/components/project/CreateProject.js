import React, { useState } from  'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from 'react-router-dom';


const CreateProject = () => {

  const [projectState, setProjectState] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();

  console.log('Hyy', params.id);
  return(
  <React.Fragment>
    {!loading ?(
      <CircularProgress color="success" />

    ): (

      <></>


    )}
  
  
  </React.Fragment>);
}

export default CreateProject;
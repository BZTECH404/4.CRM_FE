// dataSlice.js

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {baseurl} from "../api";
import { ToastContainer, toast } from 'react-toastify/dist/react-toastify.cjs.development';
import { triggerFunction, getPredefinedUrl } from '../components/SignedUrl';

const initialState = {
  projects: [],
  loading: false,
  error: null
};

const datasSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    fetchDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess(state, action) {
        ////////////////console.log("state,action")
      state.projects = action.payload;
      state.loading = false;
    },
    fetchDataFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } = datasSlice.actions;

export const fetchProjects = (body) => async (dispatch) => {
  dispatch(fetchDataStart());
  try {
    // //////console.log(body)
    if(body.isDisabled==undefined){
    body.isDisabled=false
    }
    const response = await axios.put(`${baseurl}/project/`,body);
    dispatch(fetchDataSuccess(response.data));
    let proj=[]
    for(let i=0;i<(response.data).length;i++){
      proj[i]=(response.data)[i]
    }
    proj.sort((a1, b1) => a1.name?.localeCompare(b1.name));
    // //////console.log(proj)
    return proj
  } catch (error) {
    dispatch(fetchDataFailure(error.message));
  }
};


export const importquestions = (id) => async (dispatch) => {
  // dispatch(fetchDataStart());
  try {
    //console.log(id)

  await axios.put(`${baseurl}/project/imquestion/${id}`);
   
  
  } catch (error) {
    dispatch(fetchDataFailure(error.message));
  }
};

export const addfiles = (body) => async (dispatch) => {
  // dispatch(fetchDataStart());
  
  if(body.file.length!=0){
    console.log("hi")
    let filearr=body.file
    let selectedFile=filearr[0][2]
    body.url=getPredefinedUrl((body.file)[0][1])
    if (selectedFile) {
        const reader = new FileReader();
        reader.onload = async (event) => {
        const fileContent = event.target.result;
        // Perform your upload logic here
        // For demonstration, let's just log the file extension and content
        ////////////////////console.log('Selected File Extension:', fileExtension);
        console.log('File Content:', fileContent);

        try {
          // Example: Uploading file content using Fetch
          const responseFile = await fetch(filearr[0][0], {
            method: 'PUT',
            body: fileContent,
            headers: {
              'Content-Type': 'application/octet-stream', // Set appropriate content type
            },
            mode: 'cors', // Enable CORS
          });
          if (!responseFile.ok) {
            throw new Error('Network response was not ok');
          }
          toast.success("File Uploaded Succesfully")
          console.log('File uploaded successfully:');
        } catch (error) {
          console.error('Error:', error);
          toast.error('Failed to add image'); // Display error toast if addition fails
        }
      }

    reader.readAsArrayBuffer(selectedFile);
  }
}
  (async () => {
  //  console.log((body.file)[0][2])
    try {
      let bodyu={
        filename:body.filename,
        id:body.id,
        date:body.date,
        url:body.url!=""?body.url:undefined
      }
      // console.log(bodyu,body.url)
      await axios.put(`${baseurl}/project/addfiles/${body.id}`,bodyu);
      ////////////////////console.log(responseFormData);
      toast.success('Image added successfully'); // Call toast.success after successful addition


      // Clear form data after submission
    } catch (error) {
      //console.error('mongo db error', error);
      toast.error('Failed to add image'); // Display error toast if addition fails
    }
  })(); 

};
export const deletefiles = (pid,id) => async (dispatch)=>{
  console.log(pid,id)
  try{
    await axios.delete(`${baseurl}/project/files/${pid}/${id}`);
  }catch(err){
    console.log(err)
  }
}

export const OrderUpdate = (pid,files) => async(dispatch)=>{
  console.log(pid,files)
  try{
    let body={
      files
    }
    await axios.put(`${baseurl}/project/files/${pid}`,body);
  }catch(err){
    console.log(err)
  }
}


export default datasSlice.reducer;



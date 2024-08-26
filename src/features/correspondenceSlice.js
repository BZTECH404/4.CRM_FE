// dataSlice.js

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify/dist/react-toastify.cjs.development';

import { triggerFunction, getPredefinedUrl } from '../components/SignedUrl';

import {baseurl} from "../api";

const initialState = {
  correspondence: [],
  loading: false,
  error: null
};

const datasSlice = createSlice({
  name: 'correspondence',
  initialState,
  reducers: {
    fetchDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess(state, action) {
        ////////////////console.log("state,action")
      state.correspondence = action.payload;
      state.loading = false;
    },
    fetchDataFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } = datasSlice.actions;

export const addcorrespondence = (body) => async (dispatch) => {
   console.log(body)
    
    if(body.file.length!=0){
      // console.log("hi")
      let filearr=body.file
      let selectedFile=filearr[0][2]
      body.url=getPredefinedUrl((body.file)[0][1])
      if (selectedFile) {
        Swal.fire({
          title: 'Uploading...',
          html: 'Please wait while we upload your file.',
          allowOutsideClick: false,
          confirmButtonText: false,
          onOpen: () => {
            Swal.showLoading();
          }
        });
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
            // toast.success("File Uploaded Succesfully")
            console.log('File uploaded successfully:');
            Swal.fire({
              title: 'Success!',
              text: 'File uploaded successfully.',
              icon: 'success',
              confirmButtonText: 'OK'
            });
          } catch (error) {
            console.error('Error:', error);
            // toast.error('Failed to add image'); // Display error toast if addition fails
            Swal.fire({
              title: 'Error!',
              text: 'There was a problem uploading the file.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        }
  
      reader.readAsArrayBuffer(selectedFile);
    }
  }
    (async () => {
    //  console.log((body.file)[0][2])
      try {
        let bodyu={
          project:body.project,
          subject:body.subject,
          description:body.description,
          letterno:body.letterno,
          date:body.date,
          files:[{
            current:body.url
          }]
        }
       
        // console.log(bodyu,body.url)
        await axios.post(`${baseurl}/correspondence/create`,bodyu);
        ////////////////////console.log(responseFormData);
        toast.success('Added successfully'); // Call toast.success after successful addition
  
  
        // Clear form data after submission
      } catch (error) {
        //console.error('mongo db error', error);
        toast.error('Failed to add image'); // Display error toast if addition fails
      }
    })(); 
  
  };




export const getcorrespondence = () => async (dispatch) => {

  try {
    const response=await axios.get(`${baseurl}/correspondence/`)
    dispatch(fetchDataSuccess(response.data));
    return (response.data)
  
  } catch (error) {
    console.log(error)
  }
};

export const deleteContact = (data) => async (dispatch) => {
  dispatch(fetchDataStart());
  try {
    const token = localStorage.getItem('token');
    //////////////console.log(data)
    const response = await axios.delete(`${baseurl}/contact/${data}`,{
      headers: {
        Authorization: `${token}`
      }});
     return true;
    dispatch(fetchDataSuccess(response.data));
  } catch (error) {
    return false
    dispatch(fetchDataFailure(error.message));
  }
};

// export const getcontact=(data)=>async(dispatch)=>{

//     ////////////////console.log("hello")
//     const body={
//         project:undefined,
//         type:undefined
//     }
//     ////////////////console.log(body)
//     try {
//       const response = await axios.put(`${baseurl}/contact/all`,body);
//       // setData(response.data);
//       // //////////////console.log(response.data)
//       // initialState.contacts=response.data
//       dispatch(fetchDataSuccess(response.data));
//       // //////////////console.log("hi")

//     } catch (error) {
//       //console.error(error);
//     }

// }

export default datasSlice.reducer;



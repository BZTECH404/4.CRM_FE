// dataSlice.js

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {baseurl} from "../api";
import { ToastContainer, toast } from 'react-toastify/dist/react-toastify.cjs.development';


const initialState = {
  filetemplates: [],
  loading: false,
  error: null
};

const datasSlice = createSlice({
  name: 'filetemplates',
  initialState,
  reducers: {
    fetchDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess(state, action) {
        // //////////////////console.log(action.payload)
      state.invoices = action.payload;
      state.loading = false;
    },
    fetchDataFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } = datasSlice.actions;

export const getfiletemplates = () => async (dispatch) => {
  dispatch(fetchDataStart());
  try {
    // console.log("hi")
    let body={}
    const response = await axios.put(`${baseurl}/filetemplate/`, {
        body
      })
    // console.log(response.data)
    dispatch(fetchDataSuccess(response.data));
    return response.data.fileTemplates;
  } catch (error) {
    console.log(error)
    dispatch(fetchDataFailure(error.message));
  }
};

export const disableinvoice = (id) => async (dispatch) => {
  try {
    //////////console.log(id)
    
    const response = await axios.delete(`${baseurl}/invoice/${id}`);
    toast.success('Record deleted successfully'); // Display success toast
  } catch (error) {
    toast.error('Failed to delete record');

  }
};


export default datasSlice.reducer;



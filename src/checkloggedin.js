// const jwt = require('jsonwebtoken');
import axios from "axios";
import { baseurl, ProjectStatus,database } from "./api";
const check=()=>{
    const token = localStorage.getItem('token');

    // Decode the JWT to extract details
    if (token) {
      // Split the token into its three parts: header, payload, signature
      const tokenParts = token.split('.');
      
      // Decode the payload (second part of the token)
      const payload = JSON.parse(atob(tokenParts[1]));
      // console.log(payload)
      // Extract user details from the payload
      const userId = payload.userId;
      const username = payload.username;
      const role=payload.role
      // const paths=payload.paths
      ////////////////////console.log(role)
      const userPermissions = {
        canViewProjects: true,
        canCreateTasks: true,
        canViewTasks: true, // Example of a permission that the user doesn't have
      };
      const adminPermissions = {
        canViewProjects: true,
        canCreateTasks: true,
        canViewTasks: true, // Example of a permission that the user doesn't have
      };
      const permission=role=='user'?userPermissions:adminPermissions
      ////////////////////console.log(userId)
      // You can use the extracted details as needed
      return [userId,username,role,permission,token]
      ////////////////////console.log("User ID:", userId);
      ////////////////////console.log("Username:", username);
    } else {
      ////////////////////console.log("Token not found in local storage");
    }

}
const checkloginvailidity=async ()=>{
//////console.log(check())
let body={
  id:check()[4]
}
try{
const res=await axios.put(`${baseurl}/user/check`, body,{
  headers: {
  Authorization: `${check()[4]}`
}})
return (res.data.data)
}
catch{
  return false
}
}
const geturl=(originalUrl)=>{
  const urlParts = originalUrl.split('/');
  // Replace the domain part (e.g., officecrm560)
  urlParts[2] = urlParts[2].replace(/^[^\.]+/, database);
  // console.log(urlParts.join('/'))
  return urlParts.join('/');

}  
export { check,checkloginvailidity,geturl };
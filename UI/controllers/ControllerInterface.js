// Imports
import React from 'react';
import axios from 'axios';

class ControllerInterface extends React.Component {
    constructor (subdirectory) {
        super();
        this.subdirectory = "";
        this.baseUrl = `http://127.0.0.1:8000/${ subdirectory}`;
    }

    async del (event, addon) {
        try {
            const response = await axios.delete(`${ this.baseUrl }${ addon }`); 
            if (response.status ==! 200 || response.status ==! 204) { throw new Error("An error had been thrown"); }
        }
        catch (error) { this.errorReporting(error); }
    }

    async get(event, addon) {

        try {
            const response = await axios.get(`${ this.baseUrl }${ addon }`); 
            if (response.status ==! 200) {  throw new Error("An error had been thrown"); }
        }
        catch (error) { this.errorReporting(error); }
    }

    async patch(event, addon, dataPackage) {
        this.setIsLoading(true);

        try {
            const response = await axios.patch(`${ this.baseUrl }${ addon }`, dataPackage); 
            if (response.status ==! 200 || response.status ==! 201 || response.status ==! 202) {  throw new Error("An error had been thrown"); }
        }
        catch (error) { this.errorReporting(error); }
    }

    async post (event, addon, dataPackage) {
        this.setIsLoading(true);

        try {
            const response = await axios.post(`${ this.baseUrl }${ addon }`, dataPackage); 
            if (response.status ==! 200) {  throw new Error("An error had been thrown"); }
        }
        catch (error) { this.errorReporting(error); }
    }

    async put(event, addon, dataPackage) {
        this.setIsLoading(true);

        try {
            const response = await axios.put(`${ this.baseUrl }${ addon }`, dataPackage); 
            if (response.status ==! 200) {  throw new Error("An error had been thrown"); }
        }
        catch (error) { this.errorReporting(error); }
    }

    errorReporting(error) {
        console.log(error);
    }




    /*
    const fetchTasks = async () => {
        try {
          setIsLoading(true);
  
          const response = await axios.get(url, { signal: abortController.signal });
  
          if (response.status === 200) {
            setTasks(response.data);
            setIsLoading(false);
  
            return;
          }
          else {
            throw new Error("Failed to fetch tasks");
          }
        }
        catch (error) {
          if (abortController.signal.aborted) {
            console.log("Data fetching cancelled");
          }
          else {
            setErrorFlag(true);
            setIsLoading(false);
          }
        }
      };
    */


}

export default ControllerInterface;
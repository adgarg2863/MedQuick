import axios from "axios";
import showToast from "../utils/showToastNotification";

export const updateItems = (formData) => async (dispatch) => {
    console.log(formData)
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    const body = JSON.stringify(formData);
  
    try {
        showToast("SUCCESS", "Updating...");
       await axios.put("/api/profile/addItem", body, config);
     
     
      showToast("SUCCESS", "Updation Successful");
    } catch (e) {
      console.log(e);
  
      showToast("ERROR", "Error in updating inventory!");
  
     
    }
  };

  export const deleteItems = (formData) => async (dispatch) => {
    console.log(formData)
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    const body = JSON.stringify(formData);
  
    try {
        showToast("SUCCESS", "Billing...");
       await axios.put("/api/profile/deleteItem", body, config);
     
     
      showToast("SUCCESS", "Billing Successful");
    } catch (e) {
      console.log(e);
  
      showToast("ERROR", e.message);
  
     
    }
  };
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
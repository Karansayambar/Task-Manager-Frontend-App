// import { getCookie } from "../../../utils/cookieUtils";
import { loginFailure, loginRequest, loginSuccess, LOGOUT, registerFailure, registerRequest, registerSuccess } from "../actions/authAction";


export const loginUser = (credentials) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await fetch("https://taskmanagerbackend-xrer.onrender.com/auth/login",{
      method : "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    })

    const results = await response.json();
    if (response.status === 200) {
      localStorage.setItem("tm-token", results.token)
      dispatch(loginSuccess(results));
    }
  } catch (error) {
    dispatch(loginFailure(error.response?.data?.message || "Login failed"));
  }
};

export const registerUser = (credentials) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const response = await fetch("https://taskmanagerbackend-xrer.onrender.com/auth/register",{
      method : "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: credentials.username,
        email: credentials.email,
        password: credentials.password,
      }),
    })

    const results = await response.json();
    if (response.status === 200) {
      dispatch(registerSuccess(results));
    }
  } catch (error) {
    dispatch(registerFailure(error.response?.data?.message || "Register failed"));
  }
}
// Redux action creator for logout

export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
  try {
const token = localStorage.getItem('tm-token');

    const response = await fetch("https://taskmanagerbackend-xrer.onrender.com/auth/logout", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
      // Include credentials to handle cookies
    });
    
    const json = await response.json()
    
    
   
      localStorage.clear('tm-token')
      localStorage.clear('isAuthenticated')
  
    if(!json.status) {
      
      throw new Error("Failed to log out");
    }
    


  } catch (error) {
    console.error("Logout error:", error.message);
  }
};







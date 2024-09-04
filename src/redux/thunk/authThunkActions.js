import { getCookie } from "../../../utils/cookieUtils";
import { loginFailure, loginRequest, loginSuccess, LOGOUT, registerFailure, registerRequest, registerSuccess } from "../actions/authAction";

export const loginUser = (credentials) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await fetch("http://localhost:3000/auth/login",{
      method : "POST",
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),

      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      credentials: 'include',
    })

    const results = await response.json();
    if (response.status === 200) {
      dispatch(loginSuccess(results));
    }
  } catch (error) {
    dispatch(loginFailure(error.response?.data?.message || "Login failed"));
  }
};

export const registerUser = (credentials) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const response = await fetch("http://localhost:3000/auth/register",{
      method : "POST",
      body: JSON.stringify({
        username: credentials.username,
        email: credentials.email,
        password: credentials.password,
      }),

      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      credentials: 'include',
    })

    const results = await response.json();
    console.log(results)
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
    const response = await fetch("http://localhost:3000/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",  // Include credentials to handle cookies
    });

    if (!response.ok) {
      throw new Error("Failed to log out");
    }
  } catch (error) {
    console.error("Logout error:", error.message);
  }
};



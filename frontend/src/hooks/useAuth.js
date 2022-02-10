import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext";

export default function useAuth() {
  let history = useHistory();
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState(null);

  //set user
  const setUserContext = async () => {
    return await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/isLoggedIn`)
      .then((res) => {
        setUser(res.data.currentUser);
        history.push("/dashboard");
      })
      .catch((err) => {
        setError(err.response.data);
      });
  };

  //login user
  const loginUser = async (data) => {
    try {
      return axios({
        method: "POST",
        url: `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/login`,
        data: {
          employeeId: data,
        },
      }).then(async (res) => {
        await setUserContext();
        return res;
      });
    } catch (err) {
      setError(err.response.data);
    }
  };

  return {
    loginUser,
    error,
  };
}

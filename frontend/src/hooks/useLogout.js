import { useHistory } from "react-router-dom";
import axios from "axios";

export default function useLogout() {
  let history = useHistory();

  const logoutUser = async () => {
    try {
      await axios({
        method: "GET",
        url: `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/logout`,
      }).then((res) => {
        clearInterval(window.clock);
        window.localStorage.setItem("timer", 0);
        window.location.reload();
        history.push("/");
      });
    } catch (err) {
      console.log(err);
    }
  };

  return {
    logoutUser,
  };
}

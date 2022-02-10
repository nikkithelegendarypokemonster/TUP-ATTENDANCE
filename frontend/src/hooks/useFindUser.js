import { useState, useEffect } from "react";
import axios from "axios";

export default function useFindUser() {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    // async function findUser() {
    //   try {
    //     setLoading(true);
    //     const user = await axios("/api/v1/users/isLoggedIn");
    //     setUser(user.data.currentUser);
    //   } catch (err) {
    //     console.log(err);
    //   }
    //   setLoading(false);
    // }

    async function findUser() {
      await axios
        .get("/api/v1/users/isLoggedIn")
        .then((res) => {
          setUser(res.data.currentUser);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    findUser();
  }, []);

  return {
    user,
    setUser,
    isLoading,
  };
}

import { useContext } from "react";
import { onSignOut } from "../api/firebaseMethods";
import { NewContext } from "../context/Context";

export const useLogout = () => {
  const { dispatch } = useContext(NewContext);

  const handleLogOut = async () => {
    try {
      await onSignOut();
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      console.log(error);
    }
  };

  return { handleLogOut };
};

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSocketLoading,
  setSocketConnected,
  setSocketDisconnected,
  setSocketError,
} from "../store/socket/socketSlice";
import { initializeSocket, disconnectSocket } from "./socket";
import {
  selectNotifications,
  setNotifications,
} from "@/store/features/admin/notificationSlice";
import { getAccessToken } from "@/utils/checkToken";

function InitializeSocket() {
  const dispatch = useDispatch();


  useEffect(() => {
    const token = getAccessToken();
    if (!token) return;

    dispatch(setSocketLoading());
    try {
      const socket = initializeSocket(token);
      socket.on("connect", () => {
        dispatch(setSocketConnected());
      });

      socket.on("newNotification", (notifications) => {
        dispatch(setNotifications(notifications));
      });

      socket.on("disconnect", () => {
        dispatch(setSocketDisconnected());
      });
      socket.on("error", (error) => {
        dispatch(setSocketError(`Failed to connect to the socket. ${error}`));
      });
    } catch (error) {
      dispatch(setSocketError("Failed to connect to the socket."));
    }


    return () => {
      disconnectSocket();
    };
  }, [dispatch]);

  return <></>;
}

export default InitializeSocket;

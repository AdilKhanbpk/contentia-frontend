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

function InitializeSocket() {
  const dispatch = useDispatch();
  const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const notifications = useSelector(selectNotifications);
  
  useEffect(() => {
    if (token) {
      dispatch(setSocketLoading());
      try {
        const socket = initializeSocket(token);
        socket.on("connect", () => {
          dispatch(setSocketConnected());
        });

        socket.on("newNotification", (notifications) => {
          console.log("notifications", notifications);
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
    }

    return () => {
      disconnectSocket();
    };
  }, [dispatch, token]);

  return <></>;
}

export default InitializeSocket;

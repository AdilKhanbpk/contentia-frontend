import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSocket,
  setLoading,
  setError,
  clearSocket,
  selectSocket,
} from "../store/socket/socketSlice";
import { createSocket } from "./socket";
import {
  selectSocketLoading,
  selectSocketError,
} from "../store/socket/socketSlice";

function InitializeSocket() {
  const dispatch = useDispatch();
  const socket = useSelector(selectSocket);
  const loading = useSelector(selectSocketLoading);
  const error = useSelector(selectSocketError);
  const token = localStorage.getItem("accessToken");
  console.log(token);

  useEffect(() => {
    if (token) {
      dispatch(setLoading());
      try {
        const newSocket = createSocket();
        console.log(newSocket);
        dispatch(setSocket(newSocket));
      } catch (err) {
        dispatch(setError("Failed to connect to the socket."));
      }
    }

    return () => {
      if (socket) {
        socket.disconnect();
        dispatch(clearSocket());
      }
    };
  }, [dispatch, token]);

  return (
    <div>
      {loading && <p>Loading socket connection...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && <h1>Socket Initialized</h1>}
    </div>
  );
}

export default InitializeSocket;

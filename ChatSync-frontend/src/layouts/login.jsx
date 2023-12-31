import { useEffect, useReducer, useState } from "react";
import { Button } from "../components/button";
import { useUserContext } from "../provider/userDataProvider";
import { useMutation } from "react-query";
import { loginUser, registerUser } from "../apis/apis";
import { toast } from "sonner";
import useGeolocation from "../hook/useGeolocation";
import { connectSocket } from "../lib/socketHelper";

const initialState = {
  userName: "",
  password: "",
  confirmPassword: "",
};

const reducer = (state, action) => {
  return { ...state, [action.type]: action.payload };
};

const Login = () => {
  const { setIsLogin, setUser, user, socketData, setSocketData } =
    useUserContext();
  const [register, setRegister] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  const mutation = useMutation(!register ? loginUser : registerUser, {
    onSuccess: (data) => {
      if (data.status === 200) {
        setUser({ ...user, ...data.data });

        // Socket.io - Start
        if (socketData === null) {
          connectSocket({ ...user, ...data.data }, setSocketData);
        }

        setIsLogin(true);
        if (socketData) {
          toast.message("Connected Successfully!", {
            description: "You are connected with id: " + socketData.id,
          });
        }

        return toast.success(data.message || "");
      }

      toast.error(data.message || "");
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    mutation.mutate(state);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: name, payload: value });
  };

  const { currentLocation, city } = useGeolocation();

  useEffect(() => {
    if (currentLocation !== null) {
      setUser({ ...user, city: city });
    }
  }, [city]);

  const askForPermission = () => {
    navigator.geolocation.getCurrentPosition(
      () => {
        // Permission granted
        alert("Location access granted!");
      },
      () => {
        // Permission denied or other error
        alert(
          "Please enable location services to continue. (You can enable it from View Information icon on the left side of your browser's search bar"
        );
      }
    );
  };

  if (currentLocation === null) {
    return (
      <div className="w-full h-screen flex justify-center items-center flex-col ">
        <p className="text-xl font-semibold">Please turn on your location!</p>
        <div className="mt-4">
          <Button handleClick={askForPermission} title="Turn on location?" />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex justify-center items-center ">
      <form onSubmit={onSubmit}>
        <div className="bg-slate-400 max-w-96 p-5 rounded gap-y-3">
          <input
            className="w-full rounded p-2 outline-slate-700"
            placeholder="User Name"
            name="userName"
            value={state.userName}
            onChange={handleInputChange}
          />
          <input
            className="w-full rounded p-2 mt-3 outline-slate-700"
            placeholder="Password"
            type="password"
            name="password"
            value={state.password}
            onChange={handleInputChange}
          />
          {register && (
            <input
              className="w-full rounded p-2 mt-3 outline-slate-700"
              placeholder="Confirm Password"
              type="password"
              name="confirmPassword"
              value={state.confirmPassword}
              onChange={handleInputChange}
            />
          )}

          <div className="mt-6 flex gap-x-2">
            <Button type="submit" title={!register ? "Login" : "Register"} />
            <Button
              title={register ? "Login?" : "Register?"}
              handleClick={() => setRegister((prev) => !prev)}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;

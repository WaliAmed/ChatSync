import PropTypes from "prop-types";
import { useUserContext } from "../provider/userDataProvider";

export const UserPill = ({
  username = "Unknown",
  location = "Unknown",
  onlineStatus = false,
  logoBgColor = "#496212",
  showStatus = true,
  onRoomSelect = false,
  userData = null,
}) => {
  const userNameCharacter = username[0];
  const { setSelectedRoom } = useUserContext();

  return (
    <div
      className="p-2 flex justify-between cursor-pointer mb-1 hover:bg-slate-300"
      onClick={() => onRoomSelect && setSelectedRoom(userData)}
    >
      <div className="flex items-center w-full">
        <p
          className="rounded-full w-8 h-8 flex p-3 justify-center items-center text-white font-semibold text-xs"
          style={{ backgroundColor: logoBgColor }}
        >
          {userNameCharacter.toLocaleUpperCase()}
        </p>

        <div className="pl-2 w-full">
          <p className="m-0 text-sm font-medium truncate w-[60%]">
            <span title={username}> {username}</span>
            <br /> <small className="text-xs text-slate-500">{location}</small>
          </p>
        </div>
      </div>

      {showStatus && (
        <div className="flex items-center">
          <div
            title={onlineStatus ? "Online" : "Offline"}
            className="w-3 h-3 bg-slate-400 rounded-full"
            style={{ background: onlineStatus && "green" }}
          ></div>
        </div>
      )}
    </div>
  );
};

UserPill.propTypes = {
  username: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  onlineStatus: PropTypes.bool.isRequired,
  showStatus: PropTypes.bool.isRequired,
  logoBgColor: PropTypes.string.isRequired,
  onRoomSelect: PropTypes.bool.isRequired,
  userData: PropTypes.object.isRequired,
};

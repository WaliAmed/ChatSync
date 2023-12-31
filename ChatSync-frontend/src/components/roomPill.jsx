import PropTypes from "prop-types";
import { Button } from "./button";

export const RoomPill = ({
  roomName = "Unknown",
  roomOwner = "Unknown",
  logoBgColor = "#496212",
}) => {
  const roomNameCharacter = roomName[0];

  return (
    <div className="p-2 flex justify-between">
      <div className="flex items-center">
        <p
          className="rounded-full w-8 h-8 flex justify-center items-center text-white font-semibold text-xs"
          style={{ backgroundColor: logoBgColor }}
        >
          {roomNameCharacter.toLocaleUpperCase()}
        </p>

        <div className="pl-2">
          <p className="m-0 text-sm font-medium truncate w-28" title={roomName}>
            {roomName}
            <br /> <small className="text-xs text-slate-500">{roomOwner}</small>
          </p>
        </div>
      </div>

      <div className="flex items-center">
        <Button title={"Join"} />
      </div>
    </div>
  );
};

RoomPill.propTypes = {
  roomName: PropTypes.string.isRequired,
  roomOwner: PropTypes.string.isRequired,
  onlineStatus: PropTypes.bool.isRequired,
  logoBgColor: PropTypes.string.isRequired,
};

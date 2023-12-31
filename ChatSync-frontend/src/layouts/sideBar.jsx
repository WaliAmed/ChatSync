import { Button } from "../components/button";
import { RoomPill } from "../components/roomPill";
import { UserPill } from "../components/userPill";
import { getOnlineUsers } from "../lib/socketHelper";
import { useUserContext } from "../provider/userDataProvider";

function SideBar() {
  const { user, socketData, onlineUsers, setOnlineUsers } = useUserContext();

  getOnlineUsers(setOnlineUsers, socketData);

  return (
    <div className="bg-slate-300 h-screen max-h-screen w-72 px-5 pt-4 overflow-y-auto z-30">
      {/*Logged In User*/}
      <div className="mb-2" title={`Logged in with id: ${socketData.id}`}>
        <UserPill
          username={user.userName}
          showStatus={false}
          location={"Id: " + socketData.id}
        />
      </div>

      {/*Online People*/}
      <h1 className="font-semibold mb-1">Online People: (0)</h1>
      <div className="bg-slate-200 rounded max-h-96 overflow-y-auto mb-10">
        {onlineUsers.map((user) => {
          if (socketData.id !== user.id)
            return (
              <UserPill
                key={user.id}
                username={user.userName}
                location={user.city}
                onRoomSelect={true}
                onlineStatus
                userData={user}
              />
            );
        })}
      </div>

      {/*Rooms*/}
      <h1 className="font-semibold mb-1">Rooms:</h1>
      <div className="bg-slate-200 rounded max-h-64 overflow-y-auto mb-10">
        <RoomPill roomName="Room 1" />
        <RoomPill roomName="Room 1" />
        <RoomPill roomName="Room 1" />
        <RoomPill roomName="Room 1" />
        <RoomPill roomName="Room 1" />
        <RoomPill roomName="Room 1" />
        <RoomPill roomName="Room 1" />
      </div>

      {/*Logout*/}
      <Button title="Logout" className="mb-2" />
      <Button title="Create a room?" className={"mb-4"} />
    </div>
  );
}

export default SideBar;

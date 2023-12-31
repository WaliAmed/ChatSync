import Chat from "./layouts/chat";
import SideBar from "./layouts/sideBar";
import { ReactQueryProvider } from "./provider/reactQueryProvider";
import { UserProvider } from "./provider/userDataProvider";

function App() {
  return (
    <ReactQueryProvider>
      <UserProvider>
        <div className="flex">
          <div className="hidden md:block">
            <SideBar />
          </div>
          <Chat />
        </div>
      </UserProvider>
    </ReactQueryProvider>
  );
}

export default App;

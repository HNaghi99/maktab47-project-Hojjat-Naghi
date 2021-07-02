import Router from "./Route/Route.app";
import { IsLoginProvider } from "./utils/IsLogin";
export function App() {
  return (
    <IsLoginProvider>
      <Router />
    </IsLoginProvider>
  );
}

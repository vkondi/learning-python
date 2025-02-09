import EmployeePopup from "./components/EmployeePopup/EmployeePopup";
import Home from "./components/Home/Home";
import { RootProvider } from "./context/RootContext";

function App() {
  return (
    <RootProvider>
      <Home />
      <EmployeePopup />
    </RootProvider>
  );
}

export default App;

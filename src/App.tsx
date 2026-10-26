import "./App.css";
import Approuter from "./router/Approuter";
import { Aprovider } from "./pages/Auth/Acontext";
import { ContextProvider } from "./context/Context";
function App() {
  return (
    <>
      <ContextProvider>
        <Aprovider>
          <Approuter />
        </Aprovider>
      </ContextProvider>
    </>
  );
}

export default App;

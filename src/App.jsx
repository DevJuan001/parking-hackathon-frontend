import "@hooks/useFlipModal";
import "@components/ui/Icon";
import "@styles/index.css";
import AppRouter from "@/router/AppRouter";
import { useTheme } from "@hooks/useTheme";
import { BrowserRouter } from "react-router-dom";

function App() {
  useTheme();

  return (
    <div>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
      
      <div id="modal-root"></div>
    </div>
  );
}

export default App;

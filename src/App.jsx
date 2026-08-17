import "@components/ui/Icon";
import "@/globals/styles/index.css";
import "@/globals/hooks/useFlipModal";
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

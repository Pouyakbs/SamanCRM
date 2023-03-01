import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter , HashRouter } from "react-router-dom";

// translation
import "./components/i18n";

// scroll bar
import "simplebar/src/simplebar.css";

// third-party
import { Provider as ReduxProvider } from "react-redux";

// apex-chart
import "./assets/third-party/apex-chart.css";
import { backend } from "./utils/backend";
// project import
import App from "./App";
import { store } from "./store";
import reportWebVitals from "./reportWebVitals";

// ==============================|| MAIN - REACT DOM RENDER  ||============================== //
backend();

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  // <StrictMode>
    <ReduxProvider store={store}>
        <HashRouter>
          <App />
        </HashRouter>
    </ReduxProvider>
  // </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

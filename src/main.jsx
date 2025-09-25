import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./Components/Contexts/AuthContext.jsx";
import { UserContextProvider } from "./Components/Contexts/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);

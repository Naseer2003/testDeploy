import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context/ThemeContext";
import FolderDetailPage from "./pages/FolderDetailPage";

const App = () => {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />

      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/folder/:folderId" element={<FolderDetailPage />} />
      </Routes>
      </ThemeProvider>
    </>
  );
};

export default App;

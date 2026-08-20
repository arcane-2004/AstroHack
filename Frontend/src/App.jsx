import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import { SignupProvider } from "./Components/context/SignupContext";
import LoginPage from "./Components/pages/LoginPage";
import SignupAccountPage from "./Components/pages/SignupAccountPage";
import SignupBirthPage from "./Components/pages/SignupBirthPage";
import SuccessPage from "./Components/pages/SuccessPage";
import DailyPredictionPage from "./Components/pages/DailyPredictionPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<LoginPage />} />


      <Route
        element={<SignupProvider>
          <Outlet />
        </SignupProvider>}
      >
        <Route
          path="/signup"
          element={<SignupAccountPage />}
        />

        <Route
          path="/signup/birth-details"
          element={<SignupBirthPage />}
        />

        <Route path="/success" element={<SuccessPage />} />
      </Route>

      <Route path="/today-prediction" element={<DailyPredictionPage/>} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes >

  );
}
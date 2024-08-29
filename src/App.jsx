import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, SalesmanDashboard,CustomerDashboard } from "@/layouts";
import AuthRoutes from "./routes/AuthRoutes";
import { SignIn, SignUp } from "./pages/auth";

function App() {
  return (
    <Routes>
      <Route path="/sign-in" element={<SignIn />} />
      <Route element={<AuthRoutes />}>
      <Route path="/admin/*" element={<Dashboard />} />
      <Route path="/salesman/*" element={<SalesmanDashboard />} />
      <Route path="/customer/*" element={<CustomerDashboard />} />

      <Route path="*" element={<Navigate to="/admin/home" replace />} />
       </Route>
    </Routes>
  );
}

export default App;

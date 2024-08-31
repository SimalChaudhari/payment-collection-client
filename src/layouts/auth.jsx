import { authRoutes } from "@/routes";
import { Routes, Route } from "react-router-dom";

export function Auth() {
  return (
    <div className="relative min-h-screen w-full">
      <Routes>
        {authRoutes.map(({ layout, pages }) =>
          layout === "auth" &&
          pages.map(({ path, element }, index) => (
            <Route key={index} path={path} element={element} />
          ))
        )}
      </Routes>
    </div>
  );
}

Auth.displayName = "/src/layout/Auth.jsx";
export default Auth;

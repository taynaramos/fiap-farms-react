import {
  BrowserRouter,
  Navigate,
  Route,
  Routes as RouterRoutes,
} from "react-router-dom";
import CreateAccount from "./presentation/pages/CreateAccount";
import Login from "./presentation/pages/Login";
import Routes from "shared/routes";

const LoginRoutes = () => {
  return (
    <BrowserRouter>
      <RouterRoutes>
        <Route path={Routes.paths.login} element={<Login />} />
        <Route path={Routes.paths.createAccount} element={<CreateAccount />} />

        {/* fallback para rota inválida */}
        <Route
          path="*"
          element={<Navigate to={Routes.paths.login} replace />}
        />
      </RouterRoutes>
    </BrowserRouter>
  );
};

export default () => {
  return <LoginRoutes />;
};

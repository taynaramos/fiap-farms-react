import { Route, Routes as RouterRoutes } from "react-router-dom";
import Routes from "shared/routes";
import ChangePasswordPage from "./presentation/pages/ChangePasswordPage";
import CreateAccount from "./presentation/pages/CreateAccount";
import Login from "./presentation/pages/Login";

const LoginRoutes = () => {
  return (
    <RouterRoutes>
      <Route path={Routes.paths.login} element={<Login />} />
      <Route path={Routes.paths.createAccount} element={<CreateAccount />} />
      <Route path={Routes.paths.changePassword} element={<ChangePasswordPage />} />
    </RouterRoutes>
  );
};

export default () => {
  return <LoginRoutes />;
};

import { Route, 	Routes as RouterRoutes } from "react-router-dom";
import CreateAccount from "./presentation/pages/CreateAccount";
import Login from "./presentation/pages/Login";
import Routes from "shared/routes";

const LoginRoutes = () => {
  return (
    <RouterRoutes>
      <Route path={Routes.paths.login} element={<Login />} />
      <Route path={Routes.paths.createAccount} element={<CreateAccount />} />
    </RouterRoutes>
  );
};

export default () => {
  return <LoginRoutes />;
};

import {
	Route,
	Routes as RouterRoutes
} from "react-router-dom";
import Routes from "shared/routes";
import { AuthProvider } from "./infra/firebase/AuthContext";
import CreateProductPage from "./presentation/pages/CreateProductPage";
import CreateUserPage from "./presentation/pages/CreateUserPage";
import GoalsPage from "./presentation/pages/GoalsPage";
import Logout from "./presentation/pages/Logout";
import ProductionDashboardPage from "./presentation/pages/ProductionDashboardPage";
import SalesDashboardPage from "./presentation/pages/SalesDashboardPage";
import StockDashboardPage from "./presentation/pages/StockDashboardPage";

const RemoteRoutes = () => {

  return (
      <AuthProvider>
        <RouterRoutes>
          <Route
            path={Routes.paths.dashboard_vendas}
            element={<SalesDashboardPage />}
          />
          <Route
            path={Routes.paths.dashboard_producao}
            element={<ProductionDashboardPage />}
          />
          <Route
            path={Routes.paths.cadastrar_produto}
            element={<CreateProductPage />}
          />
          <Route
            path={Routes.paths.controle_estoque}
            element={<StockDashboardPage />}
          />
          <Route path={Routes.paths.admin} element={<CreateUserPage />} />
          <Route path={Routes.paths.metas} element={<GoalsPage />} />
          <Route path={Routes.paths.perfil} element={<div>perfil</div>} />
          <Route path={Routes.paths.sair} element={<Logout />} />
        </RouterRoutes>
      </AuthProvider>
  );
};

// Estilo global para fonte Roboto
const globalStyle = document.createElement("style");
globalStyle.innerHTML = `body, * { font-family: 'Roboto', Arial, sans-serif !important; }`;
document.head.appendChild(globalStyle);

export default function App() {
  return <RemoteRoutes />;
}

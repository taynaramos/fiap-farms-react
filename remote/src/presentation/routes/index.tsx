import { Route, Routes as RouterRoutes } from 'react-router-dom';
import StockDashboardPage from '../pages/StockDashboardPage';
import ProductionDashboardPage from '../pages/ProductionDashboardPage';
import SalesDashboardPage from '../pages/SalesDashboardPage';
import CreateProductPage from '../pages/CreateProductPage';
import CreateUserPage from '../pages/CreateUserPage';
import GoalsPage from '../pages/GoalsPage';

export default class Routes {
  static paths = {
    dashboard_vendas: "/dashboard-vendas",
    dashboard_producao: "/dashboard-producao",
    cadastrar_produto: "/cadastrar-produto",
    controle_estoque: "/controle-estoque",
    metas: "/metas",
    perfil: "/perfil",
    sair: "/sair",
    admin: "/admin",
  };

  static getRoutes() {
    return (
      <RouterRoutes>
        <Route path={this.paths.dashboard_vendas} element={<SalesDashboardPage />} />
        <Route path={this.paths.dashboard_producao} element={<ProductionDashboardPage />} />
        <Route path={this.paths.cadastrar_produto} element={<CreateProductPage />} />
        <Route path={this.paths.controle_estoque} element={<StockDashboardPage />} />
        <Route path={this.paths.metas} element={<GoalsPage />} />
        <Route path={this.paths.admin} element={<CreateUserPage />} />
      </RouterRoutes>
    );
  }
}

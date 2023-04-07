import Login from "../Screen/Login";
import Layout from "../components/layout/Layout";

import PerfilDetail from "../components/Producto/PerfilDetail";
import Home from "../Screen/Home";
import UserSelected from "../Screen/UserSelected";
import Favorites from "../Screen/Favorites";

export const routes = [
  {
    id: 1,
    path: "/home",
    Component: Home,
  },
  {
    id: 2,
    path: "/perfil-detail/",
    Component: PerfilDetail,
  },
  {
    id: 3,
    path: "/users/:login",
    Component: UserSelected,
  },
  {
    id: 4,
    path: "/favoritos",
    Component: Favorites,
  },
];

export { Login, Layout };

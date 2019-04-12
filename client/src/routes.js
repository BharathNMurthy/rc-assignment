import Home from "./components/Home";
import PermissionForm from "./components/PermissionForm";
import RoleForm from "./components/RoleForm";

const routes = [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: "/home",
    exact: false,
    component: Home
  },
  {
    path: "/permission",
    exact: true,
    component: PermissionForm
  },
  {
    path: "/role",
    exact: true,
    component: RoleForm
  }
];

export default routes;

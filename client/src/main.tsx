import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import ListProducts from "./pages/admin/product/ListProducts.tsx";
import AddProduct from "./pages/admin/product/AddProduct.tsx";
import LoginPage from "./pages/clients/LoginPage.tsx";
import RegisterPage from "./pages/clients/RegisterPage.tsx";
import HomePage from "./layouts/Client.tsx";
import AdminPage from "./layouts/Admin.tsx";
import ProductDetail from "./pages/clients/ProductDetail.tsx";
import EditProduct from "./pages/admin/product/EditProduct.tsx";
import ProtectRouter from "./ProtectRouter.tsx";
import ListCategory from "./pages/admin/category/ListCategory.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/products/:id",
    element: <ProductDetail />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },

  {
    path: "/admin",
    element: (
      <ProtectRouter>
        <AdminPage />
      </ProtectRouter>
    ),
  },
  {
    path: "/admin/products",
    element: (
      <ProtectRouter>
        <ListProducts />
      </ProtectRouter>
    ),
  },
  {
    path: "/admin/add-product",
    element: <AddProduct />,
  },
  {
    path: "/admin/edit-product/:id",
    element: <EditProduct />,
  },
  {
    path: "/admin/categories",
    element: <ListCategory />,
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);

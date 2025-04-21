import "./App.css";
import { ThemeProvider } from "styled-components";
import { theme } from "@styles/theme";
import { createBrowserRouter, RouterProvider } from "react-router";

import RootLayout from "@pages/Root";
import HomePage from "@pages/Home";
import { Loader as DetailLoader } from "@/pages/Detail/Detail";
import ErrorPage from "@pages/Error";
import DetailPageWrapper from "./pages/Detail/DetailWrapper";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/detail/:type/:id",
        element: <DetailPageWrapper />,
        loader: DetailLoader,
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
  );
}

export default App;

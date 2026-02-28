import { RouterProvider } from "react-router-dom";
import { router } from "../routes";
import { ItemsProvider } from "../lib/items-store/ItemsStore";

export default function App() {
  return (
    <ItemsProvider>
      <RouterProvider router={router} />
    </ItemsProvider>
  );
}

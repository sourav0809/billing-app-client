import { AppRouter } from "./routes";
import { Toaster } from "@/components/ui/sonner";
import "./App.css";

export default function App() {
  return (
    <>
      <AppRouter />
      <Toaster position="top-right" richColors />
    </>
  );
}

import Header from "@/components/Header/Header.tsx";
import AppRouterProvider from "@/components/router-provider";
import Footer from "@/components/Footer/Footer.tsx";
import "./app.module.css";

function App() {
  return (
    <>
      <Header />
      <AppRouterProvider />
      <Footer />
    </>
  );
}

export default App;

import Header from "@/components/header/Header.tsx";
import AppRouterProvider from "@/components/router-provider";
import Footer from "@/components/footer/Footer.tsx";
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

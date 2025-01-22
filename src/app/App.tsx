import Header from "@/components/Header/Header.tsx";
import AppRouterProvider from "@/components/router-provider";
import Footer from "@/components/Footer/Footer.tsx";
import "./app.module.css";
import { Provider } from "react-redux";
import { persistor, store } from "@/app/store/store.ts";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Header />
        <AppRouterProvider />
        <Footer />
      </PersistGate>
    </Provider>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import { Home, Layout,ProductDetails } from "./router";

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={
        <Layout>
          <Home />
        </Layout>
      }
      />
      <Route path="/details" element={
        <Layout>
          <ProductDetails />
        </Layout>
      }/>
    </Routes>
      </BrowserRouter></>
  )
}

export default App

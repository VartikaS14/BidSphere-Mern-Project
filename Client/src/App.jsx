import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import { Home, Layout } from "./router";

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={
        <Layout>
          <Home />
        </Layout>
      }/>
    </Routes>
      </BrowserRouter></>
  )
}

export default App

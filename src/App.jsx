import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import MyAccount from "./pages/MyAccount";

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route exact path="/services" component={Services} />
          <Route path="/services/:id" component={ServiceDetail} />
          <Route path="/contact" component={Contact} />
          <Route exact path="/blog" component={Blog} />
          <Route path="/blog/:id" component={BlogDetail} />
          <Route path="/account" component={MyAccount} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
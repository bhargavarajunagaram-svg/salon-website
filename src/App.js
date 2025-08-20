import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Account from "./pages/Account";
import Book from "./pages/Book";
import ServiceDetail from "./pages/ServiceDetail";
import BlogDetail from "./pages/BlogDetail";
import ScrollToTop from "./ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <div style={{minHeight: "85vh", background: "#fff"}}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route exact path="/services" component={Services} />
          <Route path="/services/:id" component={ServiceDetail} />
          <Route exact path="/blog" component={Blog} />
          <Route path="/blog/:id" component={BlogDetail} />
          <Route path="/contact" component={Contact} />
          <Route path="/account" component={Account} />
          <Route path="/book" component={Book} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}
export default App;
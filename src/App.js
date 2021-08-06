import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/Topbar/Topbar';
import "./App.css";
import Home from './pages/home/Home';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from './pages/userList/UserList';
import User from './pages/user/User';
import VaccinList from './pages/vaccinList/vaccinList';
import Product from './pages/product/Product';
import NewProduct from './pages/newProduct/NewProduct';
import ProductList from './pages/productList/ProductList';
import ElevageList from './pages/elevageList/elevageList';
import Elevage from './pages/elevage/Elevage';
import NewElevage from './pages/newElevage/NewElevage';
import NourritureList from './pages/nourritureList/nourritureList';
import Nourriture from './components/nourriture/Nourriture';

function App() {
  return (
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/user/:userId">
            <User />
          </Route>
          <Route path="/newElevage">
            <NewElevage />
          </Route>
          <Route path="/products">
            <ProductList />
          </Route>
          <Route path="/elevageList">
            <ElevageList />
          </Route>
          <Route path="/elevage/:id">
            <Elevage/>
          </Route>
          <Route path="/nourriture/:id">
            <Nourriture/>
          </Route>
          <Route path="/product/:productId">
            <Product />
          </Route>
          <Route path="/vaccinList">
            <VaccinList />
          </Route>
          <Route path="/nourritureList">
            <NourritureList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
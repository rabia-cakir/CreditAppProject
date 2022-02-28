import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from "./layouts/Footer";
import Menu from "./layouts/Menu";
import EditCustomer from './pages/EditCustomer';
import ApplicationResult from './pages/ApplicationResult';
import ApplicationStatus from './pages/ApplicationStatus';
import CustomerSettings from './pages/CustomerSettings';
import Login from './pages/Login';
import MakeApplication from './pages/MakeApplication';

function App() {
  return (
    <div>

      <Router>
        <Menu />
        <Switch>
          <Route exact path='/' component={MakeApplication} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/application-status' component={ApplicationStatus} />
          <Route exact path='/application-result' component={ApplicationResult} />
          <Route exact path='/customer-settings' component={CustomerSettings} />
          <Route exact path='/add-customer/:id' component={EditCustomer} />
          <Route exact path='/application-result/:identityNumber' component={ApplicationResult} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

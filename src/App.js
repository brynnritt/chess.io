import NavBar from './NavBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import NotFound from './NotFound';
import WelcomeScreen from './WelcomeScreen';
import Board from './Board';
import Game from './Game';
import Test from './Test';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <WelcomeScreen />
            </Route>
            <Route path="/game">
              <Game />
            </Route>
            <Route exact path="/test">
              <Test />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router> 
  );
}

export default App;

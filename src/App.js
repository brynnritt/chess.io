import NavBar from './NavBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import NotFound from './NotFound';
import WelcomeScreen from './WelcomeScreen';
import Game from './Game';
import ComputerGame from './ComputerGame';
import Chat from './Chat';

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
            <Route path="/game/:gameid/:userid">
              <Game />
            </Route>
            <Route path="/playcomp">
              <ComputerGame />
            </Route>
            <Route path="/chat">
              <Chat />
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

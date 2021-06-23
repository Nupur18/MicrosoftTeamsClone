import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import VideoCallScreen from './Views/VideoCallScreen/VideoCallScreen';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/videocall">
            <VideoCallScreen/>
        </Route>
      </Switch>
    </Router>
    );
}

export default App;

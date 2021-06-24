import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import VideoCallScreen from './Views/VideoCallScreen/VideoCallScreen';
import { Header } from './Views/Header';
// import HomeBody from './Views/Home/HomeBody';
import { SignBody } from './Views/Sign/SignBody';
const LazyHomeBody = React.lazy(() => import('./Views/Home/HomeBody'))

function App() {
  return (
    <Router>
      <React.Suspense fallback ={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/">
          <Header />
          <LazyHomeBody />
        </Route>
        <Route exact path="/videocall">
          <VideoCallScreen />
        </Route>
        <Route exact path="/signup">
          <Header />
          <SignBody />
        </Route>
      </Switch>
      </React.Suspense>
    </Router>
  );
}

export default App;

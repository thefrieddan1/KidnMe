import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import KidsList from './components/KidsList';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>
      <Scene key="auth">
        <Scene key="login" component={LoginForm} title="Please Login" initial />
      </Scene>
      <Scene key="main">
        <Scene
          key="kidsList"
          component={KidsList}
          title="KidsList"
          initial
        />
     </Scene>
    </Router>
  );
};

export default RouterComponent;

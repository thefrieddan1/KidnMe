import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import KidsList from './components/KidsList';
import GroupView from './components/GroupView';
import TabIcon from './components/TabIcon';

const RouterComponent = () => {
  return (
    <Router >
      <Scene key="auth">
        <Scene
          sceneStyle={{ paddingTop: 65 }}
          key="login"
          component={LoginForm}
          title="Please Login"
          initial
        />
      </Scene>
      <Scene
        key="tabbar"
        tabs
      >
        <Scene
          key="kidsView"
          title="Kids View"
          initial
          icon={TabIcon}
          navigationBarStyle={{ backgroundColor: 'red' }}
          titleStyle={{ color: 'white' }}
        >
        <Scene
         sceneStyle={{ paddingTop: 65 }}
         key="kidsList"
         component={KidsList}
         title="KidsList"
        />
    </Scene>
        <Scene
          key="groupViewTab"
          title="Groups View"
          icon={TabIcon}
        >
          <Scene
            sceneStyle={{ paddingTop: 65 }}
            key="groupView"
            component={GroupView}
            title="Group View"
          />
        </Scene>
    </Scene>
    </Router>
  );
};

export default RouterComponent;

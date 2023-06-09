import React, { useState, useEffect, useCallback } from 'react';
import bridge, { UserInfo } from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Friends from './panels/Friends';

enum Panels {
  HOME = 'home',
  FRIENDS = 'friends'
}

const App = () => {
  const [user, setUser] = useState<UserInfo>();
  const [friends, setFriends] = useState<UserInfo[]>();
  const [popout, setPopout] = useState<React.ReactElement | null>(<ScreenSpinner size='large' />);
  const [activePanel, setActivePanel] = useState<string>(Panels.HOME);

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo');
      const token = await bridge.send('VKWebAppGetAuthToken', {
        app_id: Number(process.env.REACT_APP_APP_ID),
        scope: 'friends'
      });
      const data = await bridge.send('VKWebAppCallAPIMethod', {
        method: 'friends.get',
        request_id: 'getFriends',
        params: { order: 'random', fields: 'photo_100', v: '5.131', access_token: token.access_token }
      })
      setFriends(data.response.items)
      setUser(user);
      setPopout(null);
    }
    fetchData();
  }, []);

  const goToHomeHandler = useCallback(() => {
    setActivePanel(Panels.HOME)
  }, [])

  const goToFriendsHandler = useCallback(() => {
    setActivePanel(Panels.FRIENDS)
  }, [])

  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout popout={popout}>
            <SplitCol>
              <View activePanel={activePanel}>
                <Home id={Panels.HOME} user={user} go={goToFriendsHandler} />
                <Friends id={Panels.FRIENDS} friends={friends} go={goToHomeHandler} />
              </View>
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
}

export default App;

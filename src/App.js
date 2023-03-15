import React, { useState, useEffect, useCallback } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Friends from './panels/Friends';

const App = () => {
	const [user, setUser] = useState(null);
	const [friends, setFriends] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const [activePanel, setActivePanel] = React.useState('home');

	useEffect(() => {
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			const token = await bridge.send('VKWebAppGetAuthToken', {
				app_id: 51579378,
				scope: 'friends'
			});
			const data = await bridge.send('VKWebAppCallAPIMethod', {
				method: 'friends.get',
				request_id: 'getFriends',
				params: { order: 'random', fields: 'photo_100', v: '5.131', access_token: token.access_token}
			})
			setFriends(data.response.items)
			setUser(user);
			setPopout(null);
		}
		fetchData();
	}, []);


	const goToHomeHandler = useCallback(()=>{
		setActivePanel('home')
	},[])

	const goToFriendsHandler = useCallback(()=>{
		setActivePanel('friends')
	},[])

	return (
		<ConfigProvider>
			<AdaptivityProvider>
				<AppRoot>
					<SplitLayout popout={popout}>
						<SplitCol>
							<View activePanel={activePanel}>
								<Home id='home' user={user} go={goToFriendsHandler} />
								<Friends id='friends' friends={friends} go={goToHomeHandler}/>
							</View>
						</SplitCol>
					</SplitLayout>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
}

export default App;

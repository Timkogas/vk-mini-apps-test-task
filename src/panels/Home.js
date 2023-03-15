import React from 'react';
import PropTypes from 'prop-types';

import { Panel, PanelHeader, Group, Cell, Div, Avatar } from '@vkontakte/vkui';
import { Icon28UserOutline } from '@vkontakte/icons';

const Home = ({ go, id, user }) => {
	return (

		<Panel id={id}>
			<PanelHeader>Тестовое задание</PanelHeader>
			{user &&
				<Group>
					<Cell
						before={user.photo_200 ? <Avatar src={user.photo_200} /> : null}
					>
						{`${user.first_name} ${user.last_name}`}
					</Cell>

					<Div>
						<Cell expandable before={<Icon28UserOutline />} onClick={go}>
							Друзья
						</Cell>
					</Div>
				</Group>}
		</Panel>
	)
}
Home.propTypes = {
	go: PropTypes.func.isRequired,
	id: PropTypes.string.isRequired,
	user: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
	}),
};

export default Home;

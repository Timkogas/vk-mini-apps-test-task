import React from 'react';
import PropTypes from 'prop-types';

import { Avatar, Cell, Group, Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';


const Friends = ({ id, go, friends }) => (
	<Panel id={id}>
		<PanelHeader
			separator={false}
			before={<PanelHeaderBack onClick={go} />}
		>
			Друзья
		</PanelHeader>
		<Group>
			{friends.length ? friends.map((friend) => (
				<Cell
					key={friend.id}
					before={friend.photo_100 ? <Avatar src={friend.photo_100} /> : null}
				>
					{`${friend.first_name} ${friend.last_name}`}
				</Cell>
			)) : null}
		</Group>
	</Panel>
);

Friends.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	friends: PropTypes.arrayOf(
		PropTypes.shape({
			photo_100: PropTypes.string,
			first_name: PropTypes.string,
			last_name: PropTypes.string,
		}
	)),
};

export default Friends;

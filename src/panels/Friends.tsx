import { UserInfo } from '@vkontakte/vk-bridge';
import { Avatar, Cell, Group, Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';

interface FriendsProps {
  id: string
  friends?: UserInfo[]
  go: () => void
}

const Friends = (props: FriendsProps) => {
  const {
    go,
    id,
    friends = []
  } = props

  return (
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
  )
}

export default Friends;

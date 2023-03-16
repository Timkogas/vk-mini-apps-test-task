import { Panel, PanelHeader, Group, Cell, Div, Avatar } from '@vkontakte/vkui';
import { Icon28UserOutline } from '@vkontakte/icons';
import { UserInfo } from '@vkontakte/vk-bridge';

interface HomeProps {
  id: string
  user?: UserInfo
  go: () => void
}

const Home = (props: HomeProps) => {
  const {
    go,
    id,
    user
  } = props

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

export default Home;

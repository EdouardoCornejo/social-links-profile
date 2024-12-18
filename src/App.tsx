import './App.css';
import avatar from './assets/images/avatar-jessica.jpeg';
import { Avatar, Card, Info, links } from './components';
import { ButtonList } from './components/ButtonList';

function App() {
  return (
    <Card>
      <Avatar alt="avatar" url={avatar} />
      <Info
        location="London, United Kingdom"
        name="Jessica Randall"
        description='"Front-end developer and avid reader."'
      />
      <ButtonList links={links} />
    </Card>
  );
}

export default App;

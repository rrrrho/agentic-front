import { useDisclosure } from '@mantine/hooks';
import './App.css'
import IndividualChat from './pages/IndividualChat'
import CustomDrawer from './components/Drawer/Drawer';

function App() {
  const [opened, { open, close }] = useDisclosure(true);

  return (
    <>
      <CustomDrawer open={open} close={close} opened={opened}/>
      <IndividualChat open={open}/>
    </>
  )
}

export default App

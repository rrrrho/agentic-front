import { useDisclosure } from '@mantine/hooks';
import './App.css'
import IndividualChat from './pages/IndividualChat'
import CustomDrawer from './components/Drawer/Drawer';
import { Route, Routes } from 'react-router';
import Login from './pages/Login';

function App() {
  const [opened, { open, close }] = useDisclosure(true);

  return (
    <Routes>
      <Route path="/chat" element={
        <>
        <IndividualChat open={open}/>
        <CustomDrawer open={open} close={close} opened={opened}/>
        </>
        
        } />
      <Route path="/" element={<Login/>} />
    </Routes>
  )
}

export default App

import { useDisclosure } from '@mantine/hooks';
import './App.css'
import IndividualChat from './pages/IndividualChat'
import CustomDrawer from './components/Drawer/Drawer';
import { Route, Routes } from 'react-router';
import Grainient from './components/external/Grainient';
import Home from './pages/Home';

function App() {
  const [opened, { open, close }] = useDisclosure(true);

  return (
    <><Grainient

      color1="#0b0016"
      color2="#1a0032"
      color3="#561382"
      timeSpeed={0.25}
      colorBalance={0}
      warpStrength={1}
      warpFrequency={5}
      warpSpeed={2}
      warpAmplitude={50}
      blendAngle={0}
      blendSoftness={0.05}
      rotationAmount={500}
      noiseScale={2}
      grainAmount={0.1}
      grainScale={2}
      grainAnimated={false}
      contrast={1.5}
      gamma={1}
      saturation={1}
      centerX={0}
      centerY={0}
      zoom={0.9} /><Routes>
        <Route path="/chat" element={<>
          <IndividualChat open={open} />
          <CustomDrawer open={open} close={close} opened={opened} />
        </>} />
        <Route path="/" element={<Home />} />
      </Routes></>
  )
}

export default App

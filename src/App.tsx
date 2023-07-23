import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import TestCpn from '@/pages/test.tsx';
import { Button } from 'antd';

function App() {
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <Button type="primary">Button</Button>

        <TestCpn />
      </div>
    </>
  );
}

export default App;

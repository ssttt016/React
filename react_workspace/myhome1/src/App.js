import logo from './logo.svg';
import './App.css';
import HelloComponent from './component/HelloComponent';
import Iftest1 from './component/Iftest1';
import Fortest1 from './component/Fortest1';
import Fortest2 from './component/Fortest2';
import Hero from './component/Hero';
import Gugu from './component/Gugu';
import Gugudan from './component/Gugudan';
import HeroList from './component/HeroList';
import HeroWrite from './component/HeroWrite';

function App() {
  return (
    <div className="App">
      <h1 className="title">제목1</h1>
      {/* <HelloComponent/> */}
      {/* <Iftest1/> */}
      {/* <Fortest1/> */}
      {/* <Fortest2/> */}
      {/* <Hero/> */}
      {/* <Gugu/> */}
      {/* <Gugudan/> */}
      <HeroWrite/>
      <HeroList/>
    </div>
  );
}

export default App;

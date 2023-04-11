import logo from './logo.svg';
import './App.css';
import Mycomponent1 from './component/mycomponent1';
import Appclass from './component/Appclass';
import Appclass2 from './component/Appclass2';
import Inputtest from './component/inputtest';

function App() {
  return (
    <div className="App">
        <Mycomponent1/>
        {/*<Appclass address="서울시 성동구" title="자기소개"/>*/}
        {/* <Appclass2 address="서울시 관악구" title="자기소개2"/> */}
        <Inputtest/>
    </div>
  );
}

export default App;

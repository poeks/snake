import logo from './Free vector anaconda snake.svg';
import './App.css';
import SnakeGame from './components/SnakeGame/SnakeGame';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="Cartoon snake" />
        <p>
          Snake game!
        </p>
        </header>
      <div className='snake-game-container'>
        <SnakeGame/>
      </div>
      <footer className="App-footer">
        <a href="https://www.vecteezy.com/free-vector/snake">Snake Vectors by Vecteezy</a>
      </footer>
    </div>
  );
}

export default App;

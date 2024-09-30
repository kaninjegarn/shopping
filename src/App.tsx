import Controller from "./Components/Controller";
import { TodoProvider } from "./Components/TodoContext";
import './index.css';

function App() {
  return (
    <div className="App">
      <TodoProvider>
        <Controller />
      </TodoProvider>
    </div>
  );
}

export default App;

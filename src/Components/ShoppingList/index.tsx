import { useState, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import { FontSize, malachite, margin, primaryText, secondaryDark } from '../../helpers/Variables';
import ShoppingItem from './ShoppingItem';
import { Plus, ArrowLeft } from 'react-feather';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [activateInput, toggleActivateInput] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (newTodo.trim() === '' || todos.some((todo) => todo.text === newTodo)) {
      return;
    }

    const newTodoItem: Todo = {
      id: todos.length + 1,
      text: newTodo,
      completed: false,
    };

    setTodos([...todos, newTodoItem]);
    setNewTodo('');
  };

  const toggleTodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  function countCompletedTodos(todos:Todo[]) {
    // Filter the todos array to get only the completed ones
    const completedTodos = todos.filter(todo => todo.completed);
  
    // Return the count of completed todos
    return completedTodos.length;
  }
  

  return (
    <Container>
      <Heading>
      <ArrowLeft />
      <Title>Todo List</Title>
      <Progress>
        {countCompletedTodos(todos)} / {todos.length}
      </Progress>
      </Heading>
      {activateInput && <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Add a new todo"
          value={newTodo}
          onChange={handleInputChange}
        />
        <Button type="submit">Add Todo</Button>
      </form>}
      {todos.length > 0 && 
      <Listing>
        {todos.map((todo) => (
          <ShoppingItem
            id={todo.id}
            completed={todo.completed}
            text={todo.text}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </Listing>
      }
      <CirleButton onClick={() => toggleActivateInput(!activateInput)}>
      <span>
        <Plus strokeWidth={2} color='white' size={36}/>
      </span>
    </CirleButton>
    </Container>
  );
};

const Container = styled.div({
  padding: margin.MediumLarge,
});

const Button = styled.button({
});

const Heading = styled.div({
  display: 'flex',
  color: primaryText,
  alignItems: 'center',
  marginBottom: margin.Medium,
});

const Title = styled.h2({
  margin: '0 16px',
})

const Progress = styled.p({
  fontSize: FontSize.titleSmall,
  margin: '0',
});

const Listing = styled.ul({
  minHeight: '350px',
  borderRadius: '25px',
  width: 300,
  backgroundColor:  secondaryDark,
  padding: margin.MediumLarge,
});


const CirleButton = styled.div({
  position: 'absolute',
  cursor: 'pointer',
  backgroundColor: malachite,
  borderRadius: '50%',
  height: 56,
  width: 56,
  bottom: 24,
  right: 24,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

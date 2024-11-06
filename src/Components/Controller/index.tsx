import styled from 'styled-components';
import { blueGrotto, FontSize, Margin, primaryBlue, primaryDark, primaryGrey, primaryText, primaryWhite } from '../../helpers/Variables';
import { useEffect, useState } from 'react';
import { Calendar, Award, Archive, Anchor, ArrowUp, Airplay, ArrowLeft, Plus, Circle, Check, Flag, Folder, Moon, Crosshair, X, Disc, CheckCircle } from 'react-feather';
import InputModal from '../InputModal';
import ProgressBar from '../ProgressBar';
import Carousel from '../Carousel';
import ColorPicker from '../ColorPicker';

interface Todo {
  text: string;
  completed: boolean;
};
interface TodoCategory {
  id: number;
  categoryName: string;
  todos: Todo[];
  quantity: number;
  icon: number
  color: string;
};

interface NewCategoryTemplate {
  categoryName: string;
  icon: number;
};

export default () => {
  const [categories, setCategories] = useState<TodoCategory[]>([
    { id: 1, categoryName: 'Work', todos: [{text: "sopa", completed: false}, {text: "städa", completed: true}], quantity: 0,  icon: 1, color: '#e6e060'},
    { id: 2, categoryName: 'Home', todos: [], quantity: 0, icon: 2, color: '#3fb017' },
    { id: 3, categoryName: 'list', todos: [], quantity: 0, icon: 2, color: '#774e9a' },
    { id: 4, categoryName: 'shopping', todos: [], quantity: 0, icon: 2, color: '#a93101' },
  ]);
  const [activeCategoryInput, toggleActiveCategoryInput] = useState<Boolean>(false);
  const [newCategory, setNewCategory] = useState<NewCategoryTemplate[]>([]);
  const [activateInput, toggleActivateInput] = useState<boolean>(false);
  const [newCategoryText, setNewCategoryText] = useState<string>('');
  const [newTodoText, setNewTodoText] = useState<string>('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<TodoCategory | null>();
  const [colorPicker, toggleColorPicker] = useState<boolean>(false);
  const [activeColor, setActiveColor] = useState<string>("#CBC3E3");

  // Used for <Modal />
  const [inputModal, toggleInputModal] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddTodo = () => {
    if (!newTodoText || selectedCategoryId === null) return;

    const newTodo: Todo = {
      text: newTodoText,
      completed: false,
    };

    setCategories(prevCategories =>
      prevCategories.map(category =>
        category.id === selectedCategoryId
          ? {
              ...category,
              todos: [...category.todos, newTodo],
              quantity: category.todos.length + 1
            }
          : category
      )
    );
    toggleActivateInput(false);
    setNewTodoText(''); // Clear text input after adding
    closeModal();
  };

  const toggleTodoCompletion = (categoryId: number, todoIndex: number) => {
    setCategories(prevCategories =>
      prevCategories.map(category =>
        category.id === categoryId
          ? {
              ...category,
              todos: category.todos.map((todo, index) =>
                index === todoIndex ? { ...todo, completed: !todo.completed } : todo
              )
            }
          : category
      )
    );
  };

  const addNewCategory = () => {
    toggleActiveCategoryInput(true);
    setNewCategoryText("");
    
    if(newCategoryText !== "") {
      const tempCategories = [...categories];
      tempCategories.push({ id: categories.length + 1, categoryName: newCategoryText, todos: [], quantity: 0, icon: 2, color: activeColor });
      setCategories(tempCategories);
      toggleInputModal(false);
      toggleActiveCategoryInput(false);
      closeModal();
    }
  };
  
  function generateIcon(iconId: number) {
    if (!iconId) { return;}
    let icon;
    switch (iconId) {
      case 1:
        icon = <Award />
        break;
      case 2:
        icon = <Archive />
        break;
      case 3:
        icon = <Anchor />
        break;
      case 4:
        icon = <Airplay />
        break;
      default:
        icon = <Airplay />
        break;
    }
    return icon;
  }

  const foundCategory = categories.find(category => category?.id === selectedCategoryId);
  const categoryIsNull = selectedCategoryId === null;
  const numberOfCompletedTodos = foundCategory?.todos.filter(todo => todo.completed === true).length;

  function allTodosIsCompleted(id: number) {
    const locateCategory = categories.find(category => category?.id === id);
    const numberOfCompletedTodos = locateCategory?.todos.filter(todo => todo.completed === true).length;
    const allIsCompleted = numberOfCompletedTodos === locateCategory?.todos.length;
    return allIsCompleted;
  }

  function handleRemove(id: number) {
    const tempArr = [...categories];
    tempArr.splice(id - 1, 1);
    setCategories(tempArr);
  }

  useEffect(() => {
    setSelectedCategory(categories.filter(category => category.id === selectedCategoryId)[0]);
  },[selectedCategoryId])

  useEffect(() => {
    toggleColorPicker(false);
  },[activeColor])

  return (
    <Container>
      <Heading>
         {/* Add a button to reset the selected category */}
        {selectedCategoryId !== null && (
          <ArrowLeft
            onClick={() => setSelectedCategoryId(null)}
            style={{cursor: 'pointer'}}
          />
        )}
        <MainTitle>
          {categoryIsNull ? "Todo List with Categories" : 
          foundCategory?.categoryName }
        </MainTitle>
        <Progress>
          {!categoryIsNull && `${foundCategory?.quantity} / ${numberOfCompletedTodos}`}
        </Progress>
      </Heading>
      <CategoryTitle>
        Categories
      </CategoryTitle>

      {/* TOP CONTENT CAROUSEL */}
      <Carousel>
        {categories.map(category => (
          <CategoryCard key={category.id}>
          <Wrapper>
            <Quantity>
              {category.todos.length} tasks
            </Quantity>
            <Title 
            onClick={() => setSelectedCategoryId(category.id)}
            style={
              {
                textDecoration: allTodosIsCompleted(category.id) ? 'line-through' : 'none',
                opacity: allTodosIsCompleted(category.id) ? 0.5 : 1
              }
            }
            >
            {category.categoryName}
          </Title>
          <ProgressBar progress={parseInt((category.todos.filter(todo => todo.completed === true).length /
          category.quantity * 100).toFixed(0))} color={category.color} height={25}/>
          </Wrapper>
         </CategoryCard>
        ))}
      </Carousel>

      {/* IF YOU HAVE SELECTED A CATEOGRY */}
      {foundCategory &&
        <TodoListing>
          {foundCategory.todos.map((todo, index) => (
            <TodoCard key={index}>
              <CompletionToggler onClick={() => toggleTodoCompletion(foundCategory.id, index)}>
                {!todo.completed ? <Circle color={foundCategory.color} /> : <CheckCircle opacity={0.5}/>}
              </CompletionToggler>
              <Name style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {todo.text}
              </Name>
            </TodoCard>
          ))}
        </TodoListing>
      }

      {!selectedCategory && 
        <TodoListing>
          <CategoryTitle>Today's tasks</CategoryTitle>
          {categories.map(category => category.todos.map((todo, index) => 
            <TodoCard key={index}>
            <CompletionToggler onClick={() => toggleTodoCompletion(category.id, index)}>
              {!todo.completed ? <Circle color={category.color} /> : <CheckCircle opacity={0.5}/>}
            </CompletionToggler>
            <Name style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </Name>
          </TodoCard>
          ))}
        </TodoListing>
      }

      <OpenModal onClick={openModal}>
        <Plus color='white'/>
        </OpenModal>
      <InputModal isOpen={isModalOpen} onClose={closeModal}>
      {categoryIsNull ? (
      <>
        <Input
          type="text"
          value={newCategoryText}
          placeholder={`Add new category`}
          onChange={(e) => setNewCategoryText(e.target.value)}
        />
        <DateWrapper>
          <CalendarBtn><Calendar size={16}/>Today</CalendarBtn>
          <ColorPickerContainer onClick={() => toggleColorPicker(prev => !prev)}><Disc color={activeColor}/></ColorPickerContainer>
          {colorPicker && <ColorPicker setActiveColor={setActiveColor} />}
        </DateWrapper>
        <TriButtonWrapper>
          <Folder />
          <Flag style={{margin: '0 16px'}}/>
          <Moon />
        </TriButtonWrapper>
        <Button onClick={addNewCategory}><span>New Category</span></Button>
      </>)
      :(
        <>
        <Input
          type="text"
          value={newTodoText}
          placeholder={`Add new task`}
          onChange={(e) => setNewTodoText(e.target.value)}
        />
        <DateWrapper>
          <CalendarBtn><Calendar size={16}/>Today</CalendarBtn>
        </DateWrapper>
        <TriButtonWrapper>
          <Folder />
          <Flag style={{margin: '0 16px'}}/>
          <Moon />
        </TriButtonWrapper>
        <Button onClick={handleAddTodo}>New Todo</Button>
      </>
      )
    }
      </InputModal>
    </Container>
  );
};

const OpenModal = styled.div({
  position: 'absolute',
  right: '15px',
  bottom: '15px',
  width: '50px',
  height: '50px',
  borderRadius: '25px',
  backgroundColor: blueGrotto,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const Input = styled.input({
  display: 'flex',
  padding: Margin.Medium,
  cursor: 'pointer',
  margin:  `${Margin.Large} auto`,
  border: 'none',
  fontSize: '18px',
});

const DateWrapper = styled.div({
  display: 'flex',
  justifyContent: 'start',
});

const CategoryTitle = styled.p({
  opacity: 0.5,
  fontWeight: 500,
  textTransform: 'uppercase',
});

const CalendarBtn = styled.div({
  padding: '8px',
  border: `1px solid ${primaryGrey}`,
  width: '80px',
  height: '20px',
  borderRadius: '20px',
  marginRight: Margin.Small,
});

const ColorPickerContainer = styled.div({
  height: '40px',
  width: '40px',
  border: `1px solid ${primaryGrey}`,
  borderRadius: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const TriButtonWrapper = styled.div({
  margin: `${Margin.XLarge} auto`,
});

const CategoryCard = styled.div({
  width: '220px',
  height: '100px',
  backgroundColor: 'white',
  borderRadius: '12px',
  marginRight: Margin.Small,
});

const TodoCard = styled.div({
  width: '100%',
  height: '50px',
  backgroundColor: 'white',
  borderRadius: '12px',
  marginBottom: Margin.Small,
  display: 'flex',
  alignItems: 'center',
});

const CompletionToggler = styled.div({
  cursor: 'pointer',
  marginRight: Margin.Large,
  marginLeft: Margin.Small,
});

const TodoListing = styled.div({
  marginTop: Margin.Large,
});

const Button = styled.div({
  position: 'absolute',
  bottom: '25px',
  right: '25px',
  margin: '0 auto',
  width: '150px',
  height: '50px',
  color: 'white',
  backgroundColor: primaryBlue,
  textAlign: 'center',
  borderRadius: '25px',
  alignContent: 'center',
});

const Container = styled.div({
  margin: 0,
  height: '100vh',
  backgroundColor: primaryWhite,
  color: primaryText,
  padding: '0 16px',
})

const MainTitle = styled.h1({
  margin: '0 auto',
});

const Heading = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  color: primaryText,
  alignItems: 'center',
  marginBottom: Margin.Medium,
});

const Quantity = styled.span({
  borderRadius: '10px',
  padding: '6px 0',
  color: primaryDark,
  fontSize: FontSize.large,
  fontWeight: 'bold',
  textAlign: 'center',
  opacity: 0.5,
});

const Title = styled.h2({
  margin: '0',
  marginBottom: Margin.Small,
  fontSize: '28px',
  fontWeight: ''
});

const Wrapper = styled.div({
  margin: `${Margin.Small} 0`,
  
  padding: Margin.Medium,
  borderRadius: '25px',
  cursor: 'pointer',
});

const Name = styled.p({
  margin: '0',
  fontSize: FontSize.titleSmall,
  textTransform: 'capitalize'
});


const Progress = styled.div({
  fontWeight: 700,
  fontSize: '20px',
});
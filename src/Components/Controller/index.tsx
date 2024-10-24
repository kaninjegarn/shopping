import styled from 'styled-components';
import { FontSize, margin, primaryBlue, primaryDark, primaryGrey, primaryText, primaryWhite } from '../../helpers/Variables';
import { useEffect, useState } from 'react';
import { Calendar, Award, Archive, Anchor, Airplay, ArrowLeft, Plus, Circle, Check, Flag, Folder, Moon, Crosshair, X, Disc } from 'react-feather';

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
};

interface NewCategoryTemplate {
  categoryName: string;
  icon: number;
};

export default () => {
  const [categories, setCategories] = useState<TodoCategory[]>([
    { id: 1, categoryName: 'Work', todos: [], quantity: 0,  icon: 1},
    { id: 2, categoryName: 'Home', todos: [], quantity: 0, icon: 2 },
  ]);
  const [activeCategoryInput, toggleActiveCategoryInput] = useState<Boolean>(false);
  const [newCategory, setNewCategory] = useState<NewCategoryTemplate[]>([]);
  const [activateInput, toggleActivateInput] = useState<boolean>(false);
  const [newCategoryText, setNewCategoryText] = useState<string>('');
  const [newTodoText, setNewTodoText] = useState<string>('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

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
      tempCategories.push({ id: categories.length + 1, categoryName: newCategoryText, todos: [], quantity: 0, icon: 2 });
      setCategories(tempCategories);
      toggleActiveCategoryInput(false);
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

  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Set a timeout to trigger the animation after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100); // Delay to trigger the animation

    return () => clearTimeout(timer);
  }, []);

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
      categories
      <Categories>
      {categoryIsNull
        ?
        categories.map(category => (
          <CategoryCard key={category.id}>
            <Wrapper
              // onClick={() => setSelectedCategoryId(category.id)}
              style={{ opacity: allTodosIsCompleted(category.id) ? 0.5 : 1 }}
            >
              {/*!TODO */}
              {/* {allTodosIsCompleted(category.id) ? <button onClick={() => handleRemove(category.id)}>X</button> : <Icon>{generateIcon(category.icon)}</Icon>} */}
              <Quantity>
                {category.quantity} tasks
              </Quantity>
              <Title 
                onClick={() => setSelectedCategoryId(category.id)}
                style={{ textDecoration: allTodosIsCompleted(category.id) ? 'line-through' : 'none' }}
                >
              {category.categoryName}
            </Title>
            {/* <ArrowRightIcon>
              <ArrowRight />
            </ArrowRightIcon> */}
            </Wrapper>
            {selectedCategoryId === category.id && (
              <>
                <Listing>
                  {category.todos.map((todo, index) => (
                    <Item key={index}>
                      <Name style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                        {todo.text}
                      </Name>
                      <CTA onClick={() => toggleTodoCompletion(category.id, index)}>
                        {!todo.completed ? <Circle /> : <Check />}
                      </CTA>
                    </Item>
                  ))}
                </Listing>
                <CirleButton onClick={() => toggleActivateInput(!activateInput)}>
                  <span>
                    <Plus strokeWidth={2} color='white' size={36}/>
                  </span>
                </CirleButton>
                {activateInput && <div>
                  <input
                    type="text"
                    value={newTodoText}
                    placeholder={`Add todo to ${category.categoryName}`}
                    onChange={(e) => setNewTodoText(e.target.value)}
                  />
                  {/* <input
                    type="number"
                    value={newTodoIcon}
                    placeholder="Icon number"
                    onChange={(e) => setNewTodoIcon(Number(e.target.value))}
                  /> */}
                  <button onClick={handleAddTodo}>Add Todo</button>
                </div>}
              </>
            )}
          </CategoryCard>
        )) : 
        categories
          .filter(category => category.id === selectedCategoryId)
          .map(category => (
            <Listing key={category.id}>
              {categoryIsNull && <h2>{category.categoryName} ({category.quantity})</h2>}
              {/* Show todos for the selected category */}
              <div>
                {category.todos.map((todo, index) => (
                  <Item key={index}>
                    <Name style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                      {todo.text}
                    </Name>
                    {/* Icon representation */}
                    <CTA onClick={() => toggleTodoCompletion(category.id, index)}>
                    {!todo.completed ? <Circle /> : <Check />}
                  </CTA>
                    {/* <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodoCompletion(category.id, index)}
                    /> */}
                  </Item>
                ))}
              </div>

              <div>
                {/* <input
                  type="text"
                  value={newTodoText}
                  placeholder={`Add todo to ${category.categoryName}`}
                  onChange={(e) => setNewTodoText(e.target.value)}
                />
                <button onClick={handleAddTodo}>Add Todo</button> */}
                <CirleButton onClick={() => toggleActivateInput(!activateInput)}>
                <span>
                  <Plus strokeWidth={2} color='white' size={36}/>
                </span>
                </CirleButton>
                  {activateInput && 
                    <div>
                      <input
                        type="text"
                        value={newTodoText}
                        placeholder={`Add todo to ${category.categoryName}`}
                        onChange={(e) => setNewTodoText(e.target.value)}
                      />
                    <button onClick={handleAddTodo}>Add Todo</button>
                  </div>}
              </div>
            </Listing>
          ))
      }
      </Categories>
      {categoryIsNull && <AddNewCategory onClick={addNewCategory}>
        <PlusIcon>+</PlusIcon>
        {activeCategoryInput && 
        // <AddNew isVisible={isVisible}>
        <AddNew>
          <Close><X /></Close>
            <Input
              type="text"
              value={newCategoryText}
              placeholder={`Add new category`}
              onChange={(e) => setNewCategoryText(e.target.value)}
            />
            <DateWrapper>
              <CalendarBtn><Calendar size={16}/>Today</CalendarBtn>
              <RoundButton><Disc color={primaryBlue}/></RoundButton>
            </DateWrapper>
            <TriButtonWrapper>
              <Folder />
              <Flag style={{margin: '0 16px'}}/>
              <Moon />
            </TriButtonWrapper>
          <Button onClick={addNewCategory}>Add Todo</Button>
        </AddNew>
      }
      </AddNewCategory>}
        {/* Render only the selected category if one is clicked, otherwise render all categories */}
    </Container>
  );
};

// <CirleButton onClick={() => toggleActivateInput(!activateInput)}>
// <span>
//   <Plus strokeWidth={2} color='white' size={36}/>
// </span>
// </CirleButton>
// {activateInput && <div>
// <input
//   type="text"
//   value={newTodo}
//   placeholder={`Add todo to ${category.categoryName}`}
//   onChange={(e) => setNewTodo(e.target.value)}
// />
// <button onClick={handleAddTodo}>Add Todo</button>
// </div>}



// const AddNew = styled.div({});

interface AddNewProps {
  isVisible: boolean;
}

// const AddNew = styled.div<AddNewProps>`
//   position: fixed;
//   bottom: 0;
//   left: 0;
//   width: 100%;
//   height: 40vh;
//   background-color: ${primaryText};
//   transform: scaleY(0);
//   transform-origin: bottom; 
//   transition: transform 1s ease-in-out;
//   z-index: 9999;
//   ${({ isVisible }) =>
//     isVisible &&
//     `
//     transform: scaleY(1);
//   `}
// `;

const AddNew = styled.div({
  position: 'fixed',
  bottom: 0,
  left: 0,
  margin: '0 auto',
  width: '90%',
  height: '100vh',
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',

});

const Input = styled.input({
  display: 'flex',
  padding: margin.Medium,
  cursor: 'pointer',
  margin:  `${margin.Large} auto`,
  border: 'none',
});

const DateWrapper = styled.div({
  display: 'flex',
  justifyContent: 'start',
});

const CalendarBtn = styled.div({
  padding: '8px',
  border: `1px solid ${primaryGrey}`,
  width: '80px',
  height: '20px',
  borderRadius: '20px',
  marginRight: margin.Small,
});

const RoundButton = styled.div({
  height: '40px',
  width: '40px',
  border: `1px solid ${primaryGrey}`,
  borderRadius: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const TriButtonWrapper = styled.div({
  margin: `${margin.XLarge} auto`,
});


const Categories = styled.div({
  display: 'flex',
});

const CategoryCard = styled.div({
  width: '220px',
  height: '100px',
  backgroundColor: 'purple',
  borderRadius: '12px',
  marginRight: margin.Small,
});

const Close = styled.div({
  position: 'absolute',
  top: '25px',
  right: '25px',
  height: '40px',
  width: '40px',
  border: `1px solid ${primaryGrey}`,
  borderRadius: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const CloseIcon = styled.div({
  fontSize: '22px',
  fontWeight: '600',
  marginBottom: margin.Small,
});



const AddNewCategory = styled.div({
  position: 'absolute',
  right: '15px',
  bottom: '15px',
  width: '50px',
  height: '50px',
  borderRadius: '25px',
  backgroundColor: primaryBlue,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const PlusIcon = styled.div({
  color: 'white',
  fontSize: '28px',
  marginBottom: margin.Small,
});

const Button = styled.div({
  position: 'absolute',
  bottom: '25px',
  right: '25px',
  margin: '0 auto',
  width: '120px',
  height: '40px',
  color: 'white',
  backgroundColor: primaryBlue,
  textAlign: 'center',
  borderRadius: '25px',
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
  marginBottom: margin.Medium,
});

const Quantity = styled.span({
  borderRadius: '10px',
  padding: '6px 10px',
  backgroundColor: primaryText,
  color: primaryDark,
  fontSize: FontSize.large,
  fontWeight: 'bold',
  textAlign: 'center',
});

const Title = styled.h2({
  margin: '0',
  fontSize: '28px',
});

const TakeMeBack =  styled.div({cursor: 'pointer'})

const CirleButton = styled.div({
  position: 'absolute',
  cursor: 'pointer',
  backgroundColor: primaryDark,
  borderRadius: '50%',
  height: 56,
  width: 56,
  bottom: 24,
  right: 24,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const Listing = styled.div({
  minHeight: '350px',
  borderRadius: '25px',
  padding: margin.MediumLarge,
});

const Wrapper = styled.div({
  margin: `${margin.Small} 0`,
  
  padding: margin.Medium,
  borderRadius: '25px',
  cursor: 'pointer',
});

const Icon = styled.div({
  flexBasis: '6%',
  marginLeft: margin.Small,
  margin: 'auto 0'
});

const ArrowRightIcon = styled.div({
  display: 'flex',
  justifyContent: 'right',
  margin: 'auto 0'
})

const Item = styled.li({
  color: primaryText,
  listStyle: 'none',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '6px 0',
});

const Name = styled.p({
  margin: '0',
  fontSize: FontSize.titleSmall,
  textTransform: 'capitalize'
});

const CTA = styled.div({
  cursor: 'pointer',
});

const Progress = styled.div({
  fontWeight: 700,
  fontSize: '20px',
});
// ThemeContext.tsx
import React, { createContext, useState, ReactNode, FC } from 'react';

interface TodoContextType {
  // theme: string;
  // toggleTheme: () => void;
  determinateCategory: number | null;
  showCategories: boolean;
  toggleView: (id: number) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

interface TodoProviderProps {
  children: ReactNode;
}

const TodoProvider: FC<TodoProviderProps> = ({ children }) => {
  // const [theme, setTheme] = useState<string>('light');
  const [determinateCategory, setDeterimatedCategory] = useState<number | null>(null)
  const [showCategories, setShowCategories] = useState<boolean>(false);


  const toggleView = (id: number) => {
    // close without chosen cateogry
    if(id === -1 ) {console.log("-1 unique")}

    setDeterimatedCategory(id)
    console.log(determinateCategory)
    setShowCategories(!showCategories);
  };



  // const toggleTheme = () => {
  //   setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  // };

  return (
    <TodoContext.Provider value={{ showCategories, toggleView, determinateCategory }}>
      {children}
    </TodoContext.Provider>
  );
};

export { TodoContext, TodoProvider };
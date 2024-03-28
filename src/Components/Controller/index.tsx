import styled from 'styled-components';
import ShoppingList from '../ShoppingList';
import { mainDark, margin, primaryText } from '../../helpers/Variables';
import { useState } from 'react';
import { Award, Archive, Anchor, Airplay } from 'react-feather';
import Category from './Category';

export default () => {
  const [categories, setCategories] = useState([
    { id: 0, name: "Bakery", qty: 2, iconId: 1},
    { id: 1, name: "Fruit & Vegatables", qty: 10, iconId: 2},
    { id: 2, name: "Bakery", qty: 2, iconId: 3},
    { id: 3, name: "Bakery", qty: 2, iconId: 4},
  ])
  return(
    <Container>
      <Heading>
      <Title>Todo List</Title>
      </Heading>
      {categories.map(category => <Category key={category.id} {...category}/>)}
      <ShoppingList/>
    </Container>
  )
}

const Container = styled.div({
  margin: 0,
  height: '100vh',
  backgroundColor: mainDark,
  color: primaryText,
  padding: '0 16px',
})

const Heading = styled.div({
  display: 'flex',
  color: primaryText,
  alignItems: 'center',
  marginBottom: margin.Medium,
});

const Title = styled.h2({})
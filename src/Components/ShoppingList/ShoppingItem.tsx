import styled from "styled-components";
import { FontSize, malachite, primaryText } from "../../helpers/Variables";
import { Check, Circle } from 'react-feather';


type Proptype = {
  id: number;
  text: string
  completed: boolean;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

export default (props: Proptype) => {
  return(
    <Item key={props.id}>
      <Title style={{ 
        textDecoration: props.completed ? 'line-through' : 'none',
        opacity: props.completed ? 0.5 : 1,
        }}>
        {props.text}
      </Title>
      <CTA onClick={() => props.toggleTodo(props.id)}>
        {!props.completed ? <Circle /> : <Check color={malachite}/>}
      </CTA>
    </Item>
  )
}

const Item = styled.li({
  color: primaryText,
  listStyle: 'none',
  width: 300,
  display: 'flex',
  justifyContent: 'space-between',
  padding: '6px 0',
});

const Title = styled.p({
  margin: '0',
  fontSize: FontSize.titleSmall,
  textTransform: 'capitalize'
});

const CTA = styled.div({
  cursor: 'pointer',
});
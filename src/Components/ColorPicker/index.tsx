import styled from "styled-components";
import { Margin } from "../../helpers/Variables";

type ColorPickerProps = {
  setActiveColor: (val: string) => void;
}

export default (props: ColorPickerProps) => {

  function handleColorChange(value: string) {
    props.setActiveColor(value)
  }

  return(
    <Container>
      <Color style={{backgroundColor: "#FF0000"}} onClick={() => handleColorChange("#FF0000")}></Color>
      <Color style={{backgroundColor: "#0000FF"}} onClick={() => handleColorChange("#0000FF")}></Color>
      <Color style={{backgroundColor: "#A020F0"}} onClick={() => handleColorChange("#A020F0")}></Color>
      <Color style={{backgroundColor: "#00FF00"}} onClick={() => handleColorChange("#00FF00")}></Color>
    </Container>
  )
};

const Container = styled.div({
  position: 'absolute',
  right: '33%',
  bottom: '40%',
  border: '1px solid black',
  padding: '10px',
  borderRadius: '20px',
});

const Color = styled.div({
  height: '24px',
  width: '24px',
  borderRadius: '12px',
  marginBottom: Margin.Small,
});
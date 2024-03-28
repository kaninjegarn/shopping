import styled from "styled-components";
import { Award, Archive, Anchor, Airplay } from 'react-feather';
import { FontSize, mainDark, margin, primaryText, secondaryDark } from "../../helpers/Variables";


type Proptype = {
  id: number;
  name: string;
  qty: number;
  iconId: number;
}

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

const handleClickCategory = (category: string) => {
  console.log("clicked", category);
}

export default (props: Proptype) => {
  return(
    <Wrapper onClick={() => handleClickCategory(props.name)}>
      <Icon>{generateIcon(props.iconId)}</Icon>
      <Name>{props.name}</Name>
      <Quantity>{props.qty}</Quantity>
    </Wrapper>
  )
}

const Wrapper = styled.div({
  display: 'flex',
  margin: `${margin.Small} 0`,
  backgroundColor: secondaryDark,
  padding: margin.Medium,
  borderRadius: '25px',
  cursor: 'pointer',
});

const Icon = styled.div({
  flexBasis: '10%',
  marginLeft: margin.Small,
});

const Name = styled.p({
  padding: 0,
  margin: 0,
});

const Quantity = styled.div({
  marginLeft: margin.Small,
  flexBasis: '4%',
  borderRadius: '12px',
  backgroundColor: primaryText,
  color: mainDark,
  fontSize: FontSize.large,
  fontWeight: 'bold',
  textAlign: 'center',
});
import styled from "styled-components";
import { Award, Archive, Anchor, Airplay } from 'react-feather';
import { FontSize, mainDark, margin, primaryText, secondaryDark } from "../../helpers/Variables";
import { useContext, useState } from "react";
import ShoppingList from "../ShoppingList";
import { TodoContext } from "../TodoContext";


type Proptype = {
  id: number;
  name: string;
  qty: number;
  iconId: number;
}


export default (props: Proptype) => {
  const [showList, setShowList ] = useState<boolean>(false);
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('ThemeToggler must be used within a ThemeProvider');
  }
  const {showCategories, toggleView, determinateCategory} = context

  if (showCategories && determinateCategory == props.id) console.log("ja") 

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
  
  const handleClickCategory = (id: number) => {
    console.log("clicked", id);
    // setShowList(true);
    toggleView(id);
  }
  
  return(
    <>
    {!showList && <Wrapper onClick={() => handleClickCategory(props.id)}>
      <Icon>{generateIcon(props.iconId)}</Icon>
      <Name>{props.name}</Name>
      <Quantity>{props.qty}</Quantity>
    </Wrapper>}
    { showCategories && <ShoppingList goBack={() => setShowList(false)} />}
    </>
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
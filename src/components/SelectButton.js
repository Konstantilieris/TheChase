import React from 'react'
import { styled } from "@mui/material/styles";

const SelectButton = ({children,selected,onClick}) => {
    const CustomSpan=styled("span")(() => ({
        border: "1px solid gold",
        borderRadius: 5,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        fontFamily: "Montserrat",
        cursor: "pointer",
        backgroundColor: selected ? "gold" : "",
        color: selected ? "black" : "",
        fontWeight: selected ? 700 : 500,
        "&:hover": {
          backgroundColor: "gold",
          color: "black",
        },
        width: "22%",
    
    }))
  return (
    <CustomSpan onClick={onClick}>
        {children}
        </CustomSpan>
    )
}

export default SelectButton

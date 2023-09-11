import React, {ReactNode} from 'react';

// TODO: add when styled components configured
/* const Button = styled.button`
  background-color: ${Theme.primary};
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
`; */

interface ButtonProps {
  children?: ReactNode;
}

export const Button = ({children}: ButtonProps) => <button> {children} </button>;

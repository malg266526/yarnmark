import React, { ReactNode } from 'react';
import { HashLinkProps } from 'react-router-hash-link';
import { Dropdown } from '../Dropdown';
import { Link } from '../Link';

type DropdownMenuItem = {
  children?: ReactNode;
  subLinks?: {
    to: HashLinkProps['to'];
    name: string;
    target?: HashLinkProps['target'];
  }[];
};

type MenuItemType = HashLinkProps | DropdownMenuItem;

export const MenuItem = ({ children, ...props }: MenuItemType) => {
  if ('subLinks' in props) {
    return <Dropdown options={props.subLinks}>{children}</Dropdown>;
  }

  if ('to' in props) {
    return (
      <Link target={props.target} color="black" to={props.to}>
        {children}
      </Link>
    );
  }
};

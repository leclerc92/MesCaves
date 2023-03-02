import { NextPage } from 'next';
import { ReactNode } from 'react';
import NavBar from './navBar';

interface Props {
    children:ReactNode
}

const Layout: NextPage<Props> = ({children}) => {
  return(
    <div>
        <NavBar/>
        {children}

    </div>

  )
};

export default Layout;
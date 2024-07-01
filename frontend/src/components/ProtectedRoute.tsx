import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { REFRESH_TOKEN } from '../constants';

// Define the props type
interface IsLoggedInProps {
  children: ReactNode;
}

const IsLoggedIn: React.FC<IsLoggedInProps> = ({ children }) => {
  const token: string | null = localStorage.getItem(REFRESH_TOKEN);

  if (token) {
    return <>{children}</>;
  } else {
    return <Navigate to='/mustlogin'/>
  }
};

export default IsLoggedIn;
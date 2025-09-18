import React from 'react';
import Login from '../components/auth/Login';

interface LoginPageProps {
  onLogin: (email: string, password: string) => Promise<void>;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  return <Login onLogin={onLogin} />;
};

export default LoginPage;

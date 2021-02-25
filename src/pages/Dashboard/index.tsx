import React from 'react';

import { FiPower } from 'react-icons/all';
import { Link } from 'react-router-dom';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
} from './styles';

import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';
import Button from '../../components/Button';

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="Easy Kanban" />

          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>{"Welcome"},</span>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
        <p></p>        
        <p></p>        
        <Button>
          <Link to="/NewProject">New project</Link>
        </Button>       
  
        <p></p> 
        <Button>
          <Link to="/Projects">My projects</Link>
        </Button>

        <p></p>
        <Button>
          <Link to="/InviteFriend">Invite a friend to join Easy Kanban</Link>
        </Button>

    </Container>
  );
};

export default Dashboard;

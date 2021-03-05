import React, { useRef, useCallback, useState } from 'react';
import { FiArrowLeft, FiMail, FiUser, CgNotes } from 'react-icons/all';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';
import TextArea from '../../components/TextArea';
import api from '../../services/api';

import { 
  Container, 
  Content, 
  Header, 
  HeaderContent, 
  Profile 
} from './styles';


interface IInviteFriend {
  email: string;
  name: string;
  note: string;
}

const InviteFriend: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);
  
  const { addToast } = useToast();
  
  const handleSubmit = useCallback(
    async (data: IInviteFriend) => {
      try {
        setLoading(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          note: Yup.string()
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/inviteFriend', {
          userName: user.name,
          email: data.email,
          name: data.name,
          note: data.note
        });

        addToast({
          type: 'success',
          title: 'Invite sent by e-mail',
          description:
            'We sent an email to invite your friend,',
        });
      } catch (err) {
        console.log(err)
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Error on sent e-mail',
          description:
            'An error occurred while trying to sent invitation, please try again.',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, user.name],
  );

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

          <Link to="/">
            <FiArrowLeft />
            Back to Dashboard
          </Link>
        </HeaderContent>
      </Header>

      <Content>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>{"Invite a friend"}</h1>

          <Input name="name" icon={FiUser} placeholder="name" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <TextArea name="note" rows={6} icon={CgNotes} placeholder="My friend ..." />


          <Button loading={loading} type="submit">
            {"Send"}
          </Button>
        </Form>

     
      </Content>

    </Container>
  );
};

export default InviteFriend;

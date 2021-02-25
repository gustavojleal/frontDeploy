import React, { useRef, useCallback, useState } from 'react';
import { FiLogIn, FiMail, FiUser } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles';
import api from '../../services/api';

interface ICreateNewAccount {
  email: string;
  name: string;
}

const CreateNewAccount: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ICreateNewAccount) => {
      try {
        setLoading(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        console.log(data)

        await api.post('/createNewAccount', {
          email: data.email,
          name: data.name
        });

        addToast({
          type: 'success',
          title: 'New account creation email sent',
          description:
            'We sent an email to confirm your new account, check your inbox',
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
          title: 'Error on account create',
          description:
            'An error occurred while trying to create your account, please try again.',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="Easy-Kanban" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>{"Create new account"}</h1>

            <Input name="name" icon={FiUser} placeholder="name" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Button loading={loading} type="submit">
              {"Create"}
            </Button>
          </Form>

          <Link to="/">
            <FiLogIn />
            {"Back to login"}
          </Link>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  );
};

export default CreateNewAccount;

import { darken } from 'polished';
import styled from 'styled-components';

export const Form = styled.form`
  h2 {
    color: var(--text-title);
    font-size: 1.5rem;
    margin-bottom: 2rem;
    text-align: center;

    span {
      background: linear-gradient(90deg, #9442fe, #3378ff);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  input {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    border-radius: 0.25rem;

    border: 1px solid #d7d7d7;
    background: #e7e9ee;

    font-weight: 400;
    font-size: 1rem;

    &::placeholder {
      color: var(--text-body);
    }

    & + input {
      margin-top: 1rem;
    }
  }

  p {
    color: var(--red);
    font-style: italic;
    margin: 0.25rem 0;
  }
`;

export const Google = styled.button`
  height: 4rem;
  width: 100%;
  border: 1px solid #d7d7d7;
  margin-top: 1rem;
  border-radius: 0.25rem;

  background: #e7e9ee;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: border-color 0.2s;

  &:hover {
    border-color: ${darken(0.2, '#d7d7d7')};
  }

  img {
    margin-left: 1rem;
    height: 1.5rem;
    height: 1.5rem;
    width: 1.5rem;
  }

  span {
    display: inline-block;
    font-size: 1rem;
    color: var(--text-title);
  }
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;

  span {
    display: block;
    color: var(--text-title);
    flex: 1;
    text-align: center;
  }

  &::before,
  ::after {
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background: #d7d7d7;
    flex: 2;
  }
`;

export const Register = styled.button`
  width: 100%;
  padding: 0 1.5rem;
  height: 4rem;
  background: var(--green);
  color: #fff;
  border-radius: 0.25rem;
  border: 0;
  font-size: 1rem;
  margin-top: 1.5rem;
  font-weight: 600;

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.9);
  }
`;

export const AlreadyHaveAnAccount = styled.div`
  margin-top: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  button {
    all: unset;
    color: var(--blue);
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

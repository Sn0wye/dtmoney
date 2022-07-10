import React from 'react';
import { Container } from './styles';

import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';
import { useTransactions } from '../../hooks/useTransactions';

export const Summary = () => {
  const { transactions } = useTransactions();

  return (
    <Container>
      <div>
        <header>
          <p>Incomes</p>
          <img src={incomeImg} alt='Income icon' />
        </header>
        <strong>R$1000</strong>
      </div>
      <div>
        <header>
          <p>Outcomes</p>
          <img src={outcomeImg} alt='Outcome icon' />
        </header>
        <strong>- R$500</strong>
      </div>
      <div className='highlight-background'>
        <header>
          <p>Total</p>
          <img src={totalImg} alt='Total icon' />
        </header>
        <strong>R$500</strong>
      </div>
    </Container>
  );
};

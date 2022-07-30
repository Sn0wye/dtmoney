import { useState } from 'react';
import Modal from 'react-modal';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { NewTransactionModal } from './components/NewTransactionModal';
import { RegisterModal } from './components/RegisterModal';
import { AuthProvider } from './hooks/useAuth';
import { TransactionsProvider } from './hooks/useTransactions';
import { GlobalStyle } from './styles/global';

Modal.setAppElement('#root');

export const App = () => {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);
  const [isRegisterModalOpen, setIsLoginModalOpen] = useState(false);

  function handleToggleNewTransactionModal() {
    setIsNewTransactionModalOpen(!isNewTransactionModalOpen);
  }

  function handleToggleRegisterModal() {
    setIsLoginModalOpen(!isRegisterModalOpen);
  }

  return (
    <AuthProvider>
      <TransactionsProvider>
        <GlobalStyle />
        <Header
          onOpenNewTransactionModal={handleToggleNewTransactionModal}
          onOpenAuthModal={handleToggleRegisterModal}
        />
        <Dashboard />

        <NewTransactionModal
          isOpen={isNewTransactionModalOpen}
          onRequestClose={handleToggleNewTransactionModal}
        />

        <RegisterModal
          isOpen={isRegisterModalOpen}
          onRequestClose={handleToggleRegisterModal}
        />
      </TransactionsProvider>
    </AuthProvider>
  );
};

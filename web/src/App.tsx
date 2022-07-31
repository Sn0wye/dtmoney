import { useState } from 'react';
import Modal from 'react-modal';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { LoginModal } from './components/LoginModal';
import { NewTransactionModal } from './components/NewTransactionModal';
import { RegisterModal } from './components/RegisterModal';
import { AuthProvider } from './hooks/useAuth';
import { TransactionsProvider } from './hooks/useTransactions';
import { GlobalStyle } from './styles/global';

Modal.setAppElement('#root');

export const App = () => {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  function handleToggleNewTransactionModal() {
    setIsNewTransactionModalOpen(!isNewTransactionModalOpen);
  }

  function handleToggleRegisterModal() {
    setIsRegisterModalOpen(!isRegisterModalOpen);
  }

  function handleToggleLoginModal() {
    setIsLoginModalOpen(!isLoginModalOpen);
  }

  function switchBetweenModals() {
    if (isRegisterModalOpen) {
      setIsRegisterModalOpen(false);
      setIsLoginModalOpen(true);
    } else {
      setIsLoginModalOpen(false);
      setIsRegisterModalOpen(true);
    }
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
          onSwitchModalRequest={switchBetweenModals}
        />

        <LoginModal
          isOpen={isLoginModalOpen}
          onRequestClose={handleToggleLoginModal}
          onSwitchModalRequest={switchBetweenModals}
        />
      </TransactionsProvider>
    </AuthProvider>
  );
};

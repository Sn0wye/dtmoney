import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/useAuth';
import { ProfileMenu } from '../ProfileMenu';

import { Button, Container, Content, RightContainer } from './styles';

interface HeaderProps {
  onOpenNewTransactionModal: () => void;
  onOpenAuthModal: () => void;
}

export const Header = ({
  onOpenNewTransactionModal,
  onOpenAuthModal,
}: HeaderProps) => {
  const { user } = useAuth();

  return (
    <Container>
      <Content>
        <img src={logoImg} alt='dtmoney logo' />
        <RightContainer>
          <Button type='button' onClick={onOpenNewTransactionModal}>
            New Transaction
          </Button>
          {user ? (
            <ProfileMenu />
          ) : (
            <Button onClick={onOpenAuthModal}>Sign Up</Button>
          )}
        </RightContainer>
      </Content>
    </Container>
  );
};

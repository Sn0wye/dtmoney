import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/useAuth';
import { getInitials } from '../../utils/getInitials';
import { ProfileMenu } from '../ProfileMenu';

import {
  Button,
  Container,
  Content,
  ProfileAvatar,
  RightContainer,
} from './styles';

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
            <ProfileMenu>
              <ProfileAvatar>
                {user?.profilePic !== null ? (
                  <img src={user?.profilePic} alt={user?.name} />
                ) : (
                  <span>{getInitials(user.name)}</span>
                )}
              </ProfileAvatar>
            </ProfileMenu>
          ) : (
            <Button onClick={onOpenAuthModal}>Sign Up</Button>
          )}
        </RightContainer>
      </Content>
    </Container>
  );
};

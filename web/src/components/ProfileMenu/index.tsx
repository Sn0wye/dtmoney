import { FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import { getInitials } from '../../utils/getInitials';
import {
  MenuItem,
  MenuList,
  Panel,
  Popover,
  ProfileAvatarButton,
} from './styles';

export const ProfileMenu = () => {
  const { disconnect, user } = useAuth();

  return (
    <Popover>
      <ProfileAvatarButton>
        {user?.profilePic !== null ? (
          <img src={user?.profilePic} alt={user?.name} />
        ) : (
          <span>{getInitials(user.name)}</span>
        )}
      </ProfileAvatarButton>
      <Panel>
        <MenuList>
          <MenuItem onClick={disconnect}>
            <FiLogOut />
            Disconnect
          </MenuItem>
        </MenuList>
      </Panel>
    </Popover>
  );
};

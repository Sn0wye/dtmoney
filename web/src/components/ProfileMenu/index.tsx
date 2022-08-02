import { Popover as HeadlessPopover } from '@headlessui/react';
import { darken } from 'polished';
import { ReactNode } from 'react';
import { FiLogOut } from 'react-icons/fi';
import styled, { keyframes } from 'styled-components';
import { useAuth } from '../../hooks/useAuth';

interface ProfileMenuProps {
  children: ReactNode;
}

export const ProfileMenu = ({ children }: ProfileMenuProps) => {
  const { disconnect } = useAuth();

  return (
    <Popover>
      <Button>{children}</Button>
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

const Popover = styled(HeadlessPopover)`
  position: relative;
`;

const appear = keyframes`
  0% {
      opacity: 0;
      transform: scale(0.7);
    }

    50% {
      transform: scale(1.1);
    }

    100% {
      opacity: 1;
      transform: scale(1);
    }
`;

const Panel = styled(HeadlessPopover.Panel)`
  position: absolute;
  top: 3.5rem;
  right: 0;
  background-color: #fff;
  border-radius: 0.25rem;

  animation: ${appear} 0.2s ease-in-out;
`;

const Button = styled(HeadlessPopover.Button)`
  all: unset;
  background-color: transparent;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0.25rem;
  display: flex;
  flex-direction: column;
`;

const MenuItem = styled.li`
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  border-radius: 0.25rem;

  &:hover {
    background: ${darken(0.1, '#fff')};
  }

  & + & {
    // Style items after the first child
    padding-top: 0.25rem;
  }
`;

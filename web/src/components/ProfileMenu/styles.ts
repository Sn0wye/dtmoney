import { Popover as HeadlessPopover } from '@headlessui/react';
import { darken } from 'polished';
import styled, { keyframes } from 'styled-components';

export const Popover = styled(HeadlessPopover)`
  position: relative;
`;

export const appear = keyframes`
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

export const Panel = styled(HeadlessPopover.Panel)`
  position: absolute;
  top: 3.5rem;
  right: 0;
  background-color: #fff;
  border-radius: 0.25rem;

  animation: ${appear} 0.2s ease-in-out;
`;

export const MenuList = styled.ul`
  list-style: none;
  padding: 0.25rem;
  display: flex;
  flex-direction: column;
`;

export const MenuItem = styled.li`
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

export const ProfileAvatarButton = styled(HeadlessPopover.Button)`
  all: unset;

  cursor: pointer;
  border: 0;
  height: 3rem;
  width: 3rem;
  border-radius: 100%;
  color: #fff;
  background: var(--blue-light);

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.9);
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
  }
`;

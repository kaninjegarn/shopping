// Modal.tsx
import React, { ReactNode, useEffect } from 'react';
import { Crosshair, X } from 'react-feather';
import styled from 'styled-components';
import { primaryGrey } from '../../helpers/Variables';
// import './Modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export default (props: ModalProps) => {
  const {isOpen, onClose, title, children} = props;
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    // <Modal onClick={onClose}>
    <Modal>
      <div onClick={(e) => e.stopPropagation()}>
        <Close onClick={onClose}>
          <X />
        </Close>
        {title && <h2>{title}</h2>}
        <div>{children}</div>
      </div>
    </Modal>
  );
};


const Modal = styled.div({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  // background: rgba(0, 0, 0, 0.5);
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'white',
  height: '100vh',
  width: '100%',
  // z-index: 1000;
});

const Close = styled.div({
  position: 'absolute',
  top: '25px',
  right: '25px',
  height: '40px',
  width: '40px',
  border: `1px solid ${primaryGrey}`,
  borderRadius: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
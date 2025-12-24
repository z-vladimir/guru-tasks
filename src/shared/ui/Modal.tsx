import { PropsWithChildren, ReactNode } from 'react';
import {
  Modal as HeroModal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@heroui/modal';

import { CloseButton } from './CloseButton';

interface ModalProps extends PropsWithChildren {
  open: boolean;
  title: string;
  footer?: ReactNode;
  onClose: () => void;
}

export const Modal = ({
  open,
  title,
  children,
  footer,
  onClose,
}: ModalProps) => (
  <HeroModal
    isOpen={open}
    onClose={onClose}
    hideCloseButton
    classNames={{
      base: 'max-w-[480px] flex flex-col gap-8 rounded-xl bg-primary-400 p-6',
      backdrop: 'bg-[#000000]/80',
      header: 'bortext-xl font-bold leading-base tracking-md py-[9px] px-0 ',
      footer: 'p-0',
      body: 'p-0',
    }}
  >
    <ModalContent>
      {(close: () => void) => (
        <>
          <CloseButton onClick={close} className="absolute top-6 right-6" />
          <ModalHeader>{title}</ModalHeader>
          <ModalBody>{children}</ModalBody>
          {footer && <ModalFooter>{footer}</ModalFooter>}
        </>
      )}
    </ModalContent>
  </HeroModal>
);

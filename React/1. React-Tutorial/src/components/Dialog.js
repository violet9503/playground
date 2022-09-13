import React from 'react';
import Button from './Button';
import './Dialog.scss';

function Dialog({
  title,
  children,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  visible,
}) {
  if (!visible) return null;
  return (
    <div className="darkBackground">
      <div className="dialogBlock">
        <h3>{title}</h3>
        <p>{children}</p>
        <div className="buttonGroup">
          <Button color="gray" onClick={onCancel}>
            {cancelText}
          </Button>
          <Button color="pink" onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}

Dialog.defaultProps = {
  confirmText: '확인',
  cancelText: '취소',
};

export default Dialog;

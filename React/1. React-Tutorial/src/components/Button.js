import React from 'react';
import './Button.scss';

function Button({ children, size, color, outline, fullWidth, ...rest }) {
  return (
    <button
      className={
        `Button ${size} ${color}` +
        (outline ? ' outline' : '') +
        (fullWidth ? ' fullWidth' : '')
      }
      {...rest}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  size: 'medium',
  color: 'blue',
};

export default Button;

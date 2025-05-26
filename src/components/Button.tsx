import React from 'react';

type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'px-4 py-2 rounded-md text-sm font-medium transition duration-200';

  const variantClass =
    variant === 'primary'
      ? 'bg-blue-600 text-white hover:bg-blue-700 border border-transparent'
      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300';

  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';

  const combinedClassName = `${baseClasses} ${variantClass} ${disabledClass} ${className}`.trim();

  return (
    <button {...props} className={combinedClassName} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;

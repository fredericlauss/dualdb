import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

const IconButton = (props: Props) => {
    return (
        <button {...props} className='icon-button'>
            {props.children}
        </button>
    );
};

type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export default IconButton;
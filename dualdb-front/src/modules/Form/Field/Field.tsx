import { ChangeEvent, FC } from 'react';
import { FormHandler } from '../Form.types';

interface Props {
    name: string
    value: string
    onChange: FormHandler<string>
    placeholder?: string
}

const Field: FC<Props> = ({ name, value, onChange, placeholder }) => {

    const handleChanges = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        onChange({
            name,
            value,
            event
        });
    }

    return (
        <div className='field'>
            <input 
                name={name}
                value={value}
                onChange={handleChanges}
                placeholder={placeholder}
            />
        </div>
    );
};

export default Field;
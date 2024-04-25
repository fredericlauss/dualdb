'use client';

import { useState } from 'react';
import { PageLayout } from '@/components';
import { Form, FormHandler } from '@/modules/Form';
import { Requests } from '@shared/api';
import Link from 'next/link';
import { routes } from '@/services/api/routes';

const RegisterPage = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState(defaultRegisterForm);

    const handleChanges: FormHandler<ValueOf<typeof form>> = ({ name, value }) => {
        setForm({
            ...form,
            [name]: value
        });
    }

    const handleSubmit = async () => {
        setIsLoading(true);
        setError(null);
        const success = await routes.users.register(form);
        if (!success) setError("Une erreur est survenue.");
        setIsLoading(false);
    }

    return (
        <PageLayout id='register-page'>
            <div className="form">
                <h2>S'inscrire</h2>
                <Form.Field 
                    name='username'
                    value={form.username}
                    onChange={handleChanges}
                    placeholder='Username'
                />
                <Form.Field 
                    name='password'
                    value={form.password}
                    onChange={handleChanges}
                    placeholder='Password'
                />
                {!!error && <p className='error'>{error}</p>}
                <button 
                    className='animated filled'
                    onClick={handleSubmit}
                    disabled={isLoading}
                >
                    Valider
                </button>
                <p>Vous avez déjà un compte ? <Link href='/login'>Se connecter</Link>.</p>
            </div>
        </PageLayout>
    );
};

const defaultRegisterForm: Requests.User.Register['body'] = {
    username: '',
    password: ''
}

export default RegisterPage;
'use client';

import { useState } from 'react';
import { PageLayout } from '@/components';
import { Form, FormHandler } from '@/modules/Form';
import { Requests } from '@shared/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { routes } from '@/services/api/routes';

const LoginPage = () => {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [login, setLogin] = useState(defaultLogin);

    const handleChanges: FormHandler<ValueOf<typeof login>> = ({ name, value }) => {
        setLogin({
            ...login,
            [name]: value
        });
    }

    const handleSubmit = async () => {
        setIsLoading(true);
        setError(null);
        const success = await routes.users.login(login);
        if (success) {
            router.push('/');
            return setIsLoading(false);
        }

        setError("Une erreur est survenue.");
        setIsLoading(false);
    }

    return (
        <PageLayout id='login-page'>
            <div className="form">
                <h2>Se connecter</h2>
                <Form.Field 
                    name='username'
                    value={login.username}
                    onChange={handleChanges}
                    placeholder='Username'
                />
                <Form.Field 
                    name='password'
                    value={login.password}
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
                <p>Pas encore inscrit ? <Link href='/register'>S'incrire</Link>.</p>
            </div>
        </PageLayout>
    );
};

const defaultLogin: Requests.User.Login['body'] = {
    username: '',
    password: ''
}

export default LoginPage;
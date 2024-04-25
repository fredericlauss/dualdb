'use client';

import { useState } from 'react';
import { PageLayout } from '@/components';
import { Form, FormHandler } from '@/modules/Form';
import { Requests } from '@shared/api';
import Link from 'next/link';

const LoginPage = () => {

    const [login, setLogin] = useState(defaultLogin);

    const handleChanges: FormHandler<ValueOf<typeof login>> = ({ name, value }) => {
        setLogin({
            ...login,
            [name]: value
        });
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
                <button className='animated filled'>
                    Valider
                </button>
                <p>Pas encore inscrit ? <Link href='/login'>S'incrire</Link>.</p>
            </div>
        </PageLayout>
    );
};

const defaultLogin: Requests.User.Login['body'] = {
    username: '',
    password: ''
}

export default LoginPage;
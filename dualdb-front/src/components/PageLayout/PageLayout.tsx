import React, { FC } from 'react';
// import { Header, Footer } from '../';

interface Props {
    id: string,
    children: JSX.Element | JSX.Element[]
}

const PageLayout: FC<Props> = ({ id, children }) => {
    return (
        <section className='app-page' id={id}>

            {/* <Header /> */}

            <div className="main-area">
                <div className="main-content">
                    {children}
                </div>
            </div>

            {/* <Footer /> */}

        </section>
    );
};

export default PageLayout;
import '../styles/index.scss';

export const metadata = {
    title: 'Note application',
    description: 'A note application.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}

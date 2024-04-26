import { RequestHelper } from '../../libs/request-helper';

export const Request = new RequestHelper({
    targets: {
        'dualdb-api': process.env.NEXT_PUBLIC_DUALDB_API_URL
    },
    defaultTarget: 'dualdb-api',
    defaultOptions: {
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    }
});
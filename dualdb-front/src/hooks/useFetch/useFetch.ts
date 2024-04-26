'use client';

import { Request } from '@/services/api/helpers/request';
import { API } from '@shared/api';
import { useState, useEffect } from 'react';

interface BaseResponse<T> extends API.Responses {
    200: T
}

interface BaseRequest extends API.Request {
    query: any
}

interface Configuration {
    options: any
    query: any
}

export const useFetch = <T, V extends API.Request>(
        url: string, 
        defaultData: T = ([] as T), 
        configuration?: Configuration
    ) => {

    const [isLoading, setIsLoading] = useState(false);
    const [body, setBody] = useState<T>(defaultData);

    const fetchFunction = async () => {
        
        setIsLoading(true);

        try {
            const response = await Request.get<BaseResponse<T>, BaseRequest>({
                url,
                query: configuration?.query,
                options: configuration?.options,
            });
            
            if (response.body)
                setBody(response.body);
            
        } catch (error) {
            console.log(`Error while fetching url ${url} :\n`, error);
        }

        setIsLoading(false);
    }

    const refresh = () => {
        fetchFunction()
    }

    useEffect(() => {
        fetchFunction()
    }, [url]);

    return {
        body,
        isLoading,
        refresh
    }
}
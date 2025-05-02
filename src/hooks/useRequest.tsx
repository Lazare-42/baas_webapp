import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import useSWR, { SWRConfiguration, SWRResponse } from 'swr'

type GetRequest = (() => AxiosRequestConfig) | AxiosRequestConfig | null
export interface Return<Data, Error> {
    data: Data | undefined
    response: AxiosResponse<Data> | undefined
    error: AxiosError<Error> | undefined
    isValidating: boolean
    mutate: SWRResponse<AxiosResponse<Data>, AxiosError<Error>>['mutate']
    isLoading: boolean
}

interface Config<Data = unknown, Error = unknown>
    extends Omit<
        SWRConfiguration<AxiosResponse<Data>, AxiosError<Error>>,
        'fallbackData'
    > {
    fallbackData?: Data
}

export function useRequest<Data = unknown, Error = unknown>(
    request: GetRequest,
    { fallbackData, ...config }: Config<Data, Error> = {},
): Return<Data, Error> {
    const {
        data: response,
        error,
        isValidating,
        mutate,
        isLoading,
    } = useSWR<AxiosResponse<Data>, AxiosError<Error>>(
        request && JSON.stringify(request),
        async () => {
            if (!request) throw new Error('Request is required')
            return typeof request === 'function'
                ? axios.request<Data>(request())
                : axios.request<Data>(request)
        },
        {
            ...config,
            fallbackData: fallbackData
                ? ({
                      status: 200,
                      statusText: 'InitialData',
                      config:
                          typeof request === 'function' ? request() : request!,
                      headers: {},
                      data: fallbackData,
                  } as AxiosResponse<Data>)
                : undefined,
        },
    )

    return {
        data: response?.data,
        response,
        error,
        isValidating,
        mutate,
        isLoading,
    }
}

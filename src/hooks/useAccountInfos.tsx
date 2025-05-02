import { createContext, useContext } from 'react'
import { Return, useRequest } from '~/hooks'

import { Account, AccountInfos } from '~/api'

export function useAccountInfos() {
    return useContext(store)
}

type Context = [
    Return<AccountInfos, unknown>,
    {
        isAdmin: () => boolean | undefined
        patchMe: (me: Partial<Account>) => Promise<void>
    },
]

const store = createContext<Context>(undefined as any)
const { Provider } = store

const AccountInfosProvider = (props: { children: JSX.Element }) => {
    const account = useRequest<AccountInfos>({ url: `accounts/infos` })

    async function patchMe(me: Partial<Account>) {
        account.mutate(
            async () => {
                return {
                    ...account.response,
                    data: {
                        ...account.response?.data,
                        account: { ...account.response?.data?.account, ...me },
                    },
                } as any
            },
            {
                optimisticData: (current) => {
                    const newData = {
                        ...current,
                        data: {
                            ...current?.data,
                            account: { ...current?.data?.account, ...me },
                        },
                    }
                    console.log('mutate patch me', current, newData)
                    return newData as any
                },
            },
        )
    }

    const isAdmin = () => account.data?.account.user_role === 'Admin'

    return (
        <Provider value={[account, { isAdmin, patchMe }]}>
            {props.children}
        </Provider>
    )
}

export { AccountInfosProvider }

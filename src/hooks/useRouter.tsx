import queryString from 'query-string'
import { useMemo } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

interface QueryParams {
    [key: string]: string | undefined
}

export function useRouter() {
    const location = useLocation()
    const history = useNavigate()
    const params = useParams()

    // Return our custom router object
    // Memoize so that a new object is only returned if something changes
    return useMemo(() => {
        // Typing for getquery
        function getquery(p: QueryParams): QueryParams {
            return {
                ...(queryString.parse(location.search) as QueryParams), // Convert string to object and cast
                ...p,
            }
        }

        // Typing for getqueryWithoutParams
        function getqueryWithoutParams(): QueryParams {
            return queryString.parse(location.search) as QueryParams // Type cast to ensure the return type
        }

        return {
            // For convenience add push(), replace(), pathname at top level
            push: (to: string) => history(to),
            pushKeepQuery: (pathname: string) =>
                history({ pathname: pathname, search: location.search }),
            addQuery: (
                key: string,
                value: string | undefined,
                replace: boolean,
            ) => {
                const currentQuery = getqueryWithoutParams()
                currentQuery[key] = value
                const s = stringifyQuery(currentQuery)
                history({ pathname: location.pathname, search: s }, { replace })
            },
            removeQuery: (key: string, replace?: boolean) => {
                const currentQuery = getqueryWithoutParams()
                delete currentQuery[key]
                const s = stringifyQuery(currentQuery)
                history({ pathname: location.pathname, search: s }, { replace })
            },
            replace: history,
            pathname: location.pathname,
            query: getquery(params as QueryParams), // Typing the params
            navigate: history,
            params,
            location,
            history,
        }
    }, [params, location, history])
}

function stringifyQuery(params: QueryParams): string {
    const queries = Object.keys(params)
        .map((key) => {
            const query =
                encodeURIComponent(key) +
                (params[key] != null
                    ? '=' + encodeURIComponent(params[key]!)
                    : '')
            return query
        })
        .join('&')
    return `?${queries}`
}

//Interface for query variables that wasn't generated
//Line 46461 GetRepos: build.query func

/*
    Продолжение из types/typings.ts
    Переменные, которые используются для конструктора запроса в generated.ts, чтобы не писать Any, я сделал тип.
*/
export interface GetReposQueryVariables {
    query: string,
    first: number | undefined,
    last: number | undefined,
    after: string | undefined,
    before: string | undefined
}

export interface GetInfoQueryVariables {
    id: string
}
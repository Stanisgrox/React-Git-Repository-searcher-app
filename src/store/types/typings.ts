export interface IRepos {
    id: string,
    name: string,
    stargazers: {
        totalCount: number
    },
    forks: {
        totalCount: number
    },
    primaryLanguage: {
        name: string | null
    },
    defaultBranchRef: {
        target: {
            committedDate: string
        }
    }
};

export interface RTKQueryAnswer {
    search: {
        repositoryCount: number,
        nodes: IRepos[],
        pageInfo: {
            startCursor: string,
            endCursor: string,
            hasNextPage: boolean,
            hasPreviousPage: boolean
        }
    }
}

export interface RTKInfoQueryAnswer {
    node: {
        id: string,
        name: string,
        primaryLanguage: {
            name: string
        } | null,
        stargazers: {
            totalCount: number
        },
        licenseInfo: {
            name: string
        } | null,
        languages: {
            nodes: LangInfo[]
        }
    }
}

export interface LangInfo {
    name: string
}

/*
    Интерфейсы, которые я написал, пока разбирался в https://docs.github.com/ru/graphql/overview/explorer
    IRepos - представление репозиториев для поисковой таблицы
    RTKQueryAnswer - ответ на поисковый запрос таблицы (data в GraphQL пропускается, долго ловил этот баг)
    RTKInfoQueryAnswer - ответ на запрос репозитория по ID. Лицензия и основной язык могут быть NULL, если languages нет, то там просто пустой массив

    LangInfo - Нужно только одно поле для тэгов по языкам - название.
*/
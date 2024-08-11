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
*/
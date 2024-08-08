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
        name: string
    },
    defaultBranchRef: {
        target: {
            committedDate: string
        }
    }
};

export interface IGraphQLAnswer {
    data: {
        search: {
            repositoryCount: number,
            nodes: IRepos[],
            pageInfo: {
                endCursor: string,
                hasNextPage: boolean,
                hasPreviousPage: boolean
            }
        }
    }
}
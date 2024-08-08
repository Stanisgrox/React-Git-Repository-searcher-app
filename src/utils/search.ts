export const GET_REPOS_QUERY = (searchTerm: string, sorting: string, amount: number, pagination: string) => (`
query GetRepos {
  search(query: "${searchTerm} sort:${sorting}", type: REPOSITORY, first: ${amount} ${pagination}) {
    repositoryCount
    nodes {
      ... on Repository {
        id
        name
        stargazers {
          totalCount
        }
        forks {
          totalCount
        }
        primaryLanguage {
          name
        }
        defaultBranchRef {
          target {
            ... on Commit {
              committedDate
            }
          }
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
    }
  }
}
`);
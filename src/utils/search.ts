export const GET_REPOS_QUERY = (searchTerm: string, sorting: string) => (`
	query GetRepos{
		search(query: "${searchTerm} sort:${sorting}", type: REPOSITORY, first: 100) {
			repositoryCount
			nodes {
				... on Repository {
					id
					name
					forks {
						totalCount
					}
					primaryLanguage {
						name
					}
					stargazers {
						totalCount
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
		}
	}
`);
import { createApi } from "@reduxjs/toolkit/query/react"
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query"
import { GraphQLClient } from "graphql-request"

const BASE_URL = "https://api.github.com/graphql"

export const client: any = new GraphQLClient(BASE_URL)

/*
  Базовый сетап для RTKQuery, но с модулем "graphql-request". Здесь передается токен из .env для авторизации.
  Endpoints не нужны /graphql только один.
*/

const graphqlBaseQuery = graphqlRequestBaseQuery({
  client,
  prepareHeaders: (headers) => {
    const token = process.env.REACT_APP_GITHUB_TOKEN
    if (token) {
      headers.set("authorization", `Bearer ${token}`)
    }

    return headers
  },
})

export const baseApiWithGraphql = createApi({
  reducerPath: 'reposAPI',
  baseQuery: graphqlBaseQuery,
  endpoints: () => ({}),
  tagTypes: [],
})
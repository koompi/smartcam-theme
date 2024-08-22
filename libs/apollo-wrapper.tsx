"use client";

import { ApolloLink, HttpLink, concat } from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";

const token =
  typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

const ENDPOINT =
  process.env.NEXT_PUBLIC_BACKEND ?? "${process.env.NEXT_PUBLIC_BACKEND}";

const GRAPHQL_ENDPOINT = `${ENDPOINT}/graphql/store?store_id=${
  process.env.NEXT_PUBLIC_ID_STORE ?? "65a4a66033b9eda51233220c"
}`;

console.log("token", token);

function makeClient() {
  const httpLink = new HttpLink({
    uri: GRAPHQL_ENDPOINT,
  });

  const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
    }));

    return forward(operation);
  });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            concat(authMiddleware, httpLink),
          ])
        : concat(authMiddleware, httpLink),
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}

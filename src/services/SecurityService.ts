/**
 * This is an example of making a GraphQL query without Apollo Client
 * @param query
 */
async function fetchSecurities(
  query: string
): Promise<Array<{ id: string; name: string }>> {
  try {
    // TODO: Remove hard-coded url
    const response = await fetch('http://localhost:4000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
        query GetSecurities($query: String!) {
          securities(query: $query) {
            id
            name
          }
        }
      `,
        variables: {
          query,
        },
      }),
    });

    const result = await response.json();
    return result.data.securities;
  } catch (e) {
    console.log(e);
    return [];
  }
}

export const SecurityService = {
  fetchSecurities,
};

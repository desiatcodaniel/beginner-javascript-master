export async function fetchJoke() {
  // Pass an accept header
  // Header - Additional information that comes along into the fetch - like an argument in functions
  const response = await fetch('https://icanhazdadjoke.com', {
    headers: {
      Accept: `application/json`,
    },
  });

  // Need to put await here since it's waiting for data from the fetch
  const data = await response.json();
  return data;
}

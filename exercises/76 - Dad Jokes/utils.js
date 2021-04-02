export function randomItemFromArray(arr, not) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  console.log(randomIndex, arr[randomIndex], not);
  let item = arr[randomIndex];
  if (item === not) item = randomItemFromArray(arr, not);
  return item;
}

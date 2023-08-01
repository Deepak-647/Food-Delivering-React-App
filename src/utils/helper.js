export function filterData(searchTxt, restraunts) {
  const filteredData = restraunts.filter((restraunt) =>
    restraunt?.info?.name?.toLowerCase().includes(searchTxt)
  );

  return filteredData;
}

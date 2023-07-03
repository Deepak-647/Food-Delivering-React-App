export function filterData(searchTxt, restraunts) {
  const filteredData = restraunts.filter((restraunt) =>
    restraunt?.data?.name?.toLowerCase().includes(searchTxt)
  );

  return filteredData;
}

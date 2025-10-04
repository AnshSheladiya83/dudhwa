/**
 * File Name: paginationUtils.js
 */
async function getPaginationObject(
  datas,
  pageNumber = 1,
  pageSize = 8,
  totalResults
) {
  const totalPages = Math.ceil(totalResults / pageSize);

  const currentPage = pageNumber > totalPages ? totalPages : pageNumber;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalResults);

  return {
    current: Number(currentPage),
    total_pages: Number(totalPages),
    total_results: Number(totalResults),
    size: Number(pageSize),
  };
}

module.exports = getPaginationObject;

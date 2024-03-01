import ReactPaginate from "react-paginate";
import { useState } from "react";

function PaginateItems({ itemsPerPage, items, ListItems }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <ListItems items={currentItems}/>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="block border border-solid border-lightGray hover:bg-gray-400 mr-2"
        pageLinkClassName="min-w-10 h-10 items-center justify-center flex"
        previousLinkClassName="flex me-2 items-center justify-center bg-lightGray px-1 h-10 hover:bg-gray-400 rounded-md"
        nextLinkClassName="flex me-2 items-center justify-center bg-lightGray px-1 h-10 hover:bg-gray-400 rounded-md"
        breakClassName="mr-2"
        marginPagesDisplayed={2}
        containerClassName="flex items-center justify-center"
        activeClassName="bg-gray-700 text-white hover:bg-gray-700"
      />
    </>
  );
}


export default PaginateItems;

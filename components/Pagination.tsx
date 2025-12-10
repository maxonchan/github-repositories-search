"use client";

type Page = number | string;
export default function Pagination({
  currentPage = 1,
  totalPages = 0,
  onPageChange = () => {},
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page?: Page) => void;
}) {
  // pages = [1, 'ellipsis', 3, 4, 5, 6, 7, 'ellipsis', 10']
  const showPrev = currentPage > 1 ? ["Prev"] : [];
  const startEllipsis = 1 < currentPage - 2 ? ["ellipsis"] : [];
  const windowStart = Math.max(1, currentPage - 2);
  const windowEnd = Math.min(totalPages, currentPage + 2);
  const window = [...Array(windowEnd - windowStart + 1).keys()].map(
    (i) => windowStart + i
  );
  const firstPage = currentPage - 2 > 1 ? [1] : [];
  const endPage = currentPage < totalPages - 2 ? [totalPages] : [];
  const endEllipsis = currentPage < totalPages - 2 ? ["ellipsis"] : [];
  const showNext = currentPage < totalPages ? ["Next"] : [];

  const pages = [
    ...showPrev,
    ...firstPage,
    ...startEllipsis,
    ...window,
    ...endEllipsis,
    ...endPage,
    ...showNext,
  ];

  const handleClick = (page: Page) => {
    if (page === "Prev") {
      onPageChange(currentPage - 1);
    } else if (page === "Next") {
      onPageChange(currentPage + 1);
    } else if (page !== "ellipsis" && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center mt-4 height-[32px]">
      <ul className="flex">
        {pages.map((page, index) => (
          <li
            key={index}
            className={`mx-1 px-3 py-1 rounded-md ${
              page === currentPage ? "bg-blue-500 text-white" : ""
            } ${page === "ellipsis" ? "cursor-default" : "cursor-pointer"}`}
            onClick={() => handleClick(page)}
          >
            <a>{page === 'ellipsis' ? '...' : page}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { cls } from "@libs/cleint/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface PagiResponse {
  currentPage: number;
  totalPages: number;
  totalResults: number;
}

export default function Pagination({
  currentPage,
  totalResults,
  totalPages,
}: PagiResponse) {
  const router = useRouter();
  const [page, setPage] = useState<number>();
  useEffect(() => {
    if (router?.query?.page) {
      setPage(+router.query?.page.toString());
    }
  }, [page, router]);
  return (
    <div className="bg-white bottom-20 border-t fixed px-5 pt-3 flex items-center justify-between border-gray-200 sm:px-6  max-w-xl text-gray-700  w-full  pb-5   text-xs">
      <div className="sm:flex-1 flex sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{+currentPage}</span> of{" "}
            <span className="font-medium">{+totalResults} </span>pages{" "}
            <span className="font-medium">{+totalPages}</span> total results
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <a
              href={`/streams?page=${page - 1} `}
              className={cls(
                "relative inline-flex items-center px-2 hover:bg-orange-50 py-2 rounded-l-md border border-orange-300 bg-white text-sm font-medium text-orange-500 ",
                router.pathname == `/streams?page=1` ? "disabled" : ""
              )}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            <div className="z-10 bg-orange border-orange-300 text-orange-500" />

            <a
              href={`/streams?page=1`}
              aria-current="page"
              className="z-10 bg-orange hover:bg-orange-50 border-orange-300 text-orange-500 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            >
              1
            </a>
            <a
              href={`/streams?page=2`}
              className="bg-orange border-orange-300 text-orange-500 hover:bg-orange-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            >
              2
            </a>
            <a
              href={`/streams?page=3`}
              className="bg-orange border-orange-300 text-orange-500 hover:bg-orange-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
            >
              3
            </a>
            <span className="relative inline-flex items-center px-4 py-2 border border-orange-300 bg-orange text-sm font-medium text-orange-700">
              ...
            </span>
            <a
              href="#"
              className="bg-orange border-orange-300 text-orange-500 hover:bg-orange-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
            >
              8
            </a>
            <a
              href="#"
              className="bg-orange border-orange-300 text-orange-500 hover:bg-orange-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            >
              9
            </a>
            <a
              href="#"
              className="bg-orange border-orange-300 text-orange-500 hover:bg-orange-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            >
              10
            </a>
            <a
              href={`/streams?page=${page + 1} `}
              className="relative hover:bg-orange-50 inline-flex items-center px-2 py-2 rounded-r-md border border-orange-300 bg-white text-sm font-medium text-orange-500"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}

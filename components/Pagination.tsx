import Link from 'next/link';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { PaginationProps } from "@/types";

export const Pagination = ({ currentPage, pageCount, onPageChange }: PaginationProps) => {
    const getPageNumbers = () => {
        const pageNumbers = [];

        if (pageCount <= 8) {
            for (let i = 1; i <= pageCount; i++) {
                pageNumbers.push(i);
            }
        } else {
            const startPage = Math.max(currentPage - 1, 1);
            const endPage = Math.min(currentPage + 1, pageCount);

            if (currentPage <= 3) {
                for (let i = 1; i <= currentPage + 1; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push('...');
                pageNumbers.push(pageCount);
            } else if (currentPage >= pageCount - 2) {
                pageNumbers.push(1);
                pageNumbers.push('...');
                for (let i = currentPage - 1; i <= pageCount; i++) {
                    pageNumbers.push(i);
                }
            } else {
                pageNumbers.push(1);
                pageNumbers.push('...');
                for (let i = startPage; i <= endPage; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push('...');
                pageNumbers.push(pageCount);
            }
        }

        return pageNumbers;
    };

    return (
        <div className="pagination flex items-center justify-center space-x-4 mb-4 pt-4">
            {currentPage > 1 && (
                <Link legacyBehavior href={`/users?page=${currentPage - 1}`}>
                    <a
                        className="pagination-button flex items-center justify-center w-10 h-10 border rounded transition-colors duration-200 bg-gray-200 text-gray-900 hover:bg-gray-300 hover:text-gray-900"
                        onClick={() => onPageChange(currentPage - 1)}
                    >
                        <FiChevronLeft size={20} />
                    </a>
                </Link>
            )}

            {getPageNumbers().map((pageNumber, index) => {
                const isNumber = typeof pageNumber === 'number';
                const isActive = isNumber && pageNumber === currentPage;

                return isNumber ? (
                    <Link legacyBehavior key={index} href={`/users?page=${pageNumber}`}>
                        <a
                            className={`pagination-link flex items-center justify-center w-10 h-10 border rounded transition-colors duration-200 ${
                                isActive ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-900 hover:bg-gray-300 hover:text-gray-900'
                            }`}
                            onClick={() => onPageChange(pageNumber)}
                        >
                            {pageNumber}
                        </a>
                    </Link>
                ) : (
                    <span key={index} className="pagination-dots flex items-center justify-center w-10 h-10">
            {pageNumber}
          </span>
                );
            })}

            {currentPage < pageCount && (
                <Link legacyBehavior href={`/users?page=${currentPage + 1}`}>
                    <a
                        className="pagination-button flex items-center justify-center w-10 h-10 border rounded transition-colors duration-200 bg-gray-200 text-gray-900 hover:bg-gray-300 hover:text-gray-900"
                        onClick={() => onPageChange(currentPage + 1)}
                    >
                        <FiChevronRight size={20} />
                    </a>
                </Link>
            )}
        </div>

    );
};
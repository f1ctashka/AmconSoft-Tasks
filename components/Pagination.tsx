import React from 'react';
import Link from 'next/link';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { PaginationProps } from '@/types';
import clsx from 'clsx';

const Pagination: React.FC<PaginationProps> = ({ currentPage, pageCount, pageNumbers }) => {

    return (
        <div className="pagination flex items-center justify-center space-x-4 mb-4 pt-4">
            {currentPage > 1 && (
                <Link legacyBehavior href={`/users?page=${currentPage - 1}`}>
                    <a className="pagination-button flex items-center justify-center w-10 h-10 border rounded transition-colors duration-200 bg-gray-200 text-gray-900 hover:bg-gray-300 hover:text-gray-900">
                        <FiChevronLeft size={20} />
                    </a>
                </Link>
            )}

            {pageNumbers.map((pageNumber) => {
                const isPage = typeof(pageNumber) === 'number';
                const isActive = pageNumber === currentPage;
                return (
                    isPage?
                        <Link legacyBehavior key={pageNumber} href={`/users?page=${pageNumber}`}>
                            <a
                                className={clsx(
                                    'pagination-link flex items-center justify-center w-10 h-10 border rounded transition-colors duration-200',
                                    isActive ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-900 hover:bg-gray-300 hover:text-gray-900'
                                )}
                            >
                                {pageNumber}
                            </a>
                        </Link>
                        :
                        <p className={clsx(
                            'pagination-link flex items-center justify-center w-10 h-10 border rounded transition-colors duration-200 bg-gray-200 text-gray-900 hover:bg-gray-300')}
                        >
                            {pageNumber}
                        </p>
                );
            })}

            {currentPage < pageCount && (
                <Link legacyBehavior href={`/users?page=${currentPage + 1}`}>
                    <a className="pagination-button flex items-center justify-center w-10 h-10 border rounded transition-colors duration-200 bg-gray-200 text-gray-900 hover:bg-gray-300 hover:text-gray-900">
                        <FiChevronRight size={20} />
                    </a>
                </Link>
            )}
        </div>
    );
};

export default Pagination;
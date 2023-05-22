export const getPageNumbers = (currentPage: number, pageCount: number): Array<number | string> => {
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
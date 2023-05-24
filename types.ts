export type UsersResponse = {
    users: User[];
    total: number;
    skip: number;
    limit: number;
};

export type User = {
    id: number;
    firstName: string;
    lastName: string;
    address: Address;
    image: string;
};

export type Address = {
    address: string;
    city: string;
    postalCode: string;
    state: string;
};

export type PaginationProps = {
    currentPage: number;
    pageCount: number;
}

export type SearchOption = {
    label: string;
    value: string;
};
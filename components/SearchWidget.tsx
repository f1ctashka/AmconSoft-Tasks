import { useEffect, useState } from 'react';
import Select, { components } from 'react-select';
import { useRouter } from 'next/router';
import { FiSearch, FiUser, FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { UsersResponseType, User } from '@/types';

const SearchWidget = () => {
    const router = useRouter();
    const [searchOptions, setSearchOptions] = useState<{ label: string; value: string }[]>([]);
    const [selectedOption, setSelectedOption] = useState<{ label: string; value: string } | null>(null);

    useEffect(() => {
        fetch('https://dummyjson.com/users')
            .then((res) => res.json())
            .then((response: UsersResponseType) => {
                const options = response.users.map((user: User) => ({
                    label: `${user.firstName} ${user.lastName}`,
                    value: user.id,
                }));
                setSearchOptions(options);
            });
    }, []);

    const handleSearchInputChange = (selectedOption: { label: string; value: string } | null) => {
        setSelectedOption(selectedOption);
        if (selectedOption) {
            router.push(`/users/${selectedOption.value}`);
        }
    };

    const DropdownIndicator = (props) => {
        return (
            components.DropdownIndicator && (
                <components.DropdownIndicator {...props}>
                    <FiChevronDown size={16} className="ml-2 text-gray-500" />
                </components.DropdownIndicator>
            )
        );
    };

    const UserOption = (props) => {
        return (
            components.Option && (
                <components.Option {...props}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <FiUser size={16} className="mr-2 text-gray-500" />
                            <span className="text-black">{props.label}</span>
                        </div>
                        <FiChevronRight size={16} className="ml-2 text-gray-500" />
                    </div>
                </components.Option>
            )
        );
    };

    return (
        <div className="flex flex-col items-center py-8 bg-gray-900 text-white">
            <h1 className="text-2xl mb-4 font-bold">Users List</h1>
            <div className="w-96 p-2 bg-white rounded-lg shadow-md flex items-center">
                <div className="mr-2">
                    <FiSearch size={18} className="text-gray-500" />
                </div>
                <Select
                    className="space-y-0 flex-grow"
                    classNamePrefix="search-widget"
                    options={searchOptions}
                    value={selectedOption}
                    onChange={handleSearchInputChange}
                    placeholder="Search users"
                    isClearable
                    components={{ DropdownIndicator, Option: UserOption }}
                />
            </div>
        </div>
    );
};

export default SearchWidget;

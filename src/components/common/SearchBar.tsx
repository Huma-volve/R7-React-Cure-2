import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface DoctorsType {
    id: number;
    name: string;
    specialty: string;
    image: string;
}

const DoctorsList: DoctorsType[] = [
    { id: 1, name: 'Dr. John Doe', specialty: 'Cardiologist', image: '/assets/img/doctor-1.png' },
    {
        id: 2,
        name: 'Dr. Jane Smith',
        specialty: 'Dermatologist',
        image: '/image/doctor-2.jpg'
    },
    {
        id: 3,
        name: 'Dr. Emily Johnson',
        specialty: 'Pediatrician',
        image: '/image/doctor-3.jpg'
    },
    {
        id: 4,
        name: 'Dr. Michael Brown',
        specialty: 'Neurologist',
        image: '/image/doctor-4.jpg'
    },
    { id: 5, name: 'Dr. John Doe', specialty: 'Cardiologist', image: '/image/doctor-1.jpg' },
    {
        id: 6,
        name: 'Dr. Jane Smith',
        specialty: 'Dermatologist',
        image: '/image/doctor-2.jpg'
    },
    {
        id: 7,
        name: 'Dr. Emily Johnson',
        specialty: 'Pediatrician',
        image: '/image/doctor-3.jpg'
    },
    {
        id: 8,
        name: 'Dr. Michael Brown',
        specialty: 'Neurologist',
        image: '/image/doctor-4.jpg'
    }
];

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedTerm, setDebouncedTerm] = useState('');
    const [results, setResults] = useState<DoctorsType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [lastSearches, setLastSearches] = useState<string[]>([]);
    const [filteredLastSearches, setFilteredLastSearches] = useState<string[]>([]);
    const [isFocused, setIsFocused] = useState(false);

    // Load last searches from localStorage on component mount
    useEffect(() => {
        const stored = localStorage.getItem('lastSearched');
        if (stored) {
            setLastSearches(JSON.parse(stored));
        }
    }, []);

    // Debounce user input (runs after 500ms of inactivity)
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedTerm(searchTerm);
        }, 500);
        return () => clearTimeout(handler); // Cleanup on unmount or searchTerm change
    }, [searchTerm]);

    // Perform search when debouncedTerm changes (and is >= 3 chars)
    useEffect(() => {
        if (debouncedTerm.length >= 3) {
            setIsLoading(true);
            const filtered = DoctorsList.filter(
                (doctor) =>
                    doctor.name.toLowerCase().includes(debouncedTerm.toLowerCase()) ||
                    doctor.specialty.toLowerCase().includes(debouncedTerm.toLowerCase())
            );
            setResults(filtered);
            setIsLoading(false);

            // Update last searches (only if results are found for the search term)
            if (filtered.length > 0 || searchTerm.length > 0) {
                // Only save if a term was actually typed or results found
                setLastSearches((prev) => {
                    const newList = [
                        debouncedTerm,
                        ...prev.filter((t) => t.toLowerCase() !== debouncedTerm.toLowerCase())
                    ];
                    const uniqueList = Array.from(new Set(newList)).slice(0, 4); // Keep only the last 4 unique searches
                    localStorage.setItem('lastSearched', JSON.stringify(uniqueList));
                    return uniqueList;
                });
            }
        } else {
            setResults([]); // Clear results if search term is less than 3 characters
        }
    }, [debouncedTerm, searchTerm.length]);

    useEffect(() => {
        if (searchTerm.length > 0) {
            setFilteredLastSearches(
                lastSearches.filter((term) => term.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        } else {
            setFilteredLastSearches(lastSearches);
        }
    }, [searchTerm, lastSearches]);

    // When selecting a term from last searches
    const handleSelectLastSearch = (term: string) => {
        setSearchTerm(term); // Update input field
        setDebouncedTerm(term); // Trigger search logic immediately
    };

    // Handle Enter key to trigger search immediately
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setDebouncedTerm(searchTerm); // Force immediate search
        }
    };

    return (
        <div className="relative w-full max-w-[568px] mx-auto">
            <Input
                type="text"
                placeholder="Search about specialty, doctor"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                onKeyDown={handleKeyDown}
                className="pl-12 pr-4 py-2 rounded-xl bg-[#F5F6F7] outline-0 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
            />
            <img
                src="/icons/Search.svg"
                width={24}
                height={24}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                alt="Search Icon"
            />

            {/* Conditional rendering for search results or "last searches" */}
            {isFocused &&
                (searchTerm.length >= 3 ||
                    (searchTerm.length < 3 && filteredLastSearches.length > 0) ||
                    (searchTerm.length > 0 && filteredLastSearches.length === 0 && !isLoading)) && (
                    <div className="absolute w-full bg-white shadow-md rounded-md mt-2 z-10 max-h-80 overflow-y-auto">
                        {/* Display loading state */}
                        {isLoading && searchTerm.length >= 3 ? (
                            <p className="p-3 text-center text-black">Loading...</p>
                        ) : (
                            <>
                                {/* Display actual search results */}
                                {searchTerm.length >= 3 && results.length > 0 && (
                                    <ul className="divide-y divide-gray-200">
                                        {results.map((doc) => (
                                            <li
                                                key={doc.id}
                                                className="p-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3 transition-colors"
                                                onMouseDown={(e) => {
                                                    e.preventDefault(); // Prevents input from blurring
                                                }}
                                            >
                                                <Link
                                                    to={`/doctors/${doc.id}`}
                                                    className="flex items-center gap-3 w-full"
                                                    onClick={() => setIsFocused(false)}
                                                >
                                                    <img
                                                        src={doc.image}
                                                        alt={doc.name}
                                                        className="rounded-2xl object-cover w-16 h-16"
                                                    />
                                                    <div className="flex flex-col">
                                                        <div className="sm:mb-2 mb-1">
                                                            <p
                                                                className="text-black text-md sm:text-lg font-georgia"
                                                                style={{
                                                                    fontFamily:
                                                                        'var(--font-secondary)'
                                                                }}
                                                            >
                                                                {doc.name}
                                                            </p>
                                                            <p
                                                                className="sm:text-sm text-[12px]"
                                                                style={{
                                                                    color: 'var(--color-text)'
                                                                }}
                                                            >
                                                                {doc.specialty}
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center gap-3 sm:text-sm text-[13px] text-black">
                                                            <div className="flex items-center gap-1">
                                                                <img
                                                                    src="/icons/Star.svg"
                                                                    alt="rating"
                                                                />
                                                                <span>4.9</span>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <img
                                                                    src="/icons/Time.svg"
                                                                    alt="time"
                                                                />
                                                                <span>9:30am - 8:00pm</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {/* Display "Not Found" message for main search */}
                                {searchTerm.length >= 3 && !isLoading && results.length === 0 && (
                                    <p
                                        className="p-3 text-center"
                                        style={{ color: 'var(--color-text)' }}
                                    >
                                        "{debouncedTerm}"{' '}
                                        <span className="text-black">Not Found</span>
                                    </p>
                                )}

                                {/* Display FILTERED last searches if search term is less than 3 chars and there are filtered results */}
                                {searchTerm.length < 3 && filteredLastSearches.length > 0 && (
                                    <div className="p-3">
                                        <h4 className="text-sm font-semibold text-gray-500 mb-2">
                                            Last Searches
                                        </h4>
                                        <ul className="divide-y divide-gray-200">
                                            {filteredLastSearches.map(
                                                (
                                                    term,
                                                    idx // filteredLastSearches
                                                ) => (
                                                    <li
                                                        key={idx}
                                                        className="p-2 hover:bg-gray-50 cursor-pointer text-black transition-colors"
                                                        onMouseDown={(e) => {
                                                            e.preventDefault(); // Prevents input from losing focus
                                                            handleSelectLastSearch(term);
                                                        }}
                                                    >
                                                        {term}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                )}

                                {/* If input is focused, searchTerm has content (but <3 chars), and no filteredLastSearches */}
                                {isFocused &&
                                    searchTerm.length > 0 &&
                                    searchTerm.length < 3 &&
                                    filteredLastSearches.length === 0 && (
                                        <p className="p-3 text-center text-gray-500">
                                            No matching recent searches.
                                        </p>
                                    )}

                                {/* If input is focused, searchTerm is empty, and no last searches at all */}
                                {isFocused &&
                                    searchTerm.length === 0 &&
                                    lastSearches.length === 0 && (
                                        <p className="p-3 text-center text-gray-500">
                                            Start typing to search...
                                        </p>
                                    )}
                            </>
                        )}
                    </div>
                )}
        </div>
    );
};

export default SearchBar;

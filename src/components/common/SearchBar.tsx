
import { type DoctorsType } from '@/api/doctors/Doctors';


// import { useState } from 'react';
// import { BiSearch } from 'react-icons/bi';
// import { Input } from "@/components/ui/input";
import { Input } from '@/components/ui/input';
import { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import FavoriteDoctors from '../ui/doctors/favorite/FavoriteDoctors';
import { searchDoctors } from '@/api/services/doctorsService';
import { DoctorsFilterContext } from '@/context/DoctorsFilterContext';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedTerm, setDebouncedTerm] = useState('');
    const [results, setResults] = useState<DoctorsType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [lastSearches, setLastSearches] = useState<string[]>([]);
    const [filteredLastSearches, setFilteredLastSearches] = useState<string[]>([]);
    const [isFocused, setIsFocused] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();
    const location = useLocation();
    
    // Try to get DoctorsFilterContext if available (for pages that use it)
    // Context will be undefined if provider is not available, which is fine
    const doctorsFilterContext = useContext(DoctorsFilterContext);

    // Load last searches from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem('lastSearched');
        if (stored) setLastSearches(JSON.parse(stored));
    }, []);

    // Debounce user input (after 500ms)
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedTerm(searchTerm), 500);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    // Perform API search
    useEffect(() => {
        if (debouncedTerm.length >= 3) {
            setIsLoading(true);
            setError(null);

            const fetchResults = async () => {
                try {
                    const response = await searchDoctors({ search: debouncedTerm });
                    console.log('[SearchBar] searchDoctors raw response:', response.raw);
                    setResults(response.doctors);

                    if (response.doctors.length > 0 || searchTerm.length > 0) {
                        setLastSearches((prev) => {
                            const newList = [
                                debouncedTerm,
                                ...prev.filter((t) => t.toLowerCase() !== debouncedTerm.toLowerCase())
                            ];
                            const uniqueList = Array.from(new Set(newList)).slice(0, 4);
                            localStorage.setItem('lastSearched', JSON.stringify(uniqueList));
                            return uniqueList;
                        });
                    }
                } catch (err) {
                    console.error('[SearchBar] searchDoctors error:', err);
                    setError(err instanceof Error ? err.message : 'Failed to search doctors');
                    setResults([]);
                } finally {
                    setIsLoading(false);
                }
            };

            void fetchResults();
        } else {
            setResults([]);
            setError(null);
        }
    }, [debouncedTerm, searchTerm.length]);

    // Filter last searches
    useEffect(() => {
        if (searchTerm.length > 0) {
            setFilteredLastSearches(
                lastSearches.filter((term) => term.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        } else {
            setFilteredLastSearches(lastSearches);
        }
    }, [searchTerm, lastSearches]);

    const handleSelectLastSearch = (term: string) => {
        setSearchTerm(term);
        setDebouncedTerm(term);
    };

    // Navigate to appropriate page when pressing Enter
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            const trimmed = searchTerm.trim();
            if (trimmed.length > 0) {
                // If we're on topDoctors page, navigate there with search query
                if (location.pathname === '/topDoctors' || location.pathname.includes('topDoctors')) {
                    navigate(`/topDoctors?q=${encodeURIComponent(trimmed)}`);
                } else if (location.pathname === '/doctors' || location.pathname.includes('doctors')) {
                    navigate(`/doctors?q=${encodeURIComponent(trimmed)}`);
                } else {
                    // Default to doctors page
                    navigate(`/doctors?q=${encodeURIComponent(trimmed)}`);
                }
                
                // Also update the context searchTerm directly if context is available
                if (doctorsFilterContext && doctorsFilterContext.setSearchTerm) {
                    doctorsFilterContext.setSearchTerm(trimmed);
                }
                
                setSearchTerm('');
            }
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

            {/* Dropdown results */}
            {isFocused &&
                (searchTerm.length >= 3 ||
                    (searchTerm.length < 3 && filteredLastSearches.length > 0) ||
                    (searchTerm.length > 0 && filteredLastSearches.length === 0 && !isLoading)) && (
                    <div className="absolute w-full bg-white shadow-md rounded-md mt-2 z-10 max-h-80 overflow-y-auto">
                        {isLoading && searchTerm.length >= 3 ? (
                            <p className="p-3 text-center text-black">Loading...</p>
                        ) : (
                            <>
                                {searchTerm.length >= 3 && error && (
                                    <p className="p-3 text-center text-red-500">{error}</p>
                                )}

                                {searchTerm.length >= 3 && !error && results.length > 0 && (
                                    <FavoriteDoctors
                                        doctors={results}
                                        onSelect={() => setIsFocused(false)}
                                    />
                                )}

                                {searchTerm.length >= 3 && !isLoading && !error && results.length === 0 && (
                                    <p className="p-3 text-center text-gray-600">
                                        "{debouncedTerm}"{' '}
                                        <span className="text-black">Not Found</span>
                                    </p>
                                )}

                                {searchTerm.length < 3 && filteredLastSearches.length > 0 && (
                                    <div className="p-3">
                                        <h4 className="text-sm font-semibold text-gray-500 mb-2">
                                            Last Searches
                                        </h4>
                                        <ul className="divide-y divide-gray-200">
                                            {filteredLastSearches.map((term, idx) => (
                                                <li
                                                    key={idx}
                                                    className="p-2 hover:bg-gray-50 cursor-pointer text-black transition-colors"
                                                    onMouseDown={(e) => {
                                                        e.preventDefault();
                                                        handleSelectLastSearch(term);
                                                    }}
                                                >
                                                    {term}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {isFocused &&
                                    searchTerm.length > 0 &&
                                    searchTerm.length < 3 &&
                                    filteredLastSearches.length === 0 && (
                                        <p className="p-3 text-center text-gray-500">
                                            No matching recent searches.
                                        </p>
                                    )}

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

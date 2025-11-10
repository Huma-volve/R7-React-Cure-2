import DoctorsCard from '@/components/sections/doctorsSections/DoctorsCard';
import DoctorsFilter from '@/components/sections/doctorsSections/doctorsFilter/DoctorsFilter';
import { Container } from '@/components/ui/Container';
import SpecialtiesCarousel from '@/components/ui/doctors/Specialties';
import { Input } from '@/components/ui/input';
import { DoctorsFilterProvider, useDoctorsFilter } from '@/context/DoctorsFilterContext';
import { useFavorite } from '@/context/FavoriteContext';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const DoctorsPageContent = () => {
    const {
        searchTerm,
        setSearchTerm,
        filteredDoctors,
        loading,
        error,
        selectedSpecialty,
        selectedGender,
        specialties,
        handleSpecialtySelect,
        isFilterOpen,
        toggleFilter
    } = useDoctorsFilter();
    const { doctors: favoriteDoctors } = useFavorite();

    // Get favorite doctors directly from FavoriteContext
    // Also merge with filteredDoctors that have isFavorite = true
    const favoriteDoctorsList = [
        // First, get all doctors from FavoriteContext (these are the ones user added)
        ...favoriteDoctors.filter((doc) => doc.isFavorite === true || doc.isFavourite === true),
        // Then, add doctors from filteredDoctors that are marked as favorite but not in favoriteDoctors
        ...filteredDoctors.filter((doc) => {
            const isInFavorites = favoriteDoctors.some((fav) => fav.id === doc.id);
            const isFavorite = doc.isFavorite === true || doc.isFavourite === true;
            return !isInFavorites && isFavorite;
        })
    ];

    // Remove duplicates based on id
    const uniqueFavoriteDoctors = favoriteDoctorsList.filter(
        (doc, index, self) => index === self.findIndex((d) => d.id === doc.id)
    );

    // Apply search and filters to favorite doctors
    const filteredFavoriteDoctors = uniqueFavoriteDoctors.filter((doc) => {
        // Apply search filter
        if (searchTerm.trim()) {
            const matchesSearch =
                doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                doc.specialty.toLowerCase().includes(searchTerm.toLowerCase());
            if (!matchesSearch) return false;
        }

        // Apply specialty filter
        if (selectedSpecialty) {
            if (doc.specialty !== selectedSpecialty) return false;
        }

        return true;
    });

    // Apply gender filter
    const finalFilteredDoctors = filteredFavoriteDoctors.filter((doc) => {
        if (selectedGender !== 'All') {
            return doc.gender === selectedGender;
        }
        return true;
    });

    // Check if favorites list is empty (after loading and no error)
    const isEmpty = !loading && !error && uniqueFavoriteDoctors.length === 0;

    // Check if there are no filtered results (after applying search/filters)
    const hasNoFilteredResults =
        !loading && !error && uniqueFavoriteDoctors.length > 0 && finalFilteredDoctors.length === 0;

    return (
        // when drawer open on mobile we prevent page scroll (optional)
        <div
            className={cn(
                'relative min-h-screen overflow-x-hidden',
                isFilterOpen ? 'lg:overflow-auto overflow-hidden' : ''
            )}
        >
            <Container>
                {/* 🔹 Top Bar - Filter | Search | Map */}
                {!isEmpty && (
                    <div className="flex items-center justify-between gap-4 mb-8 me-6 flex-wrap">
                        {/* Filter Button (Left) */}
                        <button
                            onClick={toggleFilter}
                            className="border border-[#BBC1C7] rounded-lg flex items-center text-[#6D7379] bg-white transition-all duration-300 py-2 px-4 gap-2"
                        >
                            <img src="/icons/Tuning-filter.svg" alt="filter icon" />
                            <span>Filter</span>
                            <img
                                src="/icons/arrow-right.svg"
                                alt=""
                                className={cn(
                                    'transition-transform duration-300',
                                    isFilterOpen ? 'rotate-90' : 'rotate-0'
                                )}
                            />
                        </button>
                        {/* Search (Center) */}
                        <div className="flex-1 bg-white px-3 rounded-[10px] border border-[#BBC1C7] min-w-[220px]">
                            <Input
                                type="text"
                                value={searchTerm}
                                placeholder="Search doctors..."
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full border-0 focus-visible:ring-0 shadow-none bg-white py-5 px-0 text-md font-medium"
                            />
                        </div>
                        {/* Map Button (Right) */}
                        <Link
                            to="/map"
                            className="border border-[#BBC1C7] text-[14px] flex items-center justify-between text-[#6D7379] rounded-lg py-2 px-4 bg-white transition-all hover:shadow-md"
                        >
                            <img src="/icons/mapDouble.svg" alt="map icon" className="mr-1" />
                            <p>Map</p>
                        </Link>
                    </div>
                )}

                {/* Content Section - Sidebar + Main */}
                <div className="relative flex gap-4 transition-all duration-500 ease-in-out">
                    {/* ---------------------------
                        Desktop / Large screens sidebar (push layout)
                        Visible on lg and up. When open it takes width and pushes main content.
                       --------------------------- */}
                    {!isEmpty && (
                        <aside
                            className={cn(
                                'hidden lg:block bg-white overflow-hidden transition-all duration-500 ease-in-out',
                                isFilterOpen ? 'w-60 opacity-100' : 'w-0 opacity-0'
                            )}
                        >
                            <div
                                className={cn(
                                    'transition-opacity duration-500 ease-in-out',
                                    isFilterOpen ? 'opacity-100 p-4' : 'opacity-0'
                                )}
                            >
                                <DoctorsFilter />
                            </div>
                        </aside>
                    )}

                    {/* Mobile / Tablet drawer (overlay) */}
                    {/* Backdrop */}
                    {!isEmpty && isFilterOpen && (
                        <div
                            // backdrop only displayed for screens < lg (use lg:hidden)
                            className="fixed inset-0 z-40 lg:hidden"
                            onClick={toggleFilter}
                            aria-hidden
                        >
                            <div className="absolute inset-0 bg-black opacity-40" />
                        </div>
                    )}

                    {/* Drawer */}
                    {!isEmpty && (
                        <aside
                            // drawer shown on < lg, hidden on lg and up
                            className={cn(
                                'fixed top-0 left-0 h-full w-64 z-9999 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:hidden',
                                isFilterOpen ? 'translate-x-0' : '-translate-x-full'
                            )}
                            role="dialog"
                            aria-modal="true"
                        >
                            <div className={cn('h-full overflow-auto p-4')}>
                                {/* add a close button on top for UX */}
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold">Filters</h3>
                                    <button
                                        onClick={toggleFilter}
                                        className="text-gray-600 px-2 py-1 cursor-pointer rounded hover:bg-gray-100"
                                    >
                                        <img
                                            src="/icons/CloseMenu.svg"
                                            width={11}
                                            height={11}
                                            alt="Menu Icon"
                                        />
                                    </button>
                                </div>

                                <DoctorsFilter />
                            </div>
                        </aside>
                    )}

                    {/* Main Content (moves smoothly when filter opens on large screens) */}
                    <main
                        className={cn(
                            'flex-1 pb-14 min-w-0 px-2 overflow-hidden transition-all duration-500 ease-in-out',
                            // when desktop sidebar open, add left margin to push content (works for lg and up)
                            !isEmpty && isFilterOpen ? 'lg:ml-4' : 'lg:ml-0'
                        )}
                    >
                        {/* Specialties Carousel */}
                        {!(searchTerm && hasNoFilteredResults) && (
                            <div className="mb-6">
                                <SpecialtiesCarousel
                                    specialties={specialties}
                                    selectedSpecialty={selectedSpecialty}
                                    onSelect={handleSpecialtySelect}
                                />
                            </div>
                        )}

                        {/* Doctors Grid */}
                        <div className="mt-6 w-full">
                            {loading ? (
                                <p className="text-center text-gray-500">Loading doctors...</p>
                            ) : error ? (
                                <p className="text-center text-red-500">{error}</p>
                            ) : finalFilteredDoctors.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                                    {finalFilteredDoctors.map((doc) => (
                                        <DoctorsCard key={doc.id} {...doc} />
                                    ))}
                                </div>
                            ) : uniqueFavoriteDoctors.length > 0 ? (
                                <div className="text-center text-gray-500 flex flex-col items-center justify-center">
                                    <p className="text-lg font-semibold">
                                        No doctors match your filters.
                                    </p>
                                    <p className="text-gray-500">
                                        Try adjusting your search or filters.
                                    </p>
                                </div>
                            ) : (
                                <div className="text-center text-gray-500 flex flex-col items-center justify-center">
                                    <img
                                        src="/image/favorites.png"
                                        alt="empty heart"
                                        className="w-1/3 h-1/3"
                                    />
                                    <p className="text-2xl font-bold">No favorite doctors found.</p>
                                    <p className="text-gray-500">
                                        Add doctors to your favorites to see them here.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Next Page Button */}
                        {finalFilteredDoctors.length > 0 && (
                            <div className="flex justify-center mt-12">
                                <button className="border border-blue-500 text-blue-600 rounded-lg bg-white px-10 py-3 font-medium text-lg transition-all hover:bg-blue-50">
                                    Next Page
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </Container>
        </div>
    );
};

const FavoritePage = () => {
    return (
        <DoctorsFilterProvider>
            <DoctorsPageContent />
        </DoctorsFilterProvider>
    );
};

export default FavoritePage;

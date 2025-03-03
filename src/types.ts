export interface Dog {
    id: string
    img: string
    name: string
    age: number
    zip_code: string
    breed: string
}

export interface Location {
    zip_code: string
    latitude: number
    longitude: number
    city: string
    state: string
    county: string
}

export interface Coordinates {
    lat: number
    lon: number
}

export interface BrowseProps {
    dogs: Dog[]
    selectedDogs: string[]
    setSelectedDogs: (selectedDogs: string[]) => void
  }

export interface LoginProps {
    setIsLoggedIn: (login: boolean) => void
}

export interface LayoutProps {
  children: React.ReactNode
  isLoggedIn: boolean
  handleLogout: () => void
  selectedDogs: string[];
}

export interface HeaderProps {
  isLoggedIn: boolean;
  handleLogout: () => void;
  selectedDogs: string[];
}

export interface SearchProps {
    updateDogIds: (ids: string[]) => void
    setTotalResults: (total: number) => void
    setNext: (next: string) => void
    setPrev: (prev: string) => void
    setReturnedBreedIds: (ids: string[]) => void
    setNumberOfResults: (num: number) => void
    returnedBreedIds: string[]
}

export interface BreedSearchProps {
  breeds: string[]
  onSelectBreeds: (selectedBreeds: string[]) => void
}

export interface AutoCompleteProps<T> {
  items: T[];
  onSelect: (selectedItems: T[]) => void;
  getItemLabel: (item: T) => string;
  placeholder?: string;
}

export interface CardProps {
  dog: Dog
  selectedDogs: string[]
  setSelectedDogs: (selectedDogs: string[]) => void
}

export interface PaginationProps {
  onNext: () => void;
  onPrev: () => void;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

export interface BadgeProps {
  count: number
  selectedDogs: string[]
}
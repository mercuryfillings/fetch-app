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
    setSearchParameters: (searchParamters: SearchParameters) => void
    setZipCode: (zipCode: number) => void
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

export interface MultiSelectProps {
  onSelect: (selectedItems: string[]) => void
  inputType: string
  inputLength: number
  placeholder?: string
}

export interface CardProps {
  dog: Dog
  selectedDogs: string[]
  setSelectedDogs: (selectedDogs: string[]) => void
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface BadgeProps {
  count: number
  selectedDogs: string[]
}

export interface SearchParameters {
  numberOfResults: number
  sortBy: string
  minAge: number
  maxAge: number
}
import { ReactNode } from 'react'

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
  }

export interface LayoutProps {
    children: ReactNode;
}

export interface SearchProps {
    updateDogIds: (ids: string[]) => void;
  }

export interface BreedSearchProps {
  breeds: string[]
  onSelectBreeds: (selectedBreeds: string[]) => void
}
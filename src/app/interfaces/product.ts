export interface Product {
    name: string;
    model: string;
    manufacturer: string;
    cost_in_credits: string;
    length: string;
    max_atmosphering_speed: string;
    crew: string;
    passengers: string;
    cargo_capacity: string;
    consumables: string;
    vehicle_class: string;
    starship_class: string;
    MGLT: string;
    hyperdrive_rating: string;
    pilots: string[];
    films: string[];
    created: string;
    edited: string;
    url: string;
    type: string;
    image: string;
    quantity: number;
}

export interface ProductResponse {
    count: number;
    results: Product[];
}
export interface Product {
    name: string;
    model: string;
    cost_in_credits: string;
    vehicle_class: string;
    starship_class: string;
    manufacturer: string;
    length: string;
    max_atmosphering_speed: string;
    url: string;
    type: string;
    image: string;
    quantity: number;
}

export interface ProductResponse {
    count: number;
    results: Product[];
}
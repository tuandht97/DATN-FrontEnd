export interface Transaction {
    id: string;
    idItem: string,
    code: string,
    amount: number,
    price: number,
    seller: string,
    buyer: string,
    createdDate: Date
}

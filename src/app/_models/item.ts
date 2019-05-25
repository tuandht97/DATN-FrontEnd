export interface Item {
    uuid: string;
    tritId: string;
    amount: number;
    price: number;
    owner: string;
    sold: boolean;
    change: number;
    seller: string;
    createdDate: Date;
}

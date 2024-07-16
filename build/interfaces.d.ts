export type TExchange = "c2c1" | "c2c2" | "coinswitchx" | "wazirx";
export interface IOrderData {
    side: string;
    symbol: string;
    type: string;
    price: number;
    quantity: number;
    exchange: TExchange;
}
export interface IOrder {
    count?: number;
    from_time?: number;
    to_time?: number;
    side?: string;
    symbols?: string;
    exchanges?: string;
    type?: string;
    status?: string;
}
export interface ICandleParams {
    exchange: string;
    symbol: string;
    interval: number;
    start_time: number;
    end_time: number;
}

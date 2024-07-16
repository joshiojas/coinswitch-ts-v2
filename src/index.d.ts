declare module 'coinswitch-ts-v2' {
    import { URLSearchParams } from 'url';

    export class CoinSwitchClient {
        private apiKey: string;
        private secretKey: string;
        private baseURL: string;

        constructor(apiKey: string, secretKey: string);

        private generateSignature(method: string, endpoint: string, payload?: any): Promise<string>;

        private makeRequest(method: string, endpoint: string, payload?: any): Promise<any>;

        getServerTime(): Promise<number>;

        validateKeys(): Promise<any>;

        ping(): Promise<any>;

        getActiveCoins(exchange: string): Promise<any>;

        getExchangePrecision(exchange: string, symbol: string): Promise<any>;

        getTradeInfo(exchange: string, symbol: string): Promise<any>;

        createOrder(orderData: {
            side: string;
            symbol: string;
            type: string;
            price: number;
            quantity: number;
            exchange: string;
        }): Promise<any>;

        cancelOrder(orderId: string): Promise<any>;

        getOrder(orderId: string): Promise<any>;

        getOpenOrders(params: {
            count?: number;
            from_time?: number;
            to_time?: number;
            side?: string;
            symbols?: string;
            exchanges?: string;
            type?: string;
        }): Promise<any>;

        getClosedOrders(params: {
            count?: number;
            from_time?: number;
            to_time?: number;
            side?: string;
            symbols?: string;
            exchanges?: string;
            type?: string;
            status?: string;
        }): Promise<any>;

        getPortfolio(): Promise<any>;

        getTDS(): Promise<any>;

        getTrades(exchange: string, symbol: string): Promise<any>;

        getDepth(exchange: string, symbol: string): Promise<any>;

        getCandles(params: {
            exchange: string;
            symbol: string;
            interval: number;
            start_time: number;
            end_time: number;
        }): Promise<any>;

        getTicker24hrAllPairs(exchange: string): Promise<any>;

        getTicker24hrSpecificPair(exchange: string, symbol: string): Promise<any>;
    }

    export default CoinSwitchClient;
}
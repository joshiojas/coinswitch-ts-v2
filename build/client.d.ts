import { ICandleParams, IOrder, IOrderData, TExchange } from './interfaces';
declare class CoinSwitchClient {
    private apiKey;
    private secretKey;
    private baseURL;
    constructor(apiKey: string, secretKey: string);
    private generateSignature;
    private makeRequest;
    getServerTime(): Promise<number>;
    validateKeys(): Promise<any>;
    ping(): Promise<any>;
    getActiveCoins(exchange: TExchange): Promise<any>;
    getExchangePrecision(exchange: TExchange, symbol: string): Promise<any>;
    getTradeInfo(exchange: TExchange, symbol: string): Promise<any>;
    createOrder(orderData: IOrderData): Promise<any>;
    cancelOrder(orderId: string): Promise<any>;
    getOrder(orderId: string): Promise<any>;
    getOpenOrders(params: IOrder): Promise<any>;
    getClosedOrders(params: IOrder): Promise<any>;
    getPortfolio(): Promise<any>;
    getTDS(): Promise<any>;
    getTrades(exchange: TExchange, symbol: string): Promise<any>;
    getDepth(exchange: TExchange, symbol: string): Promise<any>;
    getCandles(params: ICandleParams): Promise<any>;
    getTicker24hrAllPairs(exchange: TExchange): Promise<any>;
    getTicker24hrSpecificPair(exchange: TExchange, symbol: string): Promise<any>;
}
export default CoinSwitchClient;

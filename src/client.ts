import crypto from 'crypto';
import { ICandleParams, IOrder, IOrderData, TExchange } from './interfaces';

class CoinSwitchClient {
    private apiKey: string;
    private secretKey: string;
    private baseURL: string = 'https://coinswitch.co';

    constructor(apiKey: string, secretKey: string) {
        this.apiKey = apiKey;
        this.secretKey = secretKey;
    }

    private async generateSignature(method: string, endpoint: string, payload: any = {}): Promise<string> {
        const timestamp = Date.now().toString();
        let signatureMessage = method + endpoint;
        // payload = JSON.stringify(payload);

        if (method === 'GET' && Object.keys(payload).length > 0) {
            const queryString = new URLSearchParams(payload).toString();
            signatureMessage += '?' + queryString;
        } else if (method !== 'GET') {
            signatureMessage += JSON.stringify(payload);
        }

        signatureMessage += timestamp;

        const signature = crypto.createHmac('sha256', this.secretKey)
            .update(signatureMessage)
            .digest('hex');

        return signature;
    }

    private async makeRequest(method: string, endpoint: string, payload: any = {}): Promise<any> {
        const url = this.baseURL + endpoint;
        const signature = await this.generateSignature(method, endpoint, payload);
        const timestamp = Date.now().toString();

        const headers = {
            'Content-Type': 'application/json',
            'X-AUTH-SIGNATURE': signature,
            'X-AUTH-APIKEY': this.apiKey,
            'X-AUTH-EPOCH': timestamp
        };

        const options: any = { method, headers };

        if (method === 'GET' && Object.keys(payload).length > 0) {
            const queryString = new URLSearchParams(payload).toString();
            options.url = url + '?' + queryString;
        } else if (method !== 'GET') {
            options.body = JSON.stringify(payload);
        }

        const response = await fetch(url, options);
        return await response.json();
    }

    async getServerTime(): Promise<number> {
        const response = await this.makeRequest('GET', '/trade/api/v2/time');
        return response.serverTime;
    }

    async validateKeys(): Promise<any> {
        return this.makeRequest('GET', '/trade/api/v2/validate/keys');
    }

    async ping(): Promise<any> {
        return this.makeRequest('GET', '/trade/api/v2/ping');
    }

    async getActiveCoins(exchange: TExchange): Promise<any> {
        return this.makeRequest('GET', '/trade/api/v2/coins', { exchange });
    }

    async getExchangePrecision(exchange: TExchange, symbol: string): Promise<any> {
        return this.makeRequest('POST', '/trade/api/v2/exchangePrecision', { exchange, symbol });
    }

    async getTradeInfo(exchange: TExchange, symbol: string): Promise<any> {
        return this.makeRequest('GET', '/trade/api/v2/tradeInfo', { exchange, symbol });
    }

    async createOrder(orderData: IOrderData): Promise<any> {
        return this.makeRequest('POST', '/trade/api/v2/order', orderData);
    }

    async cancelOrder(orderId: string): Promise<any> {
        return this.makeRequest('DELETE', '/trade/api/v2/order', { order_id: orderId });
    }

    async getOrder(orderId: string): Promise<any> {
        return this.makeRequest('GET', '/trade/api/v2/order', { order_id: orderId });
    }

    async getOpenOrders(params: IOrder): Promise<any> {
        return this.makeRequest('GET', '/trade/api/v2/orders', { ...params, open: true });
    }

    async getClosedOrders(params: IOrder): Promise<any> {
        return this.makeRequest('GET', '/trade/api/v2/orders', { ...params, open: false });
    }

    async getPortfolio(): Promise<any> {
        return this.makeRequest('GET', '/trade/api/v2/user/portfolio');
    }

    async getTDS(): Promise<any> {
        return this.makeRequest('GET', '/trade/api/v2/tds');
    }

    async getTrades(exchange: TExchange, symbol: string): Promise<any> {
        return this.makeRequest('GET', '/trade/api/v2/trades', { exchange, symbol });
    }

    async getDepth(exchange: TExchange, symbol: string): Promise<any> {
        return this.makeRequest('GET', '/trade/api/v2/depth', { exchange, symbol });
    }

    async getCandles(params: ICandleParams): Promise<any> {
        return this.makeRequest('GET', '/trade/api/v2/candles', params);
    }

    async getTicker24hrAllPairs(exchange: TExchange): Promise<any> {
        return this.makeRequest('GET', '/trade/api/v2/24hr/all-pairs/ticker', { exchange });
    }

    async getTicker24hrSpecificPair(exchange: TExchange, symbol: string): Promise<any> {
        return this.makeRequest('GET', '/trade/api/v2/24hr/ticker', { exchange, symbol });
    }


}

export default CoinSwitchClient;
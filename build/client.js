import crypto from 'crypto';
class CoinSwitchClient {
    apiKey;
    secretKey;
    baseURL = 'https://coinswitch.co';
    constructor(apiKey, secretKey) {
        this.apiKey = apiKey;
        this.secretKey = secretKey;
    }
    async generateSignature(method, endpoint, payload = {}) {
        const timestamp = Date.now().toString();
        let signatureMessage = method + endpoint;
        if (method === 'GET' && Object.keys(payload).length > 0) {
            const queryString = new URLSearchParams(payload).toString();
            signatureMessage += '?' + queryString;
        }
        else if (method !== 'GET') {
            signatureMessage += JSON.stringify(payload);
        }
        signatureMessage += timestamp;
        const signature = crypto.createHmac('sha256', this.secretKey)
            .update(signatureMessage)
            .digest('hex');
        return signature;
    }
    async makeRequest(method, endpoint, payload = {}) {
        const url = this.baseURL + endpoint;
        const signature = await this.generateSignature(method, endpoint, payload);
        const timestamp = Date.now().toString();
        const headers = {
            'Content-Type': 'application/json',
            'X-AUTH-SIGNATURE': signature,
            'X-AUTH-APIKEY': this.apiKey,
            'X-AUTH-EPOCH': timestamp
        };
        const options = { method, headers };
        if (method === 'GET' && Object.keys(payload).length > 0) {
            const queryString = new URLSearchParams(payload).toString();
            options.url = url + '?' + queryString;
        }
        else if (method !== 'GET') {
            options.body = JSON.stringify(payload);
        }
        const response = await fetch(url, options);
        return await response.json();
    }
    async getServerTime() {
        const response = await this.makeRequest('GET', '/trade/api/v2/time');
        return response.serverTime;
    }
    async validateKeys() {
        return this.makeRequest('GET', '/trade/api/v2/validate/keys');
    }
    async ping() {
        return this.makeRequest('GET', '/trade/api/v2/ping');
    }
    async getActiveCoins(exchange) {
        return this.makeRequest('GET', '/trade/api/v2/coins', { exchange });
    }
    async getExchangePrecision(exchange, symbol) {
        return this.makeRequest('POST', '/trade/api/v2/exchangePrecision', { exchange, symbol });
    }
    async getTradeInfo(exchange, symbol) {
        return this.makeRequest('GET', '/trade/api/v2/tradeInfo', { exchange, symbol });
    }
    async createOrder(orderData) {
        return this.makeRequest('POST', '/trade/api/v2/order', orderData);
    }
    async cancelOrder(orderId) {
        return this.makeRequest('DELETE', '/trade/api/v2/order', { order_id: orderId });
    }
    async getOrder(orderId) {
        return this.makeRequest('GET', '/trade/api/v2/order', { order_id: orderId });
    }
    async getOpenOrders(params) {
        return this.makeRequest('GET', '/trade/api/v2/orders', { ...params, open: true });
    }
    async getClosedOrders(params) {
        return this.makeRequest('GET', '/trade/api/v2/orders', { ...params, open: false });
    }
    async getPortfolio() {
        return this.makeRequest('GET', '/trade/api/v2/user/portfolio');
    }
    async getTDS() {
        return this.makeRequest('GET', '/trade/api/v2/tds');
    }
    async getTrades(exchange, symbol) {
        return this.makeRequest('GET', '/trade/api/v2/trades', { exchange, symbol });
    }
    async getDepth(exchange, symbol) {
        return this.makeRequest('GET', '/trade/api/v2/depth', { exchange, symbol });
    }
    async getCandles(params) {
        return this.makeRequest('GET', '/trade/api/v2/candles', params);
    }
    async getTicker24hrAllPairs(exchange) {
        return this.makeRequest('GET', '/trade/api/v2/24hr/all-pairs/ticker', { exchange });
    }
    async getTicker24hrSpecificPair(exchange, symbol) {
        return this.makeRequest('GET', '/trade/api/v2/24hr/ticker', { exchange, symbol });
    }
}
export default CoinSwitchClient;

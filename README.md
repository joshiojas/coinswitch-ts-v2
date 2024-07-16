# CoinSwitch TS v2

A TypeScript client for interacting with the CoinSwitch API v2.

## Table of Contents

// [Installation](#installation)
// [Usage](#usage)
// [API Methods](#api-methods)
// [Project Structure](#project-structure)
// [License](#license)

## Installation

To install the `coinswitch-ts-v2` package, use npm:

```sh
npm install coinswitch-ts-v2
```

## Usage

First, import the CoinSwitchClient class and create an instance with your API key and secret key.

```typescript
import CoinSwitchClient from "coinswitch-ts-v2";

const client = new CoinSwitchClient(
  "your-api-key-here",
  "your-secret-key-here"
);

async function getServerTime() {
  try {
    const serverTime = await client.getServerTime();
    console.log("Server Time:", serverTime);
  } catch (error) {
    console.error("Error fetching server time:", error);
  }
}

getServerTime();
```

## API Methods

CoinSwitchClient

```typescript
constructor(apiKey: string, secretKey: string): Initializes the client with the provided API key and secret key.

getServerTime(): Promise<number>

// Fetches the server time.

validateKeys(): Promise<any>

// Validates the provided API keys.

ping(): Promise<any>

// Pings the CoinSwitch server.

getActiveCoins(exchange: string): Promise<any>

// Retrieves active coins for the specified exchange.

getExchangePrecision(exchange: string, symbol: string): Promise<any>

// Gets exchange precision for a given symbol.

getTradeInfo(exchange: string, symbol: string): Promise<any>

// Fetches trade information for a given symbol.

createOrder(orderData: {
side: string;
symbol: string;
type: string;
price: number;
quantity: number;
exchange: string;
}): Promise<any>

// Creates a new order.

cancelOrder(orderId: string): Promise<any>

// Cancels an order by its ID.

getOrder(orderId: string): Promise<any>

// Retrieves an order by its ID.

getOpenOrders(params: {
count?: number;
from_time?: number;
to_time?: number;
side?: string;
symbols?: string;
exchanges?: string;
type?: string;
}): Promise<any>

// Fetches open orders with optional parameters.

getClosedOrders(params: {
count?: number;
from_time?: number;
to_time?: number;
side?: string;
symbols?: string;
exchanges?: string;
type?: string;
status?: string;
}): Promise<any>

// Fetches closed orders with optional parameters.

getPortfolio(): Promise<any>

// Retrieves the user's portfolio.

getTDS(): Promise<any>

// Fetches TDS information.

getTrades(exchange: string, symbol: string): Promise<any>

// Fetches trades for a given symbol.

getDepth(exchange: string, symbol: string): Promise<any>

// Fetches market depth for a given symbol.

getCandles(params: {
exchange: string;
symbol: string;
interval: number;
start_time: number;
end_time: number;
}): Promise<any>

// Fetches candlestick data.

getTicker24hrAllPairs(exchange: string): Promise<any>

// Fetches 24-hour ticker data for all pairs.

getTicker24hrSpecificPair(exchange: string, symbol: string): Promise<any>

// Fetches 24-hour ticker data for a specific pair.
```

## Types

```typescript
interface OrderData {
  side: string;
  symbol: string;
  type: string;
  price: number;
  quantity: number;
  exchange: string;
}

interface OrderParams {
  count?: number;
  from_time?: number;
  to_time?: number;
  side?: string;
  symbols?: string;
  exchanges?: string;
  type?: string;
  status?: string;
}

interface CandleParams {
  exchange: string;
  symbol: string;
  interval: number;
  start_time: number;
  end_time: number;
}
```

# Backend & Web3 Integration Guide for CarPoolin

This guide will walk you through integrating a backend API and Web3 functionality (Polygon/Base + USDC) into your React Native carpool app.

## Table of Contents
1. [Backend Architecture Overview](#backend-architecture-overview)
2. [Backend Setup Options](#backend-setup-options)
3. [Step-by-Step Backend Setup](#step-by-step-backend-setup)
4. [API Structure Design](#api-structure-design)
5. [React Native API Integration](#react-native-api-integration)
6. [Web3 Integration (Polygon/Base + USDC)](#web3-integration-polygonbase--usdc)
7. [Connecting Everything Together](#connecting-everything-together)

---

## Backend Architecture Overview

Your carpool app needs a backend to handle:
- **User Authentication** (email/password or Web3 wallet)
- **Ride Management** (create, search, book rides)
- **Payment Processing** (USDC transactions)
- **User Profiles** (drivers and passengers)
- **Real-time Updates** (ride status, notifications)

### Recommended Architecture

```
React Native App
    ↓ (HTTP/WebSocket)
Backend API Server (Node.js/Express or Python/FastAPI)
    ↓
Database (PostgreSQL/MongoDB)
    ↓
Blockchain (Polygon/Base) ← Smart Contracts for payments
```

---

## Backend Setup Options

### Option 1: Node.js + Express + PostgreSQL (Recommended for beginners)
- **Pros**: JavaScript everywhere, large community, easy to learn
- **Cons**: Need to manage database migrations yourself

### Option 2: Python + FastAPI + PostgreSQL
- **Pros**: Fast development, automatic API docs, great for ML/AI later
- **Cons**: Different language from your React Native app

### Option 3: Firebase/Supabase (Backend-as-a-Service)
- **Pros**: Quickest setup, built-in auth, real-time database
- **Cons**: Less control, vendor lock-in, can be expensive at scale

**For this guide, we'll use Option 1 (Node.js + Express + PostgreSQL)** as it's most educational and gives you full control.

---

## Step-by-Step Backend Setup

### Step 1: Create Backend Directory Structure

Create a new folder `backend/` in your project root:

```
CarPoolin/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Auth, validation, etc.
│   │   ├── services/        # Business logic
│   │   ├── utils/          # Helper functions
│   │   └── config/         # Database, env config
│   ├── contracts/          # Smart contracts (Solidity)
│   ├── migrations/         # Database migrations
│   ├── .env                # Environment variables
│   ├── package.json
│   └── server.js           # Entry point
├── src/                    # Your React Native app
└── ...
```

### Step 2: Initialize Backend Project

```bash
cd backend
npm init -y
```

### Step 3: Install Core Dependencies

```bash
# Core framework
npm install express cors dotenv

# Database (choose one)
npm install pg sequelize          # PostgreSQL with Sequelize ORM
# OR
npm install mongoose              # MongoDB with Mongoose

# Authentication
npm install jsonwebtoken bcryptjs
npm install express-validator     # Input validation

# Web3
npm install ethers                # Ethereum/Polygon/Base interaction
npm install @uniswap/sdk-core     # USDC token interactions

# Utilities
npm install axios                 # HTTP client
npm install socket.io            # Real-time updates (optional)
```

### Step 4: Install Development Dependencies

```bash
npm install --save-dev nodemon   # Auto-restart server
npm install --save-dev @types/node
```

### Step 5: Set Up Environment Variables

Create `backend/.env`:

```env
# Server
PORT=3001
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=carpoolin
DB_USER=your_username
DB_PASSWORD=your_password

# JWT Secret (generate a random string)
JWT_SECRET=your_super_secret_jwt_key_here

# Blockchain
POLYGON_RPC_URL=https://polygon-rpc.com
BASE_RPC_URL=https://mainnet.base.org
USDC_CONTRACT_ADDRESS_POLYGON=0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174
USDC_CONTRACT_ADDRESS_BASE=0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913

# Wallet (for backend transactions - use a dedicated wallet)
BACKEND_WALLET_PRIVATE_KEY=your_private_key_here
```

### Step 6: Create Basic Server Structure

Create `backend/server.js`:

```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes (you'll create these)
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'CarPoolin API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

Add to `backend/package.json`:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

---

## API Structure Design

### Core Endpoints You'll Need

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/wallet` - Connect Web3 wallet
- `GET /api/auth/me` - Get current user

#### Rides
- `GET /api/rides/search` - Search rides (query params: from, to, date, passengers)
- `GET /api/rides/:id` - Get ride details
- `POST /api/rides` - Create new ride (driver)
- `POST /api/rides/:id/book` - Book a ride (passenger)
- `GET /api/rides/my-rides` - Get user's rides

#### Payments
- `POST /api/payments/create-intent` - Create payment intent
- `POST /api/payments/verify` - Verify blockchain transaction
- `GET /api/payments/history` - Get payment history

#### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile

### Example API Response Structure

```typescript
// Ride object
interface Ride {
  id: string;
  driverId: string;
  driverName: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  price: number; // in USDC
  availableSeats: number;
  totalSeats: number;
  carInfo: {
    model: string;
    color: string;
    licensePlate: string;
  };
  status: 'active' | 'booked' | 'completed' | 'cancelled';
  createdAt: string;
}

// Search response
interface SearchResponse {
  rides: Ride[];
  total: number;
}
```

---

## React Native API Integration

### Step 1: Install HTTP Client

In your React Native project root:

```bash
npm install axios
```

### Step 2: Create API Service Layer

Create `src/services/api.ts`:

```typescript
import axios from 'axios';

const API_BASE_URL = __DEV__ 
  ? 'http://localhost:3001/api'  // Development
  : 'https://your-production-api.com/api';  // Production

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = getAuthToken(); // You'll implement this
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### Step 3: Create API Functions

Create `src/services/rideService.ts`:

```typescript
import api from './api';

export interface SearchParams {
  from: string;
  to: string;
  date?: string;
  passengers?: number;
}

export interface Ride {
  id: string;
  driverId: string;
  driverName: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  availableSeats: number;
  totalSeats: number;
  carInfo: {
    model: string;
    color: string;
    licensePlate: string;
  };
  status: string;
}

export const rideService = {
  searchRides: async (params: SearchParams): Promise<Ride[]> => {
    const response = await api.get('/rides/search', { params });
    return response.data.rides;
  },

  getRideDetails: async (rideId: string): Promise<Ride> => {
    const response = await api.get(`/rides/${rideId}`);
    return response.data;
  },

  bookRide: async (rideId: string): Promise<void> => {
    await api.post(`/rides/${rideId}/book`);
  },
};
```

### Step 4: Update Your Screens

In `src/screens/SearchScreen.tsx`, replace mock data:

```typescript
import { rideService } from '../services/rideService';

const handleSearch = async () => {
  try {
    const rides = await rideService.searchRides({
      from,
      to,
      passengers,
    });
    navigation.navigate('Result', { rides });
  } catch (error) {
    console.error('Search failed:', error);
    // Show error to user
  }
};
```

---

## Web3 Integration (Polygon/Base + USDC)

### Step 1: Install Web3 Dependencies

```bash
npm install ethers
npm install @walletconnect/react-native-dapp
npm install react-native-get-random-values  # Required for crypto
```

### Step 2: Set Up Wallet Connection

Create `src/services/walletService.ts`:

```typescript
import { ethers } from 'ethers';
import { WalletConnectModal } from '@walletconnect/react-native-dapp';

// USDC Contract Addresses
const USDC_POLYGON = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174';
const USDC_BASE = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';

// USDC ABI (minimal - just what you need)
const USDC_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function transfer(address to, uint256 amount) returns (bool)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function decimals() view returns (uint8)',
];

export const walletService = {
  connectWallet: async () => {
    // Use WalletConnect or MetaMask mobile SDK
    // This is a simplified example
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    return { provider, signer, address };
  },

  getUSDCBalance: async (address: string, network: 'polygon' | 'base') => {
    const rpcUrl = network === 'polygon' 
      ? 'https://polygon-rpc.com'
      : 'https://mainnet.base.org';
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    const usdcAddress = network === 'polygon' ? USDC_POLYGON : USDC_BASE;
    const usdcContract = new ethers.Contract(usdcAddress, USDC_ABI, provider);
    const balance = await usdcContract.balanceOf(address);
    const decimals = await usdcContract.decimals();
    return ethers.utils.formatUnits(balance, decimals);
  },

  payUSDC: async (
    to: string,
    amount: number,
    network: 'polygon' | 'base',
    signer: ethers.Signer
  ) => {
    const usdcAddress = network === 'polygon' ? USDC_POLYGON : USDC_BASE;
    const usdcContract = new ethers.Contract(usdcAddress, USDC_ABI, signer);
    const decimals = await usdcContract.decimals();
    const amountWei = ethers.utils.parseUnits(amount.toString(), decimals);
    const tx = await usdcContract.transfer(to, amountWei);
    await tx.wait();
    return tx.hash;
  },
};
```

### Step 3: Create Payment Component

Create `src/components/PaymentModal.tsx`:

```typescript
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { walletService } from '../services/walletService';

interface PaymentModalProps {
  amount: number;
  recipientAddress: string;
  network: 'polygon' | 'base';
  onSuccess: (txHash: string) => void;
  onCancel: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  amount,
  recipientAddress,
  network,
  onSuccess,
  onCancel,
}) => {
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    try {
      const { signer } = await walletService.connectWallet();
      const txHash = await walletService.payUSDC(
        recipientAddress,
        amount,
        network,
        signer
      );
      onSuccess(txHash);
    } catch (error) {
      console.error('Payment failed:', error);
      // Show error
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pay with USDC</Text>
      <Text style={styles.amount}>{amount} USDC</Text>
      <Text style={styles.network}>Network: {network}</Text>
      
      <TouchableOpacity
        style={styles.payButton}
        onPress={handlePay}
        disabled={loading}
      >
        <Text style={styles.payButtonText}>
          {loading ? 'Processing...' : 'Pay Now'}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={onCancel}>
        <Text>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};
```

### Step 4: Integrate Payment in Ride Booking

In `RideDetailsScreen.tsx`, update the "Order Now" button:

```typescript
const handleOrder = async () => {
  // 1. Show payment modal
  // 2. User pays with USDC
  // 3. Send transaction hash to backend
  // 4. Backend verifies transaction
  // 5. Backend confirms booking
};
```

---

## Connecting Everything Together

### Backend Payment Verification Flow

1. **User initiates booking** → Frontend calls `POST /api/rides/:id/book`
2. **Backend creates payment intent** → Returns payment details (amount, recipient address)
3. **User pays with USDC** → Frontend calls wallet service
4. **Frontend sends transaction hash** → `POST /api/payments/verify` with `txHash`
5. **Backend verifies transaction** → Checks blockchain, confirms payment
6. **Backend confirms booking** → Updates database, sends confirmation

### Backend Payment Verification Example

```javascript
// backend/src/services/paymentService.js
const { ethers } = require('ethers');

async function verifyPayment(txHash, expectedAmount, recipientAddress, network) {
  const rpcUrl = network === 'polygon' 
    ? process.env.POLYGON_RPC_URL
    : process.env.BASE_RPC_URL;
  
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const tx = await provider.getTransactionReceipt(txHash);
  
  if (!tx || tx.status !== 1) {
    throw new Error('Transaction failed');
  }
  
  // Parse transaction logs to verify USDC transfer
  // Check amount and recipient match
  
  return true;
}
```

---

## Next Steps

1. **Set up your database** (PostgreSQL recommended)
   - Install PostgreSQL locally or use a cloud service (Supabase, Railway, etc.)
   - Create tables for users, rides, bookings, payments

2. **Implement authentication**
   - JWT-based auth for email/password
   - Wallet signature verification for Web3 users

3. **Build your API endpoints**
   - Start with search and ride creation
   - Add booking and payment verification

4. **Test your integration**
   - Use Postman or Insomnia to test API endpoints
   - Test Web3 payments on testnets first (Polygon Mumbai, Base Sepolia)

5. **Deploy your backend**
   - Options: Railway, Render, Heroku, AWS, DigitalOcean
   - Set up environment variables
   - Configure CORS for your React Native app

6. **Add error handling and loading states**
   - Show loading indicators during API calls
   - Handle network errors gracefully
   - Validate user inputs

---

## Important Security Considerations

1. **Never expose private keys** in frontend code
2. **Validate all inputs** on the backend
3. **Use HTTPS** in production
4. **Implement rate limiting** to prevent abuse
5. **Verify blockchain transactions** on the backend before confirming bookings
6. **Store sensitive data** (like JWT secrets) in environment variables
7. **Use prepared statements** for database queries to prevent SQL injection

---

## Resources

- **Express.js**: https://expressjs.com/
- **Ethers.js**: https://docs.ethers.org/
- **Polygon Docs**: https://docs.polygon.technology/
- **Base Docs**: https://docs.base.org/
- **USDC on Polygon**: https://polygonscan.com/token/0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174
- **USDC on Base**: https://basescan.org/token/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913

---

## Questions to Consider

As you build, think about:
- How will you handle ride cancellations and refunds?
- How will you implement ratings and reviews?
- How will you handle disputes between drivers and passengers?
- How will you scale your database as you grow?
- How will you implement real-time ride tracking?
- How will you handle gas fees for USDC transactions?

Good luck building! 🚀


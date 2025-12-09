# Quick Start Code Templates

This file contains ready-to-use code templates for your backend setup. Copy and adapt these as needed.

## Database Schema (PostgreSQL)

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255), -- NULL for Web3-only users
  wallet_address VARCHAR(42) UNIQUE, -- Ethereum address format
  name VARCHAR(255),
  surname VARCHAR(255),
  phone VARCHAR(20),
  is_driver BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Rides table
CREATE TABLE rides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id UUID REFERENCES users(id) ON DELETE CASCADE,
  from_location VARCHAR(255) NOT NULL,
  to_location VARCHAR(255) NOT NULL,
  departure_time TIMESTAMP NOT NULL,
  arrival_time TIMESTAMP NOT NULL,
  price_usdc DECIMAL(10, 2) NOT NULL, -- Price in USDC
  total_seats INTEGER NOT NULL,
  available_seats INTEGER NOT NULL,
  car_model VARCHAR(255),
  car_color VARCHAR(50),
  car_license_plate VARCHAR(20),
  status VARCHAR(20) DEFAULT 'active', -- active, booked, completed, cancelled
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Bookings table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ride_id UUID REFERENCES rides(id) ON DELETE CASCADE,
  passenger_id UUID REFERENCES users(id) ON DELETE CASCADE,
  payment_tx_hash VARCHAR(66) UNIQUE, -- Blockchain transaction hash
  payment_network VARCHAR(20), -- 'polygon' or 'base'
  payment_amount DECIMAL(10, 2),
  payment_status VARCHAR(20) DEFAULT 'pending', -- pending, confirmed, failed
  status VARCHAR(20) DEFAULT 'confirmed', -- confirmed, cancelled, completed
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(ride_id, passenger_id) -- Prevent double booking
);

-- Payments table (for tracking)
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  tx_hash VARCHAR(66) UNIQUE NOT NULL,
  from_address VARCHAR(42) NOT NULL,
  to_address VARCHAR(42) NOT NULL,
  amount_usdc DECIMAL(10, 2) NOT NULL,
  network VARCHAR(20) NOT NULL,
  block_number INTEGER,
  confirmed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_rides_from_to ON rides(from_location, to_location);
CREATE INDEX idx_rides_departure_time ON rides(departure_time);
CREATE INDEX idx_rides_status ON rides(status);
CREATE INDEX idx_bookings_ride_id ON bookings(ride_id);
CREATE INDEX idx_bookings_passenger_id ON bookings(passenger_id);
CREATE INDEX idx_payments_tx_hash ON payments(tx_hash);
```

## Backend File Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # Database connection
│   ├── models/
│   │   ├── User.js              # User model
│   │   ├── Ride.js              # Ride model
│   │   └── Booking.js           # Booking model
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── rideController.js
│   │   ├── bookingController.js
│   │   └── paymentController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── rideRoutes.js
│   │   ├── bookingRoutes.js
│   │   └── paymentRoutes.js
│   ├── middleware/
│   │   ├── auth.js              # JWT verification
│   │   └── validation.js        # Input validation
│   ├── services/
│   │   ├── paymentService.js    # Blockchain verification
│   │   └── emailService.js      # Email notifications (optional)
│   └── utils/
│       └── errors.js            # Error handling
├── .env
├── .gitignore
├── package.json
└── server.js
```

## Example Backend Files

### server.js

```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./src/routes/authRoutes');
const rideRoutes = require('./src/routes/rideRoutes');
const bookingRoutes = require('./src/routes/bookingRoutes');
const paymentRoutes = require('./src/routes/paymentRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/rides', rideRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  });
});

app.listen(PORT, () => {
  console.log(`🚀 CarPoolin API running on port ${PORT}`);
});
```

### src/config/database.js (Sequelize)

```javascript
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
  }
);

module.exports = sequelize;
```

### src/models/Ride.js (Sequelize)

```javascript
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Ride = sequelize.define('Ride', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  driverId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  fromLocation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  toLocation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  departureTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  arrivalTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  priceUsdc: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  totalSeats: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  availableSeats: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  carModel: DataTypes.STRING,
  carColor: DataTypes.STRING,
  carLicensePlate: DataTypes.STRING,
  status: {
    type: DataTypes.ENUM('active', 'booked', 'completed', 'cancelled'),
    defaultValue: 'active',
  },
}, {
  tableName: 'rides',
  timestamps: true,
});

module.exports = Ride;
```

### src/controllers/rideController.js

```javascript
const Ride = require('../models/Ride');
const { Op } = require('sequelize');

exports.searchRides = async (req, res) => {
  try {
    const { from, to, date, passengers = 1 } = req.query;

    const where = {
      fromLocation: from,
      toLocation: to,
      status: 'active',
      availableSeats: {
        [Op.gte]: parseInt(passengers),
      },
    };

    if (date && date !== 'Today') {
      const searchDate = new Date(date);
      where.departureTime = {
        [Op.gte]: searchDate,
        [Op.lt]: new Date(searchDate.getTime() + 24 * 60 * 60 * 1000),
      };
    } else {
      where.departureTime = {
        [Op.gte]: new Date(),
      };
    }

    const rides = await Ride.findAll({
      where,
      include: [
        {
          model: require('../models/User'),
          as: 'driver',
          attributes: ['id', 'name', 'surname', 'walletAddress'],
        },
      ],
      order: [['departureTime', 'ASC']],
    });

    res.json({
      rides,
      total: rides.length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRideDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const ride = await Ride.findByPk(id, {
      include: [
        {
          model: require('../models/User'),
          as: 'driver',
          attributes: ['id', 'name', 'surname', 'walletAddress'],
        },
      ],
    });

    if (!ride) {
      return res.status(404).json({ error: 'Ride not found' });
    }

    res.json(ride);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createRide = async (req, res) => {
  try {
    const userId = req.user.id; // From auth middleware
    const {
      fromLocation,
      toLocation,
      departureTime,
      arrivalTime,
      priceUsdc,
      totalSeats,
      carModel,
      carColor,
      carLicensePlate,
    } = req.body;

    const ride = await Ride.create({
      driverId: userId,
      fromLocation,
      toLocation,
      departureTime,
      arrivalTime,
      priceUsdc,
      totalSeats,
      availableSeats: totalSeats,
      carModel,
      carColor,
      carLicensePlate,
    });

    res.status(201).json(ride);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

### src/middleware/auth.js

```javascript
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
```

### src/services/paymentService.js

```javascript
const { ethers } = require('ethers');

const USDC_ABI = [
  'event Transfer(address indexed from, address indexed to, uint256 value)',
];

async function verifyPayment(txHash, expectedAmount, recipientAddress, network) {
  try {
    const rpcUrl = network === 'polygon'
      ? process.env.POLYGON_RPC_URL
      : process.env.BASE_RPC_URL;

    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    const receipt = await provider.getTransactionReceipt(txHash);

    if (!receipt || receipt.status !== 1) {
      throw new Error('Transaction failed or not found');
    }

    // Parse Transfer event from USDC contract
    const usdcAddress = network === 'polygon'
      ? process.env.USDC_CONTRACT_ADDRESS_POLYGON
      : process.env.USDC_CONTRACT_ADDRESS_BASE;

    const usdcContract = new ethers.Contract(usdcAddress, USDC_ABI, provider);
    const transferEvent = receipt.logs.find(log => {
      try {
        const parsed = usdcContract.interface.parseLog(log);
        return parsed && parsed.name === 'Transfer';
      } catch {
        return false;
      }
    });

    if (!transferEvent) {
      throw new Error('No USDC transfer found in transaction');
    }

    const parsed = usdcContract.interface.parseLog(transferEvent);
    const decimals = 6; // USDC has 6 decimals
    const amount = ethers.utils.formatUnits(parsed.args.value, decimals);

    // Verify recipient and amount
    if (parsed.args.to.toLowerCase() !== recipientAddress.toLowerCase()) {
      throw new Error('Recipient address mismatch');
    }

    if (parseFloat(amount) < parseFloat(expectedAmount)) {
      throw new Error('Amount mismatch');
    }

    return {
      verified: true,
      amount,
      from: parsed.args.from,
      to: parsed.args.to,
      blockNumber: receipt.blockNumber,
    };
  } catch (error) {
    throw new Error(`Payment verification failed: ${error.message}`);
  }
}

module.exports = { verifyPayment };
```

## React Native API Service Template

### src/services/api.ts

```typescript
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = __DEV__
  ? 'http://10.0.2.2:3001/api'  // Android emulator
  : 'https://your-api.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired, redirect to login
      await AsyncStorage.removeItem('authToken');
      // Navigate to login screen
    }
    return Promise.reject(error);
  }
);

export default api;
```

## Environment Variables Template

### backend/.env.example

```env
# Server
PORT=3001
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=carpoolin
DB_USER=postgres
DB_PASSWORD=your_password

# JWT
JWT_SECRET=generate_a_random_secret_key_here_min_32_chars

# Blockchain RPC URLs
POLYGON_RPC_URL=https://polygon-rpc.com
BASE_RPC_URL=https://mainnet.base.org

# USDC Contract Addresses
USDC_CONTRACT_ADDRESS_POLYGON=0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174
USDC_CONTRACT_ADDRESS_BASE=0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913

# Backend Wallet (for admin operations)
BACKEND_WALLET_PRIVATE_KEY=your_private_key_here
```

## Testing Your API

### Using curl

```bash
# Health check
curl http://localhost:3001/health

# Search rides
curl "http://localhost:3001/api/rides/search?from=Brussels&to=Ghent&passengers=1"

# Create ride (requires auth token)
curl -X POST http://localhost:3001/api/rides \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "fromLocation": "Brussels",
    "toLocation": "Ghent",
    "departureTime": "2024-01-15T10:00:00Z",
    "arrivalTime": "2024-01-15T11:00:00Z",
    "priceUsdc": 25.00,
    "totalSeats": 4,
    "carModel": "Tesla Model 3",
    "carColor": "White",
    "carLicensePlate": "ABC-123"
  }'
```

## Next Steps

1. Copy these templates into your backend folder
2. Install dependencies: `npm install`
3. Set up your database and run migrations
4. Update environment variables
5. Test each endpoint
6. Integrate with your React Native app

Good luck! 🚀


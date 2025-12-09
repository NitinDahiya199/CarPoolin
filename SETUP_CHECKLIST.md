# Backend & Web3 Integration Checklist

Use this checklist to track your progress as you integrate the backend and Web3 functionality.

## Phase 1: Backend Foundation

### Database Setup
- [ ] Install PostgreSQL (or choose MongoDB)
- [ ] Create database named `carpoolin`
- [ ] Run database schema SQL (from `QUICK_START_TEMPLATES.md`)
- [ ] Verify tables are created correctly
- [ ] Test database connection

### Backend Project Setup
- [ ] Create `backend/` folder in project root
- [ ] Initialize npm project (`npm init -y`)
- [ ] Install core dependencies (express, cors, dotenv, etc.)
- [ ] Install database ORM (Sequelize or Mongoose)
- [ ] Install Web3 dependencies (ethers)
- [ ] Create `.env` file with all required variables
- [ ] Create `.gitignore` (exclude `.env` and `node_modules`)
- [ ] Set up basic `server.js` file
- [ ] Test server starts successfully (`npm run dev`)

### Database Models
- [ ] Create User model
- [ ] Create Ride model
- [ ] Create Booking model
- [ ] Create Payment model
- [ ] Set up model relationships/associations
- [ ] Test models can be created/queried

## Phase 2: Authentication

### Email/Password Auth
- [ ] Create auth routes (`/api/auth/register`, `/api/auth/login`)
- [ ] Implement password hashing (bcrypt)
- [ ] Implement JWT token generation
- [ ] Create auth middleware
- [ ] Test registration endpoint
- [ ] Test login endpoint
- [ ] Test protected routes require auth

### Web3 Wallet Auth (Optional)
- [ ] Create wallet connection endpoint
- [ ] Implement wallet signature verification
- [ ] Link wallet address to user account
- [ ] Test wallet authentication

## Phase 3: Core API Endpoints

### Rides API
- [ ] `GET /api/rides/search` - Search rides
- [ ] `GET /api/rides/:id` - Get ride details
- [ ] `POST /api/rides` - Create new ride (driver)
- [ ] `PUT /api/rides/:id` - Update ride
- [ ] `DELETE /api/rides/:id` - Cancel ride
- [ ] Test all ride endpoints with Postman/curl

### Bookings API
- [ ] `POST /api/bookings` - Create booking
- [ ] `GET /api/bookings/my-bookings` - Get user's bookings
- [ ] `PUT /api/bookings/:id/cancel` - Cancel booking
- [ ] Test booking creation
- [ ] Test booking cancellation

### Users API
- [ ] `GET /api/users/:id` - Get user profile
- [ ] `PUT /api/users/:id` - Update profile
- [ ] Test user endpoints

## Phase 4: Payment Integration

### Blockchain Setup
- [ ] Get Polygon RPC URL (or use public endpoint)
- [ ] Get Base RPC URL (or use public endpoint)
- [ ] Verify USDC contract addresses
- [ ] Test connection to both networks
- [ ] Create payment service for verification

### Payment Endpoints
- [ ] `POST /api/payments/create-intent` - Create payment intent
- [ ] `POST /api/payments/verify` - Verify blockchain transaction
- [ ] `GET /api/payments/history` - Get payment history
- [ ] Test payment verification on testnet

### Payment Flow
- [ ] User initiates booking → Backend creates payment intent
- [ ] Frontend shows payment modal
- [ ] User pays with USDC wallet
- [ ] Frontend sends transaction hash to backend
- [ ] Backend verifies transaction on blockchain
- [ ] Backend confirms booking
- [ ] Test complete payment flow

## Phase 5: React Native Integration

### API Service Layer
- [ ] Install axios in React Native project
- [ ] Create `src/services/api.ts` with base configuration
- [ ] Set up request interceptors (add auth token)
- [ ] Set up response interceptors (handle errors)
- [ ] Test API service connects to backend

### Service Functions
- [ ] Create `src/services/authService.ts`
- [ ] Create `src/services/rideService.ts`
- [ ] Create `src/services/bookingService.ts`
- [ ] Create `src/services/paymentService.ts`
- [ ] Test each service function

### Update Screens
- [ ] Update `AuthScreen.tsx` to call registration/login API
- [ ] Update `SearchScreen.tsx` to call search API
- [ ] Update `ResultScreen.tsx` to display API data
- [ ] Update `RideDetailsScreen.tsx` to fetch ride details
- [ ] Add loading states to all screens
- [ ] Add error handling to all screens

## Phase 6: Web3 Wallet Integration

### Wallet Setup
- [ ] Install ethers.js in React Native project
- [ ] Install wallet connection library (WalletConnect or MetaMask SDK)
- [ ] Create `src/services/walletService.ts`
- [ ] Implement wallet connection function
- [ ] Test wallet connection

### USDC Functions
- [ ] Implement `getUSDCBalance()` function
- [ ] Implement `payUSDC()` function
- [ ] Create payment modal component
- [ ] Test USDC balance check
- [ ] Test USDC payment on testnet

### Payment UI
- [ ] Create `PaymentModal.tsx` component
- [ ] Integrate payment modal in `RideDetailsScreen`
- [ ] Show USDC balance in user profile
- [ ] Handle payment success/failure states
- [ ] Test payment flow end-to-end

## Phase 7: Testing & Refinement

### Backend Testing
- [ ] Test all API endpoints with Postman
- [ ] Test error cases (invalid data, missing fields)
- [ ] Test authentication (valid/invalid tokens)
- [ ] Test payment verification with real testnet transactions
- [ ] Add input validation middleware
- [ ] Add rate limiting

### Frontend Testing
- [ ] Test on Android device/emulator
- [ ] Test on iOS device/simulator
- [ ] Test with slow network (add loading states)
- [ ] Test error scenarios (network errors, API errors)
- [ ] Test wallet connection on real device
- [ ] Test USDC payments on testnet

### Integration Testing
- [ ] Complete user flow: Register → Search → Book → Pay
- [ ] Test driver flow: Register → Create Ride → View Bookings
- [ ] Test payment verification works correctly
- [ ] Test booking cancellation and refund flow

## Phase 8: Production Preparation

### Security
- [ ] Review all environment variables
- [ ] Ensure `.env` is in `.gitignore`
- [ ] Use HTTPS in production
- [ ] Implement CORS properly
- [ ] Add input sanitization
- [ ] Review SQL injection prevention
- [ ] Secure JWT secret (use strong random string)

### Deployment
- [ ] Choose hosting platform (Railway, Render, AWS, etc.)
- [ ] Set up production database
- [ ] Configure environment variables on hosting platform
- [ ] Deploy backend API
- [ ] Update React Native app API URL to production
- [ ] Test production deployment

### Monitoring
- [ ] Set up error logging (Sentry, LogRocket, etc.)
- [ ] Add API request logging
- [ ] Monitor database performance
- [ ] Set up alerts for critical errors

## Phase 9: Advanced Features (Optional)

### Real-time Updates
- [ ] Set up WebSocket or Socket.io
- [ ] Implement real-time ride status updates
- [ ] Add push notifications for bookings

### Additional Features
- [ ] User ratings and reviews
- [ ] Ride cancellation and refunds
- [ ] Driver verification
- [ ] Ride history
- [ ] Favorite routes
- [ ] Ride sharing (multiple passengers)

## Notes & Tips

- **Start Small**: Get basic search and booking working first, then add payments
- **Test on Testnets**: Always test Web3 features on testnets (Polygon Mumbai, Base Sepolia) before mainnet
- **Use Environment Variables**: Never hardcode API keys, private keys, or secrets
- **Error Handling**: Always handle errors gracefully and show user-friendly messages
- **Loading States**: Show loading indicators during API calls
- **Validation**: Validate all inputs on both frontend and backend

## Resources

- Main Guide: `BACKEND_WEB3_SETUP_GUIDE.md`
- Code Templates: `backend/QUICK_START_TEMPLATES.md`
- Express.js Docs: https://expressjs.com/
- Ethers.js Docs: https://docs.ethers.org/
- Polygon Docs: https://docs.polygon.technology/
- Base Docs: https://docs.base.org/

---

**Current Progress**: ___ / 100+ tasks completed

**Last Updated**: [Date]


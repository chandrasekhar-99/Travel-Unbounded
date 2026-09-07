# Travel Unbounded

Travel Unbounded is a responsive full-stack travel website built with **Next.js**. Users can explore travel destinations, submit travel booking enquiries, and interact with an **AI-powered travel chatbot** to receive personalized travel recommendations and day-wise itineraries.

Travel enquiries are validated on both the frontend and backend and securely stored in **MongoDB**. The project also includes a secure **JWT-based admin dashboard** for managing enquiries and viewing analytics.

---

## Live Demo

Visit Travel Unbounded:

https://travel-unbounded-omega-three.vercel.app/

---

## Tech Stack

### Frontend

- Next.js
- React
- JavaScript
- Tailwind CSS
- React Icons
- react-phone-number-input
- Chart.js
- react-chartjs-2

### Backend

- Next.js API Routes
- Node.js
- MongoDB
- Mongoose
- JWT (`jsonwebtoken`)
- bcryptjs

### AI

- Google Gemini API
- Google AI Studio

### Deployment

- Vercel

---

## Features

### Travel Website

- Responsive landing page
- About page
- Contact / booking enquiry page
- Responsive navigation and footer
- Social media icons
- Mobile, tablet, and desktop responsive design
- Travel destination content

---

## AI Travel Chatbot

The website includes a floating AI travel chatbot that helps users plan their trips through a multi-turn conversation.

### Chatbot Features

- Floating chat widget available across the website
- Multi-turn conversation
- Collects important travel preferences such as:
  - Destination type
  - Budget
  - Number of travelers
  - Trip duration
  - Travel interests
  - Travel dates
- Provides personalized travel recommendations
- Generates day-wise travel itineraries
- Displays itinerary results as structured cards
- Typing indicator while waiting for the AI response
- Friendly fallback message for API errors or rate limits
- "Start over" functionality to reset the conversation

### AI Integration

The chatbot uses the **Google Gemini API through Google AI Studio**.

The Gemini API key is accessed only from the server through the Next.js API routes and is never exposed to browser-side JavaScript.

### Chat API

```http
POST /api/chat
```

The endpoint receives the conversation history, sends the request to Gemini server-side, and returns the AI-generated response.

### Itinerary API

```http
POST /api/itineraries
```

The itinerary API handles travel itinerary-related requests.

---

## Booking Enquiry Form

Users can submit:

- Full name
- Contact number
- Email address
- Date of travel
- Number of people
- Hotel category
- Number of children

---

## Form Validation

Client-side validation includes:

- Required field validation
- Email format validation
- Phone number validation
- Travel date validation
- Number of people validation
- Number of children validation
- Hotel category validation

Server-side validation is also implemented so that requests cannot rely only on frontend validation.

---

## Enquiry Management

Travel enquiries are securely stored in MongoDB using Mongoose.

The admin dashboard provides:

- View all enquiries
- Search by customer name
- Search by email
- Filter by enquiry status
- Update enquiry status
- View customer information
- View travel information
- View enquiry creation date

### Enquiry Statuses

Each enquiry can have one of the following statuses:

- New
- Contacted
- Converted
- Closed

---

# Admin Dashboard

The project includes a secure admin dashboard for managing travel enquiries and viewing enquiry analytics.

## Admin Login

Admin login is available at:

```text
/admin/login
```

The admin dashboard is protected using **JWT authentication**.

After successful login, the authentication token is stored securely using an **httpOnly cookie**.

Protected admin pages and API routes verify authentication before allowing access.

---

## Admin Test Credentials

The following seeded credentials are provided for evaluation:

```text
Email: admin@gmail.com
Password: TravelAdmin@123
```

Admin login:

```text
/admin/login
```

---

### Admin Routes

- `/admin/login` — Admin login page
- `/admin/enquiries` — Manage customer enquiries
- `/admin/analytics` — View enquiry analytics

### Admin Login

```text
/admin/login
```

Used by administrators to authenticate.

### Admin Enquiries

```text
/admin/dashboard/enquiries
```

Provides enquiry management functionality.

### Admin Analytics

```text
/admin/dashboard/analytics
```

Provides visual analytics for travel enquiries.

---

## Admin Enquiries

The admin enquiries page is available at:

```text
/admin/dashboard/enquiries
```

The page provides:

- Total enquiries
- Customer name
- Email
- Phone number
- Travel date
- Number of people
- Hotel category
- Enquiry status
- Created date
- Search functionality
- Status filtering
- Status updates

---

## Analytics Dashboard

The admin dashboard includes an analytics page:

```text
/admin/dashboard/analytics
```

The analytics dashboard provides a visual overview of enquiry data.

### Analytics include

- Enquiries over time
- Breakdown of enquiries by status
- New enquiries
- Contacted enquiries
- Converted enquiries
- Closed enquiries

Charts are rendered using **Recharts**.

The analytics data is generated from the enquiry records stored in MongoDB.

---

# Frontend Routes

The current frontend routes are:

| Route                        | Description                    |
| ---------------------------- | ------------------------------ |
| `/`                          | Home page                      |
| `/about`                     | About page                     |
| `/contact`                   | Contact / booking enquiry page |
| `/admin/login`               | Admin login                    |
| `/admin/dashboard/enquiries` | Admin enquiry management       |
| `/admin/dashboard/analytics` | Admin enquiry analytics        |

### Public Routes

```text
/
 /about
 /contact
```

### Admin Routes

```text
/admin/login
/admin/dashboard/enquiries
/admin/dashboard/analytics
```

> Note: `(website)` is a Next.js route group and does not appear in the URL.

---

## Admin Routes

### Admin Login

```text
/admin/login
```

Used by administrators to authenticate.

### Admin Enquiries

```text
/admin/dashboard/enquiries
```

Provides enquiry management functionality, including searching, filtering, viewing, and updating enquiry status.

### Admin Analytics

```text
/admin/dashboard/analytics
```

Provides visual analytics for travel enquiries.

---

# API Routes

The current backend API routes are:

```text
/api/admin/enquiries
/api/admin/enquiries/:id
/api/auth/login
/api/auth/logout
/api/chat
/api/itineraries
```

---

## Create Enquiry

```http
POST /api/enquiries
```

Creates a new travel enquiry and stores it in MongoDB.

Example request:

```json
{
  "fullName": "John Doe",
  "countryCode": "+91",
  "contactNumber": "+919876543210",
  "email": "john@example.com",
  "dateOfTravel": "2026-12-20",
  "numberOfPeople": 2,
  "hotelCategory": "Deluxe",
  "numberOfChildren": 1
}
```

Successful response:

```json
{
  "success": true,
  "message": "Thank you! Our travel expert will contact you within 24 hours.",
  "enquiry": {}
}
```

---

## Get Admin Enquiries

```http
GET /api/admin/enquiries
```

Returns travel enquiries for the authenticated administrator.

This endpoint is protected and requires admin authentication.

---

## Update Enquiry

```http
PATCH /api/admin/enquiries/:id
```

Updates the status or supported fields of an enquiry.

Example:

```http
PATCH /api/admin/enquiries/ENQUIRY_ID
```

Supported enquiry statuses:

```text
New
Contacted
Converted
Closed
```

---

## AI Chat

```http
POST /api/chat
```

Processes the chatbot conversation and returns an AI-generated travel response.

The Gemini API key is accessed server-side.

---

## Itinerary API

### Save Itinerary

```http
POST /api/itineraries
```

Saves a generated travel itinerary to MongoDB.

### Get Itineraries

```http
GET /api/itineraries
```

Returns saved travel itineraries from MongoDB, sorted by creation date with the newest itineraries first.


---

## Authentication APIs

### Admin Login

```http
POST /api/auth/login
```

Authenticates an administrator and creates the authenticated session using a secure JWT cookie.

### Admin Logout

```http
POST /api/auth/logout
```

Logs out the administrator and clears the authentication cookie.

---

# Authentication & Security

Admin authentication uses:

- `jsonwebtoken`
- `bcryptjs`
- JWT stored in an httpOnly cookie
- Server-side authentication checks
- Protected admin pages
- Protected admin API routes
- Seeded admin account with a bcrypt-hashed password

The admin password is never stored as plain text in the database.

The Gemini API key and other sensitive credentials are only accessed server-side.

---

# Environment Variables

Create a `.env` file in the root directory for local development.

Required environment variables include:

| Variable | Description | Required |
|---|---|---|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret used to sign and verify JWT tokens | Yes |
| `GEMINI_API_KEY` | Google Gemini API key used by the chatbot | Yes |

Example:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

For production deployment, configure these variables in the Vercel project environment settings.

---

## `.env.example`

A `.env.example` file is included in the repository with placeholder values:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

**Never put real credentials or API keys inside `.env.example`.**

---

# Setup / Installation

## 1. Clone the repository

```bash
git clone https://github.com/chandrasekhar-99/Travel-Unbounded.git
```

## 2. Navigate to the project directory

```bash
cd Travel-Unbounded
```

## 3. Install dependencies

```bash
npm install
```

## 4. Configure environment variables

Create a `.env` file in the root directory:

```text
.env
```

Add the required environment variables:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

## 5. Start the development server

```bash
npm run dev
```

Open the application:

```text
http://localhost:3000
```

---

# Local Frontend URLs

After running the development server:

```text
http://localhost:3000/
http://localhost:3000/about
http://localhost:3000/contact

http://localhost:3000/admin/login
http://localhost:3000/admin/dashboard
http://localhost:3000/admin/dashboard/enquiries
http://localhost:3000/admin/dashboard/analytics
```

---

# Local API URLs

```text
http://localhost:3000/api/enquiries
http://localhost:3000/api/admin/enquiries
http://localhost:3000/api/admin/enquiries/:id

http://localhost:3000/api/auth/login
http://localhost:3000/api/auth/logout

http://localhost:3000/api/chat
http://localhost:3000/api/itineraries
```

---

# Error Handling

The application uses appropriate HTTP status codes for different situations.

Examples:

- `200` — Request successful
- `201` — Enquiry created successfully
- `400` — Invalid or missing input
- `401` — Authentication required / invalid authentication
- `403` — Access denied
- `404` — Resource not found
- `429` — Rate limit / excessive requests
- `500` — Server/database/API error

The frontend displays clear success and error messages instead of relying on browser `alert()` messages.

The chatbot also provides a friendly fallback response when the AI service is temporarily unavailable or rate-limited.

---

# Form UX

The booking enquiry form includes:

- Client-side validation
- Server-side validation
- Phone number validation
- Email validation
- Future travel date validation
- Loading state while submitting
- Success confirmation message
- Clear error feedback
- Form reset after successful submission

Example success message:

> Thank you! Our travel expert will contact you within 24 hours.

---

# Database

The application uses **MongoDB** with **Mongoose**.

The MongoDB connection is managed through:

```text
src/lib/mongodb.js
```

A cached database connection is used to avoid creating unnecessary MongoDB connections during development and server execution.

The database stores travel enquiries and other application data required by the project.

---

# Deployment

This project is deployed using **Vercel**.

## Deploying to Vercel

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Configure the required environment variables.
4. Deploy the project.
5. Verify the production application.

Required production environment variables:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

Make sure the MongoDB database allows connections from the deployed application.

---

# Production Verification

After deployment, verify:

- Website loads correctly
- Contact/enquiry form works
- Enquiries are stored in MongoDB
- Chatbot returns real AI responses
- Itinerary generation works
- Admin pages are protected
- Admin login works
- Enquiries load correctly
- Enquiry status updates persist
- Analytics display correctly
- Admin logout works

---

# API Security

Protected admin API routes require valid authentication.

The application does not expose:

- MongoDB credentials
- Gemini API keys
- JWT secrets
- Admin password hashes

Sensitive values are stored in environment variables.

Environment files are excluded through `.gitignore`:

```gitignore
.env*
```

Never commit:

- MongoDB passwords
- MongoDB connection strings containing credentials
- Gemini API keys
- JWT secrets
- Authentication secrets
- Other private environment variables

---

# Assumptions & Limitations

## AI Chatbot

The chatbot depends on the availability and rate limits of the configured Gemini API.

If the AI service is unavailable or rate-limited, the application displays a friendly fallback message.

## Booking System

The current implementation collects travel enquiries rather than completing an actual travel booking or payment.

After receiving an enquiry, a travel expert can contact the customer and continue the booking process.

## Payment

Online payment functionality is not implemented because it is outside the current project scope.

## Email Notifications

Automatic email notifications to admins or customers are not currently implemented.

The enquiry is stored successfully in MongoDB and can be managed through the admin dashboard.

---

# Future Improvements

Possible future improvements include:

- Email notifications
- WhatsApp notifications
- Booking confirmation
- Online payments
- Customer dashboard
- Role-based admin access
- Advanced destination management
- Enquiry pagination
- Export enquiries
- Saved AI itineraries
- Copy/download generated itineraries
- More advanced travel recommendation features

---

# Available Scripts

## Development

```bash
npm run dev
```

Runs the application in development mode.

## Production Build

```bash
npm run build
```

Creates an optimized production build.

## Start Production Server

```bash
npm start
```

Starts the production server after building the application.

## Lint

```bash
npm run lint
```

Runs ESLint to check the codebase for linting issues.

---

# GitHub Repository

GitHub:

https://github.com/chandrasekhar-99/Travel-Unbounded

---

# Live Application

Live Website:

https://travel-unbounded-omega-three.vercel.app/

Admin Login:

https://travel-unbounded-omega-three.vercel.app/admin/login

Admin Dashboard:

https://travel-unbounded-omega-three.vercel.app/admin/dashboard

Admin Enquiries:

https://travel-unbounded-omega-three.vercel.app/admin/dashboard/enquiries

Admin Analytics:

https://travel-unbounded-omega-three.vercel.app/admin/dashboard/analytics

---

# Evaluation Credentials

For evaluator access:

```text
Email: admin@gmail.com
Password: TravelAdmin@123
```

---

# License

This project is developed as a travel website project for demonstration, learning, and assignment purposes.

---

# Author

**Chandrasekhar-99**

GitHub:

https://github.com/chandrasekhar-99/Travel-Unbounded
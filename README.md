# Travel Unbounded

Travel Unbounded is a responsive travel website built with **Next.js**. Users can explore travel destinations and submit travel booking enquiries through a validated enquiry form.

Submitted enquiries are validated on both the frontend and backend and securely stored in **MongoDB**. An admin enquiries page is also available to view submitted enquiries.

---

## Live Demo

[Visit Travel Unbounded](https://your-actual-vercel-url.vercel.app)

## Tech Stack

### Frontend

- Next.js
- React
- JavaScript
- Tailwind CSS
- React Icons
- react-phone-number-input

### Backend

- Next.js API Routes
- Node.js
- MongoDB
- Mongoose

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

### Booking Enquiry Form

Users can submit:

- Full name
- Contact number
- Email address
- Date of travel
- Number of people
- Hotel category
- Number of children

### Form Validation

Client-side validation includes:

- Required field validation
- Email format validation
- Phone number validation
- Travel date validation
- Number of people validation
- Number of children validation
- Hotel category validation

Server-side validation is also implemented so that requests cannot rely only on frontend validation.

### Enquiry API

The application provides API routes for:

- Creating enquiries
- Fetching submitted enquiries

Submitted enquiries are stored in MongoDB using Mongoose.

### Admin Enquiries

A simple admin page is available at:

```text
/admin/enquiries
```

The page displays:

- Total enquiries
- Total travellers
- Total children
- Upcoming trips
- Customer information
- Contact information
- Travel date
- Number of travellers
- Hotel category
- Submission date and time

---

## Setup / Installation

### 1. Clone the repository

```bash
git clone https://github.com/chandrasekhar-99/Travel-Unbounded.git
```

### 2. Navigate to the project directory

```bash
cd Travel-Unbounded
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the root directory.

```text
.env
```

Add your MongoDB connection string:

```env
MONGODB_URI=your_mongodb_connection_string
```

The actual MongoDB credentials should be stored only in .env and must not be committed to GitHub.

A `.env.example` file is included in the repository with placeholder values so developers know which environment variables are required.

Example:

```env
MONGODB_URI=your_mongodb_connection_string
```

**Do not put real database credentials in `.env.example` or commit them to GitHub.**

### 5. Start the development server

```bash
npm run dev
```

Open the application:

```text
http://localhost:3000
```

---

## Environment Variables

The application requires the following environment variable:

| Variable | Description | Required |
|---|---|---|
| `MONGODB_URI` | MongoDB connection string used by the Next.js API routes | Yes |

For local development:

```env
MONGODB_URI=your_mongodb_connection_string
```

For production deployment, configure the same variable in the Vercel project environment settings.

---

## API Routes

### Create Enquiry

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

### Get Enquiries

```http
GET /api/enquiries
```

Returns stored travel enquiries.

This endpoint is used by the admin enquiries page.

---

## Error Handling

The API uses appropriate HTTP status codes for different situations.

Examples:

- `201` — Enquiry created successfully
- `400` — Invalid or missing input
- `500` — Server/database error

The frontend displays clear success and error messages instead of using browser `alert()` messages.

---

## Form UX

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

## Environment & Security

Sensitive credentials are not committed to GitHub.

The project uses a `.env` file for local environment variables:

```text
.env
```

for local environment variables.

Environment files are excluded through `.gitignore`:

```gitignore
.env*
```

The repository contains:

```text
.env.example
```

with placeholder values only.

Never commit:

- MongoDB passwords
- MongoDB connection strings containing credentials
- API keys
- Authentication secrets
- Other private environment variables

---

## Database

The application uses **MongoDB** with **Mongoose**.

The MongoDB connection is managed through:

```text
src/lib/mongodb.js
```

A cached database connection is used to avoid creating unnecessary MongoDB connections during development and server execution.

---

## Admin Enquiries

The admin enquiries page can be accessed at:

```text
http://localhost:3000/admin/enquiries
```

This page provides a simple interface for reviewing submitted enquiries.

### Important

The current admin page is intended as a simple demonstration/admin viewing page.

Authentication and authorization for protecting the admin route are not currently implemented.

For a production application, the admin page should be protected with proper authentication and authorization.

---

## Deployment

This project can be deployed using **Vercel**.

### Deploying to Vercel

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Configure the environment variable:

```env
MONGODB_URI=your_mongodb_connection_string
```

### 4. Deploy the project

Make sure the MongoDB database allows connections from your deployed application.

For local development, continue using:

```text
.env
```

Do not commit .env to GitHub. The .env file contains sensitive database credentials.

---

## Assumptions & Limitations

### Admin Authentication

The admin enquiries page does not currently have authentication or role-based authorization.

This was kept simple because the primary requirement is to demonstrate storing and viewing travel enquiries.

For production usage, authentication should be added before exposing the admin page publicly.

### Booking System

The current implementation collects travel enquiries rather than completing an actual travel booking or payment.

After receiving an enquiry, a travel expert can contact the customer and continue the booking process.

### Payment

Online payment functionality is not implemented because it is outside the current project scope.

### Email Notifications

Automatic email notifications to admins or customers are not currently implemented.

The enquiry is stored successfully in MongoDB and can be viewed through the admin page.

### Advanced Admin Features

The current admin page does not include:

- Pagination
- Search
- Filtering
- Editing enquiries
- Deleting enquiries
- Exporting enquiries
- Admin authentication

These can be added as future enhancements.

---

## Future Improvements

Possible future improvements include:

- Admin authentication
- Role-based access control
- Enquiry search and filtering
- Pagination
- Enquiry status management
- Email notifications
- WhatsApp notifications
- Booking confirmation
- Online payments
- Customer dashboard
- Travel package management
- Analytics dashboard

---

## Available Scripts

### Development

```bash
npm run dev
```

Runs the application in development mode.

### Production Build

```bash
npm run build
```

Creates an optimized production build.

### Start Production Server

```bash
npm start
```

Starts the production server after building the application.

### Lint

```bash
npm run lint
```

Runs ESLint to check the codebase for linting issues.

---

## License

This project is developed as a travel website project for demonstration and learning purposes.

---

## Author

**Chandrasekhar-99**

GitHub:

https://github.com/chandrasekhar-99
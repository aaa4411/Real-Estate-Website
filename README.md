# DreamHome - Real Estate Website

A modern, responsive real estate website that showcases property listings and helps potential buyers find their dream homes.

## Features

- User authentication with Supabase
- Property listings with search and filtering
- Interactive property map
- Detailed property pages
- Save favorite properties
- Responsive design for all devices

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone <repository-url>
   cd dreamhome
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Set up environment variables
   - Create a `.env` file in the root directory
   - Add your Supabase credentials:
     ```
     VITE_SUPABASE_URL=https://your-project-url.supabase.co
     VITE_SUPABASE_ANON_KEY=your-anon-key
     ```

4. Start the development server
   ```
   npm run dev
   ```

## Setting Up Supabase

1. Create a new project at [Supabase](https://supabase.com)
2. Get your project URL and anon key from the project settings > API
3. Set up the database schema using the SQL in `supabase/migrations/20240101000000_initial_schema.sql`
4. Configure authentication in the Supabase dashboard:
   - Enable Email/Password sign-in
   - Set up email templates for verification and password reset

## Authentication Features

- Sign up with email and password
- Email verification
- Sign in
- Password reset
- User profile management
- Save favorite properties

## Project Structure

- `/src/components` - React components
- `/src/contexts` - Context providers (Auth, etc.)
- `/src/hooks` - Custom hooks
- `/src/lib` - Utility functions and libraries
- `/src/pages` - Page components
- `/src/data` - Mock data for development

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- Supabase (Authentication & Database)
- React Router
- Shadcn UI Components

## License

This project is licensed under the MIT License.

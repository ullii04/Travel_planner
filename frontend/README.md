# EuroTour - Travel Destination Guide

A modern Angular-based web application for discovering and booking travel destinations worldwide.

## Features

✅ **Destination Exploration** - Browse amazing destinations from around the world
✅ **Advanced Search** - Search and filter destinations by region and keywords
✅ **Trip Planning** - Create and manage your travel itineraries
✅ **Authentication** - Secure login system with JWT tokens
✅ **User Profiles** - View and manage your profile and trips
✅ **Responsive Design** - Works seamlessly on desktop and mobile devices
✅ **Ratings & Reviews** - View destination ratings and attractions

## Tech Stack

- **Frontend Framework**: Angular 17
- **Language**: TypeScript
- **Styling**: CSS3 with responsive design
- **HTTP Client**: HttpClientModule
- **Forms**: ReactiveFormsModule & FormsModule
- **State Management**: RxJS Observables
- **Authentication**: JWT with HTTP Interceptor
- **Routing**: Angular Router with 6+ routes

## Project Structure

```
eurotour/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── navbar/
│   │   │   └── destination-card/
│   │   ├── pages/
│   │   │   ├── home/
│   │   │   ├── destinations/
│   │   │   ├── destination-detail/
│   │   │   ├── login/
│   │   │   ├── my-trips/
│   │   │   └── profile/
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   └── destination.service.ts
│   │   ├── interceptors/
│   │   │   └── jwt.interceptor.ts
│   │   ├── models/
│   │   │   └── index.ts
│   │   ├── app.module.ts
│   │   ├── app-routing.module.ts
│   │   └── app.component.ts
│   ├── environments/
│   ├── styles.css
│   ├── main.ts
│   └── index.html
├── angular.json
├── tsconfig.json
├── package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)
- Angular CLI (v17)

### Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd eurotour
```

2. **Install dependencies**
```bash
npm install
```

3. **Update API URLs**
   - Modify `src/environments/environment.ts` for development
   - Modify `src/environments/environment.prod.ts` for production

4. **Start the development server**
```bash
ng serve
# or
npm start
```

5. **Navigate to the application**
   Open your browser and go to `http://localhost:4200/`

## Building for Production

```bash
ng build --configuration production
# or
npm run build
```

## Running Tests

```bash
ng test
# or
npm test
```

## API Integration

The application communicates with a backend API. Update the following services with your API endpoints:

### AuthService (`src/app/services/auth.service.ts`)
- **POST** `/api/auth/login` - User login
- **GET** `/api/auth/logout` - User logout

### DestinationService (`src/app/services/destination.service.ts`)
- **GET** `/api/destinations` - Get all destinations
- **GET** `/api/destinations/:id` - Get destination details
- **GET** `/api/destinations/regions` - Get available regions
- **POST** `/api/trips` - Create a new trip
- **GET** `/api/trips` - Get user's trips

## Components Overview

### Pages
- **Home**: Landing page with feature highlights
- **Destinations**: Browse all destinations with search and filter
- **Destination Detail**: View detailed info and create trip
- **Login**: Authentication page
- **My Trips**: View and manage user trips
- **Profile**: User profile information

### Components
- **Navbar**: Navigation bar with authentication status
- **Destination Card**: Reusable destination display component

## Forms & Validation

### Login Form (Reactive)
- Email validation (required, format)
- Password validation (required, min length)
- Error message display
- Loading state handling

### Trip Creation Form (Reactive)
- Start date validation
- End date validation
- Error handling
- Success feedback

### Search Form (Reactive)
- Search term input
- Region filter dropdown
- Dynamic search triggering

## Authentication

The application uses JWT-based authentication:

1. **Login**: User credentials sent to backend
2. **Token Storage**: JWT token stored in localStorage
3. **HTTP Interceptor**: Automatically adds token to API requests
4. **Token Validation**: 401 responses trigger logout
5. **Protected Routes**: Components check authentication status

## Error Handling

- API errors displayed to users with descriptive messages
- Form validation errors shown inline
- Network errors caught and handled gracefully
- Unauthorized access redirects to login

## Styling

The application uses a modern gradient-based design with:
- Primary color: `#667eea` (Blue)
- Secondary color: `#764ba2` (Purple)
- Clean, minimalist UI
- Responsive grid layouts
- Smooth transitions and hover effects
- Mobile-first design approach

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## Development Guidelines

### Service Usage
Always inject services vs instance creation:
```typescript
constructor(private authService: AuthService) {}
```

### Observable Handling
Use `async` pipe in templates or `subscribe()` in components:
```typescript
{{ data$ | async }}
```

### Route Navigation
Use `navigateByUrl()` or `navigate()`:
```typescript
this.router.navigate(['/destinations']);
```

### Form Controls
Use 'Reactive Forms' for complex forms:
```typescript
this.form = this.fb.group({
  field: ['', Validators.required]
});
```

## Troubleshooting

### Port Already in Use
```bash
ng serve --port 4300
```

### Clear Cache
```bash
rm -rf node_modules dist
npm install
```

### Module Not Found
```bash
npm install
```

## Future Enhancements

- [ ] User reviews and ratings
- [ ] Photo gallery for destinations
- [ ] Booking system integration
- [ ] Payment processing
- [ ] Email notifications
- [ ] Dark mode support
- [ ] Multi-language support
- [ ] Social sharing features

## License

MIT License - feel free to use this project for personal and commercial purposes

## Support

For issues and questions, please open an issue in the repository.

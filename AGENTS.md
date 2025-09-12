# AGENTS - Application Structure Guide

This document explains the structure of this React Router v7 + Vite + shadcn/ui + Tailwind CSS application and how to work with it effectively.

## Application Architecture

This is a **Single Page Application (SPA)** built with modern React tooling:

- **React Router v7** - Client-side routing with file-based routing
- **Vite** - Fast build tool and dev server
- **shadcn/ui** - Pre-built, accessible UI components
- **Tailwind CSS v4** - Utility-first CSS framework
- **TypeScript** - Type safety throughout the application

## Why SPA Mode?

**Important**: This application runs in SPA mode (`ssr: false` in `react-router.config.ts`) because:

1. **Easel Platform Limitation**: Easel currently cannot handle Server-Side Rendering (SSR) properly
2. **Client-Side Rendering**: All rendering happens in the browser, making it compatible with Easel's hosting environment
3. **Static Asset Serving**: The built application serves static files that Easel can host without server-side processing

## Project Structure

```
app/
├── components/
│   └── ui/                 # shadcn/ui components
│       └── button.tsx      # Example UI component
├── lib/
│   └── utils.ts           # Utility functions (cn helper for Tailwind)
├── routes/
│   └── home.tsx           # Home page route
├── app.css               # Global styles and Tailwind imports
├── root.tsx              # Root layout component
└── routes.ts             # Route configuration

# Configuration files
├── react-router.config.ts # React Router configuration (SPA mode)
├── vite.config.ts        # Vite configuration
├── components.json       # shadcn/ui configuration
└── package.json          # Dependencies and scripts
```

## How to Add Routes

### 1. Create a Route Component

Create a new file in the `app/routes/` directory:

```typescript
// app/routes/about.tsx
import type { Route } from "./+types/about";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About - My App" },
    { name: "description", content: "Learn more about our application" },
  ];
}

export default function About() {
  return (
    <div>
      <h1>About Us</h1>
      <p>This is the about page.</p>
    </div>
  );
}
```

### 2. Register the Route

Add your route to `app/routes.ts`:

```typescript
import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("./routes/home.tsx"),
  route("about", "./routes/about.tsx"), // Add your new route here
  
  // More examples:
  // route("contact", "./routes/contact.tsx"),
  // route("products/:id", "./routes/product-detail.tsx"),
] satisfies RouteConfig;
```

### 3. Route Patterns

React Router v7 supports various route patterns:

```typescript
export default [
  // Simple routes
  route("about", "./routes/about.tsx"),
  route("contact", "./routes/contact.tsx"),
  
  // Dynamic routes with parameters
  route("users/:id", "./routes/user-detail.tsx"),
  route("posts/:slug", "./routes/post-detail.tsx"),
  
  // Nested routes with layout
  layout("./routes/dashboard/layout.tsx", [
    route("dashboard", "./routes/dashboard/index.tsx"),
    route("dashboard/settings", "./routes/dashboard/settings.tsx"),
    route("dashboard/profile", "./routes/dashboard/profile.tsx"),
  ]),
  
  // Route groups with prefix
  ...prefix("api", [
    route("users", "./routes/api/users.tsx"),
    route("posts", "./routes/api/posts.tsx"),
  ]),
] satisfies RouteConfig;
```

### 4. Navigation

Use React Router's `Link` component for navigation:

```typescript
import { Link } from "react-router";

export default function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
}
```

## Component Structure

### UI Components (shadcn/ui)

- Located in `app/components/ui/`
- Follow shadcn/ui patterns with `cva` for variant styling
- Use the `cn` utility for conditional classes
- Example: `app/components/ui/button.tsx`

### Page Components

- Located in `app/routes/`
- Export a default component function
- Can export `meta` function for SEO metadata
- Can export `loader` function for data fetching (though limited in SPA mode)

## Styling

### Tailwind CSS v4

**Important**: This project uses Tailwind CSS v4, which has a different configuration approach than v3:

- **Configuration in CSS**: All Tailwind configuration happens in `app/app.css` using CSS-based configuration
- **No `tailwind.config.js`**: Unlike v3, there's no separate config file
- **Theme Configuration**: Customize colors, fonts, and other design tokens using `@theme` blocks in `app/app.css`
- **Custom Variants**: Define custom variants using `@custom-variant` in `app/app.css`
- **Global Styles**: Import Tailwind and define global styles in `app/app.css`
- **Dark Mode**: Configured using CSS custom properties and the `.dark` class

### Customizing Tailwind CSS v4

To customize Tailwind CSS v4, edit the `app/app.css` file:

```css
@import "tailwindcss";

/* Define custom theme values */
@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --color-brand: #3b82f6;
  --spacing-custom: 2rem;
}

/* Define custom variants */
@custom-variant dark (&:is(.dark *));
@custom-variant hover-focus (&:hover:focus);

/* Define custom utilities */
@utility custom-shadow {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

/* Global styles and CSS custom properties */
:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  /* ... more custom properties */
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... dark mode custom properties */
}
```

### Component Styling

```typescript
// Using shadcn/ui components
<Button variant="outline" size="lg">Click me</Button>

// Using Tailwind utilities
<div className="flex items-center justify-between p-4 bg-background">
  <h1 className="text-2xl font-bold">Title</h1>
</div>
```

## Development Workflow

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Type checking
npm run typecheck

# Start production server (for testing)
npm run start
```

### Adding New Dependencies

```bash
# Add a new package
npm install package-name

# Add a dev dependency
npm install -D package-name
```

## Best Practices

1. **File-based Routing**: Keep route components in `app/routes/`
2. **Component Organization**: Group related components in subdirectories
3. **Type Safety**: Use TypeScript types for route parameters and props
4. **SEO**: Always export `meta` functions for proper page titles and descriptions
5. **Accessibility**: Use shadcn/ui components which are built with accessibility in mind
6. **Performance**: Keep components lightweight since everything runs client-side

## Common Patterns

### Route with Parameters

```typescript
// app/routes/user.tsx
import type { Route } from "./+types/user";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `User ${params.id} - My App` },
  ];
}

export default function User({ params }: Route.ComponentProps) {
  return <div>User ID: {params.id}</div>;
}
```

### Layout with Nested Routes

```typescript
// app/routes/dashboard/layout.tsx
export default function DashboardLayout() {
  return (
    <div className="flex">
      <aside className="w-64">Sidebar</aside>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
```

This structure provides a solid foundation for building modern React applications that work seamlessly with the Easel platform.

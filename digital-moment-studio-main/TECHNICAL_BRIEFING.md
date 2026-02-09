# Technical Briefing: Digital Moment Studio

## 1. Project Overview
**Digital Moment Studio** is a production-ready web application designed to sell and deliver personalized digital experiences, specifically starting with a "Valentine Ask" product.
- **Purpose**: To allow users to purchase a high-quality, animated, and interactive digital "proposal" or "ask" experience to send to a partner.
- **Problem Solved**: Replaces generic text/card proposals with a premium, guided digital narrative.
- **Target Audience**: End users (buyers), Recipients (viewers of the experience), and internal Admins.
- **Status**: Production-ready code (MVP+ level) with commercial intent (pricing, orders, payments).

## 2. Tech Stack & Architecture
**Type**: Client-Side Single Page Application (SPA).
**Hosting**: Likely static hosting (Vite build) + backend services.

### Technologies
- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Shadcn UI (Radix Primitives)
- **State Management**:
  - Global Server State: `@tanstack/react-query`
  - Local Auth State: `React Context` (`AdminAuthContext`)
  - Form State: `React` local state
- **Routing**: `react-router-dom`
- **Backend/Database**: Supabase (PostgreSQL + Edge Functions)
- **Icons**: Lucide React
- **Utils**: `date-fns`, `clsx`, `tailwind-merge`

### Architecture
- **API-First / BaaS**: The frontend connects directly to Supabase for data persistence.
- **Modular Component Design**: Heavy use of reusable UI components (Shadcn) separated from business logic pages.

## 2.5 Design System & Visual Language
**Approach**: Utility-first (Tailwind) + Component Library (Shadcn UI).

### Core Design Tokens
- **Typography**:
  - Headings: `DM Serif Display` (Premium, Editorial feel)
  - Body: `DM Sans` (Clean, Modern)
- **Colors**:
  - Semantic variables defined in `index.css` (CSS Custom Properties).
  - **Primary**: Dark (`0 0% 8%`) in light mode / Light (`40 20% 95%`) in dark mode.
  - **Accent**: Warm/Romantic Orange-Red (`15 70% 50%` - HSL).
  - **Background**: Soft warmth (`40 20% 98%`) instead of stark white.
- **Theming**:
  - Native Dark Mode support via `.dark` class and CSS variables.
  - Explicit `radius` token for border-radius consistency (`0.25rem`).

### UI Patterns
- **Components**: Extensive use of Shadcn UI (Accordion, Button, Card, Dialog, Sheet, etc.).
- **Animations**: `tailwindcss-animate` used for `fade-up`, `fade-in`, and accordion transitions.
- **Layout**: Container-based responsive design with standard breakpoints.

## 3. Folder & File Structure
- **`src/`**: Root source.
  - **`App.tsx`**: Main application shell, providers, and routing.
  - **`main.tsx`**: Entry point, mounts React to DOM.
  - **`pages/`**: Application views (routes).
    - `admin/`: Protected admin routes (`AdminLogin`, `AdminDashboard`).
    - Public pages: `Index`, `ValentineAsk`, `Order`, `Success`.
  - **`components/ui/`**: 40+ atomic UI components (Shadcn).
  - **`contexts/`**: `AdminAuthContext` (State).
  - **`hooks/`**: Custom hooks (`use-toast`, `useSEO`).
  - **`integrations/supabase/`**: Database types and client initialization.
  - **`lib/`**: Business logic helpers (`order.ts`, `referral.ts`, `utils.ts`).

## 4. Application Flow
1.  **Initialization**: `main.tsx` -> `App.tsx` initializes `QueryClient`, `TooltipProvider`, and `AdminAuthProvider`.
2.  **Routing**: `BrowserRouter` handles navigation.
    - Public flows: Landing (`/`) -> Product (`/valentine-ask`) -> Order (`/order`) -> Success.
    - Admin flows: `/admin/login` -> `/admin` (Dashboard).
3.  **Data Flow**:
    - **SEO**: `useSEO` hook injects meta tags/schema on page load.
    - **Orders**: User fills form -> `createOrder` -> Supabase Edge Function (`submit-order`).

## 5. Key Features & Capabilities
### A. Product Sales Flow
- **Valentine Ask Page**: High-fidelity marketing page.
- **Order Form**: Captures Name, Email, WhatsApp.
- **Validation**: Zod schema validation in `lib/order.ts`.
- **Referral Tracking**: Captures `?ref=` code, stores in `localStorage`, attaches to order.

### B. Admin Dashboard (`/admin`)
- **Authentication**: Simple client-side password query.
- **Order Management**: View all orders, separate by status (Pending/Confirmed).
- **Actions**: "Confirm Payment" button updates order status.
- **Referral View**: Tracks marketer performance (orders generated, commission).

### C. Digital Fulfillment
- **ValentineCard**: (Implied/Partial) The actual digital experience sent to recipients.

## 6. State, Data & Business Logic
- **Business Logic**:
  - **Referrals**: `lib/referral.ts` checks URL params on entry.
  - **Orders**: `lib/order.ts` contains product constants (`PRICE = 8000`), bank details, and formatting.
- **Data Persistence**:
  - **Supabase**: Primary database for `orders` and `referral_codes`.
  - **LocalStorage**: Used for Theme preference, Admin Session, and Referral codes.

## 7. Integrations
- **Supabase**:
  - **Database**: `orders` table, `referral_codes` table.
  - **Edge Functions**: `submit-order`, `admin-orders` (handles logic securely server-side).
  - **Type Safety**: TypeScript definitions generated in `src/integrations/supabase/types.ts`.

## 8. Configuration & Environment
- **Environment Variables**:
  - `Vite` prefixed variables required:
    - `VITE_SUPABASE_URL`
    - `VITE_SUPABASE_PUBLISHABLE_KEY`
- **Tailwind**: `tailwind.config.ts` extends standard theme with project-specific fonts (`DM Sans/Serif`) and animations.

## 9. Error Handling
- **UI Feedback**: `sonner` and `toaster` used for success/error notifications.
- **Form Errors**: Inline validation messages (Zod/React Hook Form patterns).
- **Route Errors**: `NotFound.tsx` catch-all route.

## 10. Security & Auth
- **Admin Auth**: **WEAK**.
  - Uses a hardcoded password string check in `AdminAuthContext.tsx`.
  - Session is stored in `localStorage`.
  - **Risk**: Anyone with the source code knows the admin password.
- **Data Access**:
  - Relies on Supabase Edge Functions for write operations, which likely bypasses direct client RLS (Row Level Security) issues, but the admin actions are protected only by the weak client-side auth unless the Edge Function verifies a secret.

## 11. Quality & Maintainability
- **Code Quality**: High.
  - Consistent formatting.
  - Strong typing (TypeScript).
  - Component reusability (Shadcn).
- **Testing**: No test files observed (`vitest` is in package.json but no specs seen in `src`).
- **SEO**: Excellent. Dedicated `useSEO` hook and `sitemap.xml` generation.

## 12. Assessment Summary
- **Works Well**: The UI is polished, the order flow is logical, and the component architecture is accessible.
- **Risks**:
  - **Hardcoded Admin Password**: Major security vulnerability for a production app handling financial data (orders).
  - **Payment Verification**: Manual "Confirm Payment" process (no payment gateway integration).
- **Missing**: Automated tests, real payment gateway, secure admin authentication (server-side).

## 13. Questions for Developer
1.  **Security**: Is there a plan to migrate Admin Auth to Supabase Auth to remove the hardcoded password?
2.  **Payments**: Is manual bank transfer the intended long-term payment method, or is a gateway (Paystack/Flutterwave) planned?
3.  **Fulfillment**: Is the "Valentine Ask" experience fully automated after payment confirmation, or does an admin need to manually generate a link?

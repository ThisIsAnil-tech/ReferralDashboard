### Referral Dashboard

A React-based web app for **Go Business** that lets users track their referrals, earnings, and partner activity from a single dashboard.

## What Does This App Do?

A logged-in user can:

- See quick stats like total referrals and total earnings
- View a breakdown by service (active referrals, earnings per service)
- Copy and share their unique referral link and code
- Browse all referrals in a searchable, sortable, paginated table
- Click any referral to see its full details
- Log out securely

## User Flow

1. **Login** — User enters email and password. On success a token is saved in a cookie and they are redirected to the dashboard. On failure an error message appears.
2. **Dashboard** — Shows overview metrics, service summary, share referral section, and the full referrals table.
3. **Referral Details** — Clicking a table row opens a detail page with referral ID, name, service, date, and profit.
4. **404 Page** — Any unknown URL shows a not-found page with a link back to the dashboard.

## Pages and Routes

| Route | Page | Protected |
|-------|------|-----------|
| `/login` | Login | No |
| `/` | Dashboard | Yes |
| `/referral/:id` | Referral Details | Yes |
| `/not-found` | 404 Page | No |
| `*` | Redirects to `/not-found` | No |

## Project Structure

```
src/
├── api/
│   ├── auth.js                  # Sign-in API call
│   └── referrals.js             # Fetch all referrals or one by ID
│
├── components/
│   ├── login/
│   │   └── Login.jsx            # Login page with email and password form
│   ├── dashboard/
│   │   ├── Dashboard.jsx        # Main dashboard, fetches data and passes to children
│   │   ├── OverviewMetrics.jsx  # Metric cards (total referrals, earnings, etc.)
│   │   ├── ServiceSummary.jsx   # Service-level breakdown
│   │   ├── ShareReferral.jsx    # Referral link and code with copy buttons
│   │   ├── ReferralsTable.jsx   # Table with search, sort, and pagination
│   │   ├── ReferralsTableRow.jsx# Single table row
│   │   ├── SearchBar.jsx        # Search input
│   │   ├── SortControl.jsx      # Sort dropdown (newest/oldest)
│   │   └── Pagination.jsx       # Page navigation
│   ├── referral/
│   │   ├── ReferralDetails.jsx  # Full detail view for one referral
│   │   └── ReferralNotFound.jsx # Shown when referral ID does not exist
│   ├── common/
│   │   ├── Navbar.jsx           # Top navigation bar with logo and logout
│   │   ├── Footer.jsx           # Footer with links
│   │   ├── Loader.jsx           # Loading spinner
│   │   └── ProtectedRoute.jsx   # Redirects to login if no auth token
│   └── notfound/
│       └── NotFound.jsx         # 404 page
│
├── styles/
│   ├── globals.css              # Global styles (navbar, footer, loader, 404)
│   ├── Login.modle.css          # Login page styles (CSS Module)
│   ├── Dashboard.module.css     # Dashboard page styles (CSS Module)
│   └── ReferralDetails.module.css # Referral detail page styles (CSS Module)
│
├── utils/
│   ├── cookies.jsx              # Get, set, and remove auth token
│   └── formatters.jsx           # Format dates and currency values
│
├── App.jsx                      # Route definitions
└── main.jsx                     # Entry point
```

## Tech Stack

| Area | Technology |
|------|-----------|
| Framework | React (Create React App) |
| Components | Class components with state and lifecycle methods |
| Routing | React Router v6 |
| Auth | Token stored in cookie via js-cookie |
| Styling | CSS Modules for pages, plain CSS for shared components |
| Pagination | Client-side, 10 items per page |
| Search and Sort | Server-side via API query parameters |

## Getting Started

```bash
npm install
npm start
```

The app runs at `http://localhost:3000`.

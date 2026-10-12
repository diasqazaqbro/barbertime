# BarberTime

Online booking web app for a neighbourhood barbershop in Almaty (demo brand).
A client picks a service, a barber (or "any barber") and a free time slot, confirms with a name and a
Kazakhstan phone number, and manages visits in **My bookings**. No calls and no DMs.

Laboratory Work 4 · Full Stack Development · IITU. The UI follows the Lab 3 UX/UI design (Apple HIG style with a
yellow accent).

## Team · IT1-2315

| Name                | Role                  |
| ------------------- | --------------------- |
| Dias Adilov         | Team lead · Developer |
| Zhangir Isametov    | Developer             |
| Nurmuhammed Zaitin  | Designer              |
| Ilmurat Kassymov    | Designer              |

## Features

- **3-step booking** with a stepper: service → barber or "any barber" → date (next 7 days) and a time-slot grid
  (free / taken / selected).
- **Real availability logic**: a slot is free only if the barber is free for the *whole* service duration
  (a 75-minute combo needs 3 half-hour cells), fits before closing time and isn't already in the past today.
- **"Any barber"** shows the union of everyone's free time and assigns the first free barber on confirm.
- **Re-check on confirm**: if the slot was taken meanwhile (for example in another tab), the user stays on step 3
  with refreshed slots and a clear message instead of an error page.
- **Contact form validation**: name plus a `+7 (7XX) XXX-XX-XX` phone mask that handles paste (`8 701…`) and
  backspace over separators.
- **Persistence** in `localStorage` (wrapped in try/catch, falls back to mock data when storage is blocked).
- **My bookings**: upcoming and past (completed and cancelled) visits, cancellation through a confirmation
  dialog (bottom sheet on phones), "Book again", empty state.
- Services **category filter** stored in the URL (`/services?category=beard`), so filtered views are shareable.
- **Responsive**: sticky frosted navbar on desktop, iOS-style bottom tab bar below 768px, no horizontal scroll at 390px.
- **Light / dark theme**: white by default (as in the design), with a toggle in the navbar. The choice is saved
  in localStorage and applied before first paint, so there is no white flash.
- Semantic colour tokens, 44px touch targets, keyboard and screen-reader friendly controls (`aria-pressed`,
  labelled fields, native `<dialog>`).

## Routes

| Path            | Page           | What's there                                                   |
| --------------- | -------------- | -------------------------------------------------------------- |
| `/`             | Home           | Hero, features, popular services, barbers, how it works, CTA   |
| `/services`     | Services       | Service cards and category filter chips                        |
| `/barbers`      | Barbers        | Barber cards                                                    |
| `/barbers/:id`  | Barber profile | Bio, specialties, reviews, "Book with X"                        |
| `/book`         | Booking        | 3-step wizard, then a success screen. Accepts `?service=&barber=` |
| `/my-bookings`  | My bookings    | Upcoming and past visits, cancel with confirmation              |
| `/contacts`     | Contacts       | Address, hours, phone and email, contact form                   |
| `*`             | 404            | Not-found page                                                  |

## Tech stack

- **React 19** + **TypeScript** (strict) + **Vite**
- **react-router-dom 7**: data router, `ScrollRestoration`
- **CSS Modules** + one global `tokens.css`. No Tailwind and no UI kits
- No backend: mock data plus `localStorage`
- **Feature-Sliced Design**, checked by [Steiger](https://github.com/feature-sliced/steiger), the official FSD linter

## Architecture: Feature-Sliced Design

The code is split into layers. A module may import **only from layers below it**, and every slice exposes a
public API through its `index.ts`. Nobody imports a slice's internal files.

```
app  →  pages  →  widgets  →  features  →  entities  →  shared
```

| Layer      | Responsibility                                     | In this project                                             |
| ---------- | -------------------------------------------------- | ----------------------------------------------------------- |
| `app`      | Entry point, router, global styles, root layout    | `main.tsx`, `router.tsx`, `RootLayout`, `tokens.css`        |
| `pages`    | One slice per route, composes the layers below     | home, services, barbers, barber-profile, booking, my-bookings, contacts, not-found |
| `widgets`  | Large self-contained UI blocks                     | navbar, footer, tab-bar                                     |
| `features` | User actions that bring business value             | book-appointment, cancel-booking, filter-services, send-message, toggle-theme |
| `entities` | Business objects: types, data access, cards        | service, barber, review, booking                            |
| `shared`   | Business-agnostic UI kit, helpers, config          | `ui` (Button, Card, Stepper…), `lib` (phone mask, dates), `config` (routes, shop info) |

Features map to use cases from the Lab 2 UML diagram (*Book an appointment*, *Cancel booking*,
*Browse services*, *Contact the shop*), plus `toggle-theme`, which is a UI preference.

Slices are split into **segments** by purpose: `ui` (components), `model` (types, state, business rules), `api`
(data access: mock data and localStorage, the only place that changes when a real backend arrives), `lib`
(helpers) and `config`.

Some design decisions:

- **Entities don't import each other.** `BookingCard` gets its title ("Skin fade with Alikhan") from the page,
  and a booking stores a snapshot of `duration` and `price`, so the availability logic never needs the
  service entity. (Real systems do this too: changing the price list must not rewrite booking history.)
- **Entity cards have an `action` slot.** `ServiceCard` doesn't know whether it shows "Book" (Services page) or
  "Select" (booking wizard). The upper layer decides.
- **The booking flow is a hook** (`useBookingFlow`): a small state machine with no JSX inside, so the UI steps
  stay thin.

### Folder structure

```
src/
├── app/
│   ├── layouts/RootLayout.tsx          # Navbar + <Outlet/> + Footer + TabBar
│   ├── styles/tokens.css               # design tokens (light + [data-theme=dark]), base element styles
│   ├── router.tsx
│   └── main.tsx
├── pages/
│   ├── home/            ui/HomePage.tsx, ui/Hero.tsx
│   ├── services/        ui/ServicesPage.tsx
│   ├── barbers/         ui/BarbersPage.tsx
│   ├── barber-profile/  ui/BarberProfilePage.tsx
│   ├── booking/         ui/BookingPage.tsx
│   ├── my-bookings/     ui/MyBookingsPage.tsx
│   ├── contacts/        ui/ContactsPage.tsx
│   └── not-found/       ui/NotFoundPage.tsx
├── widgets/
│   ├── navbar/   footer/   tab-bar/
├── features/
│   ├── book-appointment/
│   │   ├── model/useBookingFlow.ts     # wizard state machine + confirm with re-check
│   │   ├── model/validation.ts
│   │   └── ui/BookingWizard.tsx, ServiceStep, BarberStep, DateTimeStep, BookingSummary, BookingSuccess
│   ├── cancel-booking/   ui/CancelBookingButton.tsx
│   ├── filter-services/  model/useCategoryFilter.ts, ui/CategoryFilter.tsx
│   ├── send-message/     ui/ContactForm.tsx
│   └── toggle-theme/     model/theme.ts, ui/ThemeToggle.tsx
├── entities/
│   ├── service/   model/types.ts, api/services.ts (mock), ui/ServiceCard.tsx
│   ├── barber/    model/types.ts, api/barbers.ts (mock),  ui/BarberCard.tsx
│   ├── review/    model/types.ts, api/reviews.ts (mock),  ui/ReviewCard.tsx
│   └── booking/   model/{types,availability,state}.ts, api/storage.ts (localStorage + seed), ui/BookingCard.tsx
└── shared/
    ├── ui/        Avatar, Button, Card, Chip, ConfirmDialog, EmptyState, Grid, Icon, Logo,
    │              Rating, SectionHeader, Stepper, TextField, TimeSlotPicker
    ├── lib/       cx, format (prices, durations), date, phone (mask + validation)
    └── config/    routes (path builders), shop (address, hours, schedule)
```

## Lab documents

`docs/` holds the reports from the earlier labs:

- `BarberTime_Lab1.docx`: subject area and problem analysis
- `BarberTime_Lab2.docx`: requirements and UML design
- `uml/`: diagrams from Lab 2

| Diagram | File |
| --- | --- |
| System architecture | [`01-architecture.png`](docs/uml/01-architecture.png) |
| Use case diagram | [`02-use-case.png`](docs/uml/02-use-case.png) |
| Class diagram | [`03-class.png`](docs/uml/03-class.png) |
| Activity diagram "Book an appointment" | [`04-activity-book-appointment.png`](docs/uml/04-activity-book-appointment.png) |
| Database schema (ER) | [`05-er-database.png`](docs/uml/05-er-database.png) |

## Getting started

Requirements: Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script             | What it does                                                |
| ------------------ | ----------------------------------------------------------- |
| `npm run dev`      | Dev server with HMR                                         |
| `npm run build`    | Type-check (`tsc`, strict) and production build to `dist/`  |
| `npm run preview`  | Serve the production build locally                          |
| `npm run lint:fsd` | Check FSD rules (layer imports, public APIs) with Steiger   |
| `npm run check`    | Sanity checks for `shared/lib` (phone mask, prices, dates)  |

To reset demo data, clear the `barbertime:bookings` key in localStorage (DevTools → Application).

## Deployment

The project is ready for Vercel: `vercel.json` rewrites every path to `index.html`, so deep links like
`/barbers/arman` work after a page refresh.

# [Feedback Flow](https://feedback-flow-phi.vercel.app/)

Effortlessly integrate user reviews, feedback, and comments into your website with just a single line of code.
With Feedback Flow, you can easily gather valuable insights from your users, enhance your website's user experience, and foster meaningful interactions with your audience.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **User Management:** [NextAuth.js](https://next-auth.js.org/)
- **Database:** [Planetscale](https://planetscale.com/)
- **ORM:** [Prisma](https://prisma.io)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com)
- **Content Management:** [Contentlayer](https://www.contentlayer.dev)
- **Payment Processing:** [Stripe](https://stripe.com)

## Features

- **Next.js** App Router
- **React** Server and Client components
- Server Actions for mutations
- **PlanetScale** MySQL database with **Prisma** ORM
- User authentication with **NextAuth.js**
- Contentful pages using **MDX** and **Contentlayer**
- Subscriptions using **Stripe**
- UI components with **shadcn/ui**
- Validation with **Zod**
- Written in **Typescript**
- Styled with **Tailwind CSS**
- Admin dashboard to manage sites, feedback, account and billing

## Running Locally

1. Clone the repository

```bashe
git clone https://github.com/mkhmbtv/feedback-flow
```

2. Install dependencies using npm

```bash
npm install
```

3. Copy the `.env.example` to `.env` and update the variables.

```bash
cp .env.example .env
```

4. Start the development server

```bash
npm run dev
```

5. Push the database schema

```bash
npx prisma db push
```

6. Start the Stripe webhook listener

```bash
npm run stripe:listen
```

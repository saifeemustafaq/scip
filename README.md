This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Managing Blockers Checklist

The blockers checklist is managed through a JSON file located at `data/blockers.json`. To update the checklist:

1. Clone the repository locally
2. Edit the `data/blockers.json` file to add, remove, or modify items
3. Each item should have:
   ```json
   {
     "id": "unique_id",
     "text": "Description of the blocker",
     "completed": false,
     "createdAt": "YYYY-MM-DD"
   }
   ```
4. Run `npm run build` to build the project
5. Commit and push your changes
6. The changes will be automatically deployed to Netlify

Example workflow to add a new blocker:
1. Open `data/blockers.json`
2. Add a new item to the "items" array:
   ```json
   {
     "id": "3",
     "text": "New blocker description",
     "completed": false,
     "createdAt": "2025-09-21"
   }
   ```
3. Save, build, commit, and push

To mark a blocker as completed:
1. Find the item in `data/blockers.json`
2. Change `"completed": false` to `"completed": true`
3. Save, build, commit, and push

This approach ensures that all changes are version controlled and persistent across all instances of the website.

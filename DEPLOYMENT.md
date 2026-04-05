# Vercel Deployment Guide

Your project is ready to be deployed to Vercel. Here are the steps to set it up:

## 1. Project Configuration
Ensure your `package.json` has the correct build command:
```json
"scripts": {
  "build": "vite build"
}
```
And that your `vite.config.js` is set to output to `dist` (this is the default).

## 2. Deploying via Vercel Dashboard (Recommended)

This is the preferred method for automated deployments:

1.  Connect your GitHub repository to Vercel at [vercel.com/new](https://vercel.com/new).
2.  Import your project.
3.  Vercel will auto-detect the Vite framework.
4.  Leave settings as default (Build: `npm run build`, Output: `dist`).
5.  Click **Deploy**.

## 3. Deploying via CLI

If you want to deploy instantly from your terminal:

```bash
npx vercel
```

- If you don't have the Vercel CLI installed, this will run it temporarily via `npx`.
- Follow the login prompts.
- Select "Yes" to set up and deploy your project.
- Choose defaults for the rest.

## 4. SPA Routing (Optional)
If you add client-side routing (React Router) later, create a `vercel.json` file in your project root with:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```
---
> [!NOTE]
> Since you have GitHub Pages deployment active via `.github/workflows/pages.yml`, both can coexist. Vercel is generally faster and offers preview deployments for each branch/PR.

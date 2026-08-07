# 10_Deployment.md - E'xploreMe Deployment & CI/CD

## Target Platform: Vercel

### Deployment Steps
1. **Repository Setup**: Push codebase to GitHub (`exploreme-3d-portfolio`).
2. **Environment Variables**:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
3. **Build Command**: `next build`
4. **Output Directory**: `.next`
5. **SEO & OpenGraph**: Configured with dynamic metadata, social card images, and WebGL compatibility headers.

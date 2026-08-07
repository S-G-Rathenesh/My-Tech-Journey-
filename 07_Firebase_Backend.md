# 07_Firebase_Backend.md - E'xploreMe Firebase Architecture

## Firestore Collections

1. **`projects`**:
   - `id`: string
   - `title`: string
   - `category`: 'web' | 'mobile' | 'ai' | 'future'
   - `description`: string
   - `techStack`: string[]
   - `liveDemoUrl`: string
   - `githubUrl`: string
   - `apkDownloadUrl`: string
   - `zone`: 'plaza' | 'ai_lab' | 'mobile_hub' | 'hall' | 'future_portal'
   - `isFuture`: boolean

2. **`messages`**:
   - `id`: string
   - `senderName`: string
   - `senderEmail`: string
   - `message`: string
   - `timestamp`: timestamp
   - `status`: 'unread' | 'read'

3. **`analytics`**:
   - `pageViews`: number
   - `zoneVisits`: map<string, number>
   - `lastUpdated`: timestamp

## Firebase Config & Security Rules
- Client side initializes Firebase SDK with environment variables (`NEXT_PUBLIC_FIREBASE_API_KEY`, etc.).
- Offline dynamic fallbacks ensure full site usability even when disconnected.

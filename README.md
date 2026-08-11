# User Admin Test App - Vercel + Supabase

Same app you tested locally (login, CRUD, search by ID, accordion detail pages),
rebuilt as a real Next.js app for deployment to Vercel with Supabase as the database.

## 1. Create the Supabase project

1. Go to https://supabase.com -> New project.
2. Once it's created, go to the SQL Editor -> New query.
3. Paste the entire contents of `supabase-schema.sql` (included in this folder) and click Run.
   This creates the `users` table (with 3 sample rows) and a `sessions` table.
4. Go to Project Settings -> API. Copy two values, you'll need them in step 3:
   - Project URL (looks like https://xxxxx.supabase.co)
   - service_role key (NOT the anon/public key - this app uses the service role
     key server-side only, so it's safe, but never expose it in client code)

## 2. Push this code to GitHub

1. Create a new empty GitHub repo (can be private).
2. From this folder, run:
   ```
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```

## 3. Deploy to Vercel

1. Go to https://vercel.com -> Add New -> Project -> Import your GitHub repo.
2. Before clicking Deploy, expand "Environment Variables" and add:
   - `SUPABASE_URL` = the Project URL from step 1
   - `SUPABASE_SERVICE_ROLE_KEY` = the service_role key from step 1
   - `APP_USERNAME` = testuser (or your own choice)
   - `APP_PASSWORD` = pass123 (or your own choice)
3. Click Deploy. Vercel builds and gives you a live URL like
   https://your-app.vercel.app

## 4. Test it

- Visit the Vercel URL -> should redirect to /login
- Log in with APP_USERNAME / APP_PASSWORD
- Add a user, search by ID, click View to see the accordion detail page,
  click Logout

## Local development (optional)

```
npm install
cp .env.local.example .env.local
# edit .env.local with your real Supabase values
npm run dev
```
Visit http://localhost:3000

## Using this with your Selenium DiscoveryTool / CompareTool

Once deployed, point `loginUrl` and `samplePersonUrl` in your C# scripts at the
real Vercel URL instead of localhost, e.g.:

```csharp
string loginUrl = "https://your-app.vercel.app/login";
string samplePersonUrl = "https://your-app.vercel.app/user/1";
```

The login form uses `id="username"` and `id="password"` (same as your local
test app), and the detail page uses the same `aria-expanded` accordion pattern
and `following-sibling::*[1]` label/value structure already confirmed working
in your discovery_report.txt - no selector changes needed.

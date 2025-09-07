# Deploy Queue Workers to Fly.io

This guide will help you deploy only the queue workers to Fly.io, not the Next.js application.

## Prerequisites

1. Install [Fly CLI](https://fly.io/docs/hands-on/install-flyctl/)
2. Create a [Fly.io account](https://fly.io/app/sign-up)
3. Login to Fly.io: `fly auth login`

## Environment Variables

1. Copy the example environment file:

   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your actual values:

   ```bash
   # Database
   DATABASE_URL=postgresql://username:password@host:port/database

   # OpenAI API Key
   OPENAI_API_KEY=your_openai_api_key_here

   # Redis Configuration (for queues)
   REDIS_URL=redis://username:password@host:port

   # Next.js
   NEXTAUTH_SECRET=your_nextauth_secret_here
   NEXTAUTH_URL=https://your-app-name.fly.dev
   ```

## Database Setup

If you don't have a database yet, you can create one with Fly.io:

```bash
# Create a PostgreSQL database
fly postgres create --name plex-deeper-db

# Get the connection string
fly postgres connect -a plex-deeper-db
```

## Redis Setup

For the queue system, you'll need Redis. You can use Fly.io Redis:

```bash
# Create a Redis instance
fly redis create --name plex-deeper-redis

# Get the connection string
fly redis connect -a plex-deeper-redis
```

## Deploy to Fly.io

1. **Initialize the Fly.io app** (if not already done):

   ```bash
   fly launch --no-deploy
   ```

2. **Set environment variables**:

   ```bash
   # Set your environment variables
   fly secrets set DATABASE_URL="your_database_url"
   fly secrets set OPENAI_API_KEY="your_openai_api_key"
   fly secrets set REDIS_URL="your_redis_url"
   fly secrets set NEXTAUTH_SECRET="your_nextauth_secret"
   fly secrets set NEXTAUTH_URL="https://your-app-name.fly.dev"
   ```

3. **Deploy the workers**:
   ```bash
   fly deploy
   ```

## Monitoring

- **View logs**: `fly logs`
- **Check status**: `fly status`
- **SSH into the machine**: `fly ssh console`
- **Scale the app**: `fly scale count 2` (for multiple worker instances)

## Health Check

The workers include a health check endpoint at `/health` that returns:

```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "service": "plex-deeper-queue-workers"
}
```

## Scaling

To scale your workers:

```bash
# Scale to 2 instances
fly scale count 2

# Scale to 0 (stop all instances)
fly scale count 0

# Scale with specific memory/CPU
fly scale memory 512
fly scale cpu 2
```

## Troubleshooting

1. **Check logs**: `fly logs -a plex-deeper-queue`
2. **View app status**: `fly status -a plex-deeper-queue`
3. **Restart the app**: `fly restart -a plex-deeper-queue`
4. **Check environment variables**: `fly secrets list -a plex-deeper-queue`

## File Structure

The deployment uses these key files:

- `Dockerfile.workers` - Docker configuration for workers only
- `fly.toml` - Fly.io configuration
- `.dockerignore` - Files to exclude from Docker build
- `workers/` - Contains the queue worker files
- `.env.example` - Environment variables template

## Notes

- The workers run both short-description and detailed-description queues
- A health check server runs on port 3001
- The app is configured to auto-start/stop machines based on demand
- Memory is set to 256MB and CPU to 1 shared core (adjust as needed)

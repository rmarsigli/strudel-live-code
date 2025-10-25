# Configuration Guide

## Environment Variables

Strudel Studio uses environment variables to configure both the server and client.

### Setup

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` with your preferred settings

### Available Variables

#### `VITE_PORT`

**Type:** String
**Default:** `3001`
**Used by:** Both Server and Client

The port where the WebSocket server runs and the client connects to. By using `VITE_` prefix, this variable is accessible in both the Node.js server and the browser client.

Example:
```env
VITE_PORT=8080
```

**Note:** You can also use `PORT` instead of `VITE_PORT` on the server side only, but `VITE_PORT` works everywhere.

#### `VITE_WS_URL` (Optional)

**Type:** String (WebSocket URL)
**Default:** `ws://localhost:${VITE_PORT}`
**Used by:** Client (Vite)

Full WebSocket URL override. Only use this if you need to connect to a different host or use a custom protocol (like `wss://`). When set, this takes precedence over `VITE_PORT`.

Example:
```env
VITE_WS_URL=wss://myserver.com:8080
```

### Important Notes

1. **Single Port Variable**: Just set `VITE_PORT` once and it works for both server and client:
   ```env
   VITE_PORT=8080
   ```

2. **Why VITE_ prefix?**: Variables with `VITE_` prefix are accessible in both the Node.js server and the browser client. This is a Vite security feature - only variables starting with `VITE_` are exposed to the browser

3. **After Changes**: Restart both server and dev server for changes to take effect:
   ```bash
   # Kill existing processes
   pkill -f "tsx server"
   pkill -f "vite"

   # Restart
   pnpm run server  # Terminal 1
   pnpm run dev     # Terminal 2
   ```

4. **Backwards Compatibility**: The server still reads `PORT` for backwards compatibility, but `VITE_PORT` takes precedence if both are set

### Default Ports

By default, the application uses:

- **Server (WebSocket)**: Port 3001
- **Client (Vite Dev Server)**: Port 5173 (managed by Vite)

### Custom Port Example

To run the server on port 9000, just set one variable:

```env
VITE_PORT=9000
```

That's it! Both server and client will use port 9000.

**Advanced: Full URL override (for remote servers):**
```env
VITE_WS_URL=ws://myserver.com:9000
```

Then restart both processes and access the client at `http://localhost:5173`

### Remote Server

To connect to a remote WebSocket server:

```env
VITE_WS_URL=ws://your-server.com:3001
```

Or for secure WebSocket:

```env
VITE_WS_URL=wss://your-server.com:3001
```

## Production Deployment

For production, consider:

1. Using environment-specific `.env` files
2. Setting `VITE_WS_URL` to your production WebSocket server
3. Using WSS (secure WebSocket) instead of WS
4. Configuring proper CORS if client and server are on different domains

Example production `.env`:

```env
PORT=3001
VITE_WS_URL=wss://api.yourdomain.com:3001
```

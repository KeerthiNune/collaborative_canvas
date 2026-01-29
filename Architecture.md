Client:
- HTML Canvas renders strokes
- Mouse events serialized and sent via Socket.io

Server:
- Receives strokes
- Maintains global history
- Broadcasts to peers

Undo:
- Server removes last stroke per user
- Re-sends full state

This ensures consistency across all clients.

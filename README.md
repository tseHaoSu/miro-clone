# Miro Clone

A collaborative whiteboard application built with Next.js and Liveblocks, inspired by Miro.

## 🚀 Live Demo

[**Try the live demo here**](https://miro-clone-nine-rosy.vercel.app/)

## Features

- 🎨 **Real-time Collaboration** - Multiple users can draw and edit simultaneously
- 🔧 **Drawing Tools** - Create rectangles, ellipses, text, and notes
- 🎯 **Selection Tools** - Select, move, and resize objects
- 🎨 **Color Picker** - Customize colors for your drawings
- 📐 **Layer Management** - Bring to front, send to back functionality
- 🗑️ **Delete Objects** - Remove selected elements
- 👥 **Live Cursors** - See other users' cursors in real-time
- 🔍 **Pan and Zoom** - Navigate around the canvas with mouse wheel

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS
- **Real-time**: Liveblocks
- **Database**: Convex
- **Authentication**: Clerk
- **Icons**: Lucide React
- **UI Components**: Radix UI

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/tseHaoSu/miro-clone.git
   cd miro-clone
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```bash
   NEXT_PUBLIC_CONVEX_URL=your_convex_url
   LIVEBLOCKS_SECRET_KEY=your_liveblocks_secret_key
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. **Create an account** or sign in
2. **Create a new board** or join an existing one
3. **Start drawing** using the toolbar
4. **Collaborate** with others in real-time
5. **Save your work** automatically

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── (dashboard)/       # Dashboard pages
│   ├── board/[id]/        # Board pages and components
│   └── api/               # API routes
├── components/            # Reusable UI components
├── convex/               # Convex database functions
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
└── types/                # TypeScript type definitions
```

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Inspired by [Miro](https://miro.com/)
- Built with [Liveblocks](https://liveblocks.io/) for real-time collaboration
- UI components from [Radix UI](https://www.radix-ui.com/)

# LifeSite

A modern file management application that works seamlessly across web and mobile platforms. LifeSite allows you to easily upload and organize your files with a simple drag-and-drop interface.

## Features

- **Cross-Platform Support**: Works on web browsers and mobile devices (iOS)
- **Drag & Drop Interface**: Simple and intuitive file uploading
- **Progressive Web App (PWA)**: Installable on mobile devices
- **Smart Storage**: Automatically detects environment and saves files appropriately
  - Web: Uploads files to server
  - Mobile: Saves files locally to device storage
- **File Organization**: Creates organized folder structure for saved files

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Mobile**: Capacitor (iOS support)
- **Backend**: Node.js + Express
- **File Handling**: Multer for uploads
- **PWA**: Vite PWA plugin

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/aarav911/life-site.git
cd life-site
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. (Optional) Start the backend server for file uploads:
```bash
cd server
node server.js
```

## Usage

### Web Version
1. Open your browser and navigate to `http://localhost:5173`
2. Drag and drop files onto the designated area or click to select files
3. Files will be uploaded to the server and stored in `~/LifeSiteFolder/media`

### Mobile Version (iOS)
1. Build and run on iOS device/simulator:
```bash
npx cap add ios
npx cap run ios
```
2. Files will be saved locally to the device's Documents folder in `LifeSiteFolder/`

## Project Structure

```
life-site/
├── src/
│   ├── App.tsx              # Main application component
│   ├── FileDrop.tsx         # Drag-and-drop file handling
│   ├── storage.ts           # Environment detection utilities
│   └── nativestorage.ts     # Native file system operations
├── server/
│   └── server.js            # Express server for file uploads
├── public/                  # Static assets
├── ios/                     # iOS platform files (generated)
├── capacitor.config.ts      # Capacitor configuration
├── vite.config.ts           # Vite configuration with PWA
└── package.json
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Building for Mobile

1. Build the web assets:
```bash
npm run build
```

2. Sync with Capacitor:
```bash
npx cap sync
```

3. Run on iOS:
```bash
npx cap run ios
```

## API Endpoints

### POST /upload
Upload a file to the server.

**Request**: `multipart/form-data` with `file` field
**Response**: JSON with upload status

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is private and proprietary.

## Support

For questions or issues, please create an issue in the repository.
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

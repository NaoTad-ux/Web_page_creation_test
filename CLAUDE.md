# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a web page creation test repository containing a simple, beautiful self-introduction website built with vanilla HTML and CSS.

## Project Structure

- `index.html` - Main HTML file containing the self-introduction page structure with sections for name, occupation, hobbies, and contact information
- `style.css` - Stylesheet with modern, responsive design featuring gradient backgrounds, hover effects, and animations

## Development

This is a static website with no build process required. To view the website:

1. Open `index.html` directly in a web browser
2. Or use a local development server:
   ```bash
   python -m http.server 8000
   # or
   npx serve .
   ```

## Architecture

The website follows a simple single-page design:
- **Header Section**: Profile avatar, name, and job title with gradient background
- **Main Content**: Three sections (occupation, hobbies, contact) with distinct styling
- **Footer**: Copyright information
- **Responsive Design**: Mobile-first approach with breakpoints at 768px and 480px

## Design Features

- Gradient backgrounds (purple/blue theme)
- Smooth animations and transitions
- Hover effects on interactive elements
- Clean, modern UI with card-based layout
- Japanese language support with appropriate font stack

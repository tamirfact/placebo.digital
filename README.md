# placebo.digital - Coming Soon Landing Page

A stunning, modern landing page for placebo.digital design studio with an interactive background animation and smooth user experience.

## Features

- **Interactive Background Animation**: Dynamic particle system with mouse interaction
- **Modern Typography**: Poppins for headings, Figtree for body text
- **Responsive Design**: Optimized for all device sizes
- **Smooth Animations**: Staggered text animations and hover effects
- **SEO Optimized**: Complete meta tags and social media integration
- **Performance Optimized**: Efficient canvas animations and smooth scrolling

## Technologies Used

- HTML5
- CSS3 (with modern features like backdrop-filter, clamp())
- Vanilla JavaScript (ES6+)
- Canvas API for background animations
- Google Fonts (Poppins & Figtree)

## File Structure

```
placebo.digital/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript for background animation and interactions
└── README.md           # Project documentation
```

## Setup

1. Clone or download the project files
2. Open `index.html` in a modern web browser
3. For local development, you can use any local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Customization

### Colors
The design uses a monochromatic black, white, and gray color scheme. You can modify the colors in `styles.css`:

```css
/* Main colors */
--primary-color: #000;
--secondary-color: #fff;
--accent-color: #888;
```

### Fonts
The page uses Google Fonts:
- **Poppins**: For headings and titles
- **Figtree**: For body text and descriptions

### Background Animation
The background animation can be customized in `script.js`:
- Particle count: Modify `particleCount` in `createParticles()`
- Animation speed: Adjust timing values in `animate()`
- Connection distance: Change the distance threshold in `drawConnections()`

## Performance Notes

- The background animation uses `requestAnimationFrame` for optimal performance
- Canvas operations are optimized for smooth 60fps animation
- Scroll events are throttled to prevent performance issues
- Images and assets are optimized for fast loading

## SEO Features

- Complete meta tags for search engines
- Open Graph tags for social media sharing
- Twitter Card support
- Semantic HTML structure
- Proper heading hierarchy
- Alt text for images (when added)

## License

This project is created for placebo.digital. All rights reserved.

## Contact

For questions or modifications, contact the development team at placebo.digital. 
# Corporate Consulting

A polished, professional corporate consulting website built with React, TypeScript, and Tailwind CSS. Designed to communicate credibility, clarity, and forward momentum for an independent consulting practice.

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![React](https://img.shields.io/badge/React-18.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8)

## 🎯 Overview

**Corporate Consulting** is a complete, responsive, functional website that helps organizations navigate complex business challenges through strategic thinking, operational improvement, and digital transformation.

**Brand Tagline:** *Clarity for your next move.*

The website combines the confidence of a global consulting firm, the clarity of a contemporary business publication, and the usability of a thoughtfully designed digital product.

## ✨ Features

### Core Experience
- **Professional Navigation** — Desktop and mobile menus with scroll-aware header and announcement bar
- **Hero Section** — Two-column layout with AI-generated abstract architectural imagery
- **Trust Strip** — Service category indicators with subtle background patterns
- **Expertise Section** — Four structured consulting service areas with detail modals
- **Approach Section** — Four-stage consulting process visualization
- **Case Studies** — Filterable grid with detailed modal views and navigation
- **Philosophy Section** — Editorial layout with principles and workspace imagery
- **Insights Section** — Article grid with category filtering and thumbnail images
- **Team Section** — Professional profiles with AI-generated portraits
- **Contact Form** — Full validation with accessible error handling

### Interactive Features
- **Business Readiness Assessment** — Multi-step diagnostic tool with deterministic recommendations
- **Service Detail Modals** — Comprehensive service information with FAQs and related case studies
- **Case Study Navigation** — Previous/next navigation between studies
- **Form Prefilling** — Assessment results automatically populate contact form
- **Back to Top Button** — Appears on scroll for easy navigation

### Visual Design
- **10 AI-Generated Images** — Custom artwork for hero, case studies, team portraits, and philosophy section
- **Subtle Background Patterns** — Decorative gradients and geometric patterns throughout
- **Hover Animations** — Image scaling, color transitions, and elevation effects
- **Loading States** — Skeleton loaders and smooth transitions
- **Responsive Layouts** — Optimized for 320px to 1440px+ viewports

## 🛠 Tech Stack

- **React 18.2** — UI framework
- **TypeScript 5.7** — Type safety
- **Vite 6.4** — Build tool and dev server
- **Tailwind CSS 4.1** — Utility-first styling with custom design tokens
- **Framer Motion 11** — Purposeful animations and transitions
- **Lucide React** — Consistent icon system
- **React Router 6** — Client-side routing

## 📁 Project Structure

```
src/
├── App.tsx                    # Main application with all sections
├── main.tsx                   # React entry point
├── index.css                  # Design system and Tailwind configuration
├── data/
│   ├── services.ts           # Consulting service definitions
│   ├── caseStudies.ts        # Case study content with images
│   ├── insights.ts           # Article and resource content
│   └── team.ts               # Team member profiles with portraits
└── lib/
    ├── assessment.ts         # Business Readiness Assessment logic
    └── validation.ts         # Form validation utilities
```

## 🎨 Design System

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Corporate Navy | `#14263D` | Primary brand color, authority |
| Deep Navy | `#0D1929` | Footer, dark sections |
| Professional Blue | `#285AC5` | Primary action color, links |
| Bright Blue | `#447FE8` | Hover states, accents |
| Pale Blue | `#EAF1FB` | Light backgrounds, highlights |
| Corporate White | `#FFFFFF` | Main surfaces |
| Soft Grey | `#F4F6F9` | Secondary backgrounds |
| Slate | `#667386` | Secondary text |
| Graphite | `#293445` | Primary text |
| Border Grey | `#DCE2EA` | Borders, dividers |
| Muted Teal | `#4E8A8A` | Secondary accent |

### Typography

- **Primary Font:** Inter (300-700 weights)
- **Serif Accent:** Source Serif 4 (for quotations and editorial elements)
- **Scale:** Responsive sizing with `clamp()` where appropriate
- **Line Heights:** 1.2 for headings, 1.6 for body text

### Spacing Scale

Consistent spacing using Tailwind's default scale with custom section padding:
- Mobile: `4rem` vertical padding
- Tablet: `6rem` vertical padding
- Desktop: `7rem` vertical padding

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm 9+

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Type checking
npm run typecheck
```

The development server runs at `http://localhost:3000`

## 📱 Responsive Design

The website is fully responsive across all breakpoints:

- **Mobile:** 320px - 767px
- **Tablet:** 768px - 1023px
- **Desktop:** 1024px - 1279px
- **Large Desktop:** 1280px+

Key responsive features:
- Mobile-first approach
- Collapsible navigation menu
- Stacked layouts on mobile, side-by-side on desktop
- Touch-optimized interactive elements
- Intentional image cropping for different viewports

## ♿ Accessibility

The website implements comprehensive accessibility features:

- **Semantic HTML** — Proper heading hierarchy and landmark regions
- **Keyboard Navigation** — All interactive elements accessible via keyboard
- **Focus Indicators** — Visible focus states with professional blue outline
- **Skip to Content** — Skip link for keyboard users
- **ARIA Labels** — Descriptive labels for icon-only buttons
- **Form Validation** — Inline error messages with `aria-invalid` and `aria-describedby`
- **Reduced Motion** — Respects `prefers-reduced-motion` preference
- **Color Contrast** — WCAG AA compliant contrast ratios
- **Screen Reader Support** — Meaningful alt text and announcements

## 🖼 Images

The website uses 11 AI-generated images for a cohesive visual identity:

1. **Corporate Logo** — Professional minimalist logo design (used in header, footer, and mobile menu)
2. **Hero Image** — Abstract architectural composition (navy/blue tones)
3. **Case Study 1** — Modern office workspace (operational excellence)
4. **Case Study 2** — Manufacturing facility (digital transformation)
5. **Case Study 3** — Glass office building (strategic alignment)
6. **Case Study 4** — Corporate boardroom (organizational change)
7. **Philosophy Section** — Strategic workspace with diagrams
8. **Team Portrait 1** — Sarah Chen (Managing Partner, Strategy)
9. **Team Portrait 2** — Marcus Webb (Partner, Operations)
10. **Team Portrait 3** — Elena Rodriguez (Partner, Digital & Technology)
11. **Team Portrait 4** — David Okafor (Partner, Organizational Change)

All images are optimized with:
- Lazy loading for below-the-fold content
- Responsive sizing with `object-cover`
- Descriptive alt text
- Gradient overlays for text readability

## 🔧 Key Components

### Business Readiness Assessment

A multi-step interactive tool that helps visitors identify relevant consulting services:

1. **Challenge Identification** — Primary business challenge
2. **Situation Assessment** — Current state description
3. **Outcome Preference** — Desired result
4. **Deterministic Recommendation** — Service match based on inputs

The assessment uses a rule-based algorithm to provide personalized recommendations with suggested discussion topics and related case studies.

### Service Detail Modals

Each consulting service has a comprehensive detail view including:
- Service overview
- Common challenges addressed
- Areas of work
- Engagement approach
- Example deliverables
- Frequently asked questions
- Related case studies
- Direct inquiry CTA

### Contact Form

Professional consultation inquiry form with:
- Required field validation
- Email format validation
- Inline error messages
- Service interest prefilling (from assessment)
- Loading, success, and error states
- Accessible form labels and descriptions
- Consent checkbox

**Note:** This is a demonstration form. No data is transmitted to a server.

## 📊 Performance

Optimized for fast loading and smooth interactions:

- **Code Splitting** — Automatic chunking by Vite
- **Image Optimization** — Lazy loading and responsive sizing
- **CSS Optimization** — Tailwind's JIT compiler for minimal CSS
- **Animation Performance** — GPU-accelerated transforms and opacity
- **Bundle Size** — ~363KB JavaScript (gzipped: ~110KB)

## 🔒 Important Notes

### Demo Website

This is a demonstration website showcasing design and development capabilities. 

**What's included:**
- Illustrative case studies (clearly marked)
- Sample team profiles (clearly marked)
- Demonstration contact form (no backend)
- Sample article content

**What's not included:**
- Real client relationships
- Actual consulting services
- Verified testimonials or credentials
- Functional form submission

### No Fabricated Claims

The website deliberately avoids:
- Invented client logos or names
- Unsupported performance metrics
- Fabricated certifications or awards
- False submission confirmations

All illustrative content is clearly labeled to maintain transparency.

## 🎯 User Journey

The website guides visitors through a clear conversion path:

1. **Understand the firm** → Hero and trust strip
2. **Explore expertise** → Service cards and detail modals
3. **Review approach** → Process visualization
4. **Identify challenge** → Business Readiness Assessment
5. **Start conversation** → Contact form with prefilling

Every CTA leads to a specific action or relevant content.

## 📝 Content Strategy

### Services
- Business Strategy
- Operational Excellence
- Digital Transformation
- Organizational Change

### Case Studies
- Streamlining Operational Workflows
- Planning Digital Transformation
- Aligning Strategic Priorities
- Supporting Organizational Change

### Insights
- 8 articles across Strategy, Operations, Digital, and Change categories
- Practical business topics with clear summaries
- Reading time estimates
- Publication dates

## 🌐 Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is provided as-is for demonstration purposes.

## 🤝 Contributing

This is a demonstration project. For production use, consider:
- Connecting a real form submission backend
- Adding real client testimonials (with permission)
- Implementing analytics tracking
- Adding CMS integration for content updates
- Setting up image optimization pipeline

## 📞 Support

For questions about this demonstration project, please refer to the code comments and documentation within the source files.

---

**Built with attention to detail, professional design principles, and a focus on user experience.**

*Corporate Consulting — Clarity for your next move.*

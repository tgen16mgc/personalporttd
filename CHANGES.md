# Recent Changes (April 6, 2026)

## 1. Removed Em Dashes (—)

Replaced all em dashes with colons (:), periods (.), or removed them for better readability.

**Files affected:**
- `app/about/page.tsx`
- `app/contact/page.tsx`
- `app/work/[slug]/page.tsx`
- `app/layout.tsx`

## 2. Redesigned After·work Section

**Before:** Wall of text in simple list format
**After:** Visual bento grid with image placeholders

**New features:**
- Large cards (LoL, Cat) with side-by-side image + text
- Small cards (Guitar, Coffee) with image on top
- Gradient backgrounds for each hobby
- Image placeholders ready for your photos
- Shorter, punchier copy
- "↳ Takeaway" format for marketing lessons

**Images needed:**
```
/public/afterwork/
├── lol.jpg       (gaming setup or LoL screenshot)
├── guitar.jpg    (you playing guitar)
├── coffee.jpg    (coffee moment)
└── cat.jpg       (your cat!)
```

## 3. Contact Page Review

✅ Checked - no changes needed. Contact page is clean and functional.

## 4. Simple Content Editing System (No CMS Required!)

Created easy-to-edit TypeScript config files instead of external CMS.

**New files:**
- `content/site-config.ts` - Personal info, hero, about, afterwork
- `content/README.md` - Instructions for content directory
- `CONTENT-EDITING.md` - Full editing guide

**How to edit content:**
1. Open `content/site-config.ts` or `content/projects.ts`
2. Edit the values (self-explanatory structure)
3. Save → changes appear automatically

**Benefits:**
- No CMS signup needed
- No monthly fees
- TypeScript catches typos
- Version controlled with git
- Fast and simple

## Visual Comparison

### Afterwork Section: Before vs After

**Before:**
```
🎮 League of Legends
[Long paragraph 1]
[Long paragraph 2]

🎸 Guitar  
[Long paragraph 1]
[Long paragraph 2]
...
```

**After:**
```
┌──────────────────────┬───────────┐
│  🎮 LoL              │  🎸       │
│  [image] [text]      │  Guitar   │
│  Large card          │  Small    │
├──────────────────────┼───────────┤
│  ☕ Coffee           │  🐱 Cat   │
│  Small               │  [image]  │
│                      │  Large    │
└──────────────────────┴───────────┘
```

## Build Status

✅ Build passes with zero errors
✅ All TypeScript types valid
✅ 13 pages generated successfully

## What You Need to Do

1. **Add photos:**
   - `/public/tien.jpg` (hero)
   - `/public/tien-about.jpg` (about page)
   - `/public/afterwork/lol.jpg`
   - `/public/afterwork/guitar.jpg`
   - `/public/afterwork/coffee.jpg`
   - `/public/afterwork/cat.jpg`

2. **Uncomment image tags** when photos are ready:
   - `components/home/Hero.tsx` (line 88-92)
   - `app/about/page.tsx` (line 36)
   - The afterwork cards will auto-show images when files exist

3. **Deploy:**
   ```bash
   vercel deploy
   # or push to GitHub
   ```

## Content Editing Examples

### To change your tagline:
```typescript
// content/site-config.ts
hero: {
  tagline: "Your new tagline here",
}
```

### To update a project:
```typescript
// content/projects.ts
{
  title: "New Project Name",
  tagline: "New struggle-first hook",
  challenge: "Updated challenge text",
  // ...
}
```

### To add new afterwork hobby:
```typescript
// content/site-config.ts
afterworkContent: [
  // ... existing hobbies
  {
    id: "cooking",
    title: "Cooking",
    description: "Your description",
    takeaway: "What it teaches you",
    image: "/afterwork/cooking.jpg",
    color: "from-green-50 to-emerald-100",
    size: "small",
  },
]
```

Easy!

# Mobile Responsiveness Rules


This file defines the responsive design and mobile compatibility rules for this portfolio.


The goal is to improve responsiveness without redesigning the website or breaking existing functionality.


Preserve:
- existing monochrome design
- typography-first visual style
- light and dark themes
- desktop layout
- KV.AI functionality
- animations and transitions
- existing project content
- existing links and functionality


Prefer small, maintainable responsive fixes instead of rewriting working components.


---


# 1. Breakpoint Strategy


Do not design around specific phone models.


Change the layout based on when the content needs it.


Recommended responsive ranges:


- Mobile: `<= 640px`
- Tablet / small screens: `641px - 900px`
- Desktop: `> 900px`


Do not assume everything below `768px` should use exactly the same mobile layout.


Tablet layouts should not look like enlarged phone layouts or compressed desktop layouts.


---


# 2. Required Viewport Testing


Always test the portfolio at these widths:


- 320px
- 360px
- 375px
- 390px
- 430px
- 640px
- 724px
- 768px
- 1024px
- 1440px


Also check these viewport combinations:


- 320 × 568
- 375 × 667
- 390 × 844
- 430 × 932
- 724 × 986
- 768 × 1024
- 1024 × 768
- 1440 × 900


---


# 3. Horizontal Overflow


There must never be unintended horizontal scrolling.


Check for:


- `width: 100vw`
- fixed pixel widths
- negative margins
- `translateX()`
- absolute positioning
- oversized decorative elements
- large pseudo-elements
- long URLs
- long text
- flex/grid children without `min-width: 0`


Prefer:


```css
box-sizing: border-box;
max-width: 100%;
min-width: 0;

For long text:

overflow-wrap: anywhere;
word-break: break-word;

Decorative elements must never increase the document width.

4. Mobile Viewport

For fullscreen layouts and overlays, prefer:

height: 100dvh;
min-height: 100dvh;

Do not rely only on:

height: 100vh;

Account for mobile safe areas when necessary:

padding-top: env(safe-area-inset-top);
padding-bottom: calc(20px + env(safe-area-inset-bottom));

Fullscreen interfaces must remain usable when:

Safari address bar is visible
Safari address bar collapses
mobile keyboard opens
device has a notch or safe area
5. General Mobile Layout

Avoid unnecessary fixed heights.

Avoid large min-height values used only to position content.

Prefer:

Flexbox
CSS Grid
gap
minmax()
clamp()

Avoid using absolute positioning for primary page layout.

Whitespace should feel intentional.

Do not create large empty areas because of:

margin-top: auto;

or oversized flex spacers.

6. Mobile Padding

Use consistent horizontal spacing.

Recommended:

padding-inline: 20px;

For very narrow devices:

@media (max-width: 340px) {
  padding-inline: 16px;
}

Avoid sections having completely different horizontal alignment unless intentionally designed.

7. Typography

Large typography must scale smoothly.

Use responsive sizes such as:

font-size: clamp(2.5rem, 10vw, 5rem);

Do not let headings overflow the viewport.

Check especially:

hero heading
navigation
project titles
credentials
contact heading
KV.AI messages
long technology names

Typography must remain readable at 320px.

8. Images

Images must never overflow their parent.

Prefer:

img {
  max-width: 100%;
  height: auto;
}

Use:

object-fit: cover;

or:

object-fit: contain;

depending on the content.

Do not stretch screenshots.

Do not allow desktop image dimensions to control mobile layout width.

Use optimized image sizes where possible.

Lazy-load below-the-fold images when appropriate.

9. Video and Project Media

Videos must stay inside their containers.

Use intentional aspect ratios.

Example:

aspect-ratio: 16 / 9;
width: 100%;
object-fit: cover;

Do not duplicate heavy video elements just to create a separate mobile layout.

Desktop multi-column project galleries must collapse into logical mobile order.

For public projects:

prioritize one strong screenshot
show project information
provide live project link

For private projects:

demonstration videos may remain

Avoid autoplaying many videos simultaneously on mobile.

10. Hero Section

The mobile hero must:

fit without horizontal overflow
have readable heading size
have compact but intentional spacing
keep action links easy to tap
avoid excessive empty space
keep portrait/media inside viewport

The hero should feel specifically designed for mobile, not just a smaller desktop version.

11. Mobile Navigation

The mobile menu must:

fit inside viewport
never clip content
be scrollable on short devices
use reasonable vertical spacing
avoid huge empty gaps
keep all navigation items readable
keep social/resource links accessible
keep theme control accessible

Navigation order should remain consistent.

question? must continue opening KV.AI.

Do not convert it into a normal page anchor.

12. KV.AI

KV.AI has two separate responsive states.

Empty State

When there are no messages:

prompt should appear visually centered
composer should stay near the prompt
do not create a giant empty transcript region
avoid pushing content to the bottom

Example structure:

KV.AI                         CLOSE


        what do you
        want to ask?_


        > ask something_   SEND
Conversation State

When messages exist:

Use a column layout:

display: flex;
flex-direction: column;
height: 100dvh;

Transcript should use:

flex: 1;
min-height: 0;
overflow-y: auto;
overflow-x: hidden;

Composer must remain visible at the bottom.

Check:

long messages
timestamps
error messages
processing_
keyboard opening
mobile Safari
320px width
tablet widths

No horizontal clipping is allowed.

13. KV.AI Composer

The mobile composer should stay usable at all times.

Recommended:

display: grid;
grid-template-columns: minmax(0, 1fr) auto;
gap: 16px;
align-items: end;

Input should use:

min-width: 0;
width: 100%;

Composer padding should account for safe areas:

padding:
  18px
  20px
  calc(20px + env(safe-area-inset-bottom));

Do not allow the SEND button to leave the viewport.

14. Contact Section

The contact section must remain compact and readable on mobile.

Check:

heading wrapping
paragraph width
contact button
email address
GitHub link
Facebook link
footer spacing

Native contact links should be used where appropriate.

Example:

mailto:

Do not intercept mailto: links using internal navigation or animation logic.

15. External Links

Do not treat external links as internal navigation.

Protocols such as:

mailto:
tel:
http:
https:

must not be accidentally intercepted by:

hash navigation
smooth scrolling
SPA routing
View Transition API
global anchor click handlers

External links must work correctly on mobile Safari.

16. Stack Section

On mobile, avoid extremely long single-column technology lists.

When appropriate, use a compact two-column layout.

Example:

FRONTEND           BACKEND
React              Laravel
Next.js            PHP
TypeScript         Supabase


DATA               DESIGN
MySQL              Figma
PostgreSQL         Wireframing
Firebase           Prototyping

Collapse to one column only when necessary on extremely narrow screens.

17. Credentials Section

Credentials must:

remain readable at 320px
avoid overflowing titles
avoid excessive card heights
maintain logical spacing
preserve hierarchy

Do not shrink text excessively just to fit content.

Allow natural wrapping.

18. Buttons and Touch Targets

Important interactive controls should have approximately:

44 × 44px

of usable touch area where practical.

Do not rely only on hover.

Ensure:

buttons are easy to tap
links are separated enough
controls do not overlap
focus states remain visible
19. Fixed and Sticky Elements

Check every:

fixed header
sticky navigation
floating control
modal
fullscreen overlay
chatbot composer

Fixed elements must not overlap important content.

They must remain usable when browser chrome changes height.

20. Decorative Elements

Halftone patterns, dots, grids, and decorative graphics must never affect layout width.

For absolutely positioned decorations:

pointer-events: none;

Their parent should clip overflow when appropriate.

Decorations should not overlap important content.

21. Motion

Preserve the current animation style.

Support:

@media (prefers-reduced-motion: reduce) {
  /* reduce non-essential motion */
}

Animations must not:

create horizontal overflow
cause layout shifts
break Safari
block interaction

Do not use animations to solve layout problems.

22. Theme System

Both light and dark modes must be tested.

Responsive fixes must not break:

theme toggle
circular theme transition
text contrast
borders
icons
KV.AI theme styling
23. Mobile Safari

Explicitly test:

homepage
mobile menu
hero
project section
Stack
Credentials
Contact
footer
KV.AI empty state
KV.AI conversation state
theme switching
external links
mailto links
browser back button
browser address bar behavior
software keyboard
fixed/sticky controls

A layout that works only in Chrome DevTools is not considered complete.

24. Tablet Layout

Check the range around:

640px - 900px

Tablet must not look like:

an oversized phone layout
a squeezed desktop layout

Pay special attention to approximately:

724px
768px

Do not apply mobile-only spacing rules too broadly.

25. Performance

Mobile performance should also be considered.

Avoid:

oversized images
loading unnecessary desktop assets
many autoplaying videos
unnecessary animation
duplicated media elements

Lazy-load below-the-fold media when appropriate.

Do not sacrifice visual quality unnecessarily.

26. Coding Rules

Do not redesign the portfolio just to make it responsive.

Do not change business logic.

Do not change APIs.

Do not change project content unnecessarily.

Do not rewrite working components solely for responsiveness.

Prefer small, maintainable fixes.

Reuse existing:

CSS variables
design tokens
breakpoints
components

Do not introduce a second conflicting responsive system.

27. Before Changing Code

Before implementing responsive changes:

Inspect the existing component.
Identify the actual cause.
Check whether the problem affects desktop.
Determine the smallest safe fix.
Avoid broad global CSS changes unless necessary.
28. After Every Change

Check:

Desktop still works.
Mobile works.
Tablet works.
No horizontal overflow exists.
Existing functionality still works.
Light theme works.
Dark theme works.
29. Completion Criteria

The responsive pass is complete only when:

 No unintended horizontal scrolling exists
 320px width remains usable
 360px width works
 375px width works
 390px mobile layout is polished
 430px width works
 640px works
 724px tablet layout is intentional
 768px tablet layout is intentional
 1024px desktop remains correct
 1440px desktop remains correct
 Mobile navigation works
 Hero works on mobile
 Project cards/media work
 Stack layout works
 Credentials work
 Contact section works
 Footer remains readable
 KV.AI empty state works
 KV.AI conversation state works
 KV.AI composer works with mobile keyboard
 No mobile Safari clipping occurs
 Images remain inside containers
 Videos preserve aspect ratios
 Buttons have usable touch targets
 No fragile fixed-height layouts remain
 Safe areas are respected
 External links work
 Mail links work
 Light mode works
 Dark mode works
 Reduced motion is supported
 Lint passes
 Build passes
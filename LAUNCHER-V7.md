# BULLETPROOF LAUNCHER V7.0 [Optimized Multi-Agent Protocol]

Deploy TikTok landing page with SimpleSwap crypto checkout. **Optimized for speed + token conservation.**

---

## PHASE -2: SETUP (Execute First)

```bash
# Install Playwright MCP + browsers
npm install -g @anthropic-ai/mcp-playwright 2>/dev/null
npx playwright install --with-deps chromium

# Clone Claude skills
git clone https://github.com/anthropics/anthropic-cookbook /tmp/anthropic-cookbook 2>/dev/null
```

**All agents use ultrathink for: SVGs, color palettes, layout decisions, CSS.**

---

## PHASE -1: PREREQUISITES

```bash
npx playwright --version && gh --version && netlify --version && node --version && curl --version
```

---

## PHASE 0: CONFIG (Ask & Wait)

**Core (1-6):**
1. PRODUCT_NAME
2. PRODUCT_TAGLINE (or "auto")
3. PRODUCT_URL (competitor site, optional)
4. OUTPUT_FOLDER (full path)
5. SITE_NAME (netlify subdomain)
6. IMAGES_FOLDER (full path)

**Pool (7):**
7. POOL_MODE: `existing` (simpleswap-automation-1.onrender.com) OR `new`

**If new pool (8-12):**
8. MERCHANT_WALLET (default: `0x1372Ad41B513b9d6eC008086C03d69C635bAE578`)
9-11. Brightdata: `hl_9d12e57c` / `scraping_browser1` / `u2ynaxqh9899`
12. POOL_NAME

Save to `$OUTPUT_FOLDER/state/CONFIG.md`

---

## CRITICAL SPECS (Hardcoded)

**Button Behavior:**
- `handleAddToCart('primary')` → `processOrder(59)` DIRECT (no popup)
- `handleAddToCart('secondary')` → `showOrderBumpPopup()` → accept=$29, decline=$19

**Cache Headers:** HTML=`max-age=0`, Images=`max-age=31536000`, sw.js=`max-age=0`

**Images:** `images/product/product-01.jpeg`, `images/testimonials/testimonial-01.jpeg`

**Pool Endpoints:** `GET /`, `GET /health`, `POST /buy-now {amountUSD}`, `POST /admin/init-pool`

---

## PHASE 1: PARALLEL FOUNDATION (Launch 5 Agents in ONE Message)

### AGENT 1A: Image Processor
- List files in IMAGES_FOLDER
- Convert to JPEG, rename: product-01.jpeg, testimonial-01.jpeg, etc.
- Copy to OUTPUT_FOLDER/images/{product,testimonials}/
- Compress: products 800px, testimonials 400px
- Output: `state/agent-1a.json` {product_count, testimonial_count, status}

### AGENT 1B: Content Generator
- If PRODUCT_URL: fetch and extract details
- Generate 30 testimonials (40% TikTok, 25% IG, 15% FB, 10% Trustpilot, 10% Google)
- Include: 2-3 typos, mixed ratings (70/20/10), specific details
- Generate headlines, CTAs, product copy
- Output: `state/agent-1b.json` {testimonials, headlines, product_copy, status}

### AGENT 1C: Pool Manager
**If existing:** Verify pool at simpleswap-automation-1.onrender.com, check >=20 exchanges, init if low
**If new:** Clone template, create .env with Brightdata creds, deploy to Render, init 10x with 30s delays
- Output: `state/agent-1c.json` {pool_url, pool_19, pool_29, pool_59, total, status}

### AGENT 1D: Repository Setup
- `mkdir -p $OUTPUT_FOLDER/state && cd $OUTPUT_FOLDER && git init`
- `gh repo create $SITE_NAME --public --source=. --remote=origin`
- `netlify sites:create --name $SITE_NAME && netlify link`
- Output: `state/agent-1d.json` {github_url, netlify_url, status}

### AGENT 1E: Brand & Design Specialist (ULTRATHINK)
**Competitor Analysis:** If PRODUCT_URL provided, WebFetch and extract: colors, typography, CTAs, pricing

**Target Audience:** Demographics, color preferences, TikTok/IG trends

**Color Palette:** Extract 5 colors from product images, create CSS variables, ensure WCAG AA contrast

**Custom SVGs (ultrathink each):** Shipping, star, checkmark, heart, size-chart, returns, secure, social-proof
- Anti-AI rules: No perfect symmetry, organic curves, micro-details, varied stroke weights

**Mobile Conversion:** Thumb zone CTAs, hero fills viewport, price visible without scroll, sticky bottom bar, 44px touch targets

**Accordion Specs:** Description, Size Guide, Shipping, Returns, Care Instructions

- Output: `state/agent-1e.json` {color_palette, svg_icons, design_tokens, accordion_sections, status}

### PHASE 1 GATE
Wait for all agents. Verify all `status: complete`. Write `state/PHASE1.md`.

---

## PHASE 2: BUILD (Sequential)

### AGENT 2A: Page Builder
1. Clone template: `git clone https://github.com/blinds123/blue-sneaker-lander temp-template`
2. Copy index.html to OUTPUT_FOLDER
3. **Apply Design System** from agent-1e.json: CSS variables, custom SVGs, design tokens
4. **Transform:** Replace product name/tagline, inject testimonials, update image paths
5. **Button behavior:** primary→processOrder(59), secondary→showOrderBumpPopup()
6. **Product Accordion:** 5 sections with custom icons, smooth transitions
7. **Mobile-first:** 390px viewport first, sticky CTA, full-width buttons
8. **Create configs:** _headers, netlify.toml, netlify/functions/buy-now.js (CORS proxy to pool), sw.js
9. Copy images from agent-1a, clean up temp-template
- Output: `state/PHASE2.md` {design_applied, accordion_sections, mobile_optimized}

---

## PHASE 3: DEPLOY

1. `cd $OUTPUT_FOLDER && git add -A && git commit -m "Initial deployment"`
2. `git push -u origin main && netlify deploy --prod --dir=.`
3. Wait 90s for CDN propagation
4. Verify: `curl -I $NETLIFY_URL`
- Output: `state/PHASE3.md` with live URLs

---

## PHASE 4: E2E TESTING (Launch 5 Agents in ONE Message, Vision Mode)

### TEST A: $59 Direct Flow
- Navigate to site, select size, click #primaryCTA
- ASSERT: No popup appears, redirects to simpleswap.io, valid exchange ID
- Output: `state/test-a.json` {passed, exchange_url}

### TEST B: $19 Popup Flow
- Navigate, select size, click #secondaryCTA
- ASSERT: Popup appears, click decline, redirects to simpleswap.io
- Output: `state/test-b.json` {passed, exchange_url}

### TEST C: UI Quality (Vision Mode)
- Check all images load (naturalHeight > 0)
- Test accordion open/close
- Mobile viewport (390x844): no horizontal scroll
- Screenshot analysis: premium design, not AI-looking
- Accessibility: alt text, button names, contrast, focus order
- Output: `state/test-c.json` {broken_images, accordion_works, mobile_ok, a11y_issues, passed}

### TEST D: Pool Integration
- `curl $POOL_URL/`
- ASSERT: $19 >= 5, $29 >= 5, $59 >= 5, total >= 20
- Output: `state/test-d.json` {pools, passed}

### TEST E: Performance & Design Audit (Vision Mode)
- Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
- Page weight < 3MB, hero image < 500KB
- Screenshot analysis: anti-AI score, premium feel, conversion optimization, brand consistency
- ASSERT: All scores >= 8/10
- Output: `state/test-e.json` {vitals, scores, passed}

### PHASE 4 GATE
IF all pass → Final Report. ELSE → Auto-Fix Loop.

---

## AUTO-FIX LOOP (Max 3)

For each iteration:
1. Identify failed tests from state/test-*.json
2. Diagnose: popup issue→fix handleAddToCart, images→fix paths, pool→init more
3. Apply fix to index.html or configs
4. Redeploy: `git add -A && git commit -m "Fix" && git push && netlify deploy --prod`
5. Wait 90s, re-run failed tests
6. If all pass: break

If still failing after 3: Write error report, request human intervention.

---

## PHASE 5: FINAL REPORT

Generate `DEPLOYMENT-REPORT.md`:
- Product name, tagline
- Live URLs: Site, GitHub, Pool
- Pool status: exchanges per tier
- E2E results: all tests
- Features: design system, accordion, mobile, CORS proxy
- Refill command: `curl -X POST $POOL_URL/admin/init-pool`

---

## EXECUTION

1. Phase -2: Setup (30s)
2. Phase -1: Prerequisites
3. Phase 0: Config questions
4. Phase 1: **5 agents parallel** (1A, 1B, 1C, 1D, 1E)
5. Phase 2: Build
6. Phase 3: Deploy
7. Phase 4: **5 test agents parallel** (A, B, C, D, E)
8. Auto-fix if needed
9. Final report

**Rules:** All parallel agents in ONE message. Delegate heavy work to subagents. Orchestrator coordinates only.

Target: **10 minutes execution, ~19,000 tokens.**

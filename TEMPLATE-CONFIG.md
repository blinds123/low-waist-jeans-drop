# Landing Page Template Configuration

## How to Duplicate This Template

```bash
# 1. Copy the entire folder
cp -r "this-folder" "new-product-folder"

# 2. Update CONFIG values below

# 3. Run LAUNCHER-V7.md protocol
```

---

## REQUIRED CONFIGURATION

### Core Product Settings
```
PRODUCT_NAME: {{PRODUCT_NAME}}
PRODUCT_TAGLINE: {{PRODUCT_TAGLINE}}
PRODUCT_PRICE: 59
PREORDER_PRICE: 19
BUMP_PRICE: 10
```

### Branding
```
BRAND_COLOR: #5C5346
ACCENT_COLOR: #28a745
TIKTOK_PIXEL_ID: D3CVHNBC77U2RE92M7O0
```

### Deployment
```
SITE_NAME: {{netlify-subdomain}}
GITHUB_REPO: {{github-repo-name}}
POOL_URL: https://simpleswap-automation-1.onrender.com
```

---

## DIRECTORY STRUCTURE (Required)

```
/
├── index.html              # Main landing page
├── netlify.toml            # Netlify configuration
├── _headers                # Cache headers
├── _redirects              # URL redirects
├── package.json            # Node dependencies
├── .gitignore              # Git ignore rules
├── TEMPLATE-CONFIG.md      # This file
├── state/                  # Agent output directory
│   ├── CONFIG.md           # Runtime configuration
│   ├── agent-1a.json       # Image processor output
│   ├── agent-1b.json       # Content generator output
│   ├── agent-1c.json       # Pool manager output
│   ├── agent-1d.json       # Repository setup output
│   ├── agent-1e.json       # Design specialist output
│   └── test-*.json         # E2E test results
└── images/
    ├── product/
    │   ├── product-01.jpeg # Hero image (REQUIRED)
    │   ├── product-02.jpeg # Gallery image
    │   ├── product-03.jpeg # Gallery image
    │   └── product-04.jpeg # Gallery image
    └── testimonials/
        ├── testimonial-01.png
        ├── testimonial-02.png
        └── ... (up to 20)
```

---

## IMAGE SPECIFICATIONS

### Product Images
- Format: JPEG
- Naming: `product-01.jpeg`, `product-02.jpeg`, etc.
- Recommended size: 800px width
- Aspect ratio: 3:4 (portrait)
- Max file size: 500KB

### Testimonial Images
- Format: PNG or JPEG
- Naming: `testimonial-01.png`, `testimonial-02.png`, etc.
- Recommended size: 400px width
- Aspect ratio: 1:1 (square)
- Max file size: 100KB

---

## BUTTON BEHAVIOR (Hardcoded)

| Button | Action | Price |
|--------|--------|-------|
| Primary CTA | Shows popup → Accept=$69, Decline=$59 | $59 |
| Secondary CTA | Shows popup → Accept=$29, Decline=$19 | $19 |

---

## LAUNCHER V7 PHASES

1. **Phase -2**: Install Playwright
2. **Phase -1**: Check prerequisites (gh, netlify, node)
3. **Phase 0**: Collect configuration
4. **Phase 1**: 5 parallel agents (Images, Content, Pool, Repo, Design)
5. **Phase 2**: Build page with design system
6. **Phase 3**: Deploy to Netlify
7. **Phase 4**: 5 parallel E2E tests
8. **Auto-fix**: Max 3 iterations if tests fail
9. **Report**: Generate DEPLOYMENT-REPORT.md

---

## POOL ENDPOINTS

```
GET  /              → Pool status
GET  /health        → Health check
POST /buy-now       → {amountUSD: 19|29|59} → {exchangeUrl}
POST /admin/init-pool → Initialize exchanges
```

---

## QUICK DUPLICATION CHECKLIST

- [ ] Copy template folder
- [ ] Add product images to `images/product/`
- [ ] Add testimonial images to `images/testimonials/`
- [ ] Update PRODUCT_NAME in CONFIG
- [ ] Update SITE_NAME for Netlify
- [ ] Run `cp LAUNCHER-V7.md /tmp/ && execute protocol`
- [ ] Verify DEPLOYMENT-REPORT.md generated

# G4 Tequila on Shopify with the AccelPay app (sales demo)

**Private sales demo.** This site uses G4 Tequila and PKGD Group names, marks, product imagery
and copy (from shop.pkgdgroup.com and pkgdgroup.com/g4-tequila) to show their Shopify store
with the AccelPay Shopify app installed. It is not affiliated with or endorsed by G4 Tequila,
El Pandillo or PKGD Group, it is not a store, and no order is ever placed or charged. Gopuff,
Shopify and ReserveBar marks belong to their owners. Keep the link unlisted; share it 1:1 only.

Live: https://noshiftsherlock.github.io/g4tequila-accelpay-demo/

## Platform

g4tequila.co forwards to g4tequilas.com, which redirects to pkgdgroup.com/g4-tequila (Webflow).
The shop, shop.pkgdgroup.com, is Shopify (confirmed 2026-10-24: `Shopify.shop` present,
`/products.json` serves the catalog) with the Bottle Nexus cart embedded in the theme. So the
demo follows the Shopify pattern: their theme look, the native Shopify cart drawer and the
Shopify one-page checkout, with express checkout (Shop Pay, Apple Pay, Google Pay) in the cart
drawer and at the top of checkout. The AccelPay Shopify app takes over payments, taxes and
routing to licensed retailers. No third-party cart; the brand owns the customer data.

| Page | What it shows |
| --- | --- |
| `index.html` | Home, Tequila collection, story, "Find G4 near you" numbers, How this works, reordering and switching notes |
| `product.html?p=<handle>` | G4 Blanco, Reposado, High Proof, Madera, Añejo |
| `checkout.html` | Shopify one-page checkout: rates by address (in-state licensed retailers that stock every bottle in the cart, Gopuff about 30 minute delivery in Gopuff ZIPs for Blanco and Reposado), express checkout, AccelPay callouts |

Try the demo addresses on checkout: New York, Houston, Los Angeles (Gopuff), Scottsdale
(Gopuff), Wheeling IL, Washington DC.

## Real vs illustrative

Real:
- G4 products, images, copy and Shopify prices: shop.pkgdgroup.com products.json, 2026-10-24.
- Retailers with G4 in stock, cities and stock: ReserveBar/AccelPay retailer catalog (active,
  stock above zero, synced Sept 1 to Oct 24 2026) plus retailer inventory feeds (Liquor Barn,
  Main Street Liquor, Suds & Spirits). 245 retailers in total; the demo shows a few per state.
  Vista Wine & Spirits, Longhorn Wine and Spirits and Mashbill Wine & Spirits are excluded.
- Gopuff: 109 locations listing G4 in a live brand check on 2026-10-24, and their 1,049 delivery ZIPs.
- ReserveBar.com collection link.

Illustrative:
- G4 Añejo is not in the Shopify shop today. It is shown at $82.62, the most common network
  retailer price, because 27 retailers stock it.
- Shipping ($9.99) and delivery rates, tax (8.5%), payment fields. Nothing is charged.

Deploy: GitHub Pages serves `main`; a push is a deploy. Bump `?v=` on `styles.css` and
`app.js` when they change.

# Oracle Park Mappedin Extract

Local extraction of the public Oracle Park Mappedin venue data used by:

- `https://web.mappedin.com/mlb/mlb-san-francisco.html#/`
- route views such as section `228` to a destination node

## Main files

- `oracle-park-summary.json`
  - venue-wide counts, floor list, category list, and source URLs
- `section-228.json`
  - the extracted seat/section record for section `228`
- `food-and-drink-from-section-228.json`
  - all extracted food and drink destinations with node-level Mappedin route URLs from section `228`

## Raw source files

Saved under `raw/`:

- public location response
- public event response
- public map response
- public polygon response
- public theme response
- export bundle metadata
- downloaded venue bundle zips

## Extracted bundle folders

- `bundle/`
- `bundle-website/`

These contain the floor, node, connection, category, and location files used to build the derived JSON outputs.

## Refresh

Run:

```bash
node scripts/extract-oracle-park-mappedin.mjs
```

## Notes

- The bundle includes floors, categories, node graph data, and destination nodes.
- The current venue bundle did not expose usable operation hours for food stands.
- Route URLs use section `228` as the `from` value and each destination node as the `to` value.

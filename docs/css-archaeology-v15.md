# CSS Archaeology v15

This pass focused on Starter Kit CSS only.

## What changed

- Replaced the old override-heavy `public/css/30-pages/asr-ecosystem-alignment.css`.
- Removed obsolete hidden-nav patch rules from the final CSS layer because the layout no longer outputs those old links.
- Reduced `!important` usage in the alignment layer from 47 to 1.
- Kept the alignment layer loaded last so theme/profile CSS can still vary layout and presentation without drifting away from ASR proof-asset framing.
- Cleaned obsolete historical terminology in docs so old experimental names no longer show up in audits.

## Why this is safer than a full rewrite

The core CSS architecture remains intact:
- base
- layout
- components
- pages
- configurator
- responsive
- profile/theme CSS
- final ASR alignment layer

The pass removes unnecessary override weight without deleting the working configurator, industry themes, responsive behaviour, or ASR visual lock.


## Dead CSS handling

- Removed imports for redirected/non-primary `about`, `services`, and `faqs` page CSS from `public/css/index.css`.
- Moved those small legacy page CSS files into `docs/history/css-unused-v15/` rather than deleting them outright.

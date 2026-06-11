# Profile Switching

The starter kit is built around one shared Express/EJS codebase and multiple demo business profiles.

A profile controls the public identity of the demo site:

- business name
- owner/location details
- logo and images
- hero copy
- services
- projects
- testimonials
- FAQ content
- SEO descriptions
- theme key / page CSS

## Active profile

The active profile is selected with the `TEMPLATE_PROFILE` environment variable.

```env
TEMPLATE_PROFILE=asrWebServices
```

To preview another demo business, change the value and restart the app:

```env
TEMPLATE_PROFILE=restaurant
```

## Available profile examples

Common demo profiles include:

```text
asrWebServices
plasterer
restaurant
painter
photographer
lifeCoach
charity
accountant
consultant
solicitor
```

The full list is defined in `config/profileLoader.js`.

## Why this pattern is useful

This approach allows the same website structure to be reused across different small-business scenarios without duplicating controllers, layouts, routes, or page templates.

It is useful for:

- rapid proposal mockups
- niche-specific landing page demos
- small-business website starters
- early-stage client discovery
- reusable service and portfolio structures

## Adding a new profile

1. Create a new profile file under the most appropriate `modules/` folder.
2. Export a profile object matching the existing structure.
3. Import the profile in `config/profileLoader.js`.
4. Add it to the `profiles` map.
5. Set `TEMPLATE_PROFILE=<yourProfileKey>` in `.env`.
6. Restart the app and test the main pages.

Keep public demo profiles fictional unless you have explicit permission to use real branding or client material.

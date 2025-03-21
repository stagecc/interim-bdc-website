# Banner Content Management

This document outlines how to manage the content for the banners on the website. The banners are rendered in the layout component, and their content is stored in markdown files with YAML frontmatter.

## File Structure

Each banner has a corresponding markdown file placed in the `src/data/banners/` directory. The content for each banner is divided into two sections:

1. **Frontmatter**: This section contains metadata about the banner such as its variant, activation status, and importance.
2. **Body Content**: This section contains the content that will be displayed in the banner, written in markdown.


Banners are stored in markdown files in `src/data/banners/`. Each file contains:  

1. **Frontmatter** (YAML metadata):  
   - `variant`: Defines the banner style (`info`, `alert`).  
   - `active`: `true` to display, `false` to hide.  
   - `importance`: Lower numbers appear first when multiple banners are active.  

2. **Body Content**: Written in markdown, supporting text, links, lists, and images.  

## Example  
```yaml
---
variant: info
active: true
importance: 2
---
NHLBI BioData Catalyst® (BDC) supports data and analysis in a secure, FISMA-moderate environment.

[Learn more](https://grants.nih.gov/grants/guide/notice-files/NOT-OD-24-157.html).
```

## Managing Multiple Banners
You can manage multiple banners by creating several markdown files in the src/data/banners/ directory. Each file will be processed and rendered in the order determined by the importance field. If multiple banners are active, they will be displayed in ascending order of importance.

## Troubleshooting
- Ensure active: true.
- Check variant and importance.
- Verify correct markdown and YAML syntax.

For further issues, contact the dev team.
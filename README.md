# color-palettes
A sorting tool to help consolidate and identify like colors across Content, Xero,
MyXero, Payroll &amp; Practice Manager.

It seemed necessary to build a tool to help group colors so we can then create
shared variables for Sass Globals (which are to be consumed across all projects as desired).
Simultaneously it will help strip down the shitload of colors we have on file,
allowing design making and dev-building to be a better, more manageable and
collaborative experience.

### Features and what it does
- Uses jQuery/UI 'sortable' to drag and drop color swatches onto color palettes
to identify like color groups.
- Color swatches can be removed as well as dropped onto any other base palette.
(At this stage there is just one color swatch per hex value, therefore you can't
have multiple hex values shared across many palettes).
- Base color palettes can be added, reordered and removed.
- Base color palette background colors can be modified by typing in a different
hex value. This will automatically trigger/update the background-color of the
current base color you are working with, creating a new palette and/or color comparison.
- Base colors can be lightened or darkened by changing the input value from 0.
- Your work can be reset. It can also be saved, but only just once! (at this stage!).

### A few notes / potential TODO list
- Darkening your palette requires a negative integer, e.g. ` -80` will darken the
palette by 80%.
- Lightening your palette takes straight integer output e.g `80`, not `+80`.
- Duplicate color swatches in order to compare them across multiple color palettes.
- The lighten/darken feature does not calculate hue or saturation variation -
not really required for this project brief.
- Ability to save multiple copies to online file that can be previewed/edited
as and when needed.
- A lighten/darken slider per color palette would be cool.

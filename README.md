# Color-palettes
A sorting tool to help consolidate and identify like colors across Content, Xero,
MyXero, Payroll &amp; Practice Manager.

This is necessary in creating shared variables for Sass Globals which are to be
consumed across all projects (as desired).
Simultaneously it will help strip down the shitload of colors we have on file,
allowing design making and dev-building a better, more manageable and collaborative
experience.

## Features and what it does
- Uses jQuery/UI 'sortable' to drag and drop color swatches onto a base color.
- Base colors can be added as needed and modified by typing in a different hex value
which will automatically trigger/update the background-color of the current base
color you are working with, creating a new palette and/or color comparison.
- Base colors can be lightened or darkened by changing the input value from 0

## A few notes
- Darkening your palette requires a negative integer, e.g. ` -80` will darken the
palette by 80%.
- Lightening your palette takes straight interger output e.g no `+80` required.
- The lighten/darken feature does not calculate hue or saturation variation -
not really required for this project brief.

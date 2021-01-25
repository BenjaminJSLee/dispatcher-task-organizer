# Features
___
## Path finding
___
The path-finding for the driver-route is "half-optimized", to where the nearest points of interest are visited first (as long as they need to be visited, ex. an end point whose start point has not been visited will not be considered) and points will not be listed twice in a row. It is "half-optimized" because the proposed solution is not the most efficient one in terms of path decision making.
___
## Map styles
___
There are several additions to styles in how the markers/paths are displayed on the map:
- Once a movement is selected, the line for that movement is animated. It's markers are also placed above all others if there is overlap. Selecting a movement will pan you to said movement.

- Map markers and lines are labeled by color, pertaining to the movement it represents.

- The driver route is displayed on the map once the "route" tab option is selected, with a marker for each start/end point. Overlap of points is handled by adding to the existing marker's label instead of adding another marker.
___
## Bugs/Unfinished features
___
- When you edit a movement, it will be set to the front of the list of movements, and will also change the way the driver route is generated. This is half intentional, as I wanted a way to change the driver route but had not implemented it.

- The driver route is automatically generated using the first movement's start point coordinate as the starting point. I had hoped to make a way to choose the driver's start point but I ran out of time to do so.
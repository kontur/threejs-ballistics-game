# Grunt TODO


## src/js/CameraManager.js

-  **TODO** `(line 4)`  logic for not allowing the camera to penetrate the terrain, i.e. calculate the actual distance between
-  **TODO** `(line 7)`  keep minimum distance to lookat, for example when a projectile fires past the camera, it rotates too fast
-  **TODO** `(line 126)`  gradual and tweened rotation changes
-  **TODO** `(line 177)`  replace 0.1 with dynamic accelarerated / eased value
-  **TODO** `(line 295)`  speed up / ease in out

## src/js/Game.js

-  **TODO** `(line 50)`  instead of x,z -15 those should be behind the player FACING THE DIRECTION of other players (or previous
-  **TODO** `(line 56)`  eventually store each player's own last camera rotation and set it here when their turn starts
-  **TODO** `(line 64)`  plenty of AI and animation logic

## src/js/Player.AIPlayer.js

-  **TODO** `(line 6)`  player AI
-  **TODO** `(line 7)`  player AI difficulty
-  **TODO** `(line 8)`  automated aiming and firing animations
-  **TODO** `(line 57)`  make this an actual animation, not just a plain set operation
-  **TODO** `(line 65)`  take the distance from this player to target, then cycle through provious shots, take the one with closest distance
-  **TODO** `(line 73)`  factor of randomness based on a) difficulty and b) percentual distance to target of previous shot
-  **TODO** `(line 95)`  even without a reference shot, the first shot should, depending on difficulty level, still somewhat
-  **TODO** `(line 102)`  clamp values to allowed orientations and forces - vertify these work as intended

## src/js/Player.js

-  **TODO** `(line 98)`  prevent multiple simultaneous projectiles in the air
-  **TODO** `(line 99)`  projectile mass has no effect
-  **TODO** `(line 238)`  visually signify player having lost

## src/js/Projectile.js

-  **TODO** `(line 30)`  implement drag factor into update
-  **TODO** `(line 39)`  this is a dirty hack to not get the player hit its immediate surroundings nor its own bounding box
-  **TODO** `(line 73)`  right now this works by shooting a ray down the z axis, but more ideally this would be a ray to the next
-  **TODO** `(line 111)`  this now only checks if the position of the projectile is in the bounding box of the player target

## src/js/Scene.js

-  **NOTE** `(line 97)`  this just emulates the {} hit object, but does not correspond to a similar object as if
-  **TODO** `(line 115)`  low priority: instead of just using the projectile position, aquire a definite terrain
-  **TODO** `(line 123)`  BAD practise to have this event trigger on window :/

## src/js/Terrain.js

-  **TODO** `(line 46)`  make these parameteres and frequencies more random still

## src/js/Utils.js

-  **TODO** `(line 16)`  implement recursive search and recursive depth
-  **NOTE** `(line 45)`  There is the similar THREE.ArrowHelper(dir, origin, length, hex, headLength, headWidth)

# Tasks

Open follow-ups across the project. Not a backlog system — just one
honest list so things we explicitly defer don't get lost.

## Open

- **Galaxy: residual shake during search-focus.**
  Status: partially fixed (planet-scale stabilized; auto-rotate paused
  during focus). A small visual shimmer can still appear at the moment
  the lerp engages or when the planet itself drifts under the focus
  window. Suspected remaining cause: body lerp toward orbit target
  competing with camera lerp toward focus target. Try lowering
  body-side spring stiffness during a focus animation, or briefly
  freezing the focused body's position for the duration of the lerp.
  Owner: TBD. Files: `apps/galaxy/src/App.tsx`
  (search-focus block in `Scene`'s `useFrame`, plus the planet
  simulation body update).

## Done

(Move items here when closed, with a short note explaining the fix.)

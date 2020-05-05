import {
  trigger,
  transition,
  style,
  query,
  animateChild,
  group,
  animate
} from '@angular/animations';

export const routeTransitionAnimations = trigger('routeAnimations', [
  transition('* <=> *', [
    // Set a default  style for enter and leave
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          // left: 0,
          top: 0,
          width: '100%',
          opacity: 0.5
          // transform: 'scale(0) translateY(100%)'
        })
      ],
      { optional: true }
    ),
    // Animate the new page in
    query(
      ':enter',
      [
        animate(
          '300ms linear',
          style({
            opacity: 1
            // transform: 'scale(1) translateY(0)'
          })
        )
      ],
      { optional: true }
    )
  ])
]);

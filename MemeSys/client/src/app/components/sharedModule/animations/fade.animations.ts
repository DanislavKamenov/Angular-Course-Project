import { trigger, state, style, transition, animate } from '@angular/animations';

const fadeAnimations = [
    trigger('fade', [
        state('in', style({opacity: 1})),
        transition(':enter', [
            style({opacity: 0}),
            animate(600)
          ]),
          transition(':leave',
          animate(600, style({opacity: 0})))
    ])
];

export { fadeAnimations };
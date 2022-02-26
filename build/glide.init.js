var glidePeek = new Glide('.peek', {
  type: 'carousel',
  animationDuration: 500,
  autoplay: 3000,
  hoverpause: true,
  gap: 16,
  focusAt: '1',
  startAt: 1,
  perView: 2,
  breakpoints: {
    680: {
      perView: 1,
    },
  },
  // set a value to show the previous and next slides peeking in
  peek: {
    before: 35,
    after: 0,
  },
});

glidePeek.mount();

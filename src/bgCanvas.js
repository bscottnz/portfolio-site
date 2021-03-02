const canvasDotsBg = function () {
  const canvas = document.querySelector('.canvas-2'),
    ctx = canvas.getContext('2d'),
    colorDot = [
      'rgb(81, 162, 233)',
      'rgb(81, 162, 233)',
      'rgb(81, 162, 233)',
      'rgb(255, 77, 90)',
    ], // 75% of dots are blue. 25% pink
    color = 'rgb(81, 162, 233)';

  // ctx.globalAlpha = 0.8;
  canvas.width = document.body.scrollWidth;
  canvas.height = window.innerHeight;
  canvas.style.display = 'block';
  // ctx.fillStyle = colorDot;
  // ctx.fillStyle = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
  ctx.lineWidth = 0.3;
  ctx.strokeStyle = color;

  let mousePosition = {
    x: (30 * canvas.width) / 100,
    y: (30 * canvas.height) / 100,
  };

  const windowSize = window.innerWidth;
  let dots;

  if (windowSize > 1600) {
    dots = {
      nb: 100,
      distance: 0,
      d_radius: 0,
      array: [],
    };
  } else if (windowSize > 1300) {
    dots = {
      nb: 75,
      distance: 0,
      d_radius: 0,
      array: [],
    };
  } else if (windowSize > 1100) {
    dots = {
      nb: 50,
      distance: 0,
      d_radius: 0,
      array: [],
    };
  } else if (windowSize > 800) {
    dots = {
      nb: 1,
      distance: 0,
      d_radius: 0,
      array: [],
    };
    ctx.globalAlpha = 0;
  } else if (windowSize > 600) {
    dots = {
      nb: 1,
      distance: 0,
      d_radius: 0,
      array: [],
    };

    ctx.globalAlpha = 0;
  } else {
    dots = {
      nb: 1,
      distance: 0,
      d_radius: 0,
      array: [],
    };

    ctx.globalAlpha = 0;
  }

  // decided to turn off connecting dots under 1100px

  // } else if (windowSize > 650) {
  //   dots = {
  //     nb: 400,
  //     distance: 50,
  //     d_radius: 185,
  //     array: [],
  //   };
  // } else if (windowSize > 500) {
  //   dots = {
  //     nb: 325,
  //     distance: 45,
  //     d_radius: 170,
  //     array: [],
  //   };
  // } else {
  //   dots = {
  //     nb: 270,
  //     distance: 45,
  //     d_radius: 140,
  //     array: [],
  //   };
  // }

  function Dot() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;

    this.vx = -0.5 + Math.random();
    this.vy = -0.5 + Math.random();

    this.radius = Math.random() * 1.5;

    // this.colour = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
    this.colour = colorDot[Math.floor(Math.random() * colorDot.length)];
  }

  Dot.prototype = {
    create: function () {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      // ctx.fillStyle = this.colour;

      // meed to acount for scroll height since the bg is static and uses mouse position
      const top =
        (window.pageYOffset || document.scrollTop) - (document.clientTop || 0);

      // make the dot colour fade out the further they are from the mouse

      const dotDistance =
        ((this.x - mousePosition.x) ** 2 +
          (this.y - mousePosition.y + top) ** 2) **
        0.5;
      const distanceRatio = dotDistance / (windowSize / 2);

      // this chops the bracket off the rgb colour and ads an opacity
      ctx.fillStyle = this.colour.slice(0, -1) + `,${1 - distanceRatio})`;
      // ctx.fillStyle = this.colour;

      ctx.fill();
    },

    animate: function () {
      // dont animate the first dot, it will follow mouse
      for (let i = 1; i < dots.nb; i++) {
        const dot = dots.array[i];

        if (dot.y < 0 || dot.y > canvas.height) {
          dot.vx = dot.vx;
          dot.vy = -dot.vy;
        } else if (dot.x < 0 || dot.x > canvas.width) {
          dot.vx = -dot.vx;
          dot.vy = dot.vy;
        }
        dot.x += dot.vx;
        dot.y += dot.vy;
      }
    },

    line: function () {
      for (let i = 0; i < dots.nb; i++) {
        for (let j = 0; j < dots.nb; j++) {
          const i_dot = dots.array[i];
          const j_dot = dots.array[j];

          if (
            i_dot.x - j_dot.x < dots.distance &&
            i_dot.y - j_dot.y < dots.distance &&
            i_dot.x - j_dot.x > -dots.distance &&
            i_dot.y - j_dot.y > -dots.distance
          ) {
            if (
              i_dot.x - mousePosition.x < dots.d_radius &&
              i_dot.y - mousePosition.y < dots.d_radius &&
              i_dot.x - mousePosition.x > -dots.d_radius &&
              i_dot.y - mousePosition.y > -dots.d_radius
            ) {
              ctx.beginPath();
              ctx.moveTo(i_dot.x, i_dot.y);
              ctx.lineTo(j_dot.x, j_dot.y);

              // make the fill colour fade out the further you are from the mouse
              const dotDistance =
                ((i_dot.x - mousePosition.x) ** 2 +
                  (i_dot.y - mousePosition.y) ** 2) **
                0.5;
              let distanceRatio = dotDistance / dots.d_radius;

              // make it so it doesnt fade out completely
              distanceRatio -= 0.3;
              if (distanceRatio < 0) {
                distanceRatio = 0;
              }

              ctx.strokeStyle = `rgb(81, 162, 233, ${1 - distanceRatio})`;

              ctx.stroke();
              ctx.closePath();
            }
          }
        }
      }
    },
  };

  function createDots() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < dots.nb; i++) {
      dots.array.push(new Dot());
      var dot = dots.array[i];

      dot.create();
    }

    // first dot to be relativley large
    dots.array[0].radius = 1.5;

    // first dot to be blue
    dots.array[0].colour = '#51a2e9';

    // dot.line();
    dot.animate();
  }

  // window.onmousemove = function (parameter) {
  //   mousePosition.x = parameter.pageX;
  //   mousePosition.y = parameter.pageY;

  //   // sometimes if the mouse is off screen on refresh, it bugs out
  //   try {
  //     // want the first dot to follow the mouse
  //     dots.array[0].x = parameter.pageX;
  //     dots.array[0].y = parameter.pageY;
  //   } catch {
  //     //
  //   }
  // };

  window.onscroll = function (parameter) {
    mousePosition.x = window.innerWidth / 2;
    mousePosition.y = window.innerHeight / 2;

    const top =
      (window.pageYOffset || document.scrollTop) - (document.clientTop || 0);
    mousePosition.y += top;
    // console.log(top);

    // console.log(mousePosition.x);
  };

  // mousePosition.x = window.innerWidth / 2;
  // mousePosition.y = window.innerHeight / 2;

  const draw = setInterval(createDots, 1000 / 30);

  window.onresize = function () {
    clearInterval(draw);
    canvasDotsBg();

    // console.log('yoza');
  };
};

export default canvasDotsBg;

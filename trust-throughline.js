/* The throughline — a glowing gold line that emanates from the TRUST chip
   and weaves down the page, drawing itself as you scroll and lighting a node
   beside each trust-related section. Pure SVG, no dependencies. */
(function () {
  var origin = document.getElementById('trust-origin');
  var page = document.querySelector('.page');
  if (!origin || !page) return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var NS = 'http://www.w3.org/2000/svg';

  var svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('class', 'throughline-svg');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('preserveAspectRatio', 'none');

  var path = document.createElementNS(NS, 'path');
  path.setAttribute('class', 'tl-path');
  svg.appendChild(path);

  var nodeEls = Array.prototype.slice.call(document.querySelectorAll('[data-trust-node]'));
  var circles = nodeEls.map(function () {
    var c = document.createElementNS(NS, 'circle');
    c.setAttribute('class', 'tl-node');
    c.setAttribute('r', '4.5');
    svg.appendChild(c);
    return c;
  });

  document.body.insertBefore(svg, document.body.firstChild);

  var len = 0, startY = 0, endY = 0, built = false;

  function smooth(p) {
    if (p.length < 2) return '';
    var d = 'M ' + p[0].x.toFixed(1) + ' ' + p[0].y.toFixed(1);
    for (var i = 0; i < p.length - 1; i++) {
      var p0 = p[i - 1] || p[i], p1 = p[i], p2 = p[i + 1], p3 = p[i + 2] || p2;
      var c1x = p1.x + (p2.x - p0.x) / 6, c1y = p1.y + (p2.y - p0.y) / 6;
      var c2x = p2.x - (p3.x - p1.x) / 6, c2y = p2.y - (p3.y - p1.y) / 6;
      d += ' C ' + c1x.toFixed(1) + ' ' + c1y.toFixed(1) + ', ' +
                   c2x.toFixed(1) + ' ' + c2y.toFixed(1) + ', ' +
                   p2.x.toFixed(1) + ' ' + p2.y.toFixed(1);
    }
    return d;
  }

  function build() {
    var W = document.documentElement.clientWidth;
    var H = document.documentElement.scrollHeight;
    svg.setAttribute('width', W);
    svg.setAttribute('height', H);
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    svg.style.height = H + 'px';

    var sy = window.scrollY || window.pageYOffset;
    var pts = [];
    var or = origin.getBoundingClientRect();
    pts.push({ x: or.left + or.width / 2, y: or.top + sy + or.height / 2 });

    nodeEls.forEach(function (el, i) {
      var r = el.getBoundingClientRect();
      var y = r.top + sy + r.height / 2;
      var off = (i % 2 === 0) ? -20 : -34;
      var x = Math.max(7, r.left + off);
      pts.push({ x: x, y: y });
      circles[i]._y = y;
      circles[i].setAttribute('cx', x);
      circles[i].setAttribute('cy', y);
    });

    path.setAttribute('d', smooth(pts));
    len = path.getTotalLength();
    path.style.strokeDasharray = len;
    startY = pts[0].y;
    endY = pts[pts.length - 1].y;
    built = true;

    if (reduce) {
      path.style.strokeDashoffset = 0;
      circles.forEach(function (c) { c.classList.add('lit'); });
    } else {
      update();
    }
  }

  function update() {
    if (!built || endY <= startY) return;
    var head = (window.scrollY || window.pageYOffset) + window.innerHeight * 0.5;
    var p = Math.max(0, Math.min(1, (head - startY) / (endY - startY)));
    path.style.strokeDashoffset = len * (1 - p);
    circles.forEach(function (c) {
      if (head >= c._y - 4) c.classList.add('lit');
      else c.classList.remove('lit');
    });
  }

  var ticking = false;
  function onScroll() {
    if (reduce || !built || ticking) return;
    ticking = true;
    requestAnimationFrame(function () { update(); ticking = false; });
  }

  var rt;
  function onResize() { clearTimeout(rt); rt = setTimeout(build, 150); }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize);
  window.addEventListener('load', build);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(build);
  build();
})();

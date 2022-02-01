const DEG_TO_RAD = Math.PI / 180;

function rotate(x, y, radius, degrees) {
  const cosA = Math.cos(degrees * DEG_TO_RAD);
  const sinA = Math.sin(degrees * DEG_TO_RAD);
  const x1 = x + radius*cosA;
  const y1 = y + radius*sinA;
  return [x1, y1];
}

class TreeBranch {
  #x;
  #y;
  #length;
  #angle;
  #hue;

  constructor(x, y, length, angle, hue) {
    this.#x = x;
    this.#y = y;
    this.#length = length;
    this.#angle = angle;
    this.#hue = hue;
  }

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  get length() {
    return this.#length;
  }

  get angle() {
    return this.#angle;
  }

  get hue() {
    return this.#hue;
  }
}

class TreeFractal {
  #lengthRatio;
  #angleDelta;
  #hueDelta;
  #maxDepth;
  #branches = [];

  constructor(trunkLength, {
    trunkAngle = -90,
    trunkHue = 0,
    lengthRatio = 0.6,
    angleDelta = 45,
    hueDelta = 10,
    maxDepth = 11,
  } = {}) {
    this.#lengthRatio = lengthRatio;
    this.#angleDelta = angleDelta;
    this.#maxDepth = maxDepth;

    this.#branches.push(new TreeBranch(trunkX, trunkY, trunkLength, trunkAngle, trunkHue));
  }

  iterate() {
    if (this.#branches.length >= this.#maxDepth) {
      return false;
    }

    const currentBranch = this.#branches.last();
    const newLength = currentBranch.length * this.#lengthRatio;
    const newHue = (currentBranch.hue + this.#hueDelta) % 360;
    const [x1, y1] = rotate(
      currentBranch.x,
      currentBranch.y,
      currentBranch.length,
      currentBranch.angle
    );

    const leftBranch = new TreeBranch(
      x1,
      y1,
      newLength,
      currentBranch.angle - this.#angleDelta,
      newHue
    );
    const rightBranch = new TreeBranch(
      x1,
      y1,
      newLength,
      currentBranch.angle + this.#angleDelta,
      newHue
    );
    this.#branches.push(leftBranch);
    this.#branches.push(rightBranch);

    return true;
  }

  draw(ctx) {
    if (this.#branches.length === 0) {
      return false;
    }

    const branch = this.#branches.shift();
    const [x1, y1] = rotate(branch.x, branch.y, branch.length, branch.angle);

    ctx.strokeStyle = `hsl(${branch.hue}, 100%, 50%)`;
    ctx.beginPath();
    ctx.moveTo(branch.x, branch.y);
    ctx.lineTo(x1, y1);
    ctx.stroke();

    return true;
  }
}

function window_onLoad() {
  const cvs = document.getElementById('cvs');
  function window_onResize() {
    cvs.width = cvs.parentElement.clientWidth;
    cvs.height = cvs.parentElement.clientHeight;
  }
  window_onResize();
  window.addEventListener('resize', window_onResize);
}

window.addEventListener('load', window_onLoad);


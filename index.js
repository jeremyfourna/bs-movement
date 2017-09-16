const R = require('ramda');
const d3 = Object.assign({}, require('d3-selection'), require('d3-transition'));

const mapIndexed = R.addIndex(R.map);

function moveFromTo(origin, destination, speed, waitingTime, elementClassName) {
  const element = d3.select(elementClassName);
  const translateX = R.subtract(
    R.prop('x', destination),
    R.prop('x', origin)
  );
  const translateY = R.subtract(
    R.prop('y', destination),
    R.prop('y', origin)
  );
  element.transition()
    .delay(waitingTime)
    .duration(speed)
    .attr('transform', `translate(${translateX},${translateY})`);
}

function movePlayerFromTo(origin, destination, waitingTime, elementClassName) {
  moveFromTo(origin, destination, 2000, waitingTime, elementClassName);
}

function moveBallFromTo(origin, destination, waitingTime, elementClassName) {
  moveFromTo(origin, destination, 500, waitingTime, elementClassName);
}

function playMovements(movementsList) {
  mapIndexed((cur) => {
    if (R.equals(R.head(cur), 'moveBallFromTo')) {
      R.apply(moveBallFromTo, R.tail(cur));
    } else {
      R.apply(movePlayerFromTo, R.tail(cur));
    }
  }, movementsList);
}

exports.playMovements = playMovements;

'use strict';

function applyCalculateAverage() {
  /**
   *
   * @param {Object} options - optional
   */
  [].__proto__.calculateAverage = function(options) {
    if (options === undefined) {
      return this.reduce((a, c) => a + c, 0) / this.length;
    } else if (typeof options === 'string'
    || options === null
    || typeof options.accumulator === 'string'
    || (!this.some((el) => el
      .hasOwnProperty(options.propertyName)) && options.propertyName)) {
      return;
    }

    const property = options.propertyName;
    const itemsSum = options.accumulator
    || ((sum, current) => sum + current[property]);
    let average;

    if (this.some((el) => el.hasOwnProperty(property)) && property) {
      const filteredItems = this.filter(el => el.hasOwnProperty(property));

      average = filteredItems.reduce(itemsSum, 0) / filteredItems.length;

      return !Number.isNaN(average) ? average : undefined;
    } else if (options.accumulator) {
      average = this.map(options.accumulator);

      return average.reduce((a, c) => a + c, 0) / average.length;
    }
  };
}

module.exports = applyCalculateAverage;

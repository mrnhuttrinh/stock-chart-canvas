import _ from 'lodash';

const OPEN_KEY = '1. open';
const HIGH_KEY = '2. high';
const LOW_KEY = '3. low';
const CLOSE_KEY = '4. close';
const VOLUME_KEY = '5. volume';

class DrawChart {

  canvas = null;
  ctx = null;
  data = null;
  leftPadding = 50;
  rightPadding = 20;
  topPadding = 20;
  bottomPadding = 20;
  min = 0;
  max = 0;
  minData = 0;
  maxData = 0;
  realDistance = 0;
  backgroundColor = '#E4E4E4';
  lineWidth = 0.3;
  distanceTwoColumn = 20;

  constructor(id) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
    this.fillColor();
    this.drawYaxis();
    this.drawXaxis();
  }

  fillColor() {
    if (this.ctx) {
      this.ctx.fillStyle = this.backgroundColor;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    return this;
  }

  drawYaxis() {
    if (this.ctx) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.leftPadding, this.topPadding);
      this.ctx.lineTo(this.leftPadding, this.canvas.height - this.bottomPadding);
      this.ctx.lineWidth = this.lineWidth;
      this.ctx.stroke();
      this.ctx.closePath();
    }
    return this;
  }

  drawXaxis() {
    if (this.ctx) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.leftPadding, this.canvas.height - this.bottomPadding);
      this.ctx.lineTo(this.canvas.width - this.rightPadding, this.canvas.height - this.bottomPadding);
      this.ctx.lineWidth = this.lineWidth;
      this.ctx.stroke();
      this.ctx.closePath();
    }
    return this;
  }

  getMinY() {
    if (this.data.length) {
      return _.reduce(this.data, (min, da) => {
        return da.low < min ? da.low : min;
      }, this.data[0].low)
    }
    return 0;
  }
  getMaxY() {
    if (this.data.length) {
      return _.reduce(this.data, (max, da) => {
        return da.high > max ? da.high : max;
      }, this.data[0].high)
    }
    return 0;
  }

  getClosestMax(number, distance) {
    let resultValue = distance;
    let topValue = 10;
    while (number >= topValue) {
      resultValue = Math.floor(number / topValue) * topValue + distance;
      topValue *= 10;
    }
    return resultValue;
  }

  getClosestMin(number, distance) {
    let resultValue = distance;
    let lowValue = 10;
    while (number >= lowValue) {
      resultValue = Math.floor(number / lowValue) * lowValue;
      lowValue *= 10;
    }
    return resultValue;
  }

  drawYLevel(min, max) {
    const bullRepeat = (max - min) / 10;
    let times = 0;

    const bottomPoint = this.canvas.height - this.bottomPadding;
    const leftPoint = this.leftPadding - 10;
    const totalHeightCanbeDraw = this.canvas.height - this.bottomPadding - this.topPadding;

    const margin = (`${max}`.length > `${min}`.length ? `${max}`.length : `${min}`.length) * 8 + 4;

    _.times(11, () => {
      this.ctx.beginPath();

      const x1 = leftPoint;
      const y1 = bottomPoint - (times * (totalHeightCanbeDraw / 10));
      this.ctx.moveTo(x1, y1);

      const x2 = this.leftPadding;
      const y2 = bottomPoint - (times * (totalHeightCanbeDraw / 10));
      this.ctx.lineTo(x2, y2);

      this.ctx.lineWidth = 0.3;
      this.ctx.stroke();
      this.ctx.closePath();

      if ((max - min)) {
        const value = Number.isInteger(min) ? min : min.toFixed(1);
        const textValue = `${value + bullRepeat * times}`;
        this.ctx.fillStyle = '#000';
        this.ctx.font = "12px serif";
        this.ctx.fillText(textValue, x1 - margin, y1 + 5);
      }

      times += 1;
    });
  }

  drawValue(pointData, x1, x2, YAxisLength) {
    const high = Math.abs(pointData.high - this.maxData) / (this.realDistance) * YAxisLength;
    const low = Math.abs(pointData.low - this.minData) / (this.realDistance) * YAxisLength;
    this.ctx.beginPath();

    if (pointData.open > pointData.close) {
      // down
      this.ctx.strokeStyle = '#FF0000';
    } else {
      // up
      this.ctx.strokeStyle = '#008000';
    }
    const y1 = this.topPadding + high;
    this.ctx.moveTo(x1, y1);
    const y2 = this.canvas.height - this.bottomPadding - low;
    this.ctx.lineTo(x2, y2);
    this.ctx.lineWidth = 2;
    this.ctx.stroke();

    // draw open
    const open = Math.abs(pointData.open - this.maxData) / (this.realDistance) * YAxisLength;
    const yOpen = this.topPadding + open;
    this.ctx.moveTo(x1, yOpen);
    this.ctx.lineTo(x2 - 7, yOpen);
    this.ctx.lineWidth = 2;
    this.ctx.stroke();

    // draw close
    const close = Math.abs(pointData.close - this.maxData) / (this.realDistance) * YAxisLength;
    const yClose = this.topPadding + close;
    this.ctx.moveTo(x1, yClose);
    this.ctx.lineTo(x2 + 7, yClose);
    this.ctx.lineWidth = 2;
    this.ctx.stroke();

    this.ctx.closePath();
  }

  drawValueColumn() {
    const vaccum = 20;
    const leftPoint = this.leftPadding + vaccum;
    const YAxisLength = this.canvas.height - this.bottomPadding - this.topPadding;

    _.forEach(this.data, (da, index) => {
      this.ctx.beginPath();

      const x1 = leftPoint + (index * vaccum);
      const y1 = this.topPadding;
      this.ctx.moveTo(x1, y1);

      const x2 = leftPoint + (index * vaccum);
      const y2 = this.canvas.height - this.bottomPadding;
      this.ctx.lineTo(x2, y2);

      this.ctx.lineWidth = this.lineWidth;
      this.ctx.strokeStyle = '#000';
      this.ctx.stroke();
      this.ctx.closePath();

      this.drawValue(da, x1, x2, YAxisLength);
    });
  }

  getLevelUp(number) {
    if (number < 10) {
      return 10;
    }
    let topValue = 10;
    while (number >= topValue) {
      topValue *= 10;
    }
    if (number === topValue) return number;
    return Math.ceil(number/(topValue / 10)) * (topValue / 10);
  }

  draw(data) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.fillColor();
    this.drawYaxis();
    this.drawXaxis();

    const totalWithCanbeDraw = (this.canvas.width - this.rightPadding - this.leftPadding) / this.distanceTwoColumn;

    this.data = _.map(_.take(_.values(data), totalWithCanbeDraw), da => {
      return {
        open: parseFloat(da[OPEN_KEY]),
        high: parseFloat(da[HIGH_KEY]),
        low: parseFloat(da[LOW_KEY]),
        close: parseFloat(da[CLOSE_KEY]),
        volume: parseFloat(da[VOLUME_KEY]),
      }
    });
    const maxValue = parseFloat(this.getMaxY());
    const minValue = parseFloat(this.getMinY());

    this.minData = minValue;
    this.maxData = maxValue;

    const realDistance = maxValue - minValue;
    this.realDistance = realDistance;
    const distance = this.getLevelUp(realDistance);
    if (realDistance >= 10) {
      this.min = this.getClosestMin(minValue, distance);
      this.max = this.getClosestMax(maxValue, distance);
    } else {
      this.min = Math.floor(minValue);
      this.max = Math.ceil(maxValue);
    }
    this.drawYLevel(this.min, this.max);
    this.drawValueColumn();
  }
}

export default DrawChart;
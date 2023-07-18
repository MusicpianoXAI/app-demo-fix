function makeRectangle() {
    var x = document.createElement("CANVAS");
    var ctx = x.getContext("2d");
    ctx.fillStyle = "#e9d3ff";
    ctx.fillRect(20, 20, 40, 10);
    document.body.appendChild(x);
  }

  export default makeRectangle;
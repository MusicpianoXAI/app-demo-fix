fetch("https://www.verovio.org/examples/downloads/Schubert_Lindenbaum.mei")
  .then( (response) => response.text() )
  .then( (meiXML) => {
    let svg = tk.renderData(meiXML, {});
    document.getElementById("notation").innerHTML = svg;
  });
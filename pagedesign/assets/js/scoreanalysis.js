document.addEventListener("DOMContentLoaded", (event) => {
    verovio.module.onRuntimeInitialized = function () {
        // This line initializes the Verovio toolkit
        const tk = new verovio.toolkit();
        tk.setOptions({
            scale:50,
            scaleToPageSize: true,
            landscape: true,
            adjustPageWidth: true,
            header: 'none', footer: 'none',
            pageHeight: '1400',
            PageWidth: '300'
          });

        document.getElementById("saveMEI").addEventListener("click", (event) => {
            let meiContent = tk.getMEI();
            var myBlob = new Blob([meiContent], {type: "application/xml"});
            saveAs(myBlob, "meifile.mei");
        });

        fetch("assets/score/Beethoven_WoO80_thema_8bars_Score_1.musicxml")
            .then( (response) => response.text() )
            .then( (meiXML) => {
                tk.loadData(meiXML);
                let svg = tk.renderToSVG(1);
                document.getElementById("notation").innerHTML = svg;

                // Get all the rests by selecting <g> with attribute class 'rest' ...
                let rests = document.querySelectorAll('g.rest');
                // ... and change their color by setting their style.fill value
                for (let rest of rests) {
                    rest.style.fill = "dodgerblue";
                }

                // Get all the notes and change first note
                let notes = document.querySelectorAll("g.note");
                notes[0].style.fill = 'aqua';
                notes[3].style.fill = 'aqua';
            }).catch(e => {
                console.log("An error occurred when loading the file!");
                console.log(e);
            });
        }
    });
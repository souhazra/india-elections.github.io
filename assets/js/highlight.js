async function bc1(url, no, id) {
    let plotData = [];
    const response = await fetch(url);
    let data = await response.text();
    console.log(data);
    const d = data.split('\n').splice(1);
    console.log(d)

    let t = d[no].split(',');
    console.log(t)


    const newObj = {};

    newObj.x = ["male", "female", "third gender"];
    newObj.y = [t[1], t[2], t[3]];
    newObj.type = "bar";


    plotData.push(newObj);

    const layout = {
        title: t[0],
        showlegend: false,
        automargin: true,
        legend: {
            "orientation": "h",
            x: 0,
            y: -0.3
        },
        font: {
            family: 'Lato, sans-serif',
            color: 'rgba(245,246,249,1)'
        },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)'
    };
    const config = {
        responsive: true,
        displayModeBar: false
    };


    Plotly.newPlot(id, plotData, layout, config);
}


async function pc1(url, no, id) {
    let plotData = [];
    const response = await fetch(url);
    let data = await response.text();
    const d = data.split(';').splice(1);
    // console.log(d)

    let t = d[no].split("\n").splice(1);
    // console.log(t)


    const newObj = {};

    newObj.labels = t[1].split(',').splice(1);
    newObj.values = t[2].split(',').splice(1);
    newObj.type = "pie";

    for(let i = 1; i < t.length; i++) {

    }


    plotData.push(newObj);

    const layout = {
        title: t[1].split(',')[0],
        showlegend: true,
        automargin: true,
        legend: {
            "orientation": "h",
            x: 0,
            y: -0.5
        },
        font: {
            family: 'Lato, sans-serif',
            color: 'rgba(245,246,249,1)'
        },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)'
    };
    const config = {
        responsive: true,
        displayModeBar: false
    };


    Plotly.newPlot(id, plotData, layout, config);
}


bc1("./datasets/csv/Highlight.csv", 0, "hl1");
bc1("./datasets/csv/Highlight.csv", 1, "hl2");
bc1("./datasets/csv/Highlight.csv", 2, "hl3");
pc1("./datasets/csv/Highlight.csv", 0, "hl4");

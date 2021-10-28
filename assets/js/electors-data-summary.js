async function pc1(url, no, id) {
    let plotData = [];
    const response = await fetch(url);
    let data = await response.text();
    const dataset = data.split("@").splice(1);
    const row = dataset[no];
    const d = row.split(',').splice(1);
    // console.log(d)
    // console.log(dataset)


    const newObj = {};

    newObj.values = [];
    newObj.labels = ["General", "SC", "ST"];
    newObj.hole = 0.4;
    newObj.type = "pie";

    for (let i = 1; i < d.length - 1; i++) {
        newObj.values.push(d[i]);
    }

    plotData.push(newObj);

    const layout = {
        title: d[0],
        showlegend: true,
        automargin: true,
        legend: {
            "orientation": "h",
            x: 0,
            y: 1.5
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


async function pc2(url, no, id) {
    let plotData = [];
    const response = await fetch(url);
    let data = await response.text();
    const dataset = data.split("@").splice(1);
    const row = dataset[no];
    const d = row.split('\r\n').splice(1);
    // console.log(d)
    // console.log(dataset)


    const newObj = {};

    newObj.values = [];
    newObj.labels = [];
    newObj.hole = 0.4;
    newObj.type = "pie";

    for (let i = 1; i < d.length - 1; i++) {
        let t = d[i].split(",");
        newObj.values.push(t[5]);
        newObj.labels.push(t[1]);
    }

    plotData.push(newObj);

    const layout = {
        title: d[0],
        showlegend: true,
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


async function bc1(url, no, id) {
    let plotData = [];
    const response = await fetch(url);
    let data = await response.text();
    const d = data.split('\r\n').splice(1);
    // console.log(d)

    let t = d[no].split(",");
    // console.log(t)


    const newObj = {};

    newObj.x = ["male", "female", "third gender"];
    newObj.y = [t[1], t[2], t[3]];
    newObj.hole = 0.4;
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


pc1("./datasets/csv/Electors_Data_Summary.csv", 0, "eds1");
pc1("./datasets/csv/Electors_Data_Summary.csv", 6, "eds2");
pc1("./datasets/csv/Electors_Data_Summary.csv", 7, "eds3");
pc1("./datasets/csv/Electors_Data_Summary.csv", 8, "eds4");
pc1("./datasets/csv/Electors_Data_Summary.csv", 9, "eds5");
pc1("./datasets/csv/Electors_Data_Summary.csv", 10, "eds6");
pc2("./datasets/csv/Electors_Data_Summary.csv", 1, "eds7");
pc2("./datasets/csv/Electors_Data_Summary.csv", 2, "eds8");
pc2("./datasets/csv/Electors_Data_Summary.csv", 3, "eds9");
pc2("./datasets/csv/Electors_Data_Summary.csv", 4, "eds10");
pc2("./datasets/csv/Electors_Data_Summary.csv", 5, "eds11");
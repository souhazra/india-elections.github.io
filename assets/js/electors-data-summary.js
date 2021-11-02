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


async function bc1(url, no, id) {
    let plotData = [];
    const response = await fetch(url);
    let data = await response.text();
    const dataset = data.split("@").splice(1);
    const row = dataset[no];
    const d = row.split('\n').splice(1);
    // console.log(d)
    // console.log(dataset)
    
    console.log(d)


    for (let i = 1; i < d.length - 1; i++) {
        const newObj = {};

        newObj.y = [];
        newObj.x = ['Gen', 'SC', 'ST', 'Total'];
        newObj.type = "bar";

        let t = d[i].split(",").splice(1);
        console.log(t)
        newObj.name = t[0];
        for (let j = 1; j <= t.length; j++) {
            newObj.y.push(t[j]);
        }
        plotData.push(newObj);
    }


    let T = d[0].split(',');

    const layout = {
        title: T[1],
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


pc1("./datasets/csv/Electors_Data_Summary.csv", 0, "eds1");
pc1("./datasets/csv/Electors_Data_Summary.csv", 6, "eds2");
pc1("./datasets/csv/Electors_Data_Summary.csv", 7, "eds3");
pc1("./datasets/csv/Electors_Data_Summary.csv", 8, "eds4");
pc1("./datasets/csv/Electors_Data_Summary.csv", 9, "eds5");
pc1("./datasets/csv/Electors_Data_Summary.csv", 10, "eds6");
bc1("./datasets/csv/Electors_Data_Summary.csv", 1, "eds7");
bc1("./datasets/csv/Electors_Data_Summary.csv", 2, "eds8");
bc1("./datasets/csv/Electors_Data_Summary.csv", 3, "eds9");
bc1("./datasets/csv/Electors_Data_Summary.csv", 4, "eds10");
bc1("./datasets/csv/Electors_Data_Summary.csv", 5, "eds11");
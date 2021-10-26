const colours = { BJP: "rgb(255, 165, 0)", AITC: "rgb(0,255,0)", NOTA: "rgb(255,0,0)", IND: "rgb(0,0,255)", RSSCMJP: "rgb(0,255,255)" }


async function pieChart(url, ac_n, id) {
    let plotData = [];
    const response = await fetch(url);
    let data = await response.json();
    const dataset = data.filter(el => el["AC NAME"] === ac_n);


    const newObj = {};

    newObj.values = [];
    newObj.labels = [];
    newObj.marker = { colors: [] }
    newObj.hole = 0.4;
    let count = 0;
    newObj.type = "pie";

    dataset.forEach(element => {
        if (element["PARTY"] === "AITC" || element["PARTY"] === "BJP" || element["PARTY"] === "NOTA" || element["PARTY"] === "RSSCMJP" || element["PARTY"] === "IND") {
            newObj.values.push(element.TOTAL);
            newObj.labels.push(`${element["CANDIDATE NAME"]}(${element["PARTY"]})`);
            newObj.marker.colors.push(colours[element.PARTY])
        } else {
            count += element.TOTAL;
        }
    });
    newObj.values.push(count);
    newObj.labels.push("OTHER");
    newObj.marker.colors.push("rgb(128,128,128)");

    plotData.push(newObj);

    const layout = {
        showlegend: true,
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

async function pc1(url, no, id) {
    let plotData = [];
    const response = await fetch(url);
    let data = await response.text();
    const dataset = data.split("@").splice(1);
    const row = dataset[no];
    const d = row.split(',').splice(1);
    console.log(d)
    console.log(dataset)


    const newObj = {};

    newObj.values = [];
    newObj.labels = ["General", "SC", "ST"];
    newObj.hole = 0.4;
    newObj.type = "pie";

    for(let i = 1; i < d.length - 1; i++){
        newObj.values.push(d[i]);
    }

    plotData.push(newObj);

    const layout = {
        title: d[0],
        showlegend: true,
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
async function pc2(url, id) {
    let plotData = [];
    const response = await fetch(url);
    let data = await response.text();
    const dataset = data.split("@").splice(1);
    const row = dataset[1];
    const d = row.split('\r\n').splice(1);
    // console.log(d)
    // console.log(dataset)


    const newObj = {};

    newObj.values = [];
    newObj.labels = [];
    newObj.hole = 0.4;
    newObj.type = "pie";

    for(let i = 1; i < d.length - 1; i++){
        let t = d[i].split(",");
        newObj.values.push(t[5]);
        newObj.labels.push(t[1]);
    }

    plotData.push(newObj);

    const layout = {
        title: d[0],
        showlegend: true,
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

async function traces(url, party) {
    const response = await fetch(url);
    let data = await response.json();
    const dataset = data.filter(el => el["PARTY"] === party);

    const newObj = {};

    newObj.x = [];
    newObj.y = [];
    newObj.orientation = 'h';
    newObj.type = 'bar';
    newObj.name = party;
    dataset.forEach(element => {
        newObj.x.unshift(element["% VOTES POLLED"]);
        newObj.y.unshift(element["AC NO."] + " " + element["AC NAME"] + " ");
    });
    if(Object.keys(colours).includes(party)){
        newObj.marker = {
            color: colours[party]
        }
    }

    return newObj;
}


async function barChart(Title) {
    let plotData = [];

    let data = await fetch("../datasets/csv/allParties.csv")
    let dataset = await data.text();
    let rows = dataset.split("\r\n");

    for(let i = 0; i < rows.length; i++) {
        let partyname = rows[i].split(",");
        let t = await traces("../datasets/d.json", partyname[1]);
        plotData.push(t);
    }

    const layout = {
        title: Title,
        showlegend: false,
        height: 7000,
        margin: {
            l: 140,
            r: 15
        },
        font:{
            family: 'Lato, sans-serif',
            color: 'rgba(245,246,249,1)'
          },
        barmode: 'stack',
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        xaxis: {
            showgrid: false
        }
    };
    const config = { responsive: true };


    Plotly.newPlot(map, plotData, layout, config);
}


pieChart("../datasets/d.json", "Mekliganj", "myDiv");
pc1("../datasets/csv/Electors_Data_Summary.csv", 0, "eds1");
pc1("../datasets/csv/Electors_Data_Summary.csv", 6, "eds2");
// pc2("../datasets/csv/Electors_Data_Summary.csv", "eds2");
barChart("Constituency Results in '%'");
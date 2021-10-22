//Bhangar,Kalimpong
const colours = {BJP:"rgb(255, 165, 0)", AITC: "rgb(0,255,0)", NOTA: "rgb(255,0,0)", IND: "rgb(0,0,255)", RSSCMJP: "rgb(0,255,255)"}

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
        newObj.y.unshift(element["AC NO."] +" "+ element["AC NAME"]+ " ");
    });
    
    return newObj;
}

async function pieChart(url, ac_no, id) {
    let plotData = [];
    const response = await fetch(url);
    let data = await response.json();
    const dataset = data.filter(el => el["AC NO."] === ac_no);


    const newObj = {};

    newObj.values = [];
    newObj.labels = [];
    newObj.marker = {colors: []}
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
        showlegend: true
    };
    const config = { responsive: true };


    Plotly.newPlot(id, plotData, layout, config);
}


async function barChart() {
    let plotData = [];
    
    let data = await fetch("datasets/csv/allParties.csv")
    let dataset = await data.text();
    let rows = dataset.split("\r\n");
    rows.forEach(async ele => {
        let partyname = ele.split(",");
        let t = await traces("datasets/d.json", partyname[1]);
        plotData.push(t);
        console.log("1")
    });
    console.log("2");
    const layout = {
        height: 6000,
        margin: {
            l: 200,
            r: 20,
            t: 200,
            b: 70
          },
        barmode: 'stack'
    };
    const config = { responsive: true };
    Plotly.newPlot(map, plotData, layout, config);
}


// async function mapChart(url) {
//     let plotData = [];
//     const response = await fetch(url);
//     const data = await response.text();
//     const rows = data.split("\n").slice(1);
//     console.log(rows)
//     const res = await fetch("datasets/csv/LatLong.csv");
//     const arr = await res.text();
//     const dataset = arr.split("\r\n");
//     const newObj = {}
//     newObj.lat = [];
//     newObj.lon = [];
//     newObj.marker = {color: []}
//     rows.forEach(e => {
//         const temp = e.split(",");
        
//     })
// }

pieChart("datasets/d.json", 1, "myDiv");
barChart();

// mapChart("datasets/csv/List_of_Successful_Candidates.csv");
let plotData = [];

async function pieChart(url, ac_no, id) {
    const response = await fetch(url);
    let data = await response.json();
    console.log(data);
    const dataset = data.filter(el => el["AC NO."] == ac_no);
    console.log(dataset);


    const newObj = {};
    const colours = {BJP:"rgb(255, 165, 0)", AITC: "rgb(0,255,0)", NOTA: "rgb(255,0,0)"}

    newObj.values = [];
    newObj.labels = [];
    newObj.marker = {colors: []}
    let count = 0;
    newObj.type = "pie";

    dataset.forEach(element => {
        // console.log(element);
        if (element["PARTY"] === "AITC" || element["PARTY"] === "BJP" || element["PARTY"] === "NOTA") {
            newObj.values.push(element.TOTAL);
            newObj.labels.push(`${element["CANDIDATE NAME"]}(${element["PARTY"]})`);
            newObj.marker.colors.push(colours[element.PARTY])
            // console.log(newObj)
        } else {
            count += element.TOTAL;
        }
    });
    newObj.values.push(count);
    newObj.labels.push("OTHER");
    newObj.marker.colors.push("rgb(128,128,128)");
    console.log(newObj)

    plotData.push(newObj);

    const layout = {
        showlegend: true
    };
    const config = { responsive: true };


    Plotly.newPlot(id, plotData, layout, config);
}

pieChart("datasets/d.json", 1, "myDiv");
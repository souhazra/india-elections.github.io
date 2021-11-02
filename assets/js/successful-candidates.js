async function addData() {
    const names = await fetch('datasets/csv/List_of_Successful_Candidates.csv');
    const data = await names.text();
    const rows = data.split('\n').splice(1);
    rows.forEach(ele => {
        let r = ele.split(',');
        let iDiv = document.createElement('tr');
        console.log(r);
        r.forEach(e => {
            let t1 = document.createElement('td');
            t1.innerText = e;
            iDiv.appendChild(t1);
        })
        document.querySelector('tbody').appendChild(iDiv);
    })
}

// addData();
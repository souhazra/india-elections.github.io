async function addData() {
    const names = await fetch('datasets/csv/allParties.csv');
    const data = await names.text();
    const rows = data.split('\n');
    console.log(rows);
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
$(document).ready( function () {
    $('#myTable').DataTable();
} );
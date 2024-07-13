var years = new Set();
var yearWidth = {};

document.addEventListener('DOMContentLoaded', async (event) => {
    console.log("loaded");

    let apiUrl = "https://api.earth616.org/api/mcu";

    let response = await fetch(apiUrl);

    let json = await response.json();
    // console.log(json);

    let projects = new Array();
    projects.push(...json.mcuTimeLine["Phase 1"]);
    projects.push(...json.mcuTimeLine["Phase 2"]);
    projects.push(...json.mcuTimeLine["Phase 3"]);
    projects.push(...json.mcuTimeLine["Phase 4"]);
    // console.log(projects);

    await addPhase(projects);

    // Years
    let lineRow = document.getElementById("lineRow");

    let lineDiv = document.createElement("div");
        lineDiv.className = "line";

    let yearDiv = document.createElement("div");
    yearDiv.className = "year";

    lineRow.appendChild(lineDiv);

    // Years
    Array.from(years).sort().forEach(function (year) {
        // console.log(year);
        // console.log(yearWidth[year]);
        console.log(year, yearWidth[year]);
        let width = yearWidth[year] / 2;
        console.log(width);
        // lineRow.appendChild(lineDiv.cloneNode());
        let clonedYear = yearDiv.cloneNode();
        clonedYear.innerText = year;

        lineRow.appendChild(clonedYear);

        for (let i = 0; i < width; i++)
        {
            lineRow.appendChild(lineDiv.cloneNode());
            lineRow.appendChild(lineDiv.cloneNode());
        }
    });
});
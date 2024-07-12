var years = new Set();
var yearWidth = {};

var topRow = true;

async function createItem(imgUri, date, title)
{
    // console.log(imgUri);
    let div = document.createElement("div");
    div.className = "item";

    // Fetch image
    // let response = await fetch(imgUri);
    // let imageBlob = await response.blob()
    // let imageObjectURL = URL.createObjectURL(imageBlob);

    let img = document.createElement("img");
    img.className = "projectImg";
    // img.src = "./img/shehulk.png";
    // img.src = imageObjectURL;
    // img.width = "250";
    img.width = "200";
    img.height = "100";
    img.alt = title;

    div.appendChild(img);

    let line = document.createElement("div");
    line.className = "projectLine";

    div.appendChild(line);

    let dateDiv = document.createElement("div");
    dateDiv.className = "projectDate";

    let datetime = new Date(date);

    // Lägg till år
    let year = datetime.getFullYear()
    years.add(year);
    yearWidth[year] = yearWidth[year] ? yearWidth[year] += 1 : 1;
    // console.log(year, yearWidth[year]);

    // dateDiv.innerText = datetime.toLocaleString('en-us', { month: 'long' });
    dateDiv.innerText = datetime.toLocaleString('en-us', { month: 'short' }) + " " + year;

    div.appendChild(dateDiv);

    return div;
}

async function addPhase(json)
{
    // console.log("before sort", json);
    json.sort((a, b) => new Date(a.premiere) - new Date(b.premiere));
    // console.log("after sort", json);

    let row1 = document.getElementById("topRow");
    let row2 = document.getElementById("bottomRow");

    await Promise.all(json.map(async project => {
        // console.log(project);
        // console.log(project.title);
        let imgUri = "";

        try {
            imgUri = project.imdbcache.image
        }
        catch {
            console.log("error", project);
        }
        let div = await createItem(imgUri, project.premiere, project.title);

        if (topRow)
        {
            row1.appendChild(div);
        } else {
            row2.appendChild(div);
        }

        topRow = !topRow;

    }));
}

document.addEventListener('DOMContentLoaded', async (event) => {
    console.log("loaded");

    let apiUrl = "https://api.earth616.org/api/mcu";

    let response = await fetch(apiUrl);

    let json = await response.json();
    console.log(json);

    await addPhase(json.mcuTimeLine["Phase 1"]);
    await addPhase(json.mcuTimeLine["Phase 2"]);
    await addPhase(json.mcuTimeLine["Phase 3"]);
    await addPhase(json.mcuTimeLine["Phase 4"]);

    // Years
    let lineRow = document.getElementById("lineRow");

    let lineDiv = document.createElement("div");
        lineDiv.className = "line";

    let yearDiv = document.createElement("div");
    yearDiv.className = "year";

    lineRow.appendChild(lineDiv);

    // Years
    Array.from(years).sort().forEach(function (year) {
        console.log(year);
        console.log(yearWidth[year]);
        // lineRow.appendChild(lineDiv.cloneNode());
        let clonedYear = yearDiv.cloneNode();
        clonedYear.innerText = year;

        lineRow.appendChild(clonedYear);
        lineRow.appendChild(lineDiv.cloneNode());
        lineRow.appendChild(lineDiv.cloneNode());
    });
});
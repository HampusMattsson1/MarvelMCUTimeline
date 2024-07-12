var years = new Set();

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
    years.add(datetime.getFullYear());

    // dateDiv.innerText = datetime.toLocaleString('en-us', { month: 'long' });
    dateDiv.innerText = datetime.getFullYear();

    div.appendChild(dateDiv);

    return div;
}

async function addPhase(json)
{
    // console.log("before sort", json);
    json.sort((a, b) => new Date(a.premiere) - new Date(b.premiere));
    // console.log("after sort", json);

    await Promise.all(json.map(async project => {
        // console.log(project);
        // console.log(project.title);

        let row = document.getElementById("topRow");

        let imgUri = "";

        try {
            imgUri = project.imdbcache.image
        }
        catch {
            console.log("error", project);
        }
        let div = await createItem(imgUri, project.premiere, project.title);

        row.appendChild(div);

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

    let yearContainer = document.createElement("div");
    yearContainer.className = "yearContainer";

    let lineDiv = document.createElement("div");
        lineDiv.className = "line";

    let yearDiv = document.createElement("div");
    yearDiv.className = "year";

    lineRow.appendChild(lineDiv);
    Array.from(years).sort().forEach(function (year) {
        // lineRow.appendChild(lineDiv.cloneNode());
        let clonedYear = yearDiv.cloneNode();
        clonedYear.innerText = year;

        lineRow.appendChild(clonedYear);
        lineRow.appendChild(lineDiv.cloneNode());
    });
});
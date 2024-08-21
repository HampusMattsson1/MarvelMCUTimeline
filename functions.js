async function addPhase(json)
{
    // console.log("before sort", json);
    json.sort((a, b) => new Date(a.premiere) - new Date(b.premiere));
    // console.log("after sort", json);

    let row1 = document.getElementById("topRow");
    let row2 = document.getElementById("bottomRow");

    let topRow = true;
    let counter = 0;
    let lineHeight = "7em";

    await Promise.all(json.map(async project => {
        // console.log(project);
        // console.log(project.title);
        let imgUri = "";

        try {
            imgUri = project.imdbcache.image;
        }
        catch {
            // console.log("error", project);
        }
        // let div = await createItem(imgUri, project.premiere, project.title, topRow);

        let title = project.title;
        let date = project.premiere;

        // console.log(imgUri);
        let div = document.createElement("div");
        div.className = "item";

        // Fetch image
        // let response = await fetch(imgUri);
        // let imageBlob = await response.blob()
        // let imageObjectURL = URL.createObjectURL(imageBlob);

        let img = document.createElement("img");
        img.className = "projectImg";
        img.src = "./img/shehulk.png";
        // img.src = imageObjectURL;
        // img.width = "250";
        img.width = "200";
        img.height = "100";
        img.alt = title;

        let line = document.createElement("div");
        line.className = "projectLine";

        let dateDiv = document.createElement("div");
        dateDiv.className = "projectDate";

        let datetime = new Date(date);

        // Lägg till år
        let year = datetime.getFullYear();
        years.add(year);
        yearWidth[year] = yearWidth[year] ? yearWidth[year] += 1 : 1;
        // console.log(year, yearWidth[year]);

        // dateDiv.innerText = datetime.toLocaleString('en-us', { month: 'long' });
        dateDiv.innerText = datetime.toLocaleString('en-us', { month: 'short' }) + " " + year;

        // Long / kort linje
        line.style.height = lineHeight;

        if (counter % 2 == 0)
        {
            div.style.alignContent = "end";

            div.appendChild(img);
            div.appendChild(line);
            div.appendChild(dateDiv);

            row1.appendChild(div);

            if (lineHeight == "3em")
            {
                lineHeight = "7em";
            }
            else
            {
                lineHeight = "3em";
            }

        } else {
            div.appendChild(dateDiv);
            div.appendChild(line);
            div.appendChild(img);

            row2.appendChild(div);
        }

        topRow = !topRow;
        counter++;
    }));
}
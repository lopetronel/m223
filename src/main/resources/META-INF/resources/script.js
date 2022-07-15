const URL = 'http://localhost:8080';
let entries = [];

function openUpdateEntryForm() {
    document.getElementById("updateEntryForm").style.display = "block";
    document.getElementById("createEntryForm").style.display = "none";
    document.getElementById("error").innerText = "";
    document.getElementById("errorUpdate").innerText = "";
}

function closeUpdateEntryForm() {
    document.getElementById("updateEntryForm").style.display = "none";
    document.getElementById("createEntryForm").style.display = "block";
    document.getElementById("error").innerText = "";
    document.getElementById("errorUpdate").innerText = "";
}

const createEntry = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let data = {};
    data["checkIn"] = formData.get("checkIn");
    data["checkOut"] = formData.get("checkOut");
    data["category"] = categories[document.querySelector("#category").selectedIndex]
    data["location"] = locations[document.querySelector("#location").selectedIndex]

    fetch(`${URL}/entries`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((result) => {
        result.json().then((entry) => {
            if(entry.id == undefined) {
                document.getElementById("error").innerText = entry.parameterViolations[0].message;
            }else {
                indexEntries();
            }
        });
    }).catch((result) => {
        result.json().then((response) => {
            document.getElementById("error").innerText = response.parameterViolations[0].message;
        });
    });
};

const updateEntry = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let data = {};
    data["id"] = formData.get("id");
    data["checkIn"] = formData.get("checkIn");
    data["checkOut"] = formData.get("checkOut");

    fetch(`${URL}/entries`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((result) => {
        result.json().then((entry) => {
            if(entry.checkIn == undefined) {
                document.getElementById("errorUpdate").innerText = entry.parameterViolations[0].message;
            }else {
                closeUpdateEntryForm();
                indexEntries();
            }
        });
    }).catch((result) => {
        result.json().then((response) => {
            document.getElementById("errorUpdate").innerText = response.parameterViolations[0].message;
        });
    });
};


const deleteEntry = (entry) => {
    fetch(`${URL}/entries`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(entry)
    });
}

const indexEntries = () => {
    fetch(`${URL}/entries`, {
        method: 'GET'
    }).then((result) => {
        result.json().then((result) => {
            entries = result;
            renderEntries();
        });
    });
    renderEntries();
};

const createCell = (text) => {
    const cell = document.createElement('td');
    cell.innerText = text;
    return cell;
};

let categories = [];

const indexLocations = () => {
    fetch(`${URL}/locations`, {
        method: 'GET'
    }).then((result) => {
        result.json().then((result) => {
            locations = result;
            renderLocations();
        });
    });
}

const renderLocations = () => {
   const locationDropdown = document.getElementById("location");
   locationDropdown.innerHTML = "";
   locations.forEach((location) => {
       let option = document.createElement("option");
       option.value = location.id;
       option.innerText = location.title;
       locationDropdown.appendChild(option);
   });
}

let locations = [];

const indexCategories = () => {
    fetch(`${URL}/categories`, {
        method: 'GET'
    }).then((result) => {
        result.json().then((result) => {
            categories = result;
            renderCategories();
        });
    });
}

const renderCategories = () => {
   const categoryDropdown = document.getElementById("category");
   categoryDropdown.innerHTML = "";
   categories.forEach((category) => {
       let option = document.createElement("option");
       option.value = category.id;
       option.innerText = category.title;
       categoryDropdown.appendChild(option);
   });
}

const renderEntries = () => {
    const display = document.querySelector('#entryDisplay');
    display.innerHTML = '';
    entries.forEach((entry) => {
        const row = document.createElement('tr');
        row.appendChild(createCell(entry.id));
        row.appendChild(createCell(new Date(entry.checkIn).toLocaleString()));
        row.appendChild(createCell(new Date(entry.checkOut).toLocaleString()));

        const deleteButton = document.createElement('button');
        deleteButton.innerText = "Delete";
        deleteButton.onclick = function() {
            deleteEntry(entry);
            indexEntries();
        };
        row.appendChild(deleteButton);

        const updateButton = document.createElement('button');
        updateButton.innerText = "Edit";
        updateButton.onclick = function() {
            let checkInDate = new Date(entry.checkIn);
            checkInDate.setMinutes(checkInDate.getMinutes() - checkInDate.getTimezoneOffset());
            let checkOutDate = new Date(entry.checkOut);

            let categoryString = new String(entry.category);
            let locationString = new String (entry.location);
            checkOutDate.setMinutes(checkOutDate.getMinutes() - checkOutDate.getTimezoneOffset());
            document.getElementById("idUpdate").value = entry.id;
            document.getElementById("checkInUpdate").value = checkInDate.toISOString().slice(0, 16);
            document.getElementById("checkOutUpdate").value = checkOutDate.toISOString().slice(0, 16);


            openUpdateEntryForm();
        }
        row.appendChild(updateButton);
        row.appendChild(createCell(entry.category.title));
        row.appendChild(createCell(entry.location.title));
        

        display.appendChild(row);
    });
};

document.addEventListener('DOMContentLoaded', function(){
    const createEntryForm = document.querySelector('#createEntryForm');
    createEntryForm.addEventListener('submit', createEntry);
    const updateEntryForm = document.querySelector('#updateEntryForm');
    updateEntryForm.addEventListener('submit', updateEntry);
    indexEntries();
    indexCategories();
    indexLocations();
});
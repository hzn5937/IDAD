
readData = function() {
    fetch("data.json").then(response => {
      return response.json();
    }).then(data => {
        people = data;
        return people;
    }).catch(err => {
      console.log("Error fetching data: ", err);
    });
}

console.log("Initial data")
people = readData();

setTimeout(() => {
    console.log(people)
}, 100)

// Insert new data to data.json file
InsertData = function() {
    api = "data.json";
    data = {
        name: "John Doe",
        age: 30,
        city: "New York"
    }

    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    fetch(api, options)
    .then(response => {
        return response.json();
    }).then(data => {
        console.log("Data inserted successfully: ", data);
    }).catch(err => {
        console.log("Error inserting data: ", err);
    });
     
}

setTimeout(() => {
    InsertData();
}, 2000)
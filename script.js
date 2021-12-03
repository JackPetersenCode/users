const apiTable = document.getElementById("apiTable");
const newName = document.getElementById("name");
const newEmail = document.getElementById("email");
const newUserSubmit = document.getElementById("submit-user");
const deleteUserSubmit = document.getElementById("delete-user");
const updateUserSubmit = document.getElementById("update-user");
const updatedName = document.getElementById("updatedName");
const updatedEmail = document.getElementById("updatedEmail");
const idToUpdate = document.getElementById("idToUpdate");
const idToGet = document.getElementById("userId");
const userIdSubmit = document.getElementById("userId-submit");

const postUser = async(name, email) => {
    console.log('wwwwwwwwwwwww');
    const url = '/users';
    console.log(name);
    const objToPost = {
        name: name,
        email: email
    }
    try{
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(objToPost),
        })
        console.log(response);
        if (response.ok) {
            console.log('shake it off, shake it off.');
            const jsonResponse = response.json();
            return jsonResponse;
        }
    } catch (err) {
        console.log(error);
    } 
}

const deleteUserById = async(id) => {
    let url = "/users/" + id;
    try {
        const response = await fetch(url, {
            method: "DELETE",
            mode: "cors"
        })
        return;
    } catch (err) {
        console.log(error);
    }
}

const appendUser = function (user) {
    console.log('hahahahahahahaha');
    let row = apiTable.insertRow();
    row.id = user.id;
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    cell1.innerHTML = `${user.name}`;
    cell2.innerHTML = `${user.email}`;
    console.log('BOOOOOGGGGGEEERRRRRR');
}
let rowIndex = 1;
const appendIndividualUser = function(user) {
    let row = getUserByIdTable.insertRow(rowIndex);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    cell1.innerHTML = `${user.name}`;
    cell2.innerHTML = `${user.email}`;
    rowIndex += 1;
}

const onStartUp = async() => {
    console.log('HELLO BITCH')
    const results = await getJsonResponse('/users');
    console.log(results);
    while(apiTable.hasChildNodes()) {
        apiTable.removeChild(apiTable.firstChild);
    }
    results.forEach(user => {
        console.log(user);
        let row = apiTable.insertRow();
        row.id = user.id;
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        cell1.innerHTML = `${user.name}`;
        cell2.innerHTML = `${user.email}`;
    })
}

const getJsonResponse = async (url) => {
    console.log(url);
    const response = await fetch(url);
    try{
        if (response.ok){
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            return jsonResponse;
        }
    } catch(err){
        console.log(err);
    }
}
const getIndividualUser = async(id) => {
    let jsonResponse;
    const response = await fetch('/users/' + id)
    if (response.ok) {
        jsonResponse = await response.json();
    }
    return jsonResponse;
}
newUserSubmit.onclick = async() => {
    let name = newName.value;
    let email = newEmail.value;
    let response = await postUser(name, email);
    appendUser(response);
}
deleteUserSubmit.onclick = async() => {
    let id = idForDeletion.value;
    const response = await deleteUserById(id);
    onStartUp();  
}
userIdSubmit.onclick = async() => {
    let id = idToGet.value;
    console.log(id);
    let response = await getIndividualUser(id);
    appendIndividualUser(response[0]);
}


updateUserSubmit.onclick = async() => {
    let id = idToUpdate.value;
    let name = updatedName.value;
    let email = updatedEmail.value;
    let url = '/users/' + id;
    let objectToPost = {
        name: name,
        email: email
    }
    console.log(objectToPost);
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(objectToPost),
        })
        if (response.ok) {
            console.log(response);
            //let jsonResponse = await response.JSON();
            await onStartUp();
            return;
        }
    } catch (err) {
        console.log(err);
    }
}



console.log('hello');
onStartUp();

// import fetch from "node-fetch";
// import {SECRET_KEY} from './secret.js';

// urls are used to connect to Airtable api (note teams was not used but implemented for testing)
const INVENTORY_URL = "https://api.airtable.com/v0/appEh8AgMbuOjilz6/Inventory";
const TEAMS_URL = "https://api.airtable.com/v0/appEh8AgMbuOjilz6/Teams";

let config = {
    headers: {
        "Authorization": "Bearer " + SECRET_KEY,// Bearer was used beacause Airtable sugested for increased security
        "Content-Type": "application/json",// Json is used due to being the best config for this type of information
    },
}

let records = document.getElementById("records");//docuemnt.getElementByID was needed to look for an action button press by giving the button ID onclick function
records.onclick = async function() {// async function allows other elements to run simutinausly similarly with await
    let response = await fetch(INVENTORY_URL, config)// fecth is used to call api due to being a new built in fuction of java script( fetch needs arugemnt to passed through)
    if (response.status === 200) {//status 200 allows us to know everything is wokring properly 
        let data = await response.json()
        let records = data["records"]
        document.getElementById("records-output").textContent = JSON.stringify(records, undefined, 2)      
    } else {
        document.getElementById("records-output").textContent = "Error connecting to API!"      
    }
}

let restock = document.getElementById("restock");
restock.onclick = async function() {
    let response = await fetch(INVENTORY_URL, config)
    if (response.status === 200) {

        let restock_list = [];//empty list is created to push new items later on

        let data = await response.json();
        let records = data.records

        for (let i = 0; i < records.length; i++) {// for loop is created to look through the records to find the specified columns
            if (records[i]["fields"]["Replenishment"] == "RESTOCK") {
                restock_list.push(records[i]["fields"]["Name"])
            }
        }
        document.getElementById("restock-output").textContent = restock_list
    } else {
        document.getElementById("restock-output").textContent = "Error connecting to API!"  // error message if unable to connect to API    
    }
}
// code is repeated again to find a different parameter
let missing = document.getElementById("missing");
missing.onclick = async function() {
    let response = await fetch(INVENTORY_URL, config)
    if (response.status === 200) {

        let missing_list = [];

        let data = await response.json();
        let records = data.records

        for (let i = 0; i < records.length; i++) {
            if (records[i]["fields"]["Action Required"] == "Investigate") {
                missing_list.push(records[i]["fields"]["Name"])
            }
        }
        document.getElementById("missing-output").textContent = missing_list
    } else {
        document.getElementById("missing-output").textContent = "Error connecting to API!"      
    }
}

document.getElementById("clear_box").addEventListener("click", clear_box, false);
function clear_box() {
  document.getElementById("records-output").innerHTML = "";
  document.getElementById("restock-output").innerHTML = "";
  document.getElementById("missing-output").innerHTML = "";
}





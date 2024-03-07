var endDate;
var startDate;

function updateCycle() {
    var monthSelect = document.getElementById("monthSelect");
    var selectedMonth = monthSelect.options[monthSelect.selectedIndex].value;
    var year = new Date().getFullYear();

    startDate = new Date(year, selectedMonth - 1, 1);
    endDate = new Date(year, selectedMonth, 0);
    document.querySelector('.js-billCycle').textContent = `Billing Cycle : ${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;

}

document.addEventListener("DOMContentLoaded", function () {
    var clientSelect = document.getElementById("client-name");
    var clients = JSON.parse(localStorage.getItem("clients")) || [];

    clients.forEach(function (client, index) {
        var option = document.createElement("option");
        option.text = client.name;
        option.value = `${client.name}`;
        clientSelect.add(option);
    });
});

function calculate() {
    let PrevIp = Number(document.querySelector('.js-previous').value);
    let CurrIp = Number(document.querySelector('.js-current').value);
    var clientMF = document.getElementById('client-name').value;
    var Mf = (localStorage.getItem('clients'));
    var clientID = JSON.parse(Mf);

    function getMfValueByName(clientName) {
        for (var i = 0; i < clientID.length; i++) {
            if (clientID[i].name === clientName) {
                return clientID[i].mf;
            }
        }
        return null;
    }
    var lastBillNumber = parseInt(localStorage.getItem('lastBillNumber')) || 0;
    var clientName = clientMF;
    var mfValue = getMfValueByName(clientName);
    let UnitDifference = CurrIp - PrevIp;
    let UnitProduced = mfValue * UnitDifference;
    let PerUnitCost = Number(4.15);
    let Payment = Number(UnitProduced * PerUnitCost);
    UnitProduced = Number(UnitProduced.toFixed(2));
    Payment = Number(Payment.toFixed(2));
    console.log(UnitProduced);
    console.log(Payment);

    // Incrementing bill number
    lastBillNumber++;
    localStorage.setItem('lastBillNumber', lastBillNumber);

    // Format bill number as 5 digits with leading zeros
    let billNum = String(lastBillNumber).padStart(5, '0');

    for (var i = 0; i < clientID.length; i++) {
        if (clientID[i].name === clientName) {
            clientID[i].billNo.push(billNum);
            break;
        }
    }
    let copyendDate = new Date(endDate);
    copyendDate.setDate(copyendDate.getDate() + 1);
    let bill = {
        companyName: clientName,
        billNumber: billNum,
        amount: Payment,
        InvDate: copyendDate.toISOString().slice(0, 10),
        sDate : startDate,
        eDate : endDate,
        unitS : UnitProduced,
        mfV : mfValue,
        puC : PerUnitCost
    };

    // Store bill history object in an array
    let billHistory = JSON.parse(localStorage.getItem("billHistory")) || [];
    billHistory.push(bill);
    localStorage.setItem("billHistory", JSON.stringify(billHistory));

    localStorage.setItem('clients', JSON.stringify(clientID));
    document.querySelector('.showCalc').innerHTML = `
    <p>MF value for ${clientName} : ${mfValue} </p>
    <p>Total Units Produced : ${UnitProduced} </p>
    <p>Total Amount Generated : ${Payment} </p>
    <p>Bill Number : ${billNum} </p>
    `;
    console.log(clientID);
    console.log(bill);
    var abc = localStorage.getItem('billHistory');
    console.log(abc);
};
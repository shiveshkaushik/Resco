function updateCycle() {
    var monthSelect = document.getElementById("monthSelect");
    var selectedMonth = monthSelect.options[monthSelect.selectedIndex].value;
    var year = new Date().getFullYear();

    var startDate = new Date(year, selectedMonth - 1, 1);
    var endDate = new Date(year, selectedMonth, 0);

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
    var clientName = clientMF;
    var mfValue = getMfValueByName(clientName);
    let UnitDifference = CurrIp - PrevIp;
    let UnitProduced = mfValue * UnitDifference;
    let PerUnitCost = Number(4.15);
    let Payment = Number(UnitProduced*PerUnitCost);
    UnitProduced = Number(UnitProduced.toFixed(2));
    Payment = Number(Payment.toFixed(2));
    console.log(UnitProduced);
    console.log(Payment);
    document.querySelector('.showCalc').innerHTML = `
    <p>MF value for ${clientName} : ${mfValue} </p>
    <p>Total Units Produced : ${UnitProduced} </p>
    <p>Total Amount Generated : ${Payment} </p>
    `
};

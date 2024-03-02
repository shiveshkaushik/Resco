function updateCycle() {
    var monthSelect = document.getElementById("monthSelect");
    var selectedMonth = monthSelect.options[monthSelect.selectedIndex].value;
    var year = new Date().getFullYear();

    var startDate = new Date(year, selectedMonth - 1, 1);
    var endDate = new Date(year, selectedMonth, 0); 

    document.querySelector('.js-billCycle').textContent = `Billing Cycle : ${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
}

document.addEventListener("DOMContentLoaded", function() {
    var clientSelect = document.getElementById("client-name");
    var clients = JSON.parse(localStorage.getItem("clients")) || [];

    clients.forEach(function(client, index) {
        var option = document.createElement("option");
        option.text = client.name;
        option.value = `${client.name}`;
        clientSelect.add(option);
    });
});

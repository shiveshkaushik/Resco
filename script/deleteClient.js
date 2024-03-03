document.addEventListener("DOMContentLoaded", function() {
    var clientSelect = document.getElementById("clientSelect");
    var clients = JSON.parse(localStorage.getItem("clients")) || [];

    clients.forEach(function(client, index) {
        var option = document.createElement("option");
        option.text = client.name;
        option.value = index;
        clientSelect.add(option);
    });
});

function deleteClient() {
    var clientSelect = document.getElementById("clientSelect");
    var selectedIndex = clientSelect.selectedIndex;

    if (selectedIndex >= 0) {
        var clients = JSON.parse(localStorage.getItem("clients")) || [];
        clients.splice(selectedIndex, 1);
        localStorage.setItem("clients", JSON.stringify(clients));

        alert("Client deleted successfully!");
        window.location.reload();
    } else {
        alert("Please select a client to delete.");
    }
}

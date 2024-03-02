function addClient() {
    var clientName = document.getElementById("clientName").value;
    var gstNumber = document.getElementById("gstNumber").value;

    var client = {
        name: clientName,
        gst: gstNumber
    };

    var clients = JSON.parse(localStorage.getItem("clients")) || [];
    clients.push(client);
    localStorage.setItem("clients", JSON.stringify(clients));

    alert("Client added successfully!");
}

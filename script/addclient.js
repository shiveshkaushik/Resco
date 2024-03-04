function addClient() {
    var clientName = document.getElementById("clientName").value;
    var gstNumber = document.getElementById("gstNumber").value;
    var mfValue = document.getElementById("mfValue").value;
     var client = {
        name: clientName,
        gst: gstNumber,
        mf : mfValue,
        billNo : []
    };

    var clients = JSON.parse(localStorage.getItem("clients")) || [];
    clients.push(client);
    localStorage.setItem("clients", JSON.stringify(clients));

    alert("Client added successfully!");
}

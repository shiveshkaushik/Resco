document.addEventListener('DOMContentLoaded',function(){
    var compList = document.getElementById('billComp');
    var clients = JSON.parse(localStorage.getItem("clients")) || [];
    clients.forEach(function (client, index) {
        var option = document.createElement("option");
        option.text = client.name;
        option.value = `${client.name}`;
        compList.add(option);
    });
})


function searchBill(){
    var cname = document.getElementById('billComp').value;
    searchBillByname(cname);
    
}

function searchBillByname(name) {
    let showDivHtml = '';
    let searchList = JSON.parse(localStorage.getItem('billHistory')) || [];
    searchList.forEach(function(cbill) {
        if(cbill.companyName === name) {
            console.log(cbill);
            showDivHtml += `
                <div class="bill-details">
                    <p>Bill Number : ${cbill.billNumber}</p>
                    <p>Amount to be Paid : ${cbill.amount}</p>
                    <p>Invoice Generation Date : ${cbill.InvDate}</p>
                    <p>Bill Cycle Start Date  : ${cbill.sDate}</p>
                    <p>Bill Cycle End Date : ${cbill.eDate}</p>
                    <p>Units Produced : ${cbill.unitS}</p>
                    <p>MF value : ${cbill.mfV}</p>
                    <p>PerUnit Cost: ${cbill.puC}</p>
                    <br><br>
                </div>
            `;
        }
    });

    // Set the innerHTML of the showDiv element to showDivHtml
    document.getElementById('showdiv').innerHTML = showDivHtml;
}

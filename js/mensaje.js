function alerta(text) {
    swal({
        title: "Exito",
        text: text,
        type: "success",
    });
}

function pintarRespuestaMensajeId(items) {
    let myTable = `<table class="table table-light">
                        <tr class="table-info">
                            <th>ID</th>
                            <th>Mensaje</th>
                        </tr>`;

    myTable += "<tr>";
    myTable += `<td>${items.idMessage}</td>`;
    myTable += `<td>${items.messageText}</td>`;
    myTable += "</tr>";
    myTable += "</table>"
    $("#resultadoMessage").html(myTable);
}

function traerInformacionMensajeId() {
    let id = window.location.hash.replace("#", "")
    $.ajax({
        url: `http://129.151.109.227:8080/api/Message/${id}`,
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            pintarRespuestaMensajeId(response);
        }
    });
}
function editarInformacionMensaje() {

    let id = window.location.hash.replace("#", "")

    let myData = {
        idMessage: id,
        messageText: $("#messagetext").val()
    };
    if (myData.messageText !== "") {
        let dataToSend = JSON.stringify(myData);
        $.ajax({
            url: "http://129.151.109.227:8080/api/Message/update",
            type: "PUT",
            data: dataToSend,
            contentType: "application/JSON",
            datatype: "JSON",
            success: function (respuesta) {
                $("#idMensaje").val("");
                $("#messagetext").val("");
                traerInformacionMensajeId();
                alerta("Se ha actualizado el mensaje")
            }
        });
    }
}
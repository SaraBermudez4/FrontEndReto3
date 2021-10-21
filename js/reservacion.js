//Alertas
function alerta(text) {
    swal({
        title: "Exito",
        text: text,
        type: "success",
    });
}
function alertaError(text) {
    swal({
        title: "Oh, vaya...",
        text: text,
        type: "warning",
    });
}

function pintarRespuestaReservacionId(items) {
    let myTable = `<table class="table table-light">
                        <tr class="table-info">
                        <th>ID</th>
                            <th>Fecha de inicio</th>
                            <th>Fecha de devolución</th>
                            <th>Estado</th>
                        </tr>`;

    myTable += "<tr>";
    myTable += `<td>${items.idReservation}</td>`;
    myTable += `<td>${items.startDate}</td>`;
    myTable += `<td>${items.devolutionDate}</td>`;
    myTable += `<td>${items.status}</td>`;
    myTable += "</tr>";
    myTable += "</table>"
    $("#resultadoReservacion").html(myTable);
}

function traerInformacionReservacionId() {
    let id = window.location.hash.replace("#", "")
    $.ajax({
        url: `http://129.151.109.227:8080/api/Reservation/${id}`,
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            pintarRespuestaReservacionId(response);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alertaError("No se puede ver la reservacion")
        }
    });
}

function editarInformacionReservacion() {
    let id = window.location.hash.replace("#", "")
    let myData = {
        idReservation: id,
        startDate: $("#startDate").val(),
        devolutionDate: $("#devolutionDate").val(),
        status: $("#status").val()
    };
    if (myData.startDate !== "" && myData.devolutionDate !== "" && myData.status !== "") {
        let dataToSend = JSON.stringify(myData);
        $.ajax({
            url: "http://129.151.109.227:8080/api/Reservation/update",
            type: "PUT",
            data: dataToSend,
            contentType: "application/JSON",
            datatype: "JSON",
            success: function (respuesta) {
                $("#startDate").val("");
                $("#devolutionDate").val("");
                $("#status").val("");
                traerInformacionReservacionId();
                alerta("Se ha actualizado la reservación")
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alertaError("No se actualizó la reservación")
            }
        });
    }
}
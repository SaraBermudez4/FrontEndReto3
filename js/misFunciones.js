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

//Auditorio
function pintarRespuestaAuditorio(items) {
    let myTable = `<table class="table table-light">
                        <tr class="table-info">
                            <th>ID</th>
                            <th>Dueño</th>
                            <th>Capacidad</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Eliminar</th>
                            <th>Actualizar</th>
                        </tr>`;
    for (let i = 0; i < items.length; i++) {
        myTable += "<tr>";
        myTable += `<td id="idTableAuditorio">${items[i].id}</td>`;
        myTable += `<td>${items[i].owner}</td>`;
        myTable += `<td>${items[i].capacity}</td>`;
        myTable += `<td>${items[i].name}</td>`;
        myTable += `<td>${items[i].description}</td>`;
        myTable += `<td> <button class="btn btn-outline-info" onclick='borrarElementoAuditorio(${items[i].id})'>Borrar</button> </td>`;
        myTable += `<td><button class="btn btn-outline-info"><a href="editarAuditorio.html#${items[i].id}">Editar</a></button></td>`;
        myTable += "</tr>";
    }
    myTable += "</table>"
    $("#resultadoAuditorio").html(myTable);
}
function traerInformacionAuditorio() {
    $.ajax({
        url: "http://129.151.109.227:8080/api/Audience/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            pintarRespuestaAuditorio(response);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alertaError("No se pueden ver los auditorios")
        }
    });
}
function guardarInformacionAuditorio() {
    let myData = {
        owner: $("#owner").val(),
        description: $("#descriptionAuditorio").val(),
        capacity: $("#capacity").val(),
        name: $("#nameAuditorio").val(),
    };
    if (myData.owner !== "" && myData.description !== "" && myData.capacity !== "" && myData.name !== "") {
        $.ajax({
            url: "http://129.151.109.227:8080/api/Audience/save",
            contentType: "application/json; charset=utf-8",
            type: "POST",
            data: JSON.stringify(myData),
            datatype: "JSON",
            success: function (respuesta) {
                $("#owner").val("");
                $("#descriptionAuditorio").val("");
                $("#capacity").val("");
                $("#nameAuditorio").val("");
                traerInformacionAuditorio();
                alerta("Se ha guardado el auditorio")
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alertaError("No se guardó el auditorio")
            }
        });
    }
}
function borrarElementoAuditorio(idElemento) {
    $.ajax({
        url: `http://129.151.109.227:8080/api/Audience/${idElemento}`,
        type: "DELETE",
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            traerInformacionAuditorio();
            alerta('Se ha eliminado el auditorio')
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alertaError("No se eliminó el auditorio")
        }
    });
}

//Categoria
function pintarRespuestaCategoria(items) {
    let myTable = `<table class="table table-light">
                        <tr class="table-info">
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Eliminar</th>
                            <th>Actualizar</th>
                        </tr>`;

    for (let i = 0; i < items.length; i++) {
        myTable += "<tr>";
        myTable += `<td id="idTableCategoria">${items[i].id}</td>`;
        myTable += `<td>${items[i].id}</td>`;
        myTable += `<td>${items[i].name}</td>`;
        myTable += `<td>${items[i].description}</td>`;
        myTable += `<td> <button class="btn btn-outline-info" onclick='borrarElementoCategoria(${items[i].id})'>Borrar</button> </td>`;
        myTable += `<td><button class="btn btn-outline-info"><a href="editarCategoria.html#${items[i].id}">Editar</a></button></td>`;
        myTable += "</tr>";
    }
    myTable += "</table>"
    $("#resultadoCategoria").html(myTable);
}
function traerInformacionCategoria() {
    $.ajax({
        url: "http://129.151.109.227:8080/api/Category/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            pintarRespuestaCategoria(response);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alertaError("No se pueden ver las categorias")
        }
    });
}
function guardarInformacionCategoria() {
    let myData = {
        name: $("#nameCategoria").val(),
        description: $("#descriptionCategoria").val(),
    };
    if (myData.name !== "" && myData.description !== "") {
        $.ajax({
            url: "http://129.151.109.227:8080/api/Category/save",
            contentType: "application/json; charset=utf-8",
            type: "POST",
            data: JSON.stringify(myData),
            datatype: "JSON",
            success: function (respuesta) {
                $("#nameCategoria").val("");
                $("#descriptionCategoria").val("");
                traerInformacionCategoria();
                alerta("Se ha guardado la categoria")
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alertaError("No se guardó la categoria")
            }
        });
    }
}

function borrarElementoCategoria(idElemento) {
    $.ajax({
        url: `http://129.151.109.227:8080/api/Category/${idElemento}`,
        type: "DELETE",
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            traerInformacionCategoria();
            alerta("Se ha eliminado la categoria")
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alertaError("No se eliminó la categoria")
        }
    });
}

//Cliente
function pintarRespuestaCliente(items) {
    let myTable = `<table class="table table-light">
                        <tr class="table-info">
                            <th>ID</th>
                            <th>Correo</th>
                            <th>Contraseña</th>
                            <th>Nombre</th>
                            <th>Edad</th>
                            <th>Eliminar</th>
                            <th>Actualizar</th>
                        </tr>`;

    for (let i = 0; i < items.length; i++) {
        myTable += "<tr>";
        myTable += `<td>${items[i].idClient}</td>`;
        myTable += `<td>${items[i].email}</td>`;
        myTable += `<td>${items[i].password}</td>`;
        myTable += `<td>${items[i].name}</td>`;
        myTable += `<td>${items[i].age}</td>`;
        myTable += `<td> <button class="btn btn-outline-info" onclick='borrarElementoCliente(${items[i].idClient})'>Borrar</button>`;
        myTable += `<td><button class="btn btn-outline-info"><a href="editarCliente.html#${items[i].idClient}">Editar</a></button></td>`;
        myTable += "</tr>";
        myTable += "</tr>";
    }
    myTable += "</table>"
    $("#resultadoCliente").html(myTable);
}
function traerInformacionCliente() {
    $.ajax({
        url: "http://129.151.109.227:8080/api/Client/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            pintarRespuestaCliente(response);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alertaError("No se pueden ver los clientes")
        }
    });
}
function guardarInformacionCliente() {
    let myData = {
        name: $("#name").val(),
        password: $("#password").val(),
        email: $("#email").val(),
        age: $("#age").val(),
    };
    if (myData.name !== "" && myData.password !== "", myData.email !== "", myData.age !== "") {
        $.ajax({
            url: "http://129.151.109.227:8080/api/Client/save",
            contentType: "application/json; charset=utf-8",
            type: "POST",
            data: JSON.stringify(myData),
            datatype: "JSON",
            success: function (respuesta) {
                $("#password").val("");
                $("#name").val("");
                $("#email").val("");
                $("#age").val("");
                traerInformacionCliente();
                alerta("Se ha guardado el cliente")
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alertaError("No se guardó el cliente")
            }
        });
    }
}
function borrarElementoCliente(idElemento) {
    $.ajax({
        url: `http://129.151.109.227:8080/api/Client/${idElemento}`,
        type: "DELETE",
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            traerInformacionCliente();
            alerta("Se ha eliminado el cliente")
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alertaError("No se eliminó el cliente")
        }
    });
}

//Mensajes
function pintarRespuestaMensaje(items) {
    let myTable = `<table class="table table-light">
                        <tr class="table-info">
                            <th>ID</th>
                            <th>Mensaje</th>
                            <th>Eliminar</th>
                            <th>Actualizar</th>
                        </tr>`;

    for (let i = 0; i < items.length; i++) {
        myTable += "<tr>";
        myTable += `<td>${items[i].idMessage}</td>`;
        myTable += `<td>${items[i].messageText}</td>`;
        myTable += `<td> <button class="btn btn-outline-info" onclick='borrarElementoMensaje(${items[i].idMessage})'>Borrar</button>`;
        myTable += `<td><button class="btn btn-outline-info"><a href="editarMensaje.html#${items[i].idMessage}">Editar</a></button></td>`;
        myTable += "</tr>";
    }
    myTable += "</table>"
    $("#resultadoMessage").html(myTable);
}
function traerInformacionMensaje() {
    $.ajax({
        url: "http://129.151.109.227:8080/api/Message/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            pintarRespuestaMensaje(response);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alertaError("No se pueden ver los mensajes")
        }
    });
}
function guardarInformacionMensaje() {
    let myData = {
        messageText: $("#messagetext").val(),
    };
    if (myData.messageText !== "") {
        $.ajax({
            url: "http://129.151.109.227:8080/api/Message/save",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(myData),
            datatype: "JSON",
            success: function (respuesta) {
                $("#messagetext").val("");
                traerInformacionMensaje();
                alerta("Se ha guardado el mensaje")
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alertaError("No se guardó mensaje")
            }
        });
    }
}
function borrarElementoMensaje(idElemento) {
    $.ajax({
        url: `http://129.151.109.227:8080/api/Message/${idElemento}`,
        type: "DELETE",
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            traerInformacionMensaje();
            alerta("Se ha eliminado el mensaje")
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alertaError("No se eliminó el mensaje")
        }
    });
}

//Reservaciones
function pintarRespuestaReservacion(items) {
    let myTable = `<table class="table table-light">
                        <tr class="table-info">
                            <th>ID</th>
                            <th>Fecha de inicio</th>
                            <th>Fecha de devolución</th>
                            <th>Estado</th>
                            <th>Eliminar</th>
                            <th>Actualizar</th>
                        </tr>`;

    for (let i = 0; i < items.length; i++) {
        myTable += "<tr>";
        myTable += `<td>${items[i].idReservation}</td>`;
        myTable += `<td>${items[i].startDate}</td>`;
        myTable += `<td>${items[i].devolutionDate}</td>`;
        myTable += `<td>${items[i].status}</td>`;
        myTable += `<td> <button class="btn btn-outline-info" onclick='borrarElementoReservacion(${items[i].idReservation})'>Borrar</button>`;
        myTable += `<td><button class="btn btn-outline-info"><a href="editarReservacion.html#${items[i].idReservation}">Editar</a></button></td>`;
        myTable += "</tr>";
    }
    myTable += "</table>"
    $("#resultadoReservation").html(myTable);
}
function traerInformacionReservacion() {
    $.ajax({
        url: "http://129.151.109.227:8080/api/Reservation/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            pintarRespuestaReservacion(response);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alertaError("No se pueden ver las reservaciones")
        }
    });
}
function guardarInformacionReservacion() {
    let myData = {
        startDate: $("#startDate").val(),
        devolutionDate: $("#devolutionDate").val(),
        status: $("#status").val(),
    };
    if (myData.startDate !== "" && myData.devolutionDate !== "" && myData.status !== "") {
        $.ajax({
            url: "http://129.151.109.227:8080/api/Reservation/save",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(myData),
            datatype: "JSON",
            success: function (respuesta) {
                $("#startDate").val("");
                $("#devolutionDate").val("");
                $("#status").val("");
                traerInformacionReservacion();
                alerta("Se ha guardado la reservacion")
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alertaError("No se guardó la reservación")
            }
        });
    }
}
function borrarElementoReservacion(idElemento) {
    $.ajax({
        url: `http://129.151.109.227:8080/api/Reservation/${idElemento}`,
        type: "DELETE",
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            traerInformacionReservacion();
            alerta("Se ha eliminado la reservacion")
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alertaError("No se eliminó la reservación")
        }
    });
}
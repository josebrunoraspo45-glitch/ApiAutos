const url = "/api/Autos";
let idEditando = null;

const formulario = document.getElementById("formAuto");
const mensaje = document.getElementById("mensaje");

async function cargarAuto() {
    const respuesta = await fetch(url);
    const autos = await respuesta.json();

    const tabla = document.getElementById("tablaAutos");
    tabla.innerHTML = "";

    for (const auto of autos) {
        let disponible = "No";
        if (auto.disponible) {
            disponible = "Sí";
        }

        tabla.innerHTML += `
            <tr>
                <td>${auto.marca}</td>
                <td>${auto.modelo}</td>
                <td>${auto.anio}</td>
                <td>${auto.patente}</td>
                <td>${auto.km}</td>
                <td>${auto.fechaIngreso.substring(0, 10)}</td>
                <td>${disponible}</td>
                <td>
                    <button onclick="editarAuto(${auto.id})">Editar</button>
                    <button onclick="eliminarAuto(${auto.id})">Eliminar</button>
                </td>
            </tr>
        `;
    }
}

formulario.addEventListener("submit", async function (evento) {
    evento.preventDefault();

    const auto = {
        marca: document.getElementById("marca").value,
        modelo: document.getElementById("modelo").value,
        anio: Number(document.getElementById("anio").value),
        patente: document.getElementById("patente").value,
        km: Number(document.getElementById("km").value),
        fechaIngreso: document.getElementById("fechaIngreso").value,
        disponible: document.getElementById("disponible").value === "true"
    };

    let metodo = "POST";
    let direccion = url;

    if (idEditando != null) {
        metodo = "PUT";
        direccion = url + "/" + idEditando;
        auto.id = idEditando;
    }

    const respuesta = await fetch(direccion, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(auto)
    });

    if (respuesta.ok) {
        mensaje.textContent = "Auto guardado correctamente.";
        formulario.reset();
        idEditando = null;
        document.getElementById("panelRegistro").open = false;
        cargarAuto();
    } else {
        const datos = await respuesta.json();

        if (datos.errors) {
            let texto = "";
            for (const campo in datos.errors) {
                texto += datos.errors[campo] + " ";
            }
            mensaje.textContent = texto;
        } else {
            mensaje.textContent = "No se pudo guardar el auto. Código de error: " + respuesta.status;
        }
    }
});

async function editarAuto(id) {
    const respuesta = await fetch(url + "/" + id);
    const auto = await respuesta.json();

    document.getElementById("marca").value = auto.marca;
    document.getElementById("modelo").value = auto.modelo;
    document.getElementById("anio").value = auto.anio;
    document.getElementById("patente").value = auto.patente;
    document.getElementById("km").value = auto.km;
    document.getElementById("fechaIngreso").value = auto.fechaIngreso.substring(0, 10);
    document.getElementById("disponible").value = String(auto.disponible);

    idEditando = id;
    document.getElementById("panelRegistro").open = true;
}

function cancelarEdicion() {
    formulario.reset();
    idEditando = null;
    document.getElementById("panelRegistro").open = false;
}

async function eliminarAuto(id) {
    if (confirm("¿Seguro que querés eliminar este auto?") == false) {
        return;
    }

    const respuesta = await fetch(url + "/" + id, {
        method: "DELETE"
    });

    if (respuesta.ok) {
        mensaje.textContent = "Auto eliminado correctamente.";
        cargarAuto();
    } else {
        const texto = await respuesta.text();
        mensaje.textContent = texto;
    }
}

cargarAuto();
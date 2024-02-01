const socket = io();

const renderProductos = (products) => {
    const contanerProducts = document.getElementById("containerProducts");
    contanerProducts.innerHTML = "";


    products.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card2");

        card.innerHTML = `
                <p>Id ${item.id} </p>
                <img src=${item.thumbnails} alt="">
                <p>Titulo ${item.title} </p>
                <p>Precio ${item.price} </p>
                <button class="btnEliminar"> Eliminar Producto </button>
        
        `;
        contanerProducts.appendChild(card);

        card.querySelector("button").addEventListener("click", () => {
            deleteProduct(item.id);
        });
    });
}

const addProduct = () => {
    const product = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        thumbnails: document.getElementById("thumbnails").value,
        code: document.getElementById("code").value,
        stock: document.getElementById("stock").value,
        category: document.getElementById("category").value,
        status: document.getElementById("status").value === "true"
    };
    
    socket.emit("addProduct", product);
};

const deleteProduct = (id) => {
       
                socket.emit('deleteProduct', id);
            };

document.getElementById("btnEnviar").addEventListener("click", () => {
    addProduct();
});


socket.on("products", (data) => {
    renderProductos(data);
})

socket.on("messagesLogs", (data) => {
    const log = document.getElementById("messagesLogs");
    let messages = "";

    data.forEach((message) => {
        messages += `${message.user} dice: ${message.message}<br>`;
    });

    log.innerHTML = messages;
}, false);

const openChatInput = () => {
    Swal.fire({
        title: 'Chat',
        input: 'text',
        inputPlaceholder: 'Escribe tu mensaje...',
        showCancelButton: true,
        confirmButtonText: 'Enviar',
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
            return !value && 'Debes escribir un mensaje para enviar.';
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const message = result.value;
            socket.emit('message', { user: user, message: message });
        }
    });
};

document.getElementById("btnEnviar").addEventListener("click", () => {
    addProduct();
});

document.getElementById("btnOpenChat").addEventListener("click", () => {
    openChatInput();
});

socket.on("products", (data) => {
    renderProductos(data);
});



socket.on("messagesLogs", (data) => {
    const log = document.getElementById("messagesLogs");
    let messages = "";

    data.forEach((message) => {
        messages += `${message.user} dice: ${message.message}<br>`;
    });

    log.innerHTML = messages;
});

document.getElementById("btnOpenChat").addEventListener("click", () => {
    openChatInput();
});

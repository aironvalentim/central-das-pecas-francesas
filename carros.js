// Lista de peças de automóveis
const carParts = [
    "Alternador", "Amortecedor", "Bateria", "Bomba de combustível", "Bomba d'água", "Cabo de vela", 
    "Correia dentada", "Disco de freio", "Embreagem", "Filtro de ar", "Filtro de óleo", "Filtro de combustível", 
    "Junta do cabeçote", "Lâmpada de farol", "Mangueira do radiador", "Pastilha de freio", "Pistão", 
    "Radiador", "Suspensão", "Tampa do motor", "Vela de ignição", "Volante", "Óleo do motor", 
    "Sensor de temperatura", "Sensor de pressão de óleo", "Sensor de oxigênio", "Válvula termostática", 
    "Amortecedor dianteiro", "Amortecedor traseiro", "Vidro do para-brisa", "Lanterna traseira", "Buzina", 
    "Interruptor de luz", "Freio de mão", "Roda", "Pneu", "Cinto de segurança", "Airbag", 
    "Cilindro mestre de freio", "Filtro de ar condicionado", "Sensor de ABS", "Corpo de borboleta", 
    "Motor de arranque", "Bomba de direção hidráulica", "Catalisador", "Compressor de ar condicionado", 
    "Válvula EGR", "Junta do carter", "Sensor de velocidade", "Rolamento de roda", "Bateria do controle remoto", 
    "Corrente de distribuição", "Cilindro de roda", "Mola de suspensão", "Tubo de escape", "Ponteira do escapamento", 
    "Junta homocinética", "Braço de suspensão", "Terminal de direção", "Jogo de juntas", "Chave de fenda", 
    "Chave de boca", "Alicate", "Macaco hidráulico", "Estepe", "Chave de rodas", "Macaco jacaré", 
    "Manual do proprietário", "Chave de ignição", "Câmbio automático", "Câmbio manual", "Central eletrônica", 
    "Módulo de injeção", "Bobina de ignição", "Bomba de vácuo", "Caixa de fusíveis", "Relé", 
    "Interruptor de partida", "Interruptor de temperatura", "Radiador de óleo", "Reservatório de água do limpador", 
    "Braçadeira de mangueira", "Junta de escapamento", "Junta do coletor de admissão", "Eixo de transmissão", 
    "Haste do cilindro", "Válvula PCV", "Válvula de escape", "Válvula de admissão", "Pivô de suspensão", 
    "Ponteira do limpador", "Calota", "Lente do farol", "Interruptor de retrovisor", "Acendedor de cigarros", 
    "Volante do motor", "Ponteira do escapamento", "Suporte de motor", "Sensor de detonação", "Sensor de velocidade", 
    "Filtro de partículas", "Painel de instrumentos", "Capa de banco", "Antena", "Comando de válvulas", 
    "Coletor de admissão", "Coletor de escape", "Silencioso", "Cárter", "Radiador de óleo", 
    "Interruptor de luz de freio", "Reservatório de óleo de freio", "Cilindro de embreagem", "Comando de válvulas", 
    "Sensor de fase", "Sensor de nível de óleo", "Válvula limitadora de pressão", "Cárter de óleo", "Sensor MAP", 
    "Hélice do radiador", "Cárter de óleo", "Polia do virabrequim", "Ventilador do radiador", "Mangueira do freio", 
    "Cilindro de freio", "Pinça de freio", "Amortecedor de direção", "Eixo traseiro", "Cubo de roda", 
    "Parafuso de roda", "Interruptor de luz de ré", "Junta do semi-eixo", "Eixo de comando", "Parafuso de roda", 
    "Porca de roda", "Eixo de comando", "Eixo-árvore", "Jogo de juntas", "Ponteira do limpador"
];

const inputField = document.getElementById("myInput");
let currentFocus = -1;

// Função para autocompletar com suporte a teclado
function autocomplete(inp, arr) {
    let currentFocus = -1;

    inp.addEventListener("input", function(e) {
        let val = this.value;
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        let div = document.createElement("DIV");
        div.setAttribute("id", this.id + "autocomplete-list");
        div.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(div);
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].substr(0, val.length).toUpperCase() === val.toUpperCase()) {
                let item = document.createElement("DIV");
                item.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                item.innerHTML += arr[i].substr(val.length);
                item.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                item.addEventListener("click", function(e) {
                    inp.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                });
                div.appendChild(item);
            }
        }
    });

    inp.addEventListener("keydown", function(e) {
        let autocompleteItems = document.getElementById(this.id + "autocomplete-list");
        if (autocompleteItems) autocompleteItems = autocompleteItems.getElementsByTagName("div");
        if (e.key === "ArrowDown") {
            currentFocus++;
            addActive(autocompleteItems);
        } else if (e.key === "ArrowUp") {
            currentFocus--;
            addActive(autocompleteItems);
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (currentFocus > -1) {
                if (autocompleteItems) autocompleteItems[currentFocus].click();
            }
        }
    });

    function addActive(autocompleteItems) {
        if (!autocompleteItems) return false;
        removeActive(autocompleteItems);
        if (currentFocus >= autocompleteItems.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = autocompleteItems.length - 1;
        autocompleteItems[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(autocompleteItems) {
        for (let i = 0; i < autocompleteItems.length; i++) {
            autocompleteItems[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        let autocompleteItems = document.getElementsByClassName("autocomplete-items");
        for (let i = 0; i < autocompleteItems.length; i++) {
            if (elmnt !== autocompleteItems[i] && elmnt !== inp) {
                autocompleteItems[i].parentNode.removeChild(autocompleteItems[i]);
            }
        }
    }

    document.addEventListener("click", function(e) {
        closeAllLists(e.target);
    });
}


autocomplete(inputField, carParts);

// Funções para manipulação do carrinho de compras
function addToCart() {
    let item = document.getElementById("myInput").value.trim();
    let quantity = parseInt(document.getElementById("quantity").value);

    if (item && quantity > 0) {
        let cartItems = document.getElementById("cart-items");
        let existingItem = findExistingItem(item);

        if (existingItem) {
            // Se o item já existe, abrir opção de edição
            let itemInfo = existingItem.querySelector(".item-info");
            let editField = document.createElement("input");
            editField.type = "text";
            editField.value = itemInfo.textContent.trim().replace(/^\d+x\s/, ''); // Remove a quantidade do texto

            // Substituir itemInfo pelo campo de edição
            existingItem.replaceChild(editField, itemInfo);

            // Alterar o evento de clique para aplicar as edições
            editField.addEventListener("change", function() {
                let newItemName = editField.value.trim();
                if (newItemName) {
                    itemInfo.textContent = quantity + "x " + newItemName;
                } else {
                    // Se o campo estiver vazio, remover o item
                    existingItem.remove();
                }

                // Limpar campo de entrada e resetar quantidade
                document.getElementById("myInput").value = "";
                document.getElementById("quantity").value = "1";

                // Retornar o foco para o campo de entrada
                document.getElementById("myInput").focus();
            });
        } else {
            // Se o item não existir, adicioná-lo normalmente
            let cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");

            let itemInfo = document.createElement("div");
            itemInfo.classList.add("item-info");
            itemInfo.textContent = quantity + "x " + item;

            let removeButton = document.createElement("button");
            removeButton.textContent = "Remover";
            removeButton.classList.add("remove-item-btn", "cart-item-btn"); // Adicionando classes para estilo
            removeButton.addEventListener("click", function() {
                cartItem.remove();
            });

            cartItem.appendChild(itemInfo);
            cartItem.appendChild(removeButton);
            cartItems.appendChild(cartItem);

            // Limpar campo de entrada e resetar quantidade
            document.getElementById("myInput").value = "";
            document.getElementById("quantity").value = "1";

            // Retornar o foco para o campo de entrada
            document.getElementById("myInput").focus();
        }
    }
}
function handleEdit() {
    // Este método é usado para o tratamento inicial de edição,
    // mas a lógica real de edição é implementada diretamente em addToCart().
    // Por isso, este método pode ser vazio ou não utilizado diretamente.
}

function findExistingItem(itemName) {
    let cartItems = document.getElementById("cart-items").children;
    for (let i = 0; i < cartItems.length; i++) {
        let itemText = cartItems[i].textContent.trim();
        if (itemText.includes(itemName)) {
            return cartItems[i];
        }
    }
    return null;
}

function checkout() {
    // Obter modelo de carro selecionado
    let carModel = document.getElementById("car-model").value;

    // Obter ano de fabricação selecionado
    let carYear = document.getElementById("car-year").value;

    // Obter peças adicionadas no carrinho
    let cartItems = document.getElementById("cart-items").children;
    let items = [];

    for (let i = 0; i < cartItems.length; i++) {
        let itemText = cartItems[i].textContent.trim();
        let quantity = itemText.match(/^\d+/); // Regex para pegar a quantidade inicial
        let itemName = itemText.replace(/\d+x\s/, '').replace('Remover', '').replace('Editar', '').trim(); // Remover a quantidade e palavras indesejadas

        if (quantity && itemName) {
            items.push(`${quantity[0]} - ${itemName}`);
        }
    }

    // Construir mensagem para o WhatsApp
    let message = `Opa! por favor, me passe o orçamento das seguintes peças:\n\n${carModel}, ano ${carYear}:\n${items.join('\n')}`;

    // Codificar a mensagem para URL
    let whatsappMessage = encodeURIComponent(message);

    // Abrir link do WhatsApp com a mensagem pré-preenchida
    window.open(`https://wa.me/+5581993397280?text=${whatsappMessage}`, "_blank");
}
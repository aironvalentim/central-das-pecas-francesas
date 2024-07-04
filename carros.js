const pieceOptions = {
    Motor: ['Correia', 'Vela de Ignição', 'Radiador', 'Carter', 'Bomba de Óleo'],
    Freios: ['Pastilhas de Freio', 'Discos de Freio', 'Cilindro Mestre', 'Servo Freio'],
    Faróis: ['Lâmpada', 'Lanterna', 'Refletor', 'Fusível'],
    Pneus: ['Pneu Dianteiro', 'Pneu Traseiro', 'Rodas de Liga Leve', 'Calotas'],
    sistemaArrefecimento: ['Radiador', 'Bomba d\'Água', 'Válvula Termostática', 'Mangueiras'],
    sistemaCombustivel: ['Tanque de Combustível', 'Bomba de Combustível', 'Filtro de Combustível', 'Injetores'],
    sistemaDirecao: ['Bomba de Direção Hidráulica', 'Braço de Direção', 'Barra de Direção', 'Caixa de Direção'],
    sistemaEletrico: ['Bateria', 'Alternador', 'Fusíveis', 'Motor de Partida'],
    suspensao: ['Amortecedores', 'Molas', 'Barras Estabilizadoras', 'Buchas']
};

// Função para capturar modelo e ano selecionados
function getCarInfo() {
    const carModel = document.getElementById('car-model').value;
    const carYear = document.getElementById('car-year').value;
    return { carModel, carYear };
}


function selectPieceCategory() {
    const category = document.getElementById('piece-category').value;
    const pieceSelect = document.getElementById('piece');
    const customPieceInput = document.getElementById('custom-piece');
    const pieceOptionsDiv = document.getElementById('piece-options');

    if (category === 'vazio') {
        pieceSelect.innerHTML = '<option value="vazio"></option>';
        pieceOptionsDiv.style.display = 'none';
        customPieceInput.value = '';
    } else {
        pieceSelect.innerHTML = '<option value="vazio"></option>';
        pieceOptions[category].forEach(piece => {
            const option = document.createElement('option');
            option.textContent = piece;
            option.value = piece;
            pieceSelect.appendChild(option);
        });
        pieceOptionsDiv.style.display = 'block';
    }
}

let cart = [];

function renderCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';

    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');

        const itemInfo = document.createElement('span');
        itemInfo.classList.add('item-info');
        itemInfo.textContent = `${item.piece}:`; // Corrigido para interpolação correta

        const itemQuantity = document.createElement('span');
        itemQuantity.classList.add('item-quantity');
        itemQuantity.textContent = `${item.quantity} unidade(s)`; // Corrigido para interpolação correta

        // Botão de remoção
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.classList.add('remove-btn');
        removeButton.setAttribute('data-index', index); // Adiciona um atributo para identificar o item no array
        removeButton.addEventListener('click', () => removeFromCart(index)); // Chama a função removeFromCart com o índice correto

        itemDiv.appendChild(itemInfo);
        itemDiv.appendChild(itemQuantity);
        itemDiv.appendChild(removeButton); // Adiciona o botão de remoção ao item

        cartItemsDiv.appendChild(itemDiv);
    });

    
}

function addToCart() {
    const pieceSelect = document.getElementById('piece');
    const selectedPiece = pieceSelect.value;
    const customPiece = document.getElementById('custom-piece').value.trim();
    const piece = customPiece || selectedPiece;
    const quantity = parseInt(document.getElementById('quantity').value);

    // Verifica se peça e quantidade são válidos
    if (!piece || quantity <= 0) {
        return; // Se a peça estiver vazia ou quantidade não for positiva, não faz nada
    }

    // Limpa campos após adicionar ao carrinho
    pieceSelect.value = 'vazio';
    document.getElementById('custom-piece').value = '';
    document.getElementById('quantity').value = '1';

    // Adiciona item ao carrinho
    cart.push({ piece, quantity });

    // Atualiza visualização do carrinho
    renderCart();
}


function removeFromCart(index) {
    cart.splice(index, 1); // Remove o item do array cart com base no índice fornecido
    renderCart(); // Re-renderiza o carrinho após a remoção do item
}

function checkout() {
    // Captura informações do carro
    const { carModel, carYear } = getCarInfo();

    // Prepara a mensagem para o WhatsApp
    const message = generateWhatsAppMessage(carModel, carYear);

    // Número de telefone para o qual enviar a mensagem
    const phoneNumber = '+5581997881621'; // Substitua pelo número de telefone desejado

    // URL do WhatsApp com a mensagem preparada
    const whatsappMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

    // Redireciona para o WhatsApp
    window.open(whatsappURL, '_blank');

    // Limpa carrinho após finalização
    cart = [];
    renderCart();
}

function generateWhatsAppMessage(carModel, carYear) {
    let message = `Modelo: ${carModel}\nAno de Fabricação: ${carYear}\n\nLista de Peças:\n\n`;

    cart.forEach(item => {
        message += `${item.piece}: ${item.quantity} unidade(s)\n`;
    });

    message += '\nDesejo fazer o orçamento dessas peças.';

    return message;
    
}
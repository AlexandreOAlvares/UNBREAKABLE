async function carregarProdutos() {
    const response = await fetch('/api/products');
    const produtos = await response.json();
    
    console.log("Produtos da UNBREAKABLE carregados:", produtos);
    
    // Filtrar por categoria se houver parâmetro na URL
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const filteredProdutos = category ? produtos.filter(p => p.category === category) : produtos;
    
    // Atualizar título da página
    const pageTitle = document.getElementById('page-title');
    if (pageTitle) {
        pageTitle.textContent = category ? `${category.toUpperCase()}` : 'PRODUTOS';
    }
    
    const productsList = document.getElementById('products-list');
    if (productsList) {
        productsList.innerHTML = '';
        filteredProdutos.forEach(produto => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="https://images.unsplash.com/photo-1574673002660-3294988c81b9?q=80&w=500" alt="${produto.name}">
                <div class="card-overlay">
                    <h3>${produto.name}</h3>
                    <p>R$ ${produto.price.toFixed(2)}</p>
                    <button onclick="addToCart('${produto.name.replace(/'/g, "\\'")}', ${produto.price})" style="margin-top: 10px; background-color: #00d4ff; color: #000; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer;">Adicionar ao Carrinho</button>
                </div>
            `;
            productsList.appendChild(card);
        });
    }
}

carregarProdutos();

function addToCart(name, price) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} adicionado ao carrinho!`);
}

document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('product-gallery');
    const categoryFilter = document.getElementById('category-filter');

    categoryFilter.addEventListener('change', () => {
        const selectedCategory = categoryFilter.value;
        fetchProducts(selectedCategory);
    });

    
    fetchProducts(categoryFilter.value);

    function fetchProducts(category) {
        fetch(`https://makeup-api.herokuapp.com/api/v1/products.json?product_type=${category}`)
            .then(response => response.json())
            .then(products => {
                const limitedProducts = products.slice(0, 20);
                displayProducts(limitedProducts);
            })
    }

    function displayProducts(products) {
        gallery.innerHTML = '';

        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.className = 'gallery-item';
            productItem.innerHTML = `
                <img src="${product.image_link}" alt="${product.name}" onerror="removeProduct(this)">
                <h3>${product.name}</h3>
                <p>${product.price_sign}${product.price}</p>
                <a href="${product.product_link}" target="_blank">View Product</a>
            `;
            gallery.appendChild(productItem);
        });
    }
});


function removeProduct(image) {
    const productItem = image.parentElement;
    productItem.remove();
}

// Получение всех продуктов из localStorage
function getProducts() {
  return JSON.parse(localStorage.getItem('products') || '[]');
}

// Сохранение всех продуктов в localStorage
function setProducts(products) {
  localStorage.setItem('products', JSON.stringify(products));
}

// Загрузка и отображение продуктов на index.html
function loadProducts() {
  const container = document.getElementById('product-container');
  if (!container) return;

  container.innerHTML = '';
  const products = getProducts();

  products.forEach(product => {
    const div = document.createElement('div');
    div.className = 'product-card';
    div.innerHTML = `
      <input type="checkbox" class="delete-checkbox" data-sku="${product.sku}">
      <p><strong>SKU:</strong> ${product.sku}</p>
      <p><strong>Name:</strong> ${product.name}</p>
      <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
      ${getTypeDetails(product)}
    `;
    container.appendChild(div);
  });
}

// Форматирование дополнительных данных по типу
function getTypeDetails(product) {
  switch (product.type) {
    case 'DVD': return `<p><strong>Size:</strong> ${product.size}MB</p>`;
    case 'Book': return `<p><strong>Weight:</strong> ${product.weight}KG</p>`;
    case 'Furniture': return `<p><strong>Dimensions:</strong> ${product.height}x${product.width}x${product.length}</p>`;
    default: return '';
  }
}

// Массовое удаление
function massDelete() {
  const checkboxes = document.querySelectorAll('.delete-checkbox:checked');
  const skusToDelete = Array.from(checkboxes).map(cb => cb.dataset.sku);

  if (skusToDelete.length === 0) {
    alert('No products selected.');
    return;
  }

  const products = getProducts().filter(p => !skusToDelete.includes(p.sku));
  setProducts(products);
  loadProducts();
}

// Сохранение нового продукта
function saveProductFromForm() {
  const form = document.getElementById('product_form');
  if (!form.reportValidity()) return;

  const type = form.productType.value;
  const product = {
    sku: form.sku.value,
    name: form.name.value,
    price: parseFloat(form.price.value),
    type
  };

  if (type === 'DVD') {
    product.size = parseFloat(form.size.value);
  } else if (type === 'Book') {
    product.weight = parseFloat(form.weight.value);
  } else if (type === 'Furniture') {
    product.height = parseFloat(form.height.value);
    product.width = parseFloat(form.width.value);
    product.length = parseFloat(form.length.value);
  }

  const products = getProducts();
  products.push(product);
  setProducts(products);

  alert('Product saved!');
  window.location.href = 'index.html';
}

// Если на главной — загрузка продуктов
if (document.readyState !== 'loading') {
  loadProducts();
} else {
  document.addEventListener('DOMContentLoaded', loadProducts);
}

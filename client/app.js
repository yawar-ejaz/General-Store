const form = document.getElementById("form");
const table = document.getElementById("table");
const tableBody = document.getElementById("tableBody");
const submitBtn = document.getElementById("submit-btn");

form.addEventListener('submit', addProduct);

async function addProduct(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const desc = e.target.desc.value;
    const price = e.target.price.value;
    const quantity = e.target.quantity.value;
    e.target.name.value = "";
    e.target.desc.value = "";
    e.target.price.value = "";
    e.target.quantity.value = "";

    const item = {
        name: name,
        desc: desc,
        price: price,
        quantity: quantity
    };

    try {
        await axios.post(`http://localhost:3000/api/products`, item);
        printData()
    } catch (error) {
        console.log(error);
    }
}

async function printData() {
    try {
        const result = await axios.get(`http://localhost:3000/api/products`);
        const items = result.data;

        if (items.length == 0) {
            table.classList.add("d-none");
        }
        else {
            table.classList.remove("d-none");
            let data = "";

            items.forEach((item, index) => {
                data = data + `<tr> <th scope="row">${index + 1}</th>
                <td>${item.name}</td>
                <td>${item.desc}</td>
                <td>${item.price}</td>
                <td>${item.quantity}</td>
                <td><button class="btn btn-sm btn-primary" onclick="decreaseQuantity('${item._id}', '1')">Buy 1</button></td>
                <td><button class="btn btn-sm btn-primary" onclick="decreaseQuantity('${item._id}', '2')">Buy 2</button></td>
                <td><button class="btn btn-sm btn-primary" onclick="decreaseQuantity('${item._id}', '3')">Buy 3</button></td>
                <td><button class="btn btn-sm btn-danger" onclick="deleteProduct('${item._id}')">Delete</button></td>
                </tr>`;
            });
            tableBody.innerHTML = data;
        }
    } catch (error) {
        console.log(error);
    }
}

async function decreaseQuantity(id, decreaseBy) {
    try {
        await axios.put(`http://localhost:3000/api/products/${id}/${decreaseBy}`);
        printData();
    } catch (error) {
        console.log(error);
    }
}

async function deleteProduct(id) {
    try {
        await axios.delete(`http://localhost:3000/api/products/${id}`);
        printData();
    } catch (error) {
        console.log(error);
    }
}

document.addEventListener("DOMContentLoaded", printData);
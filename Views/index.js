
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("appointment-form");
    const list = document.getElementById("appointment-list");
    const btnBuscarNome = document.getElementById("btn-buscar-nome");
    const inputNome = document.getElementById("search-name")
    const resultadoNomeDiv = document.getElementById("resultado-busca-nome");

    // 🔹 Função para buscar e exibir compromissos
    
        const fetchAppointments = async () => {
            if(list){
                try {
                    const response = await fetch("http://localhost:3000/appointments"); // Ajuste a URL se necessário
                    const appointments = await response.json();

                    // Limpa a lista antes de adicionar novos itens
                    list.innerHTML = "";

                    appointments.forEach(appointment => {
                        const li = document.createElement("li");
                        li.innerHTML = `
                        <p><strong>Nome: </strong>${appointment.name} </p>
                        <p><strong>Categoria: </strong>${appointment.category} </p>
                        <p><strong>Preço: </strong>${appointment.price} <strong>R$</strong></p>
                        <p><strong>Estoque: </strong>${appointment.stock}  </p>
                        <p><strong>Descrição: </strong>${appointment.description}  </p>`;

                        // Botão para deletar compromisso
                        const deleteButton = document.createElement("button");
                        deleteButton.textContent = "Excluir";
                        deleteButton.onclick = () => deleteAppointment(appointment._id);
                

                        li.appendChild(deleteButton);
                        list.appendChild(li);
                        
                    });

                } catch (error) {
                    console.error("Erro ao buscar compromissos:", error);
                }
            };
        };

    // 🔹 Função para criar um novo compromisso
    if(form) {
        form.addEventListener("submit", async (event) => {
            event.preventDefault();

            const name = document.getElementById("name").value;
            const category = document.getElementById("category").value;
            const price = parseFloat(document.getElementById("price").value);
            const stock = document.getElementById("stock").value;
            const description = document.getElementById("description").value;

            const newAppointment = { name, category, price, stock, description };

            try {

                const response = await fetch("http://localhost:3000/appointments", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newAppointment)
                });
                
                if (response.ok){
                    form.reset(); // Limpa o formulário
                    fetchAppointments(); // Atualiza a lista após criar um novo compromisso
                    alert("Produto cadastrado com sucesso");
                } else {
                    const errorData = await response.json();
                    alert("Erro ao cadastar o produto: " + (errorData.message || "Erro desconhecido"));
                }
            } catch (error) {
                console.error("Erro ao criar compromisso:", error);
            }
        });
    }

    // 🔹 Função para deletar um compromisso
    const deleteAppointment = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/appointments/${id}`, { method: "DELETE" });
            
            if (response.ok){
                fetchAppointments(); // Atualiza a lista após deletar
            } else {
                const data = await response.json();
                console.error("Erro ao deletar compromisso", data.message);
                alert(`erro ao deletar: ${data.message}`);
            }
        } catch (error) {
            console.error("Erro ao deletar compromisso:", error);
        }
    };

    // 🔹 Carregar compromissos ao iniciar a página
    fetchAppointments();

    const atualizaAppointment = async (id, appointment) => {
        const updatedName = prompt("atualize o nome", appointment.name);
        const updatedCategory = prompt("atualize a categoria", appointment.category);
        const updatedPrice = prompt("atualize o preço", appointment.price);
        const updatedStock = prompt("atualize o estoque", appointment.stock);
        const updatedDescription = prompt("atualize a descrição", appointment.description);

        const attAppointment = {
            name: updatedName,
            category: updatedCategory,
            price: updatedPrice,
            stock: updatedStock,
            description: updatedDescription
        };


        try {
            await fetch(`http://localhost:3000/appointments/${id}`, {
                method: "PUT", 
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(attAppointment)
            
            });

        } catch (error) {
            console.error("Erro ao atualizar compromisso", error)
        }
    }

    btnBuscarNome.addEventListener("click", async () => {
        const nome = inputNome.value.trim();
        
        if (!nome){
            alert("Digite um nome valido");
            return;
        }

        try {
            const response = await fetch (`http://localhost:3000/appointments/search?name=${encodeURIComponent(nome)}`);

            if (!response.ok) {
                resultadoNomeDiv.innerHTML = `<p style = "color: red;">Nenhum produto encontrado.</p>`;
                return;
            }

            const appointments = await response.json();

            resultadoNomeDiv.innerHTML = "";

            appointments.forEach(appointment => {
                resultadoNomeDiv.innerHTML += `
                <div style="border:1px solid #ccc; padding:10px; margin:10px 0;">
                    <p><strong>Nome:</strong> ${appointment.name}</p>
                    <p><strong>Categoria:</strong> ${appointment.category}</p>
                    <p><strong>Preço:</strong> ${appointment.price} R$</p>
                    <p><strong>Estoque:</strong> ${appointment.stock}</p>
                    <p><strong>Descrição:</strong> ${appointment.description}</p>
                </div>
                `;
            });

        } catch (error) {
            console.error("Erro ao buscar produto", error);
            resultadoNomeDiv.innerHTML = `<p style="color:red;">Erro ao buscar compromisso.</p>`;
        }
    });
    
});

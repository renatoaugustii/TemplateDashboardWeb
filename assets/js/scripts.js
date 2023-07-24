
// Lógica para consumir API de cep do site ViaCEP via JSON
// Site: https://viacep.com.br/ws/30850760/json

const cepInput = document.querySelector("#CEP");

//Aceita apenas número no INPUT
cepInput.addEventListener("keypress", (e) => {
    const onlynumbers = /[0-9]/;
    const key = String.fromCharCode(e.keyCode);

    if (!onlynumbers.test(key)) {
        e.preventDefault();
        return;
    }
})


//Coloco no form os valores do Enderenço
const showData = (result) => {
    for (const campo in result) {
        if (document.querySelector("#" + campo)) {
            document.querySelector("#" + campo).value = result[campo]
        }
    }
 
}


// Clique do botao inicia a funcao de busca do CEP
function buscar_cep() {

    let search = cepInput.value

    // Erro caso o CEP esteja incompleto
    if (search.length === 8) {
        const options = {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        }
        fetch(`https://viacep.com.br/ws/${search}/json/`, options)
        .then(response => {
            response.json()
                .then(data => {
                    if (data.erro) {
                        // CEP inválido, mostra um alerta
                        alert("CEP inválido!");
                        limpar_endereco();
                    } else {
                        // CEP válido, exiba os dados
                        showData(data);
                        document.querySelector("#NUMERO").focus();
                    }
                })
                .catch(error => {
                    // Erro ao fazer o parse do JSON, mostra um alerta
                    alert("Erro ao processar os dados: " + error);
                });
        })
        .catch(error => {
            // Erro ao fazer o request, mostra um alerta
            alert("Erro na requisição: " + error);
        });
    
    }
    else {
        alert ("Cep Incompleto");
        limpar_endereco();
    }
}

// Funcao de limpar endereco do form Clientes
function limpar_endereco(){

    document.querySelector("#CEP").value = "";
    document.querySelector("#logradouro").value = "";
    document.querySelector("#NUMERO").value = "";
    document.querySelector("#complemento").value = "";
    document.querySelector("#bairro").value = "";
    document.querySelector("#localidade").value = "";
    document.querySelector("#uf").value = "";
}


//MASCARAS DE INPUT TELEFONE
const handlePhone = (event) => {
    let input = event.target
    input.value = phoneMask(input.value)
  }
  
  const phoneMask = (value) => {
    if (!value) return ""
    value = value.replace(/\D/g,'')
    value = value.replace(/(\d{2})(\d)/,"($1) $2")
    value = value.replace(/(\d)(\d{4})$/,"$1-$2")
    return value
  }


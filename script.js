    // Função para formatar o valor como moeda (R$)
function formatarMoeda(input) {
    let valor = input.value.replace(/\D/g, ''); // Remove tudo que não é número
    if (valor) {
        valor = (parseInt(valor) / 100).toFixed(2).replace('.', ','); // Formata como moeda
        input.value = 'R$ ' + valor;
    }
}

// Função para calcular a folha de pagamento
function calcularFolha() {
    const salarioBase = parseFloat(document.getElementById('vencimento').value.replace('R$ ', '').replace(',', '.')) || 0;
    const adicional = parseFloat(document.getElementById('adicional').value.replace('R$ ', '').replace(',', '.')) || 0;
    const gratificacao = parseFloat(document.getElementById('gratificacao').value.replace('R$ ', '').replace(',', '.')) || 0;
    const auxilio = parseFloat(document.getElementById('auxilio').value.replace('R$ ', '').replace(',', '.')) || 0;
    const dependentes = Math.max(parseInt(document.getElementById('dependentes').value) || 0, 0);

    // Total bruto
    const totalBruto = salarioBase + adicional + gratificacao + auxilio;

    // Contribuição Previdenciária (14% sobre salário base + adicional)
    const basePrevidencia = salarioBase + adicional;
    const fps = basePrevidencia * 0.14;

    // Base para IRRF (após FPS)
    const baseIRRF = (basePrevidencia - fps) + gratificacao;

    // Dedução por dependente
    const deducaoDependentes = dependentes * 189.59;
    const baseTributavel = baseIRRF - deducaoDependentes;

    // Cálculo do IRRF
    let irrf = 0;

    if (baseTributavel <= 2259.20) {
        irrf = 0;
    } else if (baseTributavel <= 2826.65) {
        irrf = (baseTributavel * 0.075) - 169.44;
    } else if (baseTributavel <= 3751.05) {
        irrf = (baseTributavel * 0.15) - 381.44;
    } else if (baseTributavel <= 4664.68) {
        irrf = (baseTributavel * 0.225) - 662.77;
    } else {
        irrf = (baseTributavel * 0.275) - 896.00;
    }

    // Totais
    const totalDescontos = fps + irrf;
    const totalLiquido = totalBruto - totalDescontos;

    // Atualizar resultados na página
    atualizarResultado('totalBruto', totalBruto);
    atualizarResultado('fps', fps, true);  // Passando true para o FPS para sempre ficar vermelho
    atualizarResultado('irrf', irrf, true);  // Passando true para o IRRF para sempre ficar vermelho
    atualizarResultado('totalDescontos', totalDescontos, true);  // Passando true para Total de Descontos para sempre ficar vermelho
    atualizarResultado('totalLiquido', totalLiquido);
}

// Função para atualizar os resultados e garantir que FPS, IRRF e Total Descontos fiquem vermelhos
function atualizarResultado(id, valor, vermelho = false) {
    const elemento = document.getElementById(id);
    elemento.innerText = `R$ ${valor.toFixed(2)}`;
    
    // Se o parâmetro 'vermelho' for true, aplica a cor vermelha
    if (vermelho) {
        elemento.style.color = 'red';
    } else {
        elemento.style.color = 'black'; // Cor padrão para outros valores
    }
}

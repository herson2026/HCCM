function calcularFolha() {
    const salarioBase = parseFloat(document.getElementById('vencimento').value) || 0;
    const adicional = parseFloat(document.getElementById('adicional').value) || 0;
    const gratificacao = parseFloat(document.getElementById('gratificacao').value) || 0;
    const auxilio = parseFloat(document.getElementById('auxilio').value) || 0;
    const dependentes = parseInt(document.getElementById('dependentes').value) || 0;

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

    // Mostrar resultados
    document.getElementById('totalBruto').innerText = `R$ ${totalBruto.toFixed(2)}`;
    document.getElementById('fps').innerText = `R$ ${fps.toFixed(2)}`;
    document.getElementById('irrf').innerText = `R$ ${irrf.toFixed(2)}`;
    document.getElementById('totalDescontos').innerText = `R$ ${totalDescontos.toFixed(2)}`;
    document.getElementById('totalLiquido').innerText = `R$ ${totalLiquido.toFixed(2)}`;
}

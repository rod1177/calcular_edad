document.addEventListener("DOMContentLoaded",() => {
    const dia_Ingreso = document.getElementById("Dia")
    const mes_Ingreso = document.getElementById("Mes")
    const año_Ingreso = document.getElementById("Año")

    const dia_resultado = document.getElementById("Dias")
    const mes_resultado = document.getElementById("Meses")
    const año_resultado = document.getElementById("Años")

    function calcular_Edad(){
        const dia = parseInt(dia_Ingreso.value)
        const mes = parseInt(mes_Ingreso.value)
        const año = parseInt(año_Ingreso.value)
        const hoy = new Date()

    if(isNaN(dia) || isNaN(mes) || isNaN(año)) return mostrar_Resultado("---", "---", "---")
    
    const año_Actual = hoy.getFullYear()
    if(año > año_Actual) return mostrar_Resultado("El año es invalido", "", "")

    const dias_Meses = new Date(año, mes, 0).getDate()
    if(dia < 1 || dia > dias_Meses || mes < 1 || mes > 12)
        return mostrar_Resultado("Fecha invalida", "", "")

    const nacimiento = new Date(año, mes -1, dia)
    if (nacimiento > hoy) return mostrar_Resultado("Fecha futura", "", "")
    
    let años = hoy.getFullYear() - nacimiento.getFullYear()
    let meses = hoy.getMonth() - nacimiento.getMonth()
    let dias = hoy.getDate() - nacimiento.getDate()

    if (dias < 0) {
        meses--
        const ultimo_Mes = new Date(hoy.getFullYear(), hoy.getMonth(), 0)
        dias += ultimo_Mes.getDate()
    }

    if (meses < 0){
        años--
        meses += 12
    }

    mostrar_Resultado(años, meses, dias)}

    function mostrar_Resultado(a, m, d){
    año_resultado.textContent = a
    mes_resultado.textContent = m
    dia_resultado.textContent = d
    }

     

    [dia_Ingreso, mes_Ingreso, año_Ingreso].forEach((input) =>
    input.addEventListener("input", calcular_Edad)
    
    )
calcular_Edad()

}
)
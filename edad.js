document.addEventListener("DOMContentLoaded", () => {
    const dia_Ingreso = document.getElementById("Dia");
    const mes_Ingreso = document.getElementById("Mes");
    const año_Ingreso = document.getElementById("Año");

    const dia_resultado = document.getElementById("Dias");
    const mes_resultado = document.getElementById("Meses");
    const año_resultado = document.getElementById("Años");

    const año_Actual = new Date().getFullYear();
    const dia_Actual = new Date().getDate()
    const mes_Actual = new Date().getMonth()
    const año_min = 1920;

    console.log(mes_Actual)

    function marError(inp) {
        inp.classList.add("error");
        setTimeout(() => inp.classList.remove("error"), 800);
    }

    function bloquear_ingreso(inp, min, max, maxLength = 4, parcial = false) {
        inp.maxLength = maxLength;

        inp.addEventListener("beforeinput", (e) => {
            if (e.inputType.startsWith("delete")) return
            if (e.data && !/^\d+$/.test(e.data)) {
                e.preventDefault();
                marError(inp);
                return;
            }

            const nuevo_Valor = (
                inp.value.slice(0, inp.selectionStart) +
                (e.data ?? "") +
                inp.value.slice(inp.selectionEnd)
            );

            if (nuevo_Valor === "") return;
            const num = parseInt(nuevo_Valor);

            if (parcial) {
                if (num > max) {
                    e.preventDefault();
                    marError(inp);
                }
                return;
            }

            if (num < min || num > max) {
                e.preventDefault();
                marError(inp);
            }
        });

        inp.addEventListener("paste", (e) => {
            const paste = (e.clipboardData.getData("text") || "").trim();
            if (!/^\d+$/.test(paste)) {
                e.preventDefault();
                marError(inp);
                return;
            }
            const num = parseInt(paste);
            if (num < min || num > max) {
                e.preventDefault();
                marError(inp);
            }
        });
    }

    bloquear_ingreso(dia_Ingreso, 1, 31);
    bloquear_ingreso(mes_Ingreso, 1, 12);
    bloquear_ingreso(año_Ingreso, año_min, año_Actual, 4, true);

    function calcular_Edad() {
        const dia = parseInt(dia_Ingreso.value);
        const mes = parseInt(mes_Ingreso.value);
        const año = parseInt(año_Ingreso.value);
        const hoy = new Date();

        if (isNaN(dia) || isNaN(mes) || isNaN(año)) {
            return mostrar_Resultado("---", "---", "---");
        }

        const nacimiento = new Date(año, mes - 1, dia);
        if (nacimiento > hoy) {
            marError(dia_Ingreso);
            marError(mes_Ingreso);
            marError(año_Ingreso);
            mostrar_Resultado("Ingrese", " una fecha menor", "a: " + dia_Actual + "/" + (mes_Actual+1) + "/" + año_Actual);

            if (año > hoy.getFullYear()) año_Ingreso.value = hoy.getFullYear();
            if (año === hoy.getFullYear() && mes > hoy.getMonth() + 1)
                mes_Ingreso.value = hoy.getMonth() + 1;
            if (
                año === hoy.getFullYear() &&
                mes === hoy.getMonth() + 1 &&
                dia > hoy.getDate()
            )
                dia_Ingreso.value = hoy.getDate();

            return;
        }

        if (año < año_min || año > año_Actual) {
            marError(año_Ingreso);
            return mostrar_Resultado("Año fuera de rango", "", "");
        }


        const dias_Mes = new Date(año, mes, 0).getDate();
        if (dia < 1 || dia > dias_Mes) {
            marError(dia_Ingreso);
            return mostrar_Resultado(`Día no válido`, `(1-${dias_Mes})`, "");
        }

        let años = hoy.getFullYear() - nacimiento.getFullYear();
        let meses = hoy.getMonth() - nacimiento.getMonth();
        let dias = hoy.getDate() - nacimiento.getDate();

        if (dias < 0) {
            meses--;
            const ultimo_Mes = new Date(hoy.getFullYear(), hoy.getMonth(), 0);
            dias += ultimo_Mes.getDate();
        }

        if (meses < 0) {
            años--;
            meses += 12;
        }

        mostrar_Resultado(años, meses, dias);
    }

    function mostrar_Resultado(a, m, d) {
        año_resultado.textContent = a;
        mes_resultado.textContent = m;
        dia_resultado.textContent = d;
    }

    [dia_Ingreso, mes_Ingreso, año_Ingreso].forEach(inp => {
        inp.addEventListener("input", calcular_Edad);
    });

    calcular_Edad();
});

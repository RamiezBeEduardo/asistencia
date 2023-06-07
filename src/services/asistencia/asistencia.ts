import apiInstance from '../../api/axiosInstance';


export const listarPlanService = async () => {

    const url = '/campus/listar-plan';
    try {
        const response = await apiInstance.post(url, {
            dato: {
                codigoCiclo: "",
            },
        });
        return response.data;
    } catch (error) {
        return error;
    }
};
export const listarCursoService = async (codigoPlan: any) => {
    const url = '/campus/listar-curso';
    try {
        const response = await apiInstance.post(url, {
            dato: {
                codigoCiclo: "",
                codigoPlan: codigoPlan
            },
        });
        return response.data;
    } catch (error) {
        return error;
    }
};
export const listarInformacionService = async (codigoPlan: any, codigoCurso: any) => {
    console.log('servicio')
    console.log('codigoPlan = ', codigoPlan)
    console.log('codigoCurso = ', codigoCurso)
    const url = '/campus/listar-informacion';
    try {
        const response = await apiInstance.post(url, {
            dato: {
                codigoCiclo: "",
                codigoCurso: codigoCurso,
                codigoPlan: codigoPlan
            },
        });
        return response.data;
    } catch (error) {
        return error;
    }
};

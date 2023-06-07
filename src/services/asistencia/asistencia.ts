import apiInstance from '../../api/axiosInstance';


export const listarPlanService = async () => {

    const url = '/campus/listar-plan';
    try {
        const response = await apiInstance.post(url, {
            dato: {
                codigoCiclo: "20221",
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
                codigoCiclo: "20221",
                codigoPlan: codigoPlan
            },
        });
        return response.data;
    } catch (error) {
        return error;
    }
};
export const listarInformacionService = async (codigoPlan: any, codigoCurso: any) => {
    const url = '/campus/listar-informacion';
    try {
        const response = await apiInstance.post(url, {
            dato: {
                codigoCiclo: "20221",
                codigoCurso: codigoCurso,
                codigoPlan: codigoPlan
            },
        });
        return response.data;
    } catch (error) {
        return error;
    }
};

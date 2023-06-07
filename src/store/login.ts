import { create } from 'zustand'
import axios from "axios"

// mock adapter para pruebas, quitar en produccion
import planes from './planes.json'
import cursos from './cursos.json'
import secciones from './secciones.json'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

// import { createServer } from "miragejs"
import { listarCursoService, listarInformacionService, listarPlanService } from '../services/asistencia/asistencia'

// //  https://uapvirtual-dev.uap.edu.pe:8443/uapmatriculapruebaback/api/campus/listar-plan

// createServer({

//     routes() {
//         this.urlPrefix = 'https://uapvirtual-dev.uap.edu.pe:8443/uapmatriculapruebaback/api';
//         this.post("https://uapvirtual-dev.uap.edu.pe:8443/uapmatriculapruebaback/api/campus/listar-plan", (schema, request) => ({
//             dato: planes.dato
//         }))

//         this.post("https://uapvirtual-dev.uap.edu.pe:8443/uapmatriculapruebaback/api/campus/listar-curso", (schema, request) => ({
//             dato: cursos.dato
//         }))

//         this.post("https://uapvirtual-dev.uap.edu.pe:8443/uapmatriculapruebaback/api/campus/listar-informacion", (schema, request) => ({
//             dato: secciones.dato
//         }))
//         this.passthrough()
//         this.passthrough("http://localhost:5984/**")


//     },
// })


interface Solicitud {
    plan: [];
    loadingPlan: boolean;
    listarPlan: () => {};

}

const useStore = create((set, get) => ({
    username: null,
    planes: null,
    cursos: null,
    curso: null,
    secciones: null,
    alumnos: null,

    login: async (data: any) => {
        if (['usuario01', 'usuario02'].includes(data.username) && (data.password == 'password')) {
            let result = await listarPlanService();
            set({
                username: data.username,
                planes: result
            });
        }
        return false
    },

    setAlumnos: async (data: any) => {
        console.log('set Alumnos')
        set({ alumnos: data })
    },

    getCursos: async (data: any) => {
        let result = await listarCursoService(data);
        set({
            cursos: result
        });
        return false
    },


    getSecciones: async (codigoPlan: any, codigoCurso: any) => {

        let result = await listarInformacionService(codigoPlan, codigoCurso);
        console.log("result = ", result);
        set({
            secciones: result
        });
        return false

    },

    setCurso: (data: any) => {
        console.log('set curso')
        set({
            curso: data
        })
    },

    getAlumnos: (data: any) => {
        console.log('get alumnos')
        console.log(secciones.dato.length)

        for (let i = 0; i < secciones.dato.length; i++) {
            console.log(i + '//' + secciones.dato[i])

            if (secciones.dato && secciones.dato[i] && secciones.dato[i].seccodi && secciones.dato[i].seccodi == data) {
                set({
                    alumnos: secciones.dato[i].alumnos
                })
            }

        }

        return false
    },

    sendData: async (data: any) => {
        console.log('send data');
        console.log(data)


        const username = 'admin';
        const password = 'admin';
        const databaseUrl = 'http://localhost:5984/asistencias'; // Replace with your CouchDB database URL

        let documentData = { ...data, fecha: dayjs().tz('America/Lima').format('YYYY-MM-DD hh:mm:ss') }
        try {
            await axios.post(databaseUrl, documentData, {
                auth: {
                    username: username,
                    password: password
                }
            })
        }
        catch (e) {
            console.log(e)
        }
    }

}));

export default useStore;
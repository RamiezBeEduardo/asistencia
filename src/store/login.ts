// @ts-nocheck
import { create } from 'zustand'
import axios from "axios"

// mock adapter para pruebas, quitar en produccion
// import planes from './planes.json'
// import cursos from './cursos.json'
// import secciones from './secciones.json'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { message } from 'antd';
dayjs.extend(utc)
dayjs.extend(timezone)

// import { createServer } from "miragejs"
import { listarCursoService, listarInformacionService, listarPlanService, loginDocente } from '../services/asistencia/asistencia'

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
    plan: null,
    secciones: null,
    alumnos: null,

    login: async (data: any) => {
        let resultLogin = await loginDocente(data.username, data.password);
        if (resultLogin.dato.respuesta == 1) {
            let result = await listarPlanService();
            set({
                username: data.username,
                planes: result
            });
            message.success("Usuario autenticado");
        } else {
            message.error("Usuario o clave incorrecta");
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
    setPlan: (data: any) => {
        console.log('set plan')
        set({
            plan: data
        })
    },

    getAlumnos: (data: any) => {
        console.log('get alumnos')
        console.log(get().secciones.dato.length)

        for (let i = 0; i < get().secciones.dato.length; i++) {
            console.log(i + '//' + get().secciones.dato[i])

            if (get().secciones.dato && get().secciones.dato[i] && get().secciones.dato[i].seccodi && get().secciones.dato[i].seccodi == data) {
                set({
                    alumnos: get().secciones.dato[i].alumnos
                })
            }

        }

        return false
    },

    sendData: async (data: any) => {
        console.log('send data');
        console.log(data)


        // COUCH_ID = "f46536b12efe9874afa711c40b0005f3"
        // COUCH_IP = "https://citas.uap.edu.pe:6984"
        // COUCH_USER = "admin"
        // COUCH_PASSWORD = "q81ekmWqpUSRuTfUd0BV"

        const username = 'admin';
        const password = 'q81ekmWqpUSRuTfUd0BV';
        const databaseUrl = 'https://citas.uap.edu.pe:6984/asistencias'; // Replace with your CouchDB database URL

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
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

import { createServer } from "miragejs"

//  https://uapvirtual-dev.uap.edu.pe:8443/uapmatriculapruebaback/api/campus/listar-plan

createServer({
    
  routes() {
    this.urlPrefix = 'https://uapvirtual-dev.uap.edu.pe:8443/uapmatriculapruebaback/api';
    this.post("/campus/listar-plan", (schema, request) => ({
        dato: planes.dato
    }))

    this.post("/campus/listar-curso", (schema, request) => ({
        dato: cursos.dato
    }))

    this.post("/campus/listar-informacion", (schema, request) => ({
        dato: secciones.dato
    }))
    this.passthrough()
    this.passthrough("http://localhost:5984/**")
    

  },
})
// end
// https://uapvirtual-dev.uap.edu.pe:8443/uapmatriculapruebaback/api/campus/listar-informacion

const url = "https://uapvirtual-dev.uap.edu.pe:8443/uapmatriculapruebaback/api/";

const useStore = create((set, get) => ({
    username: null,
    planes: null,
    cursos: null,
    curso: null,
    secciones: null,
    alumnos: null,

    login: async (data: any) => {
        console.log('login with user: ' + data.username + ' and password: ' + data.password)
        if (['usuario01', 'usuario02'].includes(data.username) && (data.password == 'password')) {
            let result = await axios.post(url + 'campus/listar-plan')
            set({ 
                username: data.username,
                planes: result.data
            });
        }
        return false
    },

    setAlumnos: async (data: any) => {
        console.log('set Alumnos')
        set({alumnos: data})
    },

    getCursos: async (data: any) => {
        console.log('get cursos')
        let result = await axios.post(url + 'campus/listar-curso')
            set({ 
                cursos: result.data
            });
        return false
    },

    getSecciones: async (data: any) => {
        console.log('get secciones')

        let result = await axios.post(url + 'campus/listar-informacion')
        set({ 
            //curso: data,
            secciones: result.data
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

        let documentData = { ...data, fecha: dayjs().tz('America/Lima').format('YYYY-MM-DD hh:mm:ss')}
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
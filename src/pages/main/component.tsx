import style from './index.module.css'
import { Route, Routes } from "react-router-dom"
import Login from "../login/component"

const component = () => {
    return (
        <div className={style.component}>
            <Routes>
                <Route path="/" element={<Login />} />
            </Routes>
        </div>
    )
}

export default component;
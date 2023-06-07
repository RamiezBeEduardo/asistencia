import * as React from "react";
import style from "./index.module.css";
import { Button, Form, Input, Select } from "antd";
import useLoginStore from "../../store/login";

const component = () => {
  const [codigoPlan, setCodigoPlan] = React.useState();
  const [codigoCurso, setCodigoCurso] = React.useState();
  const [form] = Form.useForm();
  const username = useLoginStore((state: any) => state.username);
  const login = useLoginStore((state: any) => state.login);
  const planes = useLoginStore((state: any) => state.planes);
  const getCursos = useLoginStore((state: any) => state.getCursos);
  const cursos = useLoginStore((state: any) => state.cursos);
  const curso = useLoginStore((state: any) => state.curso);
  const setCurso = useLoginStore((state: any) => state.setCurso);
  const secciones = useLoginStore((state: any) => state.secciones);
  const getSecciones = useLoginStore((state: any) => state.getSecciones);
  const getAlumnos = useLoginStore((state: any) => state.getAlumnos);
  const setAlumnos = useLoginStore((state: any) => state.setAlumnos);
  const alumnos = useLoginStore((state: any) => state.alumnos);
  const sendData = useLoginStore((state: any) => state.sendData);
  //const [locals, setLocals] = useState(alumnos)
  // console.log("CURSO");
  // console.log(curso);

  const onFinish = async () => {
    // console.log("login button");
    /*
        login({
            username: form.getFieldValue('username'), 
            password: form.getFieldValue('password')
        })
        */
    let res = await form.validateFields();
    // console.log(res);
    if (res) {
      getAlumnos(form.getFieldValue("seccion"));
    }
  };

  const idChange = () => {
    // console.log("login change");
    if (form.getFieldValue("username") && form.getFieldValue("password")) {
      login({
        username: form.getFieldValue("username"),
        password: form.getFieldValue("password"),
      });
    }
  };

  const planChange = (e: any) => {
    // console.log("plan Change");
    // console.log("plan Change = ", e);
    getCursos(e);
    setCodigoPlan(e);
  };

  const cursoChange = (e: any) => {
    setCurso(e);
    setCodigoCurso(e);
    getSecciones(codigoPlan, e);
  };

  const seccionChange = (e: any) => {
    // console.log(e);
    // console.log("seccionChange = ", e);
    // console.log("seccion Change");
    // getAlumnos(e)
  };

  let planes_options = null;
  let cursos_options = null;
  let seccion_options = null;

  if (planes && planes.dato) {
    planes_options = planes.dato.map((item: any) => {
      return (
        <Select.Option key={item.crrcodi} value={item.crrcodi}>
          {item.crrcodi}
        </Select.Option>
      );
    });
  }

  if (cursos && cursos.dato) {
    cursos_options = cursos.dato.map((item: any) => {
      return (
        <Select.Option key={item.curcodi} value={item.curcodi}>
          {item.curnomb}
        </Select.Option>
      );
    });
  }

  if (secciones && secciones.dato) {
    // console.log("secciones = ", secciones);
    seccion_options = secciones.dato.map((item: any) => {
      return (
        <Select.Option key={item.seccodi} value={item.seccodi}>
          {item.seccion}
        </Select.Option>
      );
    });
  }

  if (!alumnos) {
    return (
      <div className={style.component}>
        <div
          style={{
            fontWeight: 500,
            fontSize: "32px",
            textAlign: "center",
            letterSpacing: "-1px",
            color: "#2222ff",
          }}
        >
          Log In
        </div>
        <div
          style={{
            fontWeight: 300,
            fontSize: "12x",
            textAlign: "center",
            letterSpacing: "-1px",
            color: "#222222",
            marginTop: "-5px",
          }}
        >
          {username}
        </div>
        <Form
          layout="vertical"
          form={form}
          name="control-ref"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            name="username"
            label="Usuario"
            rules={[{ required: true }]}
            initialValue={"usuario01"}
          >
            <Input onBlur={idChange} />
          </Form.Item>

          <Form.Item
            name="password"
            label="Contraseña"
            rules={[{ required: true }]}
            initialValue={"password"}
          >
            <Input onBlur={idChange} />
          </Form.Item>

          <Form.Item name="plan" label="Plan" rules={[{ required: true }]}>
            <Select onSelect={planChange}>{planes_options}</Select>
          </Form.Item>

          <Form.Item name="curso" label="Curso" rules={[{ required: true }]}>
            <Select onSelect={cursoChange}>{cursos_options}</Select>
          </Form.Item>

          <Form.Item
            name="seccion"
            label="Seccion"
            rules={[{ required: true }]}
          >
            <Select onSelect={seccionChange}>{seccion_options}</Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Enviar
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }

  // console.log("locals");
  //console.log(locals)

  const handleClick = (item: any) => {
    // console.log("handleClick");
    sendData({ ...item, curso: curso });
    // console.log(alumnos);
    // console.log(item);
    let newalumnos = alumnos.filter((alumno: any) => {
      return item.codigoAlumno != alumno.codigoAlumno;
    });
    // console.log(newalumnos);
    setAlumnos(newalumnos);
  };

  let alumnos_options = alumnos.map((item: any) => {
    return (
      <Button
        key={item.codigoAlumno}
        size="large"
        style={{ margin: "5px", width: "calc(100% - 20px)" }}
        onClick={() => {
          handleClick(item);
        }}
      >
        {item.nombre} {item.apellidoPaterno} {item.apellidoMaterno}
      </Button>
    );
  });

  return (
    <div className={style.component} style={{ height: "calc(100% - 60px)" }}>
      <div
        style={{
          fontWeight: 500,
          fontSize: "32px",
          textAlign: "center",
          letterSpacing: "-1px",
          color: "#2222ff",
        }}
      >
        ASISTENCIA
      </div>

      <div style={{ height: "calc(100% - 60px)", overflowY: "scroll" }}>
        {alumnos_options}
      </div>
    </div>
  );
};

export default component;

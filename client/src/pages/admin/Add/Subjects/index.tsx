import { useEffect, useState } from "react";
import { getCareers } from "../../../../helpers/requests";
import 'react-responsive-combo-box/dist/index.css';

const Subjects = () => {


    const [options, setOptions] = useState<string[]>([]);

    useEffect(() => {
        getCareers().then((data) => {
            const names = data
                .sort((a: any, b: any) => a.id - b.id)
                .map((career: any) => career.name);
            setOptions(names);
        });
    }, []);



    return (
        <div className="form-control">
            <div className="form-control py-4">
                <label className="input-group input-group-vertical">
                    <span>Nombre</span>
                    <input type="text" placeholder="Análisis..." className="input input-bordered" />
                </label>
            </div>
            <div className="form-control py-4">
                <label className="input-group input-group-vertical">
                    <span>Orden de Folleto</span>
                    <input type="text" placeholder="16" className="input input-bordered" />
                </label>
            </div>
            <div className="form-control py-4">
                <label className="input-group input-group-vertical">
                    <span>Código de Asignatura</span>
                    <input type="text" placeholder="16" className="input input-bordered" />
                </label>
            </div>
            <div className="form-control py-4">
                <label className="input-group input-group-vertical">
                    <span>Semestre</span>
                    <input type="text" placeholder="4" className="input input-bordered" />
                </label>
            </div>
            <div className="form-control py-4">
                <label className="input-group input-group-vertical">
                    <span>Tipo</span>
                    <input type="text" placeholder="Cuatrimestral" className="input input-bordered" />
                </label>
            </div>
            <div className="form-control">
                <label className="input-group input-group-vertical">
                    <span>Carrera</span>
                    <select defaultValue={"a"} className="select select-bordered">
                        <option id="a" disabled>Selecciona la carrera...</option>
                        {
                            options.map(option => {
                                return <option key={option}>{option}</option>
                            })
                        }
                    </select>
                </label>
            </div>
            <div className="form-control py-4">
                <label className="input-group input-group-vertical">
                    <span>Correlativas</span>
                    <input type="text" placeholder="[]" className="input input-bordered" />
                </label>
            </div>
            <button className="btn btn-primary my-4">Añadír Materia</button>
        </div>
    );
};
export default Subjects;
import { useState } from "react";
import { saveCareer } from "../../../../helpers/requests";


const Careers = () => {

    const [data, setData] = useState<any>({
        name: "",
        semesters: ""
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setData((prevData: any) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const response = await saveCareer(data.name, data.semesters);
        console.log(response);
        setData({ name: "", semesters: "" });
    };

    return (
        <form onSubmit={handleSubmit} className="form-control">
            <div className="form-control py-4">
                <label className="input-group input-group-vertical">
                    <span>Nombre</span>
                    <input name="name" onChange={handleChange} value={data.name} type="text" placeholder="Licenciatura... Ingeniería..." className="input input-bordered" />
                </label>
            </div>
            <div className="form-control py-4">
                <label className="input-group input-group-vertical">
                    <span>Semestres</span>
                    <input name="semesters" onChange={handleChange} value={data.semesters} type="text" placeholder="10" className="input input-bordered" />
                </label>
            </div>
            <button onSubmit={handleSubmit} className="btn btn-primary my-4">Añadir</button>
        </form>
    );
};
export default Careers;
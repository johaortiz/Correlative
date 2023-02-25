import pencil from "../../../../assets/svg/table/pencil.svg";

const Subjects = (props: { tableInfo: any, activeTab: number }) => {
    return (
        <table className={`table table-compact w-full transition left delay-1500 duration-500`}>
            <thead>
                <tr>
                    <th></th>
                    <th>COD</th>
                    <th>Aignatura</th>
                    <th>Tipo</th>
                    <th>Semestre</th>
                    <th>Carrera</th>
                    <th>Correlativas</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    props.tableInfo.map((subject: any, i: number) => {
                        return <tr key={i}>
                            <th>{i + 1}</th>
                            <td>{subject.idFromUniversity}</td>
                            <td>{subject.name}</td>
                            <td>{subject.org}</td>
                            <th className="text-center">{subject.semester}</th>
                            <td>{subject.career}</td>
                            <td>{subject.correlatives.length < 1 ? "No posee" : subject.correlatives.join(" , ")}</td>
                            <td className="m-0 p-0">
                                <label htmlFor={`my-modal-${subject.id}`} className="btn btn-sm btn-ghost"><img src={pencil} alt="editar" className="h-5 w-5" /></label>
                                <input type="checkbox" id={`my-modal-${subject.id}`} className="modal-toggle" />
                                <div className="modal">
                                    <div className="modal-box min-w-min relative">
                                        <label htmlFor={`my-modal-${subject.id}`} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                                        <h3 className="font-bold text-lg">Editar Asignatura</h3>
                                        <div className="form-control mt-4">
                                            <div className="form-control py-3">
                                                <label className="input-group input-group-sm">
                                                    <span>ID</span>
                                                    <input type="text" placeholder={subject.id} disabled className="input input-bordered input-sm" />
                                                </label>
                                            </div>
                                            <div className="form-control py-3">
                                                <label className="input-group input-group-sm">
                                                    <span>COD</span>
                                                    <input type="text" placeholder={subject.idFromUniversity} className="input input-bordered input-sm" />
                                                </label>
                                            </div>
                                            <div className="form-control py-3">
                                                <label className="input-group input-group-sm">
                                                    <span>Asignatura</span>
                                                    <input type="text" placeholder={subject.name} className="input input-bordered input-sm" />
                                                </label>
                                            </div>
                                            <div className="form-control py-3">
                                                <label className="input-group input-group-sm">
                                                    <span>Tipo</span>
                                                    <input type="text" placeholder={subject.org} className="input input-bordered input-sm" />
                                                </label>
                                            </div>
                                            <div className="form-control py-3">
                                                <label className="input-group input-group-sm">
                                                    <span>Semestre</span>
                                                    <input type="text" placeholder={subject.semester} className="input input-bordered input-sm" />
                                                </label>
                                            </div>
                                            <div className="form-control py-3">
                                                <label className="input-group input-group-sm">
                                                    <span>Carrera</span>
                                                    <input type="text" placeholder={subject.career} className="input input-bordered input-sm" />
                                                </label>
                                            </div>
                                            <div className="form-control py-3">
                                                <label className="input-group input-group-sm">
                                                    <span>Correlativas</span>
                                                    <input type="text" placeholder={subject.correlatives.length < 1 ? "No posee" : subject.correlatives.join(" , ")} className="input input-bordered input-sm" />
                                                </label>
                                            </div>
                                        </div>
                                        <div className="modal-action">
                                            <button>
                                                <label htmlFor={`my-modal-${subject.id}`} className="btn">Guardar</label>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    })
                }
            </tbody>
            <tfoot>
                <tr>
                    <th></th>
                    <th>COD</th>
                    <th>Aignatura</th>
                    <th>Tipo</th>
                    <th>Semestre</th>
                    <th>Carrera</th>
                    <th>Correlativas</th>
                    <th></th>
                </tr>
            </tfoot>
        </table>
    );
};
export default Subjects;
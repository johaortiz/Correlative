import pencil from "../../../../assets/svg/table/pencil.svg";

const Career = (props: { tableInfo: any, activeTab: number }) => {
    return (
        <table className={`table table-compact w-full transition left delay-1500 duration-500`}>
            <thead>
                <tr>
                    <th></th>
                    <th>Nombre</th>
                    <th>Duración</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    props.tableInfo.map((career: any) => {
                        return <tr key={career.id}>
                            <th>{career.id}</th>
                            <td>{career.name}</td>
                            <td>{career.semesters / 2} Años</td>
                            <td className="m-0 p-0">
                                <label htmlFor={`my-modal-${career.id}`} className="btn btn-sm btn-ghost"><img src={pencil} alt="editar" className="h-5 w-5" /></label>
                                <input type="checkbox" id={`my-modal-${career.id}`} className="modal-toggle" />
                                <div className="modal">
                                    <div className="modal-box min-w-min relative">
                                        <label htmlFor={`my-modal-${career.id}`} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                                        <h3 className="font-bold text-lg">Editar Carrera</h3>
                                        <div className="form-control mt-4">
                                            <div className="form-control py-3">
                                                <label className="input-group input-group-sm">
                                                    <span>ID</span>
                                                    <input type="text" placeholder={career.id} disabled className="input input-bordered input-sm" />
                                                </label>
                                            </div>
                                            <div className="form-control py-3">
                                                <label className="input-group input-group-sm">
                                                    <span>Nombre</span>
                                                    <input type="text" placeholder={career.name} className="input input-bordered input-sm" />
                                                </label>
                                            </div>
                                            <div className="form-control py-3">
                                                <label className="input-group input-group-sm">
                                                    <span>Semestres</span>
                                                    <input type="text" placeholder={career.semesters} className="input input-bordered input-sm" />
                                                </label>
                                            </div>
                                        </div>
                                        <div className="modal-action">
                                            <button>
                                                <label htmlFor={`my-modal-${career.id}`} className="btn">Guardar</label>
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
                    <th>Nombre</th>
                    <th>Duración</th>
                    <th></th>
                </tr>
            </tfoot>
        </table>
    );
};
export default Career;
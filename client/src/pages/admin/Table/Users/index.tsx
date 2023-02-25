import pencil from "../../../../assets/svg/table/pencil.svg";

const Users = (props: { tableInfo: any, activeTab: number }) => {
    return (
        <table className={`table table-compact w-full transition left delay-1500 duration-500`}>
            <thead>
                <tr>
                    <th></th>
                    <th>Usuario</th>
                    <th>Carrera</th>
                    <th>Estado</th>
                    <th>Ban</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    props.tableInfo.map((user: any) => {
                        return <tr key={user.id}>
                            <th>{user.id}</th>
                            <td>{user.username}</td>
                            <td>{user.career}</td>
                            <td>{user.isActive ? "Activo" : "Desactivo"}</td>
                            <td>{user.isDisabled ? "Si" : "No"}</td>
                            <td className="m-0 p-0">
                                <label htmlFor={`my-modal-${user.id}`} className="btn btn-sm btn-ghost"><img src={pencil} alt="editar" className="h-5 w-5" /></label>
                                <input type="checkbox" id={`my-modal-${user.id}`} className="modal-toggle" />
                                <div className="modal">
                                    <div className="modal-box min-w-min relative">
                                        <label htmlFor={`my-modal-${user.id}`} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                                        <h3 className="font-bold text-lg">Editar Usuario</h3>
                                        <div className="form-control mt-4">
                                            <div className="form-control py-3">
                                                <label className="input-group input-group-sm">
                                                    <span>ID</span>
                                                    <input type="text" placeholder={user.id} disabled className="input input-bordered input-sm" />
                                                </label>
                                            </div>
                                            <div className="form-control py-3">
                                                <label className="input-group input-group-sm">
                                                    <span>ID</span>
                                                    <input type="text" placeholder={user.username} className="input input-bordered input-sm" />
                                                </label>
                                            </div>
                                            <div className="form-control py-3">
                                                <label className="input-group input-group-sm">
                                                    <span>Carrera</span>
                                                    <input type="text" placeholder={user.career} className="input input-bordered input-sm" />
                                                </label>
                                            </div>
                                            <div className="form-control py-3">
                                                <label className="input-group input-group-sm">
                                                    <span>Validado</span>
                                                    <input type="text" placeholder={user.isActive ? "Activo" : "Desactivo"} className="input input-bordered input-sm" />
                                                </label>
                                            </div>
                                            <div className="form-control py-3">
                                                <label className="input-group input-group-sm">
                                                    <span>Banear</span>
                                                    <input type="text" placeholder={user.isDisabled ? "Si" : "No"} className="input input-bordered input-sm" />
                                                </label>
                                            </div>
                                        </div>
                                        <div className="modal-action">
                                            <button>
                                                <label htmlFor={`my-modal-${user.id}`} className="btn">Guardar</label>
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
                    <th>Usuario</th>
                    <th>Carrera</th>
                    <th>Estado</th>
                    <th>Ban</th>
                    <th></th>
                </tr>
            </tfoot>
        </table>
    );
};
export default Users;
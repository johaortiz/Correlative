import { useState, useEffect, useRef } from "react";
import { updateDbUserSubject } from "../../../helpers/requests";

const HomeWT = (props: { subjects: any, userSubjects: any, careerName: string }) => {



    //Values
    const [subjectStatus, setSubjectStatus] = useState<any[]>([]);
    const [changes, setChanges] = useState<boolean>(false);


    //Set initial State when  "props.subjects" and "props.userSubjects" change
    useEffect(() => {
        const initialStatus = props.subjects?.map((subject: any) => {
            const userSubject = props.userSubjects.find((us: any) => us.idFromUniversity === subject.idFromUniversity);
            return {
                tableId: userSubject?.tableId || null,
                idFromUniversity: subject.idFromUniversity,
                approved: userSubject?.approved || false,
                regularized: userSubject?.regularized || false,
            };
        });
        setSubjectStatus(initialStatus);
    }, [props.subjects, props.userSubjects]);


    //On change of checkboxex
    const handleCheckboxChange = (e: any, idFromUniversity: any) => {
        const { name, checked } = e.target;
        const newSubjectStatus = [...subjectStatus];
        const index = newSubjectStatus.findIndex(subject => subject.idFromUniversity === idFromUniversity);
        if (index !== -1) {
            newSubjectStatus[index][name] = checked;
            if (name === "approved" && checked) {
                newSubjectStatus[index].regularized = true;
            }
        } else {
            const newSubject: any = {
                tableId: null,
                idFromUniversity: idFromUniversity,
                approved: false,
                regularized: false
            };
            newSubject[name] = checked;
            if (name === "approved" && checked) {
                newSubject.regularized = true;
            }
            newSubjectStatus.push(newSubject);
        }
        setSubjectStatus(newSubjectStatus);
        setChanges(true);
    };


    //Update Data
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await updateDbUserSubject(subjectStatus);
        setChanges(false);
        setTimeout(() => {
            window.location.reload();
        }, 5000);
    };

    //Change the modal message depending on the correlative subjects
    const getCorrelativesStatusMessage = (correlativesStatus: any, correlativesData: any) => {
        const missingRegularizations = correlativesStatus
            .filter((subject: any) => !subject.regularized)
            .map((subject: any) => correlativesData.find((data: any) => data.idFromUniversity === subject.idFromUniversity)?.name);

        const missingApprovals = correlativesStatus
            .filter((subject: any) => !subject.approved)
            .map((subject: any) => correlativesData.find((data: any) => data.idFromUniversity === subject.idFromUniversity)?.name);

        if (missingRegularizations.length > 0) {
            return (
                <div className="text-base pt-2">
                    <strong className="text-red-500">No puede cursar</strong> porque tiene que<strong className="text-amber-500"> regularizar</strong> las siguientes materias correlativas:
                    <ul className="pt-2">
                        {missingRegularizations.map((name: any) => <li className="pt-2 font-bold text-base text-gray-700" key={name}>{name}</li>)}
                    </ul>
                </div>
            );
        } else if (missingApprovals.length > 0) {
            return (
                <div className="text-base pt-2">
                    Puede <strong>cursar</strong>, incluso
                    <strong className="text-amber-500"> regularizar</strong> pero no puede <strong className="text-red-400">promocionar </strong>
                    porque tiene que aprobar las siguientes materias correlativas:
                    <ul className="pt-2">
                        {missingApprovals.map((name: any) => <li className="pt-2 font-bold text-base text-gray-700" key={name}>{name}</li>)}
                    </ul>
                    <p className="text-base pt-4 text-red-500 font-bold">
                        También corre el riesgo que si no aprueba el final de las materias mencionadas anteriormente, perdés la materia!
                    </p>
                </div>
            );
        } else {
            return <div className="pt-2 font-bold text-base text-teal-800">Puede cursar y promocionar! 🥳</div>;
        }
    };

    //Change the color of the status depending on the correlative subjects
    const getCorrelativesColor = (correlativesStatus: any) => {
        if (correlativesStatus.some((subject: any) => !subject.regularized)) {
            return "bg-red-800";
        };
        if (correlativesStatus.some((subject: any) => !subject.approved)) {
            return "bg-amber-400";
        };
        return "bg-lime-600";
    };

    //Disable the checkbox to regularize depending on correlative subjects
    const disableCheckBoxRegularized: any = (correlativesStatus: any) => {
        return correlativesStatus.some((subject: any) => !subject.regularized);
    };

    //Disable the checkbox to approve depending on correlative subjects
    const disableCheckBoxApproved = (correlativesStatus: any) => {
        return correlativesStatus.some((subject: any) => !subject.approved);
    };

    //The year and corresponding quarter
    const semesterMessage = (subjectSemster: number) => {
        const obj = [
            "1° - 1° Cuatr.",
            "1° - 2° Cuatr.",
            "2° - 1° Cuatr.",
            "2° - 2° Cuatr.",
            "3° - 1° Cuatr.",
            "3° - 2° Cuatr.",
            "4° - 1° Cuatr.",
            "4° - 2° Cuatr.",
            "5° - 1° Cuatr.",
            "5° - 2° Cuatr.",
            "6° - 1° Cuatr.",
            "6° - 2° Cuatr.",
        ]
        return obj[subjectSemster - 1];
    };

    return (
        <div className="overflow-x-auto">
            <h1 className="text-3xl font-bold mb-10 text-center">{props.careerName}</h1>
            <form className="mb-36 flex flex-col justify-center items-center" onSubmit={handleSubmit}>
                <div className={`mb-1 btn btn-block loading bg-teal-600 border-transparent no-animation cursor-default hover:bg-teal-600 hover:border-transparent`}>
                    {changes ? "Cambios Detectados, por favor, guarde al final de la tabla" : "Sin cambios en la tabla..."}
                </div>
                <table className="table w-full border-black">
                    <thead>
                        <tr className="text-center">
                            <th className="bg-teal-500 text-gray-900">Estado</th>
                            <th className="bg-teal-500 text-gray-900">Aprobada</th>
                            <th className="bg-teal-500 text-gray-900">Regularizada</th>
                            <th className="bg-teal-500 text-gray-900">N° Materia</th>
                            <th className="bg-teal-500 text-gray-900">Materia</th>
                            <th className="bg-teal-500 text-gray-900">Año</th>
                            <th className="bg-teal-500 text-gray-900">Tipo</th>
                            <th className="bg-teal-500 text-gray-900">Correlativas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            subjectStatus?.map((subject: any, i: number) => {
                                //Id of paper of university (subject's number)
                                const idFromUniversity = subject.idFromUniversity;

                                //subject's Status (approved, regularized, tableId(ofdb))
                                const subjectStatusForId = subjectStatus.find((subject: any) => subject.idFromUniversity === idFromUniversity) || {};
                                //Subject's general info (name, correlatives, semester)
                                const dataSubjects = props.subjects[i];

                                const correlativesStatus = dataSubjects.correlatives.map((id: number) => {
                                    const subject = subjectStatus.find(subject => subject.idFromUniversity === id);
                                    return {
                                        ...subject,
                                        name: dataSubjects.name
                                    };
                                });

                                return (
                                    <tr key={i} className={`${dataSubjects.id % 2 === 0 ? "active" : ""} text-center`}>
                                        <th>
                                            <button className={`btn btn-circle btn-xs btn-disabled ${getCorrelativesColor(correlativesStatus)}`}></button>
                                        </th>
                                        <th>
                                            <label className={`${disableCheckBoxApproved(correlativesStatus) ? "tooltip" : ""}`} data-tip="Ver corr.">
                                                <input
                                                    id={idFromUniversity}
                                                    type="checkbox"
                                                    className="checkbox"
                                                    name="approved"
                                                    checked={subjectStatusForId.approved || false}
                                                    onChange={(e) =>
                                                        handleCheckboxChange(e, idFromUniversity)
                                                    }
                                                    disabled={disableCheckBoxApproved(correlativesStatus)}
                                                />
                                            </label>
                                        </th>
                                        <th>
                                            <label className={`${disableCheckBoxRegularized(correlativesStatus) ? "tooltip" : ""}`} data-tip="Ver corr.">
                                                <input
                                                    id={idFromUniversity}
                                                    type="checkbox"
                                                    className="checkbox"
                                                    name="regularized"
                                                    checked={subjectStatusForId.regularized || false}
                                                    onChange={(e) =>
                                                        handleCheckboxChange(e, idFromUniversity)
                                                    }
                                                    disabled={disableCheckBoxRegularized(correlativesStatus) || subjectStatusForId.approved}
                                                />
                                            </label>
                                        </th>
                                        <td>{idFromUniversity}</td>
                                        <td className="font-bold">{dataSubjects.name}</td>
                                        <td>{semesterMessage(dataSubjects.semester)}</td>
                                        <td>{dataSubjects.org}</td>
                                        <td>
                                            <label htmlFor={`my-modal-${i}`} className="btn btn-sm btn-ghost">Detalles</label>
                                            {/* Modal menú */}
                                            <input type="checkbox" id={`my-modal-${i}`} className="modal-toggle" />
                                            <label className="modal modal-bottom sm:modal-middle" htmlFor={`my-modal-${i}`}>
                                                <label className="modal-box relative min-w-min">
                                                    <label htmlFor={`my-modal-${i}`} className="btn btn-sm btn-circle absolute right-3 top-3">X</label>
                                                    <h3 className="font-bold text-2xl mt-7">{dataSubjects.name}</h3>
                                                    {
                                                        <div>
                                                            {
                                                                !!dataSubjects.correlatives && dataSubjects.correlatives.length === 0 ? (
                                                                    <div className="py-4">
                                                                        <p className="text- font-bold py-1">Esta materia no posee correlativas</p>
                                                                        <p className="font-bold text-base text-teal-800 py-1">Puede cursarla y Promocionarla! 🥳</p>
                                                                    </div>
                                                                ) : (
                                                                    <div className="py-2">
                                                                        {getCorrelativesStatusMessage(correlativesStatus, props.subjects)}
                                                                    </div>
                                                                )
                                                            }
                                                        </div>
                                                    }
                                                </label>
                                            </label>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
                <button className="btn-block" type="submit"><label htmlFor="my-modal-10000" className={`btn-block btn mt-10 btn-info ${changes ? "" : "hidden"}`}>Guardar Cambios</label></button>
                <input type="checkbox" id="my-modal-10000" className="modal-toggle cursor-wait" />
                <label className="modal modal-bottom sm:modal-middle cursor-wait">
                    <label className="modal-box cursor-wait">
                        <h3 className="font-bold text-lg">Materias Actualizadas Correctamente</h3>
                        <p className="text-xs pt-2">O no...?</p>
                        <p className="py-4">Actualicemos los cambios recargando la página en unos segundos, aguarde por favor 🥰</p>
                    </label>
                </label>
            </form>
        </div >
    );
};

export default HomeWT;

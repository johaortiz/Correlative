import { useState, useEffect } from "react";

const HomeWT = (props: { subjects: any, userSubjects: any }) => {
    const [subjectStatus, setSubjectStatus] = useState<any[]>([]);

    useEffect(() => {
        const initialStatus = props.subjects?.map((subject: any) => {
            const userSubject = props.userSubjects.find((us: any) => us.idFromUniversity === subject.idFromUniversity);
            return {
                tableId: userSubject?.tableId || null,
                idFromUniversity: subject.idFromUniversity,
                approved: userSubject?.approved || false,
                regularized: userSubject?.regularized || false
            };
        });
        setSubjectStatus(initialStatus);
    }, [props.subjects, props.userSubjects]);


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
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(subjectStatus);
        // Send subjectStatus to backend
    };

    return (
        <div className="overflow-x-auto">
            <form onSubmit={handleSubmit}>
                <table className="table w-full">
                    <thead>
                        <tr className="text-center">
                            <th>Aprobada</th>
                            <th>Regularizada</th>
                            <th>N° Materia</th>
                            <th>Semestre</th>
                            <th>Materia</th>
                            <th>Tipo</th>
                            <th>Correlativas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjectStatus?.map((subject: any, i: number) => {
                            const idFromUniversity = subject.idFromUniversity;
                            const subjectStatusForId = subjectStatus.find((subject: any) => subject.idFromUniversity === idFromUniversity) || {};
                            const dataSubjects = props.subjects[i];
                            return (
                                <tr
                                    key={i}
                                    className={`${subject.id % 2 === 0 ? "active" : ""} text-center`}
                                >
                                    <th>
                                        <label>
                                            <input
                                                type="checkbox"
                                                className="checkbox"
                                                name="approved"
                                                checked={subjectStatusForId.approved || false}
                                                onChange={(e) =>
                                                    handleCheckboxChange(e, idFromUniversity)
                                                }
                                            />
                                        </label>
                                    </th>
                                    <th>
                                        <label>
                                            <input
                                                type="checkbox"
                                                className="checkbox"
                                                name="regularized"
                                                checked={subjectStatusForId.regularized || false}
                                                onChange={(e) =>
                                                    handleCheckboxChange(e, idFromUniversity)
                                                }
                                                disabled={subjectStatusForId.approved}
                                            />
                                        </label>
                                    </th>
                                    <td>{idFromUniversity}</td>
                                    <td>{dataSubjects.semester}</td>
                                    <td>{dataSubjects.name}</td>
                                    <td>{dataSubjects.org}</td>
                                    <td>
                                        <button className="btn btn-ghost btn-xs">Detalles</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <button className="btn m-5" type="submit">Guardar</button>
            </form>
        </div>
    );
};

export default HomeWT;

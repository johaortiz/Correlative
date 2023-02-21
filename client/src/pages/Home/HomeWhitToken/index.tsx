import React, { useState } from "react";

const HomeWT = (props: { subjects: any }) => {
    const [subjectStatus, setSubjectStatus] = useState<any>({});

    const handleCheckboxChange = (e: any, idFromUniversity: any) => {
        const { name, checked } = e.target;
        // console.log(name, checked, idFromUniversity);

        setSubjectStatus((prevState: any) => ({
            ...prevState,
            [idFromUniversity]: {
                ...prevState[idFromUniversity],
                [name]: checked,
            },
        }));
        if (name === "approved" && checked) {
            setSubjectStatus((prevState: any) => ({
                ...prevState,
                [idFromUniversity]: {
                    ...prevState[idFromUniversity],
                    regularized: true,
                },
            }));
        }
    };

    console.log(subjectStatus);


    return (
        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr className="text-center">
                        <th>Arobada</th>
                        <th>Regularizada</th>
                        <th>N° Materia</th>
                        <th>Semestre</th>
                        <th>Materia</th>
                        <th>Tipo</th>
                        <th>Correlativas</th>
                    </tr>
                </thead>
                <tbody>
                    {props.subjects?.map((subject: any) => {
                        const idFromUniversity = subject.idFromUniversity;
                        const subjectStatusForId = subjectStatus[idFromUniversity] || {};
                        return (
                            <tr
                                key={subject.id}
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
                                <td>{subject.semester}</td>
                                <td>{subject.name}</td>
                                <td>{subject.org}</td>
                                <td>
                                    <button className="btn btn-ghost btn-xs">Detalles</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};
export default HomeWT;

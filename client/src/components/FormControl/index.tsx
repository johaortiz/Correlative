const FormControl = (props: { labelText: string, placeholderText: string, typeInput: string, name: string }) => {


    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">{props.labelText}</span>
            </label>
            <input name={props.name} type={props.typeInput} placeholder={props.placeholderText} className="input input-bordered" />
        </div>
    );
};
export default FormControl;
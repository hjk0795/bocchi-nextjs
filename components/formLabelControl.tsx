import { ChangeEvent, useState } from "react";
import Form from "react-bootstrap/Form";
import _ from "lodash";

type Props = {
    label: string;
    type?: string,
    onChange?: (event: ChangeEvent) => void;
}

export default function FormLabelControl({ label, type, onChange }: Props) {
    const [controlValue, setControlValue] = useState("");

    function handleChange(event: ChangeEvent) {
        const { value } = event.target as HTMLInputElement;

        setControlValue(value);
        onChange && onChange(event);
    }

    return <>
        <Form.Group className="mb-3">
            <Form.Label>{label}</Form.Label>
            <Form.Control
                name={_.lowerCase(label)}
                type={type ? type : _.lowerCase(label)}
                placeholder={label}
                onChange={handleChange}
                value={controlValue}
                required
            />
        </Form.Group>
    </>;
}
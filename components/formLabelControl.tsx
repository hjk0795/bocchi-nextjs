import { ChangeEvent, useState } from "react";
import Form from "react-bootstrap/Form";
import _ from "lodash";

export default function FormLabelControl(props) {
   

    return <>
        <Form.Group className="mb-3">
            <Form.Label>{props.label}</Form.Label>
            <Form.Control
                name={_.lowerCase(props.label)}
                // type={props.label}
                placeholder={props.label}
                onChange={props.onChange}
                required
            />
        </Form.Group>
    </>;
}